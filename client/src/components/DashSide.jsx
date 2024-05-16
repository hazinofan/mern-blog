import { HiChartPie } from "react-icons/hi";
import { Sidebar } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { HiArrowSmRight, HiUser } from 'react-icons/hi'
import { Link, useLocation } from 'react-router-dom'
import { signoutSuccess } from '../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { HiDocumentText } from "react-icons/hi";
import { HiOutlineUserGroup } from "react-icons/hi";
import { LiaCommentSolid } from "react-icons/lia";
 
function DashSide() {
    const location = useLocation()
    const dispatch = useDispatch()
    const { currentUser } = useSelector(state => state.user)
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
        <Sidebar.ItemGroup className='flex flex-col'>
            {currentUser && currentUser.isAdmin && (
            <Link to='/dashboard?tab=dash' className='mb-3'>
                <Sidebar.Item
                    href='/Dashboard?tab=dash'
                    icon={HiChartPie}
                    active={tab === 'dash' || !tab}
                    labelColor='dark'
                >
                    Dasboard
                </Sidebar.Item>
            </Link>
            )}
            <Sidebar.Item 
            href='/Dashboard?tab=profile' 
            className='mb-3' 
            active={tab === 'profile'} 
            icon={HiUser} 
            label={currentUser.isAdmin ? 'Admin' : 'User'} 
            labelColor='dark'
            >
                Profile 
            </Sidebar.Item>

            {currentUser.isAdmin && (
              <Sidebar.Item 
              href='/Dashboard?tab=posts' 
              className='mb-3' 
              active={tab === 'posts'} 
              icon={HiDocumentText}
              >
                   Posts
              </Sidebar.Item>
            ) }

            {currentUser.isAdmin && (
              <>
              <Sidebar.Item 
              href='/Dashboard?tab=users' 
              className='mb-3' 
              active={tab === 'users'} 
              icon={HiOutlineUserGroup}
              > 
                   Users
              </Sidebar.Item>
              <Sidebar.Item 
              href='/Dashboard?tab=comments' 
              className='mb-3' 
              active={tab === 'Comments'} 
              icon={LiaCommentSolid}
              > 
                   Comments
              </Sidebar.Item>
              </>
            ) }

            <Sidebar.Item 
            className=' cursor-pointer' 
            icon={HiArrowSmRight} 
            onClick={handleSignOut} 
            >
                Sign Out 
            </Sidebar.Item>

        </Sidebar.ItemGroup>
    </Sidebar>
  )
}

export default DashSide