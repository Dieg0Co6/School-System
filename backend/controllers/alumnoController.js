const Alumno = require('../models/database/alumnosDB');
const Usuario = require('../models/database/usuariosDB');
const validateAlumno = require('../schemas/alumnoSchema');
const { validateUsuario } = require("../schemas/usuarioSchema");
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const conexion = require('../models/database/mysql');


class alumnoController {
    static async getAll(req, res) {
        try {
            const alumnos = await Alumno.todos();
            res.json(alumnos); // Devuelve los alumnos como JSON
        } catch (error) {
            console.error('Error al obtener todos los alumnos:', error);
            res.status(500).send('Error al obtener todos los alumnos');
        }
    }

    static async getById(req, res) {
        try {
            const { dni } = req.params
            const alumno = await Alumno.uno(dni)
            res.json(alumno)
        } catch (error) {
            console.error('Error al obtener el alumno:', error);
            res.status(500).send('Error al obtener el alumno');
        }
    }

    static async create(req, res) {
        if (!req.body) {
            return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
        }

        const result = validateUsuario(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }
        const result2 = validateAlumno(req.body);
        if (!result2.success) {
            return res.status(400).json({ error: result2.error.format() });
        }

        const conn = await conexion;
        await conn.beginTransaction();

        try {
            const {
                nombre,
                apellido_paterno,
                apellido_materno,
                email,
                password,
                dni
            } = result.data;

            const {
                codigo_alumno,
                carrera,
                ciclo
            } = result2.data;

            // Verificar si el usuario ya EXISTE por DNI
            const User = await Usuario.uno({ dni });
            if (User.length > 0) {
                throw new Error("El DNI ya está registrado");
            }
            // Hashear la contraseña
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            // Crear usuario desde el modelo Usuario
            const nuevoUsuario = await Usuario.agregar({
                input: {
                    nombre: nombre,
                    apellido_paterno: apellido_paterno,
                    apellido_materno: apellido_materno,
                    email: email,
                    password: hashedPassword,
                    dni: dni,
                    estado: 1
                }
            });
            const usuario_id = nuevoUsuario.insertId;

            // Asignar rol alumno
            await conn.query(
                'INSERT INTO rol_usuarios (id_rol, id_usuario) VALUES (?, ?);',
                [3, usuario_id]
            );

            // Crear alumno desde el modelo Alumno
            const newAlumno = await Alumno.agregar({
                input: {
                    id_usuario: usuario_id,
                    codigo_alumno: codigo_alumno,
                    carrera: carrera,
                    ciclo: ciclo,
                    created_at: new Date(),
                    update_at: new Date()
                }
            });

            await conn.commit();
            res.status(201).json({ message: 'Alumno creado correctamente', alumno: newAlumno });

        } catch (error) {
            await conn.rollback();
            console.error('Error al agregar el alumno:', error);
            res.status(500).json({ error: error.message });
        }
    }


    static async edit(req, res) {
        if (!req.body) {
            return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
        }
        const result = validateAlumno(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }
        try {
            const { id } = req.params;
            const updateAlumno = await Alumno.editar({ id, input: result.data })
            res.status(200).json(updateAlumno);
        } catch (error) {
            console.error('Error al editar el alumno:', error);
            res.status(500).send('Error al editar el alumno');
        }
    }

    static async delete(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ error: 'ID es requerido' });
            }
            const deleteAlumno = await Alumno.eliminar({ id })
            res.status(200).json(deleteAlumno);
        } catch (error) {
            console.error('Error al eliminar el alumno:', error);
            res.status(500).send('Error al eliminar el alumno');
        }

    }
}

module.exports = alumnoController;