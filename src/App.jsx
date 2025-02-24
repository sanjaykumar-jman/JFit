import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import WaterTracker from './components/WaterTrackerComponent/WaterTracker';
import Bmi from './components/BmiComponent/Bmi';
import Sleep from './components/SleepComponent/Sleep';

function App() {
  

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<WaterTracker/>}/>
        <Route path="/bmi" element={<Bmi/>} />
        <Route path='/sleep' element={<Sleep/>} />
      </Routes>
    </Router>
      

    </>
  )
}

export default App
