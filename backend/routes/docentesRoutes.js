const {Router} = require('express');
const docenteController = require('../controllers/docenteController');
const DocenteRouter = Router();

DocenteRouter.get('/facultades', docenteController.getFacultad);

DocenteRouter.get('/especialidades', docenteController.getEspecialidad);

DocenteRouter.get('/filtro/facultad-especialidad', docenteController.FilterFacultadEspecialidad);

DocenteRouter.get('/', docenteController.getAll); 

DocenteRouter.get('/:dni', docenteController.getById); 

DocenteRouter.post('/', docenteController.create); 

DocenteRouter.patch('/:id_usuario', docenteController.edit); 

DocenteRouter.delete('/:id_usuario', docenteController.delete);

module.exports = DocenteRouter;