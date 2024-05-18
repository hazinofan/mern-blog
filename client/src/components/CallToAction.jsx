import { Button } from 'flowbite-react'
import React from 'react'
import joinus from '../image/joinus.jpg'
import { Link } from 'react-router-dom'

function callToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <img
        style={{ width: '320px' }}
        className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:!rounded-none md:!rounded-s-lg"
        src={joinus}
        alt="Join Us" />
        <div className="flex flex-col justify-start p-6 ml-11" style={{ width: '60%' }}>
            <h5 className="mb-2 text-xl font-medium">Become a Postify Member: Share Your Voice with the World!</h5>
            <p className="mb-4 text-base">
            Unlock your potential with our exclusive paid plan and become a valued Postify member! 
            By subscribing, you'll gain the ability to write and publish blogs on our platform, whether 
            you aim to share knowledge across various domains, promote your business, or discuss current events. 
            Join our community of writers and start spreading your message far and wide today!
            </p>
            <div className="flex justify-center items-center text-center h-full">
              <Link to='./Pricing'>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="" target='_blank' rel='noopener noreferrer'>
                    START NOW
                </a>
            </Button>
            </Link>
            </div>
          </div>
    </div>
  )
}

export default callToAction