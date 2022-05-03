import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import logo from './logo.svg'
import './App.css'
import "leaflet/dist/leaflet.css";

import Maps from './pages/Maps'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element ={<Maps/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App