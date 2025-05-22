const Facultad = require('../models/database/facultadDB');
const Asistencia = require('../models/database/asistenciasDB')

class asistenciasController{

    static async getCursos(req, res){
        try {
            const { id_facultad, id_especialidad } = req.query;
            const cursos = await Asistencia.todosCursos(id_facultad, id_especialidad);
            if (!cursos.length) {
                return res.status(404).json({ mensaje: 'No se encontraron cursos' }); // ← return aquí es importante
            }
            res.status(200).json({ cursos });
        } catch (error) {
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
}

module.exports = asistenciasController;