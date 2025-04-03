const Alumno = require('../models/database/alumnosDB');
const validateAlumno = require('../schemas/alumnoSchema');


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

        const result = validateAlumno(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        try {
            const newAlumno = await Alumno.agregar({ input: result.data });
            res.status(201).json(newAlumno);
        } catch (error) {
            console.error('Error al agregar el alumno:', error);
            res.status(500).send('Error al agregar el alumno');
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
            const deleteAlumno = await Alumno.eliminar({id})
            res.status(200).json(deleteAlumno);
        } catch (error) {
            console.error('Error al eliminar el alumno:', error);
            res.status(500).send('Error al eliminar el alumno');
        }

    }
}

module.exports = alumnoController;