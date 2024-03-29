import { useState } from 'react'
import '@fontsource/roboto';
import '@fontsource/roboto/100.css';
import '@fontsource/source-sans-pro';

import Navbar from './layouts/navbar'
import Footer from './layouts/footer'

import Home from './home/home'
import About from './home/about'
import Projects from './home/projects'
import Contact from './home/contact'

import './App.css'

function App() {
  const [theme, setTheme] = useState("light")
  return (
    <>
      <Navbar/>
      <Home/>
      <About/>
      <Projects/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default App
