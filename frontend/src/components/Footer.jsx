import { Link } from "react-router-dom";
import logo from "../assets/logo-transparent.svg";
import SocialIcons from "./SocialIcons";
const Footer = () => (
  <footer className="bg-[#0F2D52] text-white py-20">
    <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <img className="w-[60%] mb-5" alt="logo" src={logo}></img>
        <p className="text-white font-poppins w-[90%] text-sm leading-relaxed mb-8">
          "Start your journey with confidence... Enjoy a comprehensive
          experience in Egypt."{" "}
        </p>
      </div>
      <div>
        <h4 className="font-[500] text-[20px] leading-[28px]  text-[#2CACE3]  mb-6">
          Quick Links
        </h4>
        <ul className="text-gray-400 text-xs space-y-4 uppercase tracking-tighter">
          <li>
            <Link
              className=" leading-[28px] font-heading font-[400] text-[#D1DAE6]"
              to="/"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              className=" leading-[28px] font-heading font-[400] text-[#D1DAE6]"
              to="/why-us"
            >
              Why Us
            </Link>
          </li>
          <li>
            <Link
              className=" leading-[28px] font-heading font-[400] text-[#D1DAE6]"
              to="/vip"
            >
              VIP Elite
            </Link>
          </li>
          <li>
            <Link
              className=" leading-[28px] font-heading font-[400] text-[#D1DAE6]"
              to="/contact"
            >
              Contact Us{" "}
            </Link>
          </li>
        </ul>
      </div>
      <div>
        <h4 className="font-[500] text-[20px] leading-[28px]  text-[#2CACE3]  mb-6">
          Our Services
        </h4>
        <ul className="text-gray-400 text-xs space-y-4 uppercase tracking-tighter">
          <li>
            <Link
              className=" leading-[28px] font-heading font-[400] text-[#D1DAE6]"
              to="/services/699cb7c2a53d60b68bac2932"
            >
              Inbound tourism
            </Link>
          </li>
          <li>
            <Link
              className=" leading-[28px] font-heading font-[400] text-[#D1DAE6]"
              to="/services/699cb7c2a53d60b68bac2933"
            >
              Hotel Bookings
            </Link>
          </li>
          <li>
            <Link
              className=" leading-[28px] font-heading font-[400] text-[#D1DAE6]"
              to="/services/699cb7c2a53d60b68bac2934"
            >
              Limousine Service
            </Link>
          </li>
          <li>
            <Link
              className=" leading-[28px] font-heading font-[400] text-[#D1DAE6]"
              to="/services/699cb7c2a53d60b68bac2935"
            >
              B2B Mnanagement
            </Link>
          </li>
        </ul>
      </div>

      <div>
        <h4 className="font-[500] text-[20px] leading-[28px]  text-[#2CACE3]  mb-6">
          Social Connect
        </h4>
        <SocialIcons variant={"blue"} />
      </div>
    </div>
    <div className="container mx-auto px-6 mt-20 pt-8 border-t border-white/10 text-[10px] text-gray-500 uppercase tracking-widest flex justify-between">
      <span className="font-heading tracking-[15%] leading-[28px] text-[#D1DAE6]">
        © 2026 NEWIBER Travel. All rights reserved.
      </span>
      <div className="w-[30%]">
        <div className="flex w-100 justify-between ">
              <Link
              className=" leading-[28px] font-heading font-[400] uppercase text-[#D1DAE6]"
              to="/faq"
            >
              FAQS
            </Link>
                <Link
              className=" leading-[28px] font-heading font-[400] text-[#D1DAE6]"
              to="/privacy"
            >
              Privacy Policy
            </Link>
                <Link
              className=" leading-[28px] font-heading font-[400] text-[#D1DAE6]"
              to="/terms"
            >
              Terms of Services
            </Link>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
