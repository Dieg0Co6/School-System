const jwt = require('jsonwebtoken');
const config = require('../controllers/config');

// Middleware para verificar el token
function authMiddleware(req, res, next) {
    // Obtener el token de las cookies
    const token = req.cookies.access_token;

    // Verificar si el token está presente
    if (!token) {
        return res.status(401).json({ error: "No se ha proporcionado un token de autenticación" });
    }

    // Verificar y decodificar el token
    jwt.verify(token, config.jwt.secret, (err, user) => {
        if (err) {
            return res.status(403).json({ error: "Token inválido" });
        }

        // Agregar la información del usuario al objeto req para usarla en las rutas
        req.user = user;
        next();
    });
}

module.exports = authMiddleware;


