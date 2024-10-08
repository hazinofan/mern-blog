import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSide from '../components/DashSide'
import DashProfile from '../components/DashProfile'
import DashPosts from '../components/DashPosts'
import DashUsers from '../components/DashUsers'
import DashComments from '../components/DashComments'
import DashboardComponent from '../components/DashboardComponent'
import DashSubscriber from '../components/DashSubscriber'
import DashSubPosts from '../components/DashSubPosts'
import DashSubComments from '../components/DashSubComments'

function Dashboard() {
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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className='ms:w-56'>
        {/* sidebar */}
        <DashSide />
      </div>
      <div className="w-full">
        {/* profile */}
        {tab === 'profile' && <DashProfile />}
        {/* Posts */}
        {tab === 'posts' && <DashPosts />}
        {/* Users */}
        {tab === 'users' && <DashUsers />}
        {/* Comments */}
        {tab === 'comments' && <DashComments />}
        {/* Dashboard comp */}
        {tab === 'dash' && <DashboardComponent />}
        {/* Dashboard comp subscriber */}
        {tab === 'dashsub' && <DashSubscriber />}
        {/* Dashboard subscriber Posts*/}
        {tab === 'subposts' && <DashSubPosts />}
        {/* Dashboard subscriber Comments */}
        {tab === 'subcomments' && <DashSubComments />}
      </div>
    </div>
  )
}

export default Dashboard