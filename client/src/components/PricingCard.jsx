import React from 'react';
import { IoShieldCheckmark } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { updateSuccess } from '../redux/user/userSlice'
import { useDispatch } from 'react-redux'

function PricingCardContent() {
    const { theme } = useSelector((state) => state.theme);
    const {currentUser,error, loading } = useSelector(state => state.user)
    const dispatch = useDispatch()

  return (
        <div>
        <div className={`bg-gradient-to-b ${theme === 'light' ? 'bg-gradient-to-b from-pink-100 to-purple-200' : ''}`}>
        <div className="grid p-6 place-items-center">
        </div>
        <div className="container m-auto pb-20 px-6 md:px-12 lg:px-20">
        <div className="m-auto text-center lg:w-8/12 xl:w-7/12">
        <h2 className="text-2xl text-pink-900 font-bold md:text-4xl"> Our Plan For Your Strategie </h2>
        <h1 className='text-3xl font-bold lg:text-xl italic uppercase sm:text-xs'>Postify Monthly Plan</h1>
        </div>
        <div className="mt-12 m-auto -space-y-4 items-center justify-center md:flex md:space-y-0 md:-space-x-4 xl:w-10/12">
        <div className="relative z-10 -mx-4 group md:w-6/12 md:mx-0 lg:w-5/12">
        <div aria-hidden="true" className="absolute top-0 w-full h-full rounded-2xl bg-white shadow-xl transition duration-500 group-hover:scale-105 lg:group-hover:scale-110"></div>
        <div className="relative p-6 space-y-6 lg:p-8">
            <h3 className="text-3xl text-gray-700 font-semibold text-center"><span> Postify Pass </span> </h3>
            <div>
                <div className="relative flex justify-around">
                    <div className="flex items-end">
                        <span className="text-8xl text-gray-800 font-bold leading-0">10</span>
                        <div className="pb-2">
                            <span className="block text-2xl text-gray-700 font-bold">$</span>
                            <span className="block text-xl text-purple-500 font-bold">Per Month</span>
                        </div>
                    </div>
                </div>
            </div>
            <ul role="list" className="w-full space-y-4 py-6 m-auto text-gray-600">
                <li className="space-x-2 flex items-center">
                    <span className="text-purple-500 font-semibold"> <IoShieldCheckmark className=' text-xl'/> </span>
                    <span>Unlimited posting capabilities to share your content. </span>
                </li>
                <li className="space-x-2 flex items-center">
                    <span className="text-purple-500 font-semibold"><IoShieldCheckmark className=' text-xl'/></span>
                    <span>Share essential information and keep your audience updated.</span>
                </li>
                <li className="space-x-2 flex items-center">
                    <span className="text-purple-500 font-semibold"><IoShieldCheckmark className=' text-xl'/>   </span>
                    <span>Become a valued member of Postify and connect with over <span className=' text-red-600 font-semibold'> 1500+ subscribers. </span></span>
                </li>
            </ul>
            <p className="flex items-center justify-center space-x-4 text-lg text-gray-600 text-center">
            </p>
            <div className="flex justify-center mt-8">
            <PayPalScriptProvider options={{ "client-id": "AZ37ofl88r4UNgKbFRD5YVtmPj93xAV05hUhvbsH7U40kbYtagc7rxAlQzp-_7ZqilGLTZnvCbCWW3X4", vault: true }}>
                <PayPalButtons                             
                    createSubscription={(data, actions) => {
                        return actions.subscription.create({
                            plan_id: 'P-1HC23219MS0661154MZ3RK6A',
                        });
                    }}
                    onApprove={ async (data, actions) => {
                        const res = await fetch(`/api/user/update/${currentUser._id}`, {
                            method: 'PUT',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({isSub: true}),
                        });                        
                        if (res.ok) {
                          dispatch(updateSuccess({...currentUser, isSub: true}));
                        }

                    }}
                />
            </PayPalScriptProvider>

            </div>
        </div>
        </div>

        <div className="relative group md:w-6/12 lg:w-7/12">
        <div aria-hidden="true" className="absolute top-0 w-full h-full rounded-2xl bg-white shadow-lg transition duration-500 group-hover:scale-105"></div>
        <div className="relative p-6 pt-16 md:p-8 md:pl-12 md:rounded-r-2xl lg:pl-20 lg:p-16">
        <ul role="list" className="space-y-4 py-6 text-gray-600">
        <li className="space-x-2 flex items-center">
            <span className="text-purple-500 font-semibold"><IoCheckmarkDoneSharp /></span>
            <span>Exclusive premium content released first.</span>
        </li>
        <li className="space-x-2 flex items-center">
            <span className="text-purple-500 font-semibold"><IoCheckmarkDoneSharp /></span>
            <span>Weekly access to new features and updates.</span>
        </li>
        <li className="space-x-2 flex items-center">
            <span className="text-purple-500 font-semibold"><IoCheckmarkDoneSharp /></span>
            <span>Contribute to impactful projects with every subscription.</span>
        </li>
        <li className="space-x-2 flex items-center">
            <span className="text-purple-500 font-semibold"><IoCheckmarkDoneSharp /></span>
            <span>Unlock access to all premium components on a weekly basis.</span>
        </li>
        </ul>
            <div className="mt-6 flex items-center justify-center">
                <img className="w-20 lg:w-72 " src="https://help.zazzle.com/hc/article_attachments/360010513393" loading="lazy" alt="microsoft" />
            </div>
                </div>
            </div>
        </div>
        </div>
        </div>
        </div>
  )
}

export default PricingCardContent;
