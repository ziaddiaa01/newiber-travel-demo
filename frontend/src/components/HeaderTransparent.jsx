import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import HeaderNav from './HeaderNav';
import SocialIcons from './SocialIcons';
import logo from '../assets/logo-transparent.svg';

const HeaderTransparent = ({ isHidden }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={`absolute top-0 left-0 w-full z-50 transition-opacity duration-300 ${isHidden ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      
      {/* Top social bar — hidden on mobile */}
      <div className="hidden md:block pt-5 pr-4 w-fit ml-auto mr-[10%]">
        <SocialIcons variant="light" />
      </div>

      <div className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <NavLink to="/">
            <img src={logo} alt="NEWIBER" className="h-10 md:h-14 w-auto object-contain" />
          </NavLink>

          {/* Nav — hidden on mobile */}
          <div className="hidden md:block">
            <HeaderNav variant="light" />
          </div>

          {/* Book Now — hidden on mobile */}
          <NavLink
            to="/booking"
            className="hidden md:inline-block px-8 py-3.5 border-2 border-white text-white text-[16px] rounded-[8px] uppercase tracking-widest hover:bg-[#1c1c1c] hover:text-white transition"
          >
            Book Now
          </NavLink>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20 flex flex-col items-center gap-4">
            <HeaderNav variant="light" />
            <NavLink
              to="/booking"
              className="w-full text-center px-8 py-3 border-2 border-white text-white text-[14px] rounded-[8px] uppercase tracking-widest hover:bg-white/10 transition"
              onClick={() => setMenuOpen(false)}
            >
              Book Now
            </NavLink>
            <SocialIcons variant="light" />
          </div>
        )}
      </div>
    </header>
  );
};

export default HeaderTransparent;
