const conexion = require('./mysql')

class Usuario {
    static async todos() {
        try {
            const conn = await conexion;
            const [results] = await conn.query('SELECT * FROM usuarios');
            return results;
        } catch (error) {
            throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
        }
    }

    static async uno(dni) {
        try {
            const conn = await conexion;
            const [results] = await conn.query('SELECT * FROM usuarios WHERE dni = ?', [dni]);
            return results;
        } catch (error) {
            throw new Error(`Error al obtener los datos del usuario: ${error.message}`);
        }
    }

    static async agregar({ input }) {
        const conn = await conexion;
        const {
            nombre,
            apellido_paterno,
            apellido_materno,
            email,
            password,
            dni
        } = input
        const result = await conn.query('INSERT INTO usuarios (nombre, apellido_paterno, apellido_materno, email, password, dni, estado) VALUES (?,?,?,?,?,?,?);', [nombre, apellido_paterno, apellido_materno, email, password, dni,1])
        return result
    }

    static async editar({ id, input }) {
        const conn = await conexion;
        const {
            dni,
            nombre,
            apellido_paterno,
            apellido_materno,
            email,
            fecha_nacimiento
        } = input
        const result = await conn.query('UPDATE usuarios SET dni = ? , nombre = ? , apellido_paterno = ? , apellido_materno = ? , email = ? , fecha_nacimiento = ? WHERE id = ? ', [dni, nombre, apellido_paterno, apellido_materno, email, fecha_nacimiento, id])
        return result
    }
    static async eliminar({ id }) {
        const conn = await conexion;
        const result = await conn.query('DELETE FROM usuarios WHERE id = ?', [id]);
        return result;
    }

    static async Buscar({ email }) {
        const conn = await conexion;
        const [results] = await conn.query('SELECT * FROM usuarios WHERE email = ?', [email]);

        if (results.length === 0) {
            return null; // No se encontró ningún usuario
        }

        return results[0];
    }
}

module.exports = Usuario