const {Router} = require('express');
const CursosAsignadosController = require("./../controllers/cursosAsignadosController");
const CursosAsignadosRouter = Router();

//ROUTE PARA TODOS LOS CURSOS ASIGNADOS AL DOCENTE DE ACUERDO AL CICLO ACADEMICO
CursosAsignadosRouter.get('/:ciclo_academico/:id_docente', CursosAsignadosController.getAll);

module.exports = CursosAsignadosRouter;