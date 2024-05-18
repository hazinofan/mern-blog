import { Button } from 'flowbite-react';
import React, { useState } from 'react';
import { IoShieldCheckmark } from "react-icons/io5";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { Switch } from '@headlessui/react';
import PricingCardContent  from './PricingCard';
import PricingCardYear from './PricingCardYear';

function Pricing() {
    const [enabled, setEnabled] = useState(false);

    return (
            <div className='w-full bg-gradient-to-b from-pink-100 to-purple-200'>
                <div className=' text-center pt-14'>
                <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? 'bg-teal-900' : 'bg-teal-700'} relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                    <span className="sr-only">Use setting</span>
                    <span
                        aria-hidden="true"
                        className={`${enabled ? 'translate-x-9' : 'translate-x-0'} pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
                </div>

                {enabled ? (
                    <PricingCardYear />
            ) : (
                <PricingCardContent  />
            )}
        </div>
    );
}

export default Pricing;
