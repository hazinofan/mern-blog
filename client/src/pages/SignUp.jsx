import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Oauth from '../components/Oauth';
import logoLight from '../image/logo.png';
import logoDark from '../image/logo2.png';
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

function SignUp() {
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate();

  function handleChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Please Fill Out All The Fields');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate('/signin');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen mt-20'>
      <Helmet>
        <title>Sign Up | POSTIFY</title>
        <meta name="description" content="Join POSTIFY today! Create an account to start discovering and sharing rich blog content. All voices welcome." />
        <meta name="keywords" content="blog, sign up, register, POSTIFY, blogging, articles, community" />
      </Helmet>
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-8">
        <div className="flex-1 text-center sm:text-left">
          <Link className='self-center whitespace-nowrap text-sm:text-xl font-semibold dark:text-white'>
            <img className="w-80 mb-10" src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg" alt="logo" />
          </Link>
          <p className='text-sm mt-5 font-semibold text-center'>
            Discover a rich blog platform.
            Subscribe to share insights. All voices welcome.
            Join us today!
          </p>
        </div>

        <div className="flex flex-col flex-1 gap-4">
          <Link className='self-center whitespace-nowrap text-sm:text-xl font-semibold dark:text-white'>
            <img className="w-80 mb-10" src={theme === 'dark' ? logoDark : logoLight} alt="logo" />
          </Link>
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
                      <Spinner size='sm' />
                      <span className='pl-3'> Loading...</span>
                    </>
                  ) : 'Sign UP'
                }
              </Button>
            </div>
            <Oauth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            Have an account?
            <Link to='/signIn' className='text-blue-500'> Sign In </Link>
          </div>
          {
            errorMessage && (
              <Alert className='mt-2' color='failure'>
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
