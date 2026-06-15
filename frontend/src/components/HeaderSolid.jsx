import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import SocialIcons from './SocialIcons';
import logo from 'https://ymvejvzrljpnnwfautji.supabase.co/storage/v1/object/public/NEWIBER/logo-solid.svg';

const HeaderSolid = ({ isVisible, isFixed }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`${isFixed ? 'fixed' : 'relative'} top-0 left-0 w-full z-50 bg-white shadow-md transition-transform duration-300 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
      
      {/* Top social bar — hidden on mobile */}
      <div className="hidden md:block pt-5 pr-4 w-fit ml-auto mr-[10%]">
        <SocialIcons variant="blue" />
      </div>

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <NavLink to="/">
            <img src={logo} alt="NEWIBER" className="h-10 md:h-14 w-auto object-contain" />
          </NavLink>

          {/* Nav — hidden on mobile */}
          <div className="hidden md:block">
            <HeaderNav variant="solid" />
          </div>

          {/* Book Now — hidden on mobile */}
          <NavLink
            to="/booking"
            className="hidden md:inline-block px-8 py-3 text-white border-[0.5px] rounded-[8px] bg-[#0184c7] text-[16px] uppercase tracking-widest hover:bg-[#016da5] transition"
          >
            Book Now
          </NavLink>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-[#0F2D52] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#0F2D52] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-[#0F2D52] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-100 flex flex-col items-center gap-4">
            <HeaderNav variant="solid" />
            <NavLink
              to="/booking"
              className="w-full text-center px-8 py-3 text-white rounded-[8px] bg-[#0184c7] text-[14px] uppercase tracking-widest hover:bg-[#016da5] transition"
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </NavLink>
            <SocialIcons variant="blue" />
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderSolid;
