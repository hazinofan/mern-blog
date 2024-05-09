import { Button } from 'flowbite-react'
import React from 'react'

function callToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <img
    className="h-96 w-full rounded-t-lg object-cover md:h-auto md:w-48 md:!rounded-none md:!rounded-s-lg"
    src="https://img.freepik.com/free-vector/organic-flat-join-us-concept_23-2148948357.jpg"
    alt="" />
  <div className="flex flex-col justify-start p-6">
    <h5 className="mb-2 text-xl font-medium">Card title</h5>
    <p className="mb-4 text-base">
      This is a wider card with supporting text below as a natural lead-in
      to additional content. This content is a little bit longer.
    </p>
    <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
        <a href="#" target='_blank' rel='noopener noreferrer'>
            START NOW
        </a>
    </Button>
  </div>
    </div>
  )
}

export default callToAction