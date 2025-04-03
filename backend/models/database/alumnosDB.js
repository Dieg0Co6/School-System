const conexion = require('./mysql')

class Alumno {
    static async todos() {
        try {
            const conn = await conexion;
            const [results] = await conn.query('SELECT * FROM alumno');
            return results;
        } catch (error) {
            throw new Error(`Error al obtener todos los alumnos: ${error.message}`);
        }
    }

    static async uno(codigo_alumno) {
        try {
            const conn = await conexion;
            const [results] = await conn.query(`SELECT * FROM alumno WHERE codigo_alumno = ?`, [codigo_alumno]);
            return results;
        } catch (error) {
            throw new Error(`Error al obtener los datos del alumno: ${error.message}`);
        }
    }

    static async agregar({ input }) {
        const conn = await conexion;
        const {
            codigo_alumno,
            carrera,
            ciclo,
            created_at,
            update_at
        } = input
        const result = await conn.query('INSERT INTO alumno (codigo_alumno, carrera, ciclo, created_at, updated_at) VALUES (?,?,?,?,?,?);', [codigo_alumno, carrera,ciclo,created_at, update_at])
        return result        
    }

    static async editar({id, input}){
        const conn = await conexion;
        const {
            codigo_alumno,
            carrera,
            ciclo
        } = input
        const result = await conn.query('UPDATE alumno SET codigo_alumno = ? , carrera = ? , ciclo = ? WHERE id_alumno = ? ', [codigo_alumno, carrera,ciclo,id])
        return result
    }
    static async eliminar({id}) {
        const conn = await conexion;
        const result = await conn.query('DELETE FROM alumno WHERE id_alumno = ?',[id]);
        return result;
    }

    /* static async query(tabla, consulta) {
        return new Promise((resolve, reject) => {
            conexion.query(`SELECT * FROM ${tabla} WHERE ?`, [consulta], (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
        });
    } */
}


module.exports = Alumno;