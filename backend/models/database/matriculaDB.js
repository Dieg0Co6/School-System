const conexion = require("./mysql");

class Matricula {
    static async insert({ input }) {
        const conn = await conexion;
        const { id_alumno, id_curso, ciclo_academico } = input;
        const [result] = await conn.query(
            "INSERT INTO matricula (id_alumno, id_curso, ciclo_academico) VALUES (?, ?, ?);",
            [id_alumno, id_curso, ciclo_academico]
        );
        return result;
    }

    static async getCursosByAlumno(id_alumno) {
        try {
            const conn = await conexion;
            const [results] = await conn.query(
                `-- Cursos del ciclo actual según la carrera del alumno
                SELECT c.id_curso, c.nombre
                FROM cursos c
                INNER JOIN especialidad e ON c.id_especialidad = e.id_especialidad
                INNER JOIN alumno a ON e.nom_especialidad = a.carrera
                WHERE c.ciclo = a.ciclo
                AND a.id_alumno = ?

                UNION

                -- Cursos desaprobados anteriormente (nota menor a 11)
                SELECT c.id_curso, c.nombre
                FROM matriculas m
                INNER JOIN cursos c ON m.id_curso = c.id_curso
                WHERE m.id_alumno = ?
                AND m.nota_final < 11
                AND m.id_curso NOT IN (
                    SELECT id_curso FROM matriculas WHERE id_alumno = ? AND nota_final >= 11
                );`,
                [id_alumno, id_alumno, id_alumno]
            );
            return results;
        } catch (error) {
            throw new Error(`Error al obtener los cursos del alumno: ${error.message}`);
        }
    }

    static async create({ input }) {
        const conn = await conexion;
        const { id_alumno, id_curso, ciclo_academico } = input;
        try {
            const [result] = await conn.query(
                "INSERT INTO matriculas (id_alumno, id_curso, ciclo_academico) VALUES (?, ?, ?);",
                [id_alumno, id_curso, ciclo_academico]
            );
            return result;
        } catch (error) {
            throw new Error(`Error al crear la matrícula: ${error.message}`);
        }
    }

}

module.exports = Matricula;