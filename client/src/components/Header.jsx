import React, { useEffect, useState } from 'react';
import { FaSignOutAlt } from "react-icons/fa";
import { Avatar, Button, Dropdown, DropdownDivider, Navbar, TextInput } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa6";
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
import { signoutSuccess } from '../redux/user/userSlice';
import { HiChartPie } from "react-icons/hi";
import { HiUser } from 'react-icons/hi';
import { FaCrown } from "react-icons/fa";
import logoLight from '../image/logo.png';
import logoDark from '../image/logo2.png';
import { MdPeopleAlt } from "react-icons/md";
import Subscribe from "../image/subscribe.png"


function Header() {
    const path = useLocation().pathname;
    const location = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { theme } = useSelector((state) => state.theme);
    const { currentUser } = useSelector(state => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [showWelcomePopup, setShowWelcomePopup] = useState(false); // State for showing welcome popup

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    function handleSubmit(e) {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }

    const handleSignOut = async () => {
        try {
            const res = await fetch('api/user/signout', {
                method: 'POST',
            });
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message);
            } else {
                dispatch(signoutSuccess());
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handlePostifySpaceClick = () => {
        // Show welcome popup
        setShowWelcomePopup(true);

        // Redirect after delay (optional)
        setTimeout(() => {
            navigate('/search'); // Replace with your actual link destination
        }, 2000); // Adjust delay as needed
    };

    return (
        <Navbar className='border-b-2'>
            <Link to='/' className='self-center whitespace-nowrap text-sm:text-xl font-semibold dark:text-white'>
                <img className="w-40" src={theme === 'dark' ? logoDark : logoLight} alt="logo" />
            </Link>
            <form onSubmit={handleSubmit}>
                <TextInput
                    className='hidden lg:inline'
                    type='text'
                    placeholder='Search...'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    rightIcon={AiOutlineSearch}
                />
            </form>
            <Button className='w-12 h-10 lg:hidden' color='gray' pill>
                <AiOutlineSearch />
            </Button>
            <div className='flex gap-2 md:order-2' style={{ alignItems: "center" }}>
                {!((currentUser?.isSub || currentUser?.isAdmin)) &&
                    <Link to='/pricing'>
                        <Button gradientDuoTone='purpleToPink' outline>
                            <div className="flex gap-2 items-center">
                                <FaCrown className=" text-xl text-yellow-300" />
                                <p className=" mt-1 font-semibold"> Become a Postify Blogger </p>
                            </div>
                        </Button>
                    </Link>
                }
                {
                    currentUser?.isSub &&
                    <div className="flex items-center gap-2 mt-2 mr-6">
                        <MdPeopleAlt className=" text-red-400 text-lg" />
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
                                <Dropdown.Item className='font-semibold'> <HiChartPie className=' mr-3' /> Dashboard </Dropdown.Item>
                            </Link>
                        )}
                        {currentUser.isSub && (
                            <Link to={'/dashboard?tab=dashsub'}>
                                <Dropdown.Item className='font-semibold'> <HiChartPie className=' mr-3' /> Super Space </Dropdown.Item>
                            </Link>
                        )}
                        <DropdownDivider />
                        <Link to={'/dashboard?tab=profile'}>
                            <Dropdown.Item className='font-semibold'> <HiUser className=' mr-3' /> Profile </Dropdown.Item>
                        </Link>
                        <DropdownDivider />
                        <Dropdown.Item className='font-semibold' onClick={handleSignOut}> <FaSignOutAlt className=' mr-3' /> Sign Out </Dropdown.Item>
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
                    {theme === 'light' ? <FaRegSun /> : <FaMoon />}
                </Button>
            </div>
            <Navbar.Collapse>
                <Navbar.Link active={path === '/'} as={'div'}>
                    <Link to='/'>
                        Home
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/Projects'} as={'div'}>
                    <Link to='/search' onClick={handlePostifySpaceClick}>
                        Postify Space
                    </Link>
                </Navbar.Link>
                <Navbar.Link active={path === '/About'} as={'div'}>
                    <Link to='/About'>
                        About
                    </Link>
                </Navbar.Link>
            </Navbar.Collapse>
            
            {showWelcomePopup && !currentUser?.isSub && !currentUser?.isAdmin && (
                <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg text-center max-w-md">
                        <img src={Subscribe} alt="Postify Blog Image" className="mx-auto mb-4" />
                        <h2 className="text-xl font-semibold mb-4">Subscribe now and join a community of over 1.2k subscribers to begin sharing content about your business or any topic that interests you</h2>
                        <Button onClick={() => setShowWelcomePopup(false)} gradientDuoTone='purpleToBlue' color='red' outline>Close</Button>
                    </div>
                </div>
            )}
        </Navbar>
    );
}

export default Header;
