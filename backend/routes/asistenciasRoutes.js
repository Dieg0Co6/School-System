const {Router} = require('express');
const asistenciasController = require('../controllers/asistenciasController');
const AsistenciaRouter = Router();

AsistenciaRouter.get('/cursos', asistenciasController.getCursos);

AsistenciaRouter.get('/facultades', asistenciasController.getFacultad);

AsistenciaRouter.get('/especialidades', asistenciasController.getEspecialidad);

AsistenciaRouter.get('/filtro/facultad-especialidad', asistenciasController.FilterFacultadEspecialidad);

module.exports = AsistenciaRouter