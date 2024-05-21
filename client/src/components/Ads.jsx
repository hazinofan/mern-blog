import group from '../image/group.png';
import please from '../image/please.png';
import params from '../image/param.png';
import { FaLongArrowAltRight } from "react-icons/fa";
import { Button } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Ads() {
    const { currentUser } = useSelector(state => state.user);
    return (
        <>
            <div className="w-full md:w-1/4 border-l md:min-h-screen border-gray-500 dark:border-gray-600 p-4">
                <h2 className="font-semibold mb-4 text-center">Advertisements</h2>

                {!currentUser?.isSub && (
                    <div className="ad-space mb-4 p-4 dark:bg-[#10172a] flex flex-col items-center justify-center border-b-2 border-gray-400">
                        <img
                            className='w-56 mb-4'
                            src={group}
                            alt="post Ad"
                        />
                        <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg text-center md:text-sm">
                            Join Us Today and Start Posting, and be Part of the Postify Family
                        </p>
                        <Link to="/pricing">
                            <Button outline gradientDuoTone='purpleToPink' className='mt-5'>
                                Join Us
                            </Button>
                        </Link>
                    </div>
                )}

                <div className="mt-24 ad-space mb-4 p-4 dark:bg-[#10172a] flex flex-col items-center justify-center border-b-2 border-gray-400">
                    <img
                        className='w-56 mb-4'
                        src={please}
                        alt="post Ad"
                    />
                    <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg text-center md:text-sm mb-5">
                        Exciting offers are on the horizon! Stay tuned for our upcoming specials
                    </p>
                </div>

                <div className="mt-24 ad-space mb-4 p-4 dark:bg-[#10172a] flex flex-col items-center justify-center border-b-2 border-gray-400">
                    <img
                        className='w-56  mb-4'
                        src={params}
                        alt="post Ad"
                    />
                    <p className="text-gray-700 dark:text-gray-300 font-semibold text-lg text-center md:text-sm">
                        Start surfing and Reading Posts 
                    </p>
                    <Link to="/">
                        <button
                            className='text-teal-500 text-lg hover:underline p-7 w-full flex items-center gap-2'
                        >
                            Take Me There <FaLongArrowAltRight />
                        </button>
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Ads;
