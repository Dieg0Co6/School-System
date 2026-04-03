const {Router} = require('express');
const matriculaController = require('../controllers/matriculaController');
const MatriculaRouter = Router();

//ROUTE PARA CREAR UNA MATRICULA
MatriculaRouter.post('/', matriculaController.create);

//Rpoute para obtener cursos por alumno
MatriculaRouter.get('/:id_alumno', matriculaController.getCursosByAlumno);

module.exports = MatriculaRouter;