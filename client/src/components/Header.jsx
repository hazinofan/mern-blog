import { FaSignOutAlt } from "react-icons/fa";
import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from 'flowbite-react'
import {Link, useLocation} from 'react-router-dom'
import React, { useState } from 'react'
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux'
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { HiChartPie } from "react-icons/hi";
import { HiUser } from 'react-icons/hi'
import { FaCrown } from "react-icons/fa";
import logoLight from '../image/logo.png'
import logoDark from '../image/logo2.png'
import { MdPeopleAlt } from "react-icons/md";

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
            <img className="w-40" src={theme === 'dark' ? logoDark : logoLight} alt="logo" />
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
        <div className='flex gap-2 md:order-2' style={{alignItems: "center"}}>
        {   !((currentUser?.isSub || currentUser?.isAdmin)) &&
        <Link to='/pricing'>
            <Button gradientDuoTone='purpleToPink' outline> <div className="flex gap-2 items-center">
                <FaCrown className=" text-xl text-yellow-300"/> 
                <p className=" mt-1 font-semibold"> Become a Postify Blogger </p> 
                </div> 
            </Button>
        </Link>
        }
        {
            currentUser?.isSub && 
            <div className="flex items-center gap-2 mt-2 mr-6">
                <MdPeopleAlt className=" text-red-400 text-lg"/>
                <p className=" font-semibold text-red-400 text-sm underline"> POSTIFY MEMBER </p> 
            </div>
        }
            
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
                        <span className='block text-sm mb-2'>@{currentUser.username}</span>
                        <span className='block text-sm font-medium truncate'>@{currentUser.email}</span>
                    </Dropdown.Header>
                    {currentUser.isAdmin && (
                    <Link to={'/dashboard?tab=dash'}>
                        <Dropdown.Item className='font-semibold'> <HiChartPie className=' mr-3'/> Dashboard </Dropdown.Item>
                    </Link>
                    )}
                    {currentUser.isSub && (
                    <Link to={'/dashboard?tab=dashsub'}>
                        <Dropdown.Item className='font-semibold'> <HiChartPie className=' mr-3'/> Super Space </Dropdown.Item>
                    </Link>
                    )}
                    <DropdownDivider />
                    <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item className='font-semibold'> <HiUser className=' mr-3'/> Profile </Dropdown.Item>
                    </Link>
                    <DropdownDivider />
                    <Dropdown.Item  className='font-semibold' onClick={handleSignOut}> <FaSignOutAlt className=' mr-3' /> Sign Out </Dropdown.Item>
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
            <Button     
                className="mt-1 w-12 h-10 hidden sm:inline" 
                color='red' 
                pill 
                onClick={() => dispatch(toggleTheme())}
            >
                {theme === 'light' ? <FaRegSun /> :<FaMoon /> }
                
            </Button>
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