const conexion = require('./mysql')

class Docente{
    static async todos() {
        try {
            const conn = await conexion;
            const [results] = await conn.query(`SELECT * FROM docente INNER JOIN usuarios ON docente.id_usuario = usuarios.id_usuario WHERE usuarios.estado = 1 order by id_docente desc`);
            return results;
        } catch (error) {
            throw new Error(`Error al obtener todos los docentes: ${error.message}`);
        }
    }

    static async uno(dni) {
        try {
            const conn = await conexion;
            const [results] = await conn.query(`SELECT * FROM docente INNER JOIN usuarios ON docente.id_usuario = usuarios.id_usuario WHERE dni = ?`, [dni]);
            return results;
        } catch (error) {
            throw new Error(`Error al obtener los datos del docente: ${error.message}`);
        }
    }

    static async agregar({ input }) {
        const conn = await conexion;
        const { id_usuario, codigo_docente, facultad, especialidad, created_at, updated_at } = input;
        const [result] = await conn.query(
            "INSERT INTO docente (id_usuario, codigo_docente, facultad, especialidad, created_at, updated_at) VALUES (?,?,?,?,?,?);",
            [id_usuario, codigo_docente, facultad, especialidad, created_at, updated_at]
        );
        return result;
    }

    static async editar({ id_usuario, input }) {
        const conn = await conexion;
        const { codigo_docente, facultad, especialidad } = input;
        const result = await conn.query(
            "UPDATE docente SET codigo_docente = ?, facultad = ?, especialidad = ? WHERE id_usuario = ?",
            [codigo_docente, facultad, especialidad, id_usuario]
        );
        return result;
    }
    /* static async agregar({ input }) {
        const conn = await conexion;
        const {
            dni,
            nombre,
            apellido_paterno,
            apellido_materno,
            correo,
            fecha_nacimiento
        } = input
        const result = await conn.query('INSERT INTO alumno (dni, nombre, apellido_paterno, apellido_materno, correo, fecha_nacimiento) VALUES (?,?,?,?,?,?);', [dni, nombre, apellido_paterno, apellido_materno, correo, fecha_nacimiento])
        return result        
    }

    static async editar({id, input}){
        const conn = await conexion;
        const {
            dni,
            nombre,
            apellido_paterno,
            apellido_materno,
            correo,
            fecha_nacimiento
        } = input
        const result = await conn.query('UPDATE alumno SET dni = ? , nombre = ? , apellido_paterno = ? , apellido_materno = ? , correo = ? , fecha_nacimiento = ? WHERE id = ? ', [dni, nombre, apellido_paterno, apellido_materno, correo, fecha_nacimiento,id])
        return result
    }
    static async eliminar({id}) {
        const conn = await conexion;
        const result = await conn.query('DELETE FROM alumno WHERE id = ?',[id]);
        return result;
    }

    static async query(tabla, consulta) {
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT * FROM ${tabla} WHERE ?`, [consulta], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        }
    }
    */
}

module.exports = Docente;