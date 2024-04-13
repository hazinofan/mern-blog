import { Button, Label, TextInput } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

function SignUp() {
  return (
    <div className='min-h-screen mt-20'>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
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
          <form>
            <div className='mb-6'>
              <Label value='Your Username :' />
              <TextInput
                type='text'
                placeholder='John Doe'
                id='username'
              />
            </div>
            <div className='mb-6'>
              <Label value='Email :' />
              <TextInput
                type='email'
                placeholder='example@gmail.com'
                id='email'
              />
            </div>
            <div className='mb-6'>
              <Label value='Your Password :' />
              <TextInput
                type='text'
                placeholder='Your Password'
                id='password'
              />
            </div>
            <div className="flex justify-center">
              <Button gradientDuoTone='purpleToPink' type='submit' className='w-full text-center' outline>Sign Up</Button>
            </div>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            Have an account ?
            <Link to='/signIn' className='text-blue-500'> Sign In </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
