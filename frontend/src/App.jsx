import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TransitionProvider } from './Components/context/TransitionMagnager';
import SignsInUP from './Components/login/SignsInUP';
import DashComp from './Components/dashboard/DashComp';
import AlumnoPage from './Pages/Alumno/AlumnoPage';
import DocentePage from './Pages/Docente/DocentePage';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import AsistenciaPage from './Pages/Asistencias/AsistenciasPage';
import './App.css';
import CursosAsignadosPage from './Pages/Cursos_asignados/CursosAsignadosPage';


function App() {
  return (
    <Router>
      <TransitionProvider>
        <Routes>
          <Route path='/' element={<SignsInUP />} />
          <Route path='/inicio' element={<ProtectedRoute element={<DashComp/>} allowedRoles={['ADMINISTRADOR','DOCENTE','ALUMNO']} />} />
          <Route path='/estudiantes' element={<ProtectedRoute element={<AlumnoPage/>} allowedRoles={['ADMINISTRADOR','DOCENTE']} />}/>
          <Route path='/cursosasignados' element={<ProtectedRoute element={<CursosAsignadosPage/>} allowedRoles={['DOCENTE']} />}/>
          {/* <Route path='/estudiantes/:id' element={<ProtectedRoute element={AlumnoCrud} />}></Route> */}
          <Route path='/docentes' element={<ProtectedRoute element={<DocentePage/>} />}/>
          <Route path='/asistencias' element={<ProtectedRoute element={<AsistenciaPage/>} allowedRoles={['ADMINISTRADOR', 'DOCENTE', 'ALUMNO']}/>}/>
        </Routes>
      </TransitionProvider>
    </Router>
  );
}

export default App;
