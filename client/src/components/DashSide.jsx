import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'

function DashSide() {
    const location = useLocation()
    const dispatch = useDispatch()
    const [tab, setTab]  = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFormUrl = urlParams.get('tab')
        if(tabFormUrl){
        setTab(tabFormUrl) ;
        }
    }), [location.search]

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
    <Sidebar className='w-full md:w-56'>
        <Sidebar.ItemGroup>
            <Sidebar.Item href='/Dashboard?tab=profile' className='mb-3' active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark'>
                Profile 
            </Sidebar.Item>
            <Sidebar.Item className=' cursor-pointer' icon={HiArrowSmRight} onClick={handleSignOut} >
                Sign Out 
            </Sidebar.Item>
        </Sidebar.ItemGroup>
    </Sidebar>
  )
}

export default DashSide