const {Router} = require('express')
const UserRouter = Router()
const userController = require('../controllers/usuariosController')


//ROUTE PARA TODOS LOS USUARIOS
UserRouter.get('/', userController.getAll)

//ROUTE PARA CREAR UN USUARIO
UserRouter.post('/', userController.create)

module.exports = UserRouter;
