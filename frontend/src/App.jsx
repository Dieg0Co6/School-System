import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { TransitionProvider } from './Components/context/TransitionMagnager';
import SignsInUP from './Components/login/SignsInUP';
import DashComp from './Components/dashboard/DashComp';
import AlumnoCrud from './Components/alumno/AlumnoCrud';
import DocenteCrud from './Components/docente/DocenteCrud';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import './App.css';


function App() {
  return (
    <Router>
      <TransitionProvider>
        <Routes>
          <Route path='/' element={<SignsInUP />} />
          <Route path='/inicio' element={<ProtectedRoute element={DashComp} />} />
          <Route path='/estudiantes' element={<ProtectedRoute element={AlumnoCrud} />}></Route>
          <Route path='/estudiantes/:id' element={<ProtectedRoute element={AlumnoCrud} />}></Route>
          <Route path='/docentes' element={<ProtectedRoute element={DocenteCrud} />}></Route>
        </Routes>
      </TransitionProvider>
    </Router>
  );
}

export default App;
