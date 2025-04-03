const cors = require("cors");
const error = require("./error");

function middlwareCors() {
    return cors({
        origin: (origin, callback) => {
            const ORIGINS_ACEPTADOS = [
                "http://localhost:4000",
                "http://localhost:5173",
                "https://sistemaasistencias.com",
            ];

            if (ORIGINS_ACEPTADOS.includes(origin)) {
                return callback(null, true);
            }

            if (!origin) {
                return callback(null, true);
            }

            return callback(error);
        },
        credentials: true // Permite el envío de cookies
    });
}

module.exports = middlwareCors;