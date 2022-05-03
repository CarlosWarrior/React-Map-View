import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'

import logo from './logo.svg'
import './App.css'
import "leaflet/dist/leaflet.css";

import Maps from './pages/Maps'
import { DataProvider } from './contexts/Data'

const App = () => {
  return (
    <BrowserRouter>
      <DataProvider>
        <Routes>
          <Route exact path="/" element ={<Maps/>}/>
        </Routes>
      </DataProvider>
    </BrowserRouter>
  )
}

export default App