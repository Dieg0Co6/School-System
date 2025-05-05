const {Router} = require('express');
const alumnoController = require('../controllers/alumnoController');
const AlumnoRouter = Router()


//ROUTE PARA LAS ESPECIALIDADES
AlumnoRouter.get('/especialidades', alumnoController.getEspecialidad)

//ROUTE PARA TODOS LOS ALUMNOS
AlumnoRouter.get('/', alumnoController.getAll)

//ROUTE PARA UN ALUMNO
AlumnoRouter.get('/:dni', alumnoController.getById)

//ROUTE PARA CREAR UN ALUMNO
AlumnoRouter.post('/', alumnoController.create)

//ROUTE PARA EDITAR UN ALUMNO
AlumnoRouter.patch('/:id_usuario', alumnoController.edit)

//ROUTE PARA ELIMINAR UN ALUMNO
AlumnoRouter.delete('/:id_usuario', alumnoController.delete)

module.exports = AlumnoRouter;