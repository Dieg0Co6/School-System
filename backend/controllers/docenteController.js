const Docente = require('../models/database/docentesDB');
const validateDocente = require('../schemas/docenteSchema');

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
            res.status(200).json(docente[0]);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async create(req, res) {
        if (!req.body) {
            return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
        }

        const result = validateDocente(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        try {
            const newDocente = await Docente.agregar({ input: result.data });
            res.status(201).json(newDocente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async edit(req, res) {
        if (!req.body) {
            return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
        }

        const result = validateDocente(req.body);
        if (!result.success) {
            return res.status(400).json({ error: result.error.format() });
        }

        try {
            const { dni } = req.params;
            const updatedDocente = await Docente.editar({ dni, input: result.data });
            res.status(200).json(updatedDocente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    static async delete(req, res) {
        try {
            const { dni } = req.params;
            await Docente.eliminar({ dni });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = DocenteController;
