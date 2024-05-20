import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"


function SubscribersPrivateRoute() {
    const { currentUser } = useSelector((state) => state.user)
  return (currentUser && currentUser?.isSub) ? <Outlet /> : <Navigate to='/errorNavPage' />
}

export default SubscribersPrivateRoute