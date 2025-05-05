const conexion = require("./mysql");
const usuarioDB = require("./usuariosDB");

class Alumno {
    static async todos() {
        try {
            const conn = await conexion;
            const [results] = await conn.query(`SELECT * FROM alumno INNER JOIN usuarios ON alumno.id_usuario = usuarios.id_usuario WHERE usuarios.estado = 1 order by id_alumno desc`);
            return results;
        } catch (error) {
            throw new Error(`Error al obtener todos los alumnos: ${error.message}`);
        }
    }

    static async uno(dni) {
        try {
            const conn = await conexion;
            const [results] = await conn.query(
                `SELECT * FROM alumno INNER JOIN usuarios ON alumno.id_usuario = usuarios.id_usuario WHERE dni = ?`,
                [dni]
            );
            return results;
        } catch (error) {
            throw new Error(
                `Error al obtener los datos del alumno: ${error.message}`
            );
        }
    }

    static async agregar({ input }) {
        const conn = await conexion;
        const { id_usuario, codigo_alumno, carrera, ciclo, created_at, updated_at } = input;
        const [result] = await conn.query(
            "INSERT INTO alumno (id_usuario, codigo_alumno, carrera, ciclo, created_at, updated_at) VALUES (?,?,?,?,?,?);",
            [id_usuario, codigo_alumno, carrera, ciclo, created_at, updated_at]
        );
        return result;
    }

    static async editar({ id_usuario, input }) {
        const conn = await conexion;
        const { codigo_alumno, carrera, ciclo } = input;
        const result = await conn.query(
            "UPDATE alumno SET codigo_alumno = ? , carrera = ? , ciclo = ? WHERE id_usuario = ? ",
            [codigo_alumno, carrera, ciclo, id_usuario]
        );
        return result;
    }
/*     static async eliminar({ id }) {
        const conn = await conexion;
        const result = await conn.query("UPDATE usuarios SET estado = ? WHERE id_usuario = ?", [
            id,
        ]);
        return result;
    } */

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
