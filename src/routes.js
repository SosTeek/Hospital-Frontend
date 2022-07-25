import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Hospital from './pages/Hospital';
import Lab from './pages/Lab';
import BloodBank from './pages/BloodBank';

const Router = () => {
  return (
    // <div>Routes</div>
    <BrowserRouter> 
        <Routes>
            <Route path="/" exact element={<Login />} />  
            <Route path="/register" exact element={<Register />} />  
            <Route path="/dashboard" exact element={<Dashboard />} />  
            <Route path="/hospital" exact element={<Hospital />} />  
            <Route path="/lab" exact element={<Lab />} />  
            <Route path="/bloodbank" exact element={<BloodBank />} />  
            {/* <Route path='/dashboard' component={Dashboard} /> */}

        </Routes>
    </BrowserRouter>
  )
}

export default Router