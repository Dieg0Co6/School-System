const conexion = require('./mysql')

class Facultad {
    static async todos() {
        try {
            const conn = await conexion;
            const [results] = await conn.query(`SELECT * FROM facultad order by id_facultad asc`);
            return results;
        } catch (error) {
            throw new Error(`Error al obtener todas las facultades: ${error.message}`);
        }
    }

    static async todosEpecialidades() {
        try {
            const conn = await conexion;
            const [results] = await conn.query(`SELECT * FROM especialidad order by id_especialidad asc`);
            return results;
        } catch (error) {
            throw new Error(`Error al obtener todas las especialidades: ${error.message}`);
        }
    }
    
    static async uno(id_facultad) {
        try {
            const conn = await conexion;
            const [results] = await conn.query(`SELECT * FROM facultad WHERE id_facultad = ?`, [id_facultad]);
            return results;
        } catch (error) {
            throw new Error(`Error al obtener los datos de la facultad: ${error.message}`);
        }
    }

    static async filtrarXFacultad(id_facultad){
        try{
            const conn = await conexion;
            const [results] = await conn.query(`SELECT * FROM especialidad INNER JOIN facultad ON especialidad.id_facultad  = facultad.id_facultad WHERE facultad.id_facultad = ?`, [id_facultad]);
            return results;
        }catch(error){
            throw new Error(`Error al obtener los datos de la facultad: ${error.message}`);
        }
    }

    static async filtrarXEspecialidad(id_especialidad){
        try{
            const conn = await conexion;
            const [results] = await conn.query(`SELECT * FROM especialidad INNER JOIN facultad ON especialidad.id_facultad  = facultad.id_facultad WHERE especialidad.id_especialidad = ?`, [id_especialidad]);
            return results;
        }catch(error){
            throw new Error(`Error al obtener los datos de la facultad: ${error.message}`);
        }
    }
}

module.exports = Facultad;