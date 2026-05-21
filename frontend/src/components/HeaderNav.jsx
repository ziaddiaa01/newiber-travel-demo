import { NavLink } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa6';

const HeaderNav = ({ variant }) => {
  // Logic for dynamic base colors based on your header type (Transparent vs White)
  const baseColor = variant === 'light' ? 'text-white' : 'text-[#474747]';
  const activeColor = 'text-[#1A98CF] ';

  // Helper function to keep the code clean
  const navLinkStyles = ({ isActive }) => 
    `transition-all duration-300 text-[16px]  hover:text-[#1A98CF] tracking-widest uppercase ${isActive ? activeColor : baseColor}`;

  return (
    <nav className="hidden md:flex gap-10 items-center">
      {/* 1. HOME */}
      <NavLink to="/" className={navLinkStyles} end>
        Home
      </NavLink>

      {/* 2. ABOUT (Wrapped in NavLink to handle active state for the whole group) */}
      <NavLink to="/about" className={navLinkStyles}>
        <div className="flex items-center gap-1 cursor-pointer">
          <span>About</span>
          <FaChevronDown className="text-[10px] mt-1" />
        </div>
      </NavLink>

      {/* 3. SERVICES */}
      <NavLink to="/services" className={navLinkStyles } >
        Services
      </NavLink>

      {/* 4. VIP */}
      <NavLink to="/vip" className={navLinkStyles}>
        VIP
      </NavLink>
    </nav>
  );
};

export default HeaderNav;
