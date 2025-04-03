require('dotenv').config({path: '.env'})

module.exports = {
    app:{
        port: process.env.PORT,
        cookieSecure: process.env.NODE_ENV
    },
    jwt:{
        secret: process.env.SECRET_JWT_KEY || 'notasecreta!'
    },
    mysql:{
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DB || 'sistemaasistencias',
    }

}