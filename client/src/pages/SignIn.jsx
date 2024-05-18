import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Oauth from '../components/Oauth'
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
import logoLight from '../image/logo.png'
import logoDark from '../image/logo2.png'

function SignIn() {
  const{loading, error: errorMessage} = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { theme } = useSelector((state) => state.theme)
  const[formData, setFormData] = useState({})
  const navigate = useNavigate() ;
  function handleChange(e) {
    setFormData({...formData,[e.target.id]: e.target.value.trim() })
  }
  
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.email ||!formData.password ) {
      return dispatch(signInFailure('Please Fill all the Fields'))
      
    }
    try {
      dispatch(signInStart())
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false ) {
        dispatch(signInFailure(data.message))
      }
      if(res.ok) {
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }



  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-10">
        <div className="flex-1 text-center sm:text-left">
        <Link className='self-center whitespace-nowrap 
        text-sm:text-xl font-semibold dark:text-white '>
            <img className=" w-80 mb-10" src={theme === 'dark' ? logoDark : logoLight} alt="logo" />
        </Link>
          <p className='text-sm mt-5 font-semibold text-center'>
            Discover a rich blog platform.
            Subscribe to share insights. All voices welcome.
            Join us today!
          </p>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='mb-2'>
              <Label value='Email :' />
              <TextInput
                type='email'
                placeholder='example@gmail.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div className='mb-2'>
              <Label value='Your Password :' />
              <TextInput
                type='password'
                placeholder='***********'
                id='password'
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <Button gradientDuoTone='purpleToPink' type='submit'
              className='w-full text-center' outline disabled={loading}>
                {
                  loading ? ( 
                    <>
                    <Spinner size='sm'  />
                    <span className='pl-3'> Loading...</span> 
                    </> 
                    ) : 'Sign In'                   
                }
                </Button>
            </div>
                <Oauth />
          </form>
          <div className="flex gap-2 text-sm mt-5 font-semibold">
            Dont Have an account ?
            <Link to='/signup' className='text-blue-500'> Sign Up </Link>
          </div>
            {
              errorMessage && (
                <Alert className=' mt-2' color='failure'>
                {errorMessage}
                </Alert>
              )
            }
        </div>
      </div>
    </div>
  );
}

export default SignIn