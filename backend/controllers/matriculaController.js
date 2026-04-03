
const Matricula = require("../models/database/matriculaDB");
const validateMatricula = require("../schemas/matriculaSchema");
const conexion = require("../models/database/mysql");

class matriculaController {

    static async getCursosByAlumno(req, res) {
        const { id_alumno } = req.params;

        if (!id_alumno) {
            return res.status(400).json({ error: "ID de alumno es requerido" });
        }

        try {
            const cursos = await Matricula.getCursosByAlumno(id_alumno);
            res.status(200).json(cursos);
        } catch (error) {
            console.error("Error al obtener los cursos del alumno:", error);
            res.status(500).send("Error al obtener los cursos del alumno");
        }
    }

    static async create(req, res) {
        const validation = validateMatricula(req.body);
        if (!validation.success) {
            return res.status(400).json({ errors: validation.error.flatten() });
        }

        const conn = await conexion;
        try {
            const { id_alumno, id_curso, ciclo_academico } = validation.data;
            const existingCursos = await Matricula.getCursosByAlumno(id_alumno);

            if (existingCursos.some(curso => curso.id_curso === id_curso)) {
                return res.status(400).json({ error: "El alumno ya está matriculado en este curso" });
            }

            await conn.beginTransaction();

            // Obtener el número actual y máximo de alumnos en el curso_docente
            const [rows] = await conn.query(
                "SELECT alumnos_matriculados, max_alumnos FROM cursos_docente WHERE id_curso = ? FOR UPDATE",
                [id_curso]
            );
            if (rows.length === 0) {
                await conn.rollback();
                return res.status(400).json({ error: "Curso_docente no encontrado" });
            }
            const { alumnos_matriculados, max_alumnos } = rows[0];

            if (alumnos_matriculados >= max_alumnos) {
                await conn.rollback();
                return res.status(400).json({ error: "No se puede matricular: se alcanzó el máximo de alumnos permitidos." });
            }

            // Crear la matrícula
            const newMatricula = await Matricula.create({
                input: { id_alumno, id_curso, ciclo_academico }
            });
            if (!newMatricula) {
                await conn.rollback();
                return res.status(400).json({ error: "No se pudo crear la matrícula" });
            }

            // Sumar al contador de alumnos_matriculados
            await conn.query(
                "UPDATE cursos_docente SET alumnos_matriculados = alumnos_matriculados + 1 WHERE id_curso = ?",
                [id_curso]
            );

            await conn.commit();
            res.status(201).json({ message: "Matrícula creada exitosamente", matricula: newMatricula });
        } catch (error) {
            if (conn) await conn.rollback();
            res.status(500).send("Error al crear la matrícula");
        }
    }
}

module.exports = matriculaController;
