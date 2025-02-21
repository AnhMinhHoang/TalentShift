import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Index from './pages/index'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <div className="App">
      <Navbar />
      <Index />
      <Footer />
    </div>
  )
}

export default App
