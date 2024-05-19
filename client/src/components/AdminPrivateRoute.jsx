import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"


function AdminPrivateRoute() {
    const { currentUser } = useSelector((state) => state.user)
  return (currentUser && currentUser.isAdmin || currentUser?.isSub) ? <Outlet /> : <Navigate to='/errorNavPage' />
}

export default AdminPrivateRoute