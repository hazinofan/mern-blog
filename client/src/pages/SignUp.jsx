import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth'


function SignUp() {
  const [errorMessage, setErrorMessage ] = useState(null)
  const [loading, setLoading ] = useState(false)
  const[formData, setFormData] = useState({})
  const navigate = useNavigate() ;
  function handleChange(e) {
    setFormData({...formData,[e.target.id]: e.target.value.trim() })
  }
  
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(!formData.username || !formData.email ||!formData.password ) {
      return setErrorMessage('Please Fill Out All The Fields')
      
    }
    try {
      setLoading(true);
      setErrorMessage(null)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {'content-Type': 'application/json'},
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false ) {
        return setErrorMessage(data.message)
      }
      setLoading(false)
      if(res.ok) {
        navigate('/signin')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setLoading(false)
    }
  }



  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1 text-center sm:text-left">
          <Link to='/' className='font-bold dark:text-white text-3xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-red-800 rounded-lg text-white'>Hazinofan-Info</span>
            <span className='text-sm'>Blog</span>
          </Link>
          <p className='text-sm mt-5 font-semibold'>
            Discover a rich blog platform.
            Subscribe to share insights. All voices welcome.
            Join us today!
          </p>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div className='mb-2'>
              <Label value='Your Username :' />
              <TextInput
                type='text'
                placeholder='John Doe'
                id='username'
                onChange={handleChange}
              />
            </div>
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
                placeholder='Your Password'
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
                    ) : 'Sign UP'                   
                }
                </Button> <br />
                
            </div>
            <Oauth />
          </form> 
          <div className="flex gap-2 text-sm mt-5">
            Have an account ?
            <Link to='/signIn' className='text-blue-500'> Sign In </Link>
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

export default SignUp;
