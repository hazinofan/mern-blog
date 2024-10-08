import { Footer } from 'flowbite-react';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsGithub, BsDribbble } from 'react-icons/bs';
import logoLight from '../image/logo.png'
import logoDark from '../image/logo2.png'
import { useSelector } from 'react-redux';
import PrivacyPolicy from '../pages/PrivacyPolicy';
export default function FooterCom() {
  const { theme } = useSelector((state) => state.theme)
  return (
    <Footer container className='border border-t-8 border-teal-500'>
      <div className='w-full max-w-7xl mx-auto'>
        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>
          <div className='mt-5'>
          <Link to='/' className='self-center whitespace-nowrap 
        text-sm:text-xl font-semibold dark:text-white '>
            <img className="w-40" src={theme === 'dark' ? logoDark : logoLight} alt="logo" />
        </Link>
          </div>
          <div className='grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6'>
            <div>
              <Footer.Title title='About' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://www.100jsprojects.com'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  About Us
                </Footer.Link>
                <Footer.Link
                  href='/about'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Postify's Blog
                </Footer.Link>
              </Footer.LinkGroup>
            </div>
            {/* <div>
              <Footer.Title title='Follow us' />
              <Footer.LinkGroup col>
                <Footer.Link
                  href='https://github.com/hazinofan'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link href='#'>Instagram</Footer.Link>
              </Footer.LinkGroup>
            </div> */}
            <div>
              <Footer.Title title='Legal' />
              <Footer.LinkGroup col>
                <Link to='/privacypolicy' className=' hover:underline'>Privacy Policy</Link>
                {/* <Footer.Link href='#'>Terms &amp; Conditions</Footer.Link> */}
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className='w-full sm:flex sm:items-center sm:justify-between'>
          <Footer.Copyright
            href='#'
            by="POSTIFY's blog"
            year={new Date().getFullYear()}
          />
          {/* <div className="flex gap-6 sm:mt-0 mt-4 sm:justify-center">
            <Footer.Icon href='#' icon={BsFacebook}/>
            <Footer.Icon href='#' icon={BsInstagram}/>
            <Footer.Icon href='#' icon={BsTwitter}/>
            <Footer.Icon href='https://github.com/hazinofan' icon={BsGithub}/>

          </div> */}
        </div>
      </div>
    </Footer>
  );
}