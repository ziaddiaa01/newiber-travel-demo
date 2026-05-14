import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import DynamicHeader from '../components/DynamicHeader';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white font-sans selection:bg-[#29abe2]/30">
      <DynamicHeader />

      {/* --- MAIN 404 CONTENT --- */}
      <main className="flex-grow flex items-center justify-center py-20 px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl w-full"
        >
          {/* Large 404 with Custom Icon */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <span className="text-[120px] md:text-[180px] font-body text-[#1a1a1a] leading-none">4</span>
            
            {/* Custom SVG for the Slash/Earth Icon in the design */}
            {/* Custom SVG for the Reversed Slash/Earth Icon */}
<div className="w-24 h-24 md:w-40 md:h-40 text-[#2b5a9e]">
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* The Outer Globe Circle */}
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="6" />
    
    {/* Earth Details (Longitude/Latitude lines) */}
    <ellipse cx="50" cy="50" rx="20" ry="45" stroke="currentColor" strokeWidth="3" opacity="0.6" />
    <path d="M5 50 H95" stroke="currentColor" strokeWidth="3" opacity="0.6" />
    <path d="M15 25 Q50 15 85 25" stroke="currentColor" strokeWidth="3" opacity="0.4" fill="none" />
    <path d="M15 75 Q50 85 85 75" stroke="currentColor" strokeWidth="3" opacity="0.4" fill="none" />
    
    {/* The Reversed Slash (Bottom-Left to Top-Right) */}
    <motion.path 
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      d="M20 80 L80 20" 
      stroke="currentColor" 
      strokeWidth="10" 
      strokeLinecap="round" 
    />
  </svg>
</div>

            <span className="text-[120px] md:text-[180px]   font-body text-[#1a1a1a] leading-none">4</span>
          </div>

          {/* Error Message */}
          <div className="space-y-4 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] uppercase tracking-wide">
              OOPS!! <span className="mx-4 font-light text-gray-400">-</span> <span className='font-light'>Something Went Wrong</span>
            </h2>
            <p className="text-gray-600 text-lg">
              We will work on this problem
            </p>
          </div>

          {/* Button */}
          <Link to="/">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#29abe2] text-white px-12 py-4 rounded-md font-bold uppercase tracking-[0.2em] text-sm shadow-lg hover:bg-[#228cb8] transition-colors"
            >
              Back to Homepage
            </motion.button>
          </Link>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;