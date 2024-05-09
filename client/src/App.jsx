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
import AdminPrivateRoute from './components/AdminPrivateRoute'
import CreatePost from './pages/CreatePost'
import ErrorNavPage from './pages/ErrorNavPage'
import UpdatePost from './pages/UpdatePost'
import PostPage from './pages/PostPage'

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
        <Route element={<AdminPrivateRoute />}>
        <Route path='/create-post' element={<CreatePost />}/>
        </Route>
        <Route element={<AdminPrivateRoute />}>
        <Route path='/update-post/:postId' element={<UpdatePost />}/>
        </Route>
        <Route path='/SignIn' element={<SignIn />}/>
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/post/:postSlug' element={<PostPage />}/>
        <Route path='/errorNavPage' element={<ErrorNavPage />}/>
      </Routes>   
      <Footer />
    </BrowserRouter>
  )
}

export default App