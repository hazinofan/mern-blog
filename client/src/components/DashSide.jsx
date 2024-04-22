import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'

function DashSide() {
    const location = useLocation()
    const [tab, setTab]  = useState('')
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFormUrl = urlParams.get('tab')
        if(tabFormUrl){
        setTab(tabFormUrl) ;
        }
    }), [location.search]
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.ItemGroup>
            <Link to='/Dashboard?tab=profile' >
            <Sidebar.Item className='mb-3' active={tab === 'profile'} icon={HiUser} label={"User"} labelColor='dark'>
                Profile 
            </Sidebar.Item>
            <Sidebar.Item className=' cursor-pointer' icon={HiArrowSmRight}>
                Sign Out 
            </Sidebar.Item>
            </Link>
        </Sidebar.ItemGroup>
    </Sidebar>
  )
}

export default DashSide