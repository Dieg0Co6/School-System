const conexion = require('./mysql')

class Asistencia {

    static async todosCursos(id_facultad, id_especialidad) {
        try {
            const conn = await conexion;
            const [results] = await conn.query(`SELECT * FROM cursos WHERE id_facultad = ? AND id_especialidad = ? AND estado = ?`, [id_facultad, id_especialidad, 1]);
            return results;
        } catch (error) {
            throw new Error(`Error al obtener todos los cursos: ${error.message}`);
        }
    }

    static async AlumnosxCurso(id_curso, ciclo_academico) {
        try {
            const conn = await conexion;
            const [results] = await conn.query(`SELECT a.id_alumno, u.nombre, u.apellido_paterno, u.apellido_materno, m.id_curso,
                        c.nombre, c.abreviatura from matriculas m INNER JOIN alumno a ON m.id_alumno = a.id_alumno 
                        INNER JOIN usuarios u ON u.id_usuario = a.id_usuario INNER JOIN cursos c ON c.id_curso = m.id_curso
                        WHERE m.id_curso = ? AND m.ciclo_academico = ?`, [id_curso, ciclo_academico]);
            return results;
        } catch (error) {
            throw new Error(`Error al obtener los alumnos del curso: ${error.message}`);
        }
    }

    static async RegistrarAsistencia({ id_alumno, id_curso, fecha, estado }) {
        if (!id_alumno || !id_curso || !fecha || !estado) {
            throw new Error('Todos los campos son obligatorios');
        }

        try {
            const conn = await conexion;
            const [result] = await conn.query(
                `INSERT INTO asistencias (id_alumno, id_curso, fecha, estado) VALUES (?, ?, ?, ?)`,
                [id_alumno, id_curso, fecha, estado]
            );
            return result;
        } catch (error) {
            throw new Error(`Error al registrar la asistencia: ${error.message}`);
        }
    }
}

module.exports = Asistencia