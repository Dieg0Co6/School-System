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


function App() {
  return (
    <Router>
      <TransitionProvider>
        <Routes>
          <Route path='/' element={<SignsInUP />} />
          <Route path='/inicio' element={<ProtectedRoute element={<DashComp/>} allowedRoles={['ADMINISTRADOR',2,3]} />} />
          <Route path='/estudiantes' element={<ProtectedRoute element={<AlumnoPage/>} allowedRoles={['ADMINISTRADOR',2,3]} />}/>
          {/* <Route path='/estudiantes/:id' element={<ProtectedRoute element={AlumnoCrud} />}></Route> */}
          <Route path='/docentes' element={<ProtectedRoute element={<DocentePage/>} />}/>
          <Route path='/asistencias' element={<ProtectedRoute element={<AsistenciaPage/>} allowedRoles={['ADMINISTRADOR', 'DOCENTE', 'ALUMNO']}/>}/>
        </Routes>
      </TransitionProvider>
    </Router>
  );
}

export default App;
