const express = require('express');
const app = express();
const config = require('./controllers/config')
const middlewareCors = require('./middleware/cors')
const AlumnoRouter = require('./routes/alumnosRoutes')
const DocenteRouter = require('./routes/docentesRoutes')
const AsistenciaRouter = require('./routes/asistenciasRoutes')
const cookieParser = require('cookie-parser')
const userController = require('./controllers/usuariosController')
const authMiddleware = require('./middleware/cookies');
const UserRouter = require('./routes/usersRoutes');

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//Configuración del servidor

app.set('port', config.app.port);
app.disable('x-powered-by');
const port = app.get('port');
app.use(middlewareCors());

//Escuchar en el servidor
app.listen(port, ()=>{
    console.log(`Escuchando servidor desde puerto: http://localhost:${port}`);
})

//Ruta de Logeo de usuario
app.post('/login',userController.login)

//Ruta de Registro de usuario
app.post('/register', userController.create)

//Ruta de deslogeo de usuario
app.post('/logout', userController.logout)

//Ruta de protegido de usuario
app.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ message: "Ruta protegida accedida", user: req.user });
});
//Configuración de las Rutas Alumnos con el servidor
app.use('/alumnos', AlumnoRouter)

//Configuración de las Rutas Docentes con el servidor
app.use('/docentes', DocenteRouter)

//Configuración de las Rutas Usuarios con el servidor
app.use('/usuarios', UserRouter)

//Configuración de las Rutas Asistencias con el servidor
app.use('/asistencias', AsistenciaRouter)
