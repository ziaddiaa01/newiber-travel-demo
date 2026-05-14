import React from 'react';
import { NavLink } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import SocialIcons from './SocialIcons';
import logo from '../assets/logo-solid.svg'

const HeaderSolid = ({ isVisible, isFixed }) => {
  return (
    <header className={`${isFixed ? 'fixed' : 'relative'} top-0 left-0 w-full z-50 bg-white shadow-md transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className='pt-5 pr-4 w-fit ml-auto mr-[10%]'>                  <SocialIcons variant="blue" />
</div>
      <div className="container mx-auto px-6 py-4 ">

       
        
        <div className="flex  md:flex-row items-center justify-between">
           {/* Use the logo with "Travel The World" from image_1.png */}
        
            <NavLink to="/">
            <img src={logo} alt="NEWIBER" className="h-14 w-auto object-contain" />
          </NavLink>
                    <HeaderNav variant={"solid"}/>

          {/* Use the blue social icons from image_1.png */}
          <NavLink to="/booking" className="px-8 py-3 text-white  border-[0.5px] rounded-[8px] bg-[#0184c7] text-[16px] uppercase tracking-widest hover:bg-[#016da5] transition">
            Book Now
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default HeaderSolid;