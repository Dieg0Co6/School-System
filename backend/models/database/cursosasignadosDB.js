const conexion = require("./mysql");

class CursosAsignados{
    static async CursosxDocente(ciclo_academico, id_docente){
        try {
            const conn = await conexion;
            const [results] = await conn.query(`SELECT * FROM cursos_docente INNER JOIN docente ON docente.id_docente = cursos_docente.id_docente
                                                INNER JOIN cursos ON cursos.id_curso = cursos_docente.id_curso WHERE ciclo_academico = ? AND docente.id_docente = ?`, [ciclo_academico, id_docente]);
            return results;
        } catch (error) {
            throw new Error(`Error al obtener todos los alumnos: ${error.message}`);
        }
    }
}

module.exports = CursosAsignados;