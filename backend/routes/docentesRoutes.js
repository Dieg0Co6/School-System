const {Router} = require('express');
const docenteController = require('../controllers/docenteController');
const DocenteRouter = Router();

DocenteRouter.get('/', docenteController.getAll); 

DocenteRouter.get('/:dni', docenteController.getById); 

DocenteRouter.post('/', docenteController.create); 

DocenteRouter.patch('/:dni', docenteController.edit); 

DocenteRouter.delete('/:dni', docenteController.delete);

module.exports = DocenteRouter;