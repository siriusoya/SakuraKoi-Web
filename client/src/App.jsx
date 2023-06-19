import { useState } from 'react'
import Footer from "./components/Footer"
import Navbar from './components/Navbar'
import { Outlet } from "react-router-dom"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Navbar />
    <Outlet />
    <Footer />
    </>
  )
}

export default App
