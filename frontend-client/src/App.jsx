import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignsInUP from './Components/login/SignsInUP';
import DashComp from './Components/dashboard/DashComp';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignsInUP/>} />
        <Route path='/dashboard' element={<ProtectedRoute element={DashComp}/>}/>
      </Routes>
    </Router>
  );
}

export default App;
