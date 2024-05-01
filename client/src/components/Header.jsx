import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from 'flowbite-react'
import {Link, useLocation} from 'react-router-dom'
import React from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';




function Header() {
    const path = useLocation().pathname;
    const dispatch = useDispatch() ;
    const { theme } = useSelector((state) => state.theme)
    const {currentUser} = useSelector(state => state.user)
    const handleSignOut = async () => {
        try {
          const res = await fetch('api/user/signout', {
            method: 'POST',
          });
          const data = await res.json();
          if(!res.ok) {
            console.log(data.message)
          }else {
            dispatch(signoutSuccess())
          }
        } catch (error) {
          console.log(error.message)
        }
    }
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
            <Button     
                className="w-12 h-10 hidden sm:inline" 
                color='red' 
                pill 
                onClick={() => dispatch(toggleTheme())}
            >
                {theme === 'light' ? <FaRegSun /> :<FaMoon /> }
                
            </Button>
            {currentUser ? (
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                        alt='user'
                        img={currentUser.ProfilPicture}
                        rounded
                        />
                    }>
                    <Dropdown.Header>
                        <span className='block text-sm'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item className='font-semibold'> Profile </Dropdown.Item>
                    </Link>
                    <DropdownDivider />
                    <Dropdown.Item  className='font-semibold' onClick={handleSignOut}> Sign Out </Dropdown.Item>
                </Dropdown>
            ) : 
            (
                <Link to='SignIn'>
                <Button gradientDuoTone='purpleToBlue' color='red' outline>
                    Sign In 
                </Button>
            </Link>
            )}
            
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