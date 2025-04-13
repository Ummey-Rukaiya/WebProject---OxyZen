import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import EmailVerify from './pages/EmailVerify'
import ResetPassword from './pages/ResetPassword'
import Notes from "./pages/Notes";
import { ToastContainer } from 'react-toastify';
//new plantcatalog
import PlantCatalog from './components/PlantCatalog'
import PlantDetail from './components/PlantDetail'
import PlantLayout from './components/PlantLayout';
import PlantHeader from './components/PlantHeader';
import PlantDiseases from './components/PlantDiseases';
import PlantReminders from './components/PlantReminders';

import 'react-toastify/dist/ReactToastify.css';
//new plantDetail
//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/email-verify' element={<EmailVerify/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path="/notes" element={<Notes />} />
        
        {/*<Route element={<PlantLayout />}>
          <Route path='/plants' element={<PlantCatalog />} />
          <Route path='/plants/:id' element={<PlantDetail />} />
          <Route path='/diseases' element={<PlantDiseases />} />
        </Route>*/}

        <Route path='/plants' element={<PlantLayout />}>
          <Route index element={<PlantCatalog />} />
          <Route path=':id' element={<PlantDetail />} />
          <Route path='plant-disease' element={<PlantDiseases />} />
          {/*<Route path='/reminder' element={<Reminder />} />*/}
          

        </Route>
        <Route path='/reminder' element={<PlantReminders />} />

      </Routes>
    </div>
  )
}

export default App

