const error = require("../middleware/error");
const jwt = require('jsonwebtoken');
const Usuario = require("../models/database/usuariosDB");
const config = require('../controllers/config');
const {
    validateUsuario,
    validateUsuarioParcial,
} = require("../schemas/usuarioSchema");
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 10;

class usuarioController {
    static async getAll(req, res) {
        try{
            const usuarios = await Usuario.todos()
            res.json(usuarios)
        } catch (error) {
            console.error('Error al obtener todos los usuarios:', error);
            res.status(500).send('Error al obtener todos los usuarios');
        }
     }

    static async create(req, res) {
        if (!req.body) {
            return res
                .status(400)
                .json({ error: "El cuerpo de la solicitud está vacío" });
        }

        const result = validateUsuario(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }
        try {
            const {dni, password } = result.data;
            const User = await Usuario.uno({ dni });
            if (User.length > 0) {
                throw new Error("El dni ya existe");
            }
            const newPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const newUsuario = await Usuario.agregar({
                input: { ...result.data, password: newPassword },
            });
            res.status(201).json(newUsuario);
        } catch (error) {
            console.error("Error al agregar el usuario:", error);
            res.status(500).send("Error al agregar el usuario");
        }
    }

    static async login(req, res) {
        if (!req.body) {
            return res.status(400).json({ error: "El cuerpo de la solicitud está vacío" });
        }

        const result = validateUsuarioParcial(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        const { email, password } = result.data;

        try {
            const user = await Usuario.Buscar({ email });
            const rol = await Usuario.BuscarRolxUsuario({ id_usuario: user.id_usuario });
            const nombre_rol = rol.length > 0 ? rol[0].nombre : null;
            const token = jwt.sign({id:user.id_usuario,email: user.email, rol: nombre_rol}, config.jwt.secret,{
                expiresIn: '2h'
            })
            if (!user) {
                return res.status(401).json({ error: "Credenciales incorrectas" });
            }
            const newPassword = user.password;

            if (!password || !newPassword) {
                return res.status(400).json({ error: "La contraseña o el hash están indefinidos" });
            }

            // Comparar la contraseña ingresada con el hash almacenado
            const CompararPassword = await bcrypt.compare(password, newPassword);
            const {password: _, ...publicUser} = user

            if (CompararPassword) {
                res.cookie('access_token', token, {
                    httpOnly: true, //LAS COOKIES SOLO SE VAN A ACCEDER EN EL SERVIDOR
                    secure: config.app.cookieSecure === 'produccion', //LA COOKIE SOLO SE PUEDE HACER EN HTTPS
                    sameSite: 'strict', //LA COOKIE SOLO SE PUEDE ACCEDER EN EL MISMO DOMINIO
                    maxAge: 1000 * 60 * 120 //LA COOKIE SOLO TENDRÁ PLAZO DE TIEMPO 2 HORAS
                }).status(200).json({ message: "Login exitoso", publicUser, token});
            } else {
                res.status(401).json({ error: "Credenciales incorrectas" });
            }
        } catch (error) {
            console.error("Error al logear el usuario:", error);
            res.status(500).send("Error al logear el usuario");
        }
    }


    static async logout(req, res){
        try{
            // Limpiar la cookie que contiene el token JWT
            res.clearCookie('access_token');
            // Puedes enviar una respuesta de éxito
            res.status(200).json({ message: "Logout exitoso" });
        }catch(err){
            console.error("Error del logout del usuario:", error);
            res.status(500).send("Error del logout del usuario");
        }
    }
    
}

module.exports = usuarioController;