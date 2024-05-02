import { useSelector } from 'react-redux'
import React, { useState } from 'react'
import { TextInput, Button, Alert, Modal } from 'flowbite-react'
import {updateFailure,signoutSuccess, updateStart, updateSuccess, deleteUserStart, deleteUserSuccess,deleteUserFailure} from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {Link} from 'react-router-dom'

function DashProfile() {
  const {currentUser,error, loading } = useSelector(state => state.user)
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch()
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
  const [updateUserError, setUpdateUserError] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleDeleteUser = async () => {
    setShowModal(false);
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(deleteUserFailure(data.message));
      } else {
        dispatch(deleteUserSuccess(data));
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(formData).length === 0) {
      setUpdateUserError('No changes made')
      return;
    }
    try {
      dispatch(updateStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message)
      } else {
        setUpdateUserSuccess("User's Profile Updated Successfully")
        dispatch(updateSuccess(data));
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
    }
  };

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
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>  Profile</h1>
      {
        currentUser.isAdmin && (
          <span className='flex m-auto font-semibold justify-center mb-8 text-red-400'> Admin </span>
        )
      }
      <form onSubmit={handleSubmit} className=' flex flex-col gap-4' >
        <div className='w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full'>
        <img 
         src={currentUser.ProfilPicture}
         alt="user" 
         className='rounded-full w-full h-full object-cover border-8 border-[lightgray]'
         />
        </div>
        <TextInput type='text' id='username' placeholder='Username' defaultValue={currentUser.username} onChange={handleChange}/>
        <TextInput type='email' id='email' placeholder='Email' defaultValue={currentUser.email} onChange={handleChange}/>
        <TextInput type='password' id='password' placeholder='Password  ' onChange={handleChange}/>
        <Button type='Submit' gradientDuoTone='purpleToPink' outline>
          {loading ? 'Loading...' : 'Update'}
        </Button>
        {
        currentUser.isAdmin && (
          <Link to='/create-post'>
          <Button 
          type='button'
          gradientDuoTone='purpleToPink'
          className='w-full'
          disabled={loading}
          >
            Create Post
          </Button>
          </Link>
        )
      }
         <div className='text-red-500 flex justify-between mt-5'>
          <span className='cursor-pointer' onClick={() => setShowModal(true)}> Delete Account </span>
          <span className='cursor-pointer' onClick={handleSignOut}> Sign Out </span>
         </div>
         {updateUserSuccess && (
          <Alert color='success' className='mt-5'>
            {updateUserSuccess}
          </Alert>
         )}
         {updateUserError && (
          <Alert color='failure' className='mt-5'>
            {updateUserError}
          </Alert>
         )}
         {error && (
          <Alert color='failure' className='mt-5'>
            {error}
          </Alert>
         )}
         <Modal show={showModal} onClose={()=>setShowModal(false)} popup size='md'>
            <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:tex-gray-200 mb-4 mx-auto' />
                <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400"> Are you sure You want to delete Your Account </h3>
                <div className="flex justify-center gap-4">
                  <Button color='failure' onClick={handleDeleteUser}>Yes i'm sure </Button>
                  <Button color='gray' onClick={()=> setShowModal(false)}>Yes i'm sure </Button>
                </div>
                </div>
              </Modal.Body>   
         </Modal>
      </form>
    </div>
  )
}

export default DashProfile