const Docente = require('../models/database/docentesDB');
const Usuario = require('../models/database/usuariosDB');
const Facultad = require('../models/database/facultadDB');
const { validateUsuario, validateUsuarioUpdate } = require('../schemas/usuarioSchema');
const validateDocente = require('../schemas/docenteSchema');
const bcrypt = require('bcrypt');
const SALT_ROUNDS = 10;
const conexion = require('../models/database/mysql');

class DocenteController {
    static async getAll(req, res) {
        try {
            const docentes = await Docente.todos();
            res.status(200).json(docentes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getById(req, res) {
        try {
            const { dni } = req.params;
            const docente = await Docente.uno(dni);
            if (docente.length === 0) {
                return res.status(404).json({ error: 'Docente no encontrado' });
            }
            res.status(200).json(docente);
        } catch (error) {
            res.status(500).json({ error: error.message });
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

        const result2 = validateDocente(req.body);
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
                fecha_nacimiento,
                password,
                dni
            } = result.data;

            const {
                codigo_docente,
                facultad,
                especialidad
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
                    fecha_nacimiento: fecha_nacimiento,
                    email: email,
                    password: hashedPassword,
                    dni: dni
                }
            });
            const usuario_id = nuevoUsuario.insertId;

            // Asignar rol docente
            await conn.query(
                'INSERT INTO rol_usuarios (id_rol, id_usuario) VALUES (?, ?);',
                [1, usuario_id]
            );

            const newDocente = await Docente.agregar({
                input: {
                    id_usuario: usuario_id,
                    codigo_docente: codigo_docente,
                    facultad: facultad,
                    especialidad: especialidad,
                    created_at: new Date(),
                    updated_at: new Date(),
                }
            });
            await conn.commit();
            res.status(201).json({ message: 'Docente creado correctamente', docente: newDocente });
        } catch (error) {
            await conn.rollback();
            console.error('Error al agregar el docente:', error);
            res.status(500).json({ error: error.message });
        }
    }

    static async getFacultad(req, res) {
        try {
            const facultades = await Facultad.todos();
            res.status(200).json({ facultades });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getEspecialidad(req, res) {
        try {
            const especialidades = await Facultad.todosEpecialidades();
            res.status(200).json({ especialidades });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async FilterFacultadEspecialidad(req, res) {
        try {
            const { id_facultad, id_especialidad } = req.query;

            // Si envía id_facultad, traer especialidades de esa facultad
            if (id_facultad) {
                const especialidades = await Facultad.filtrarXFacultad(id_facultad);
                return res.status(200).json({ especialidades });
            }

            // Si envía id_especialidad, traer la facultad correspondiente
            if (id_especialidad) {
                const facultad = await Facultad.filtrarXEspecialidad(id_especialidad);
                if (!facultad) {
                    return res.status(404).json({ error: 'Facultad no encontrada para esa especialidad' });
                }
                return res.status(200).json({ facultad });
            }

            return res.status(400).json({ error: 'Debe enviar id_facultad o id_especialidad' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async edit(req, res) {
        if (!req.body) {
            return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
        }

        // Extraer solo los campos para validación de Usuario
        const usuarioData = {
            nombre: req.body.nombre,
            apellido_paterno: req.body.apellido_paterno,
            apellido_materno: req.body.apellido_materno,
            fecha_nacimiento: req.body.fecha_nacimiento,
            email: req.body.email,
            dni: req.body.dni
        };

        // Extraer solo los campos para validación de Docente
        const docenteData = {
            codigo_docente: req.body.codigo_docente,
            facultad: req.body.facultad,
            especialidad: req.body.especialidad
        };


        const result = validateUsuarioUpdate(usuarioData);
        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        const result2 = validateDocente(docenteData);
        if (!result2.success) {
            return res.status(400).json({ error: result2.error.format() });
        }

        try {
            const { 
                nombre,
                apellido_paterno,
                apellido_materno,
                fecha_nacimiento,
                email,
                dni
            } = result.data;
    
            const {
                codigo_docente,
                facultad,
                especialidad
            } = result2.data;
    
            let usuarioInput = {
                nombre,
                apellido_paterno,
                apellido_materno,
                fecha_nacimiento,
                email,
                dni,
                updated_at: new Date()
            };

            const { id_usuario } = req.params;
            await Usuario.editar({
                id_usuario,
                input: usuarioInput
            });

            await Docente.editar({
                id_usuario,
                input: {
                    codigo_docente,
                    facultad,
                    especialidad,
                    updated_at: new Date()
                }
            });
            res.status(200).json({ message: 'Docente actualizado correctamente' });
        } catch (error) {
            console.error('Error al editar el docente:', error);
            res.status(500).send('Error al editar el docente');
        }
    }

    static async delete(req, res) {
        try {
            const { id_usuario} = req.params;
            if (!id_usuario) {
                return res.status(400).json({ error: 'ID es requerido' });
            }
            const deleteDocente = await Usuario.eliminar({ id_usuario });
            if (deleteDocente.affectedRows === 0) {
                return res.status(404).json({ error: 'Docente no encontrado' });
            }
            res.status(200).json(deleteDocente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = DocenteController;
