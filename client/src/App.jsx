import React from 'react'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Header from './components/Header'
import Footer from './components/Footer'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/Projects' element={<Projects />}/>
        <Route element={<PrivateRoute />}>
        <Route path='/Dashboard' element={<Dashboard />}/>
        </Route>
        <Route path='/SignIn' element={<SignIn />}/>
        <Route path='/SignUp' element={<SignUp />}/>
      </Routes>   
      <Footer />
    </BrowserRouter>
  )
}

export default App