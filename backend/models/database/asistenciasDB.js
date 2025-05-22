const conexion = require('./mysql')

class Asistencia{

    static async todosCursos(id_facultad, id_especialidad){
        try {
            const conn = await conexion;
            const [results] = await conn.query(`SELECT * FROM cursos WHERE id_facultad = ? AND id_especialidad = ? AND estado = ?`, [id_facultad, id_especialidad, 1]);
            return results;
        } catch (error) {
            throw new Error(`Error al obtener todos los alumnos: ${error.message}`);
        }
    }
}

module.exports = Asistencia