import { Link } from "react-router-dom";
import logo from "../assets/logo-transparent.svg";
import SocialIcons from "./SocialIcons";

const Footer = () => (
  <footer className="bg-[#0F2D52] text-white py-16">
    <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
      
      {/* Logo + tagline */}
      <div className="sm:col-span-2 lg:col-span-1">
        <img className="w-[50%] sm:w-[40%] lg:w-[60%] mb-5" alt="logo" src={logo} />
        <p className="text-white font-poppins text-sm leading-relaxed mb-8 max-w-xs">
          "Start your journey with confidence... Enjoy a comprehensive experience in Egypt."
        </p>
      </div>

      {/* Quick Links */}
      <div>
        <h4 className="font-[500] text-[18px] leading-[28px] text-[#2CACE3] mb-6">
          Quick Links
        </h4>
        <ul className="text-gray-400 text-xs space-y-4 uppercase tracking-tighter">
          {[
            { label: "About Us", to: "/" },
            { label: "Why Us", to: "/why-us" },
            { label: "VIP Elite", to: "/vip" },
            { label: "Contact Us", to: "/contact" },
          ].map(({ label, to }) => (
            <li key={to}>
              <Link className="leading-[28px] font-heading font-[400] text-[#D1DAE6] hover:text-white transition" to={to}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Our Services */}
      <div>
        <h4 className="font-[500] text-[18px] leading-[28px] text-[#2CACE3] mb-6">
          Our Services
        </h4>
        <ul className="text-gray-400 text-xs space-y-4 uppercase tracking-tighter">
          {[
            { label: "Inbound Tourism", to: "/services/699cb7c2a53d60b68bac2932" },
            { label: "Hotel Bookings", to: "/services/699cb7c2a53d60b68bac2933" },
            { label: "Limousine Service", to: "/services/699cb7c2a53d60b68bac2934" },
            { label: "B2B Management", to: "/services/699cb7c2a53d60b68bac2935" },
          ].map(({ label, to }) => (
            <li key={to}>
              <Link className="leading-[28px] font-heading font-[400] text-[#D1DAE6] hover:text-white transition" to={to}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Social */}
      <div>
        <h4 className="font-[500] text-[18px] leading-[28px] text-[#2CACE3] mb-6">
          Social Connect
        </h4>
        <SocialIcons variant="blue" />
      </div>
    </div>

    {/* Bottom bar */}
    <div className="container mx-auto px-6 mt-16 pt-8 border-t border-white/10 text-[10px] text-gray-500 uppercase tracking-widest flex flex-col sm:flex-row gap-4 sm:gap-0 justify-between items-center">
      <span className="font-heading tracking-[15%] leading-[28px] text-[#D1DAE6] text-center sm:text-left">
        © 2026 NEWIBER Travel. All rights reserved.
      </span>
      <div className="flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
        <Link className="leading-[28px] font-heading font-[400] uppercase text-[#D1DAE6] hover:text-white transition" to="/faq">
          FAQs
        </Link>
        <Link className="leading-[28px] font-heading font-[400] text-[#D1DAE6] hover:text-white transition" to="/privacy">
          Privacy Policy
        </Link>
        <Link className="leading-[28px] font-heading font-[400] text-[#D1DAE6] hover:text-white transition" to="/terms">
          Terms of Services
        </Link>
      </div>
    </div>
  </footer>
);

export default Footer;
