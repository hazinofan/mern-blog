import { Button, Navbar, TextInput } from 'flowbite-react'
import {Link, useLocation} from 'react-router-dom'
import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";


function Header() {
    const path = useLocation().pathname;
  return (
    <Navbar className='border-b-2'>
        <Link to='/' className='self-center whitespace-nowrap 
        text-sm:text-xl font-semibold dark:text-white '>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500
             via-purple-500 to-red-800 rounded-lg text-white'> Hazinofan-Info</span>
            <span className='text-sm'>Blog</span> 
        </Link>
        <form > 
            <TextInput 
            className='hidden lg:inline'
            type='text'
            placeholder='Search...'
            rightIcon={AiOutlineSearch }/>
        </form>
        <Button className='w-12 h-10 lg:hidden' color='gray' pill>
            <AiOutlineSearch />
        </Button>
        <div className='flex gap-2 md:order-2'>
            <Button className="w-12 h-10 hidden sm:inline" color='red' pill>
                <FaMoon />
            </Button>
            <Link to='SignIn'>
                <Button gradientDuoTone='purpleToBlue' color='red' >
                    Sign In 
                </Button>
            </Link>
            <Navbar.Toggle /> 
        </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/About'} as={'div'}>
                    <Link to='/About'>
                        About
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/Projects'} as={'div'}>
                    <Link to='/Projects'>
                        Projects
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
    </Navbar>
  )
}

export default Header