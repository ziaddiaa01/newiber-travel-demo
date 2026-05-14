import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import SocialIcons from './SocialIcons';
import logo from '../assets/logo-transparent.svg'


const HeaderTransparent = ({ isHidden }) => {
  return (
    <header className={`absolute top-0 left-0 w-full z-50 transition-opacity duration-300 ${isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className='pt-5 pr-4 w-fit ml-auto mr-[10%]'>                  <SocialIcons variant="light" />
</div>
      <div className="container mx-auto px-6 py-6">
        
       
        
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
             <NavLink to="/">
            <img src={logo} alt="NEWIBER" className="h-14 w-auto object-contain" />
          </NavLink>
          <HeaderNav variant={"light"}/>
          {/* Use the light-color social icons from image_2.png */}
          <NavLink to="/booking" className="px-8 py-3.5 border-2 border-white text-white text-[16px] rounded-[8px] uppercase tracking-widest hover:bg-[#1c1c1c] hover:text-white transition">
            Book Now
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default HeaderTransparent;