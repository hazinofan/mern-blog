import React from 'react'
import {Route, Routes, BrowserRouter} from "react-router-dom"
import Home from './pages/Home'
import About from './pages/About'
import Dashboard from './pages/Dashboard'
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
import ScrollToTop from './components/ScrollToTop'
import Pricing from './components/Pricing'
import Search from './pages/Search'
import PrivacyPolicy from './pages/PrivacyPolicy'

function App() {
  return (
    <BrowserRouter>
    <ScrollToTop />
    <Header />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
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
        <Route path='/search' element={<Search />}/>
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/privacypolicy' element={<PrivacyPolicy />}/>
        <Route path='/post/:postSlug' element={<PostPage />}/>
        <Route path='/errorNavPage' element={<ErrorNavPage />}/>
        <Route path='/pricing' element={<Pricing />}/>
      </Routes>   
      <Footer />
    </BrowserRouter>
  )
}

export default App