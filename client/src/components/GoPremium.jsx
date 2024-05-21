import React from 'react';
import { HiMiniSparkles } from "react-icons/hi2";
import { Link } from 'react-router-dom';

function GoPremium() {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <Link
      to='/pricing'
        type="button"
        className="inline-flex items-center rounded-full bg-black px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 motion-reduce:transition-none dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
      >
        <HiMiniSparkles className="mr-2 text-yellow-300 text-xl" />
        Upgrade to Premium
      </Link>
    </div>
  );
}

export default GoPremium;
