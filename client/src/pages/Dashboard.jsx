import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSide from '../components/DashSide'
import DashProfile from '../components/DashProfile'

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
      <div className="">
        {/* profile */}
        {tab === 'profile' && <DashProfile />}
      </div>
    </div>
  )
}

export default Dashboard