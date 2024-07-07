import React from 'react';
import { HiMiniSparkles } from "react-icons/hi2";
import { Link } from 'react-router-dom';

function GoPremium() {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
      <div className="relative inline-flex group">
        <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
        <Link to='/pricing' className="relative h-10 inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900" role="button">
          <HiMiniSparkles className="mr-2 text-yellow-300 text-xl" />Get it now
        </Link>
      </div>
    </div>
  );
}

export default GoPremium;
