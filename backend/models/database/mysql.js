const mysql = require('mysql2/promise')
const config = require('../../controllers/config')

const dbconfig = {
    host : config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

const conexion =  mysql.createConnection(dbconfig);

conexion.then(conn => conn.on('error', (err) => {
    console.error('Error en la conexión a la base de datos:', err);
}));


module.exports = conexion;