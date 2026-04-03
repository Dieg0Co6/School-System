const CursosAsignados = require("./../models/database/cursosasignadosDB")

class CursosAsignadosController{
    static async getAll(req, res) {
        try {
            const {ciclo_academico, id_docente } = req.params
            const cursos_asignados = await CursosAsignados.CursosxDocente(ciclo_academico, id_docente);
            res.json(cursos_asignados);
        } catch (error) {
            console.error('Error al obtener cursos asignados al docente:', error);
            res.status(500).send('Error al obtener cursos asignados al docente');
        }
    }
}

module.exports = CursosAsignadosController;