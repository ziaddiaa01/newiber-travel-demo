import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { motion } from 'framer-motion';
import DynamicHeader from '../components/DynamicHeader';
import Footer from '../components/Footer';

// Font Awesome Imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhoneAlt } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

// Asset Imports
import contactBg from '../assets/contact.jpg'; 

const Contact = () => {
  // Catch the shared global layout context arrays from App.jsx outlet matrix
const [, setForcedOpenState] = useOutletContext();
  
  const fadeUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#29abe2]/30">
      <DynamicHeader />

      {/* --- HERO & FORM SECTION --- */}
      <section className="relative min-h-[90vh] flex items-center justify-center py-20 px-4">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={contactBg} 
            alt="Contact Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        {/* Contact Form Card */}
        <motion.div 
          {...fadeUp}
          className="relative z-10 w-full max-w-4xl opacity-[0.87] bg-white/95 backdrop-blur-md p-8 md:p-12 shadow-2xl rounded-sm"
        >
          <div className="text-left mb-10">
            <h1 className="text-3xl md:text-5xl font-bold text-black mb-4">Contact Us Now!</h1>
            <p className="font-bold text-[#6B7280] leading-relaxed max-w-2xl">
              For further assistance, to share your experiences, or to commence planning your subsequent adventure, our team is always at your service, ready to curate another extraordinary chapter in your travel diary. Reach out to us for your future journeys, and let’s continue to explore the world with elegance and style.
            </p>
          </div>

          <form className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[#6B7280] uppercase tracking-wider text-xs font-semibold">First Name *</label>
                <input type="text" placeholder="First name" className="w-full border border-gray-300 p-3 rounded-md focus:border-[#29abe2] outline-none transition-colors text-sm bg-transparent text-black" required />
              </div>
              <div className="space-y-1">
                <label className="text-[#6B7280] uppercase tracking-wider text-xs font-semibold">Last Name *</label>
                <input type="text" placeholder="Last name" className="w-full border border-gray-300 p-3 rounded-md focus:border-[#29abe2] outline-none transition-colors text-sm bg-transparent text-black" required />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[#6B7280] uppercase tracking-wider text-xs font-semibold">E-mail *</label>
              <input type="email" placeholder="E-mail" className="w-full border border-gray-300 p-3 rounded-md focus:border-[#29abe2] outline-none transition-colors text-sm bg-transparent text-black" required />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="text-[#6B7280] uppercase tracking-wider text-xs font-semibold">Mobile Number (Optional)</label>
                <input type="tel" placeholder="+20 155 123 4568" className="w-full border rounded-md border-gray-300 p-3 focus:border-[#29abe2] outline-none transition-colors text-sm bg-transparent text-black" />
              </div>
              <div className="space-y-1">
                <label className="text-[#6B7280] uppercase tracking-wider text-xs font-semibold">Inquiry Type</label>
                <select className="w-full border border-gray-300 p-3 focus:border-[#29abe2] rounded-md outline-none bg-transparent transition-colors text-sm text-gray-500">
                  <option>Custom Itinerary</option>
                  <option>VIP Travel</option>
                  <option>Partnership</option>
                  <option>Corporate Services</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[#6B7280] uppercase tracking-wider text-xs font-semibold">Your Message *</label>
              <textarea rows="4" placeholder="Leave us a message..." className="w-full border rounded-md border-gray-300 p-4 focus:border-[#29abe2] outline-none transition-colors text-sm resize-none bg-transparent text-black" required></textarea>
            </div>

            <button type="submit" className="w-full bg-[#29abe2] text-white font-bold py-4 uppercase rounded-md tracking-[0.2em] text-xs hover:bg-[#228cb8] transition-all shadow-lg">
              Send Message
            </button>
          </form>
        </motion.div>
      </section>

      {/* --- CONTACT INFORMATION SECTION --- */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-16">Contact Information</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            {/* Office */}
            <div className="flex gap-6 items-start">
              <div className="bg-gray-50 w-12 h-12 flex items-center justify-center rounded-lg border border-gray-100 shadow-sm text-[#29abe2]">
                <FontAwesomeIcon icon={faMapMarkerAlt} size="lg" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-black">Our Office</h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  6 AHMED TAYSEER, GOLF,<br />
                  NASR CITY<br />
                  CAIRO, EGYPT
                </p>
              </div>
            </div>

            {/* Call Us */}
            <div className="flex gap-6 items-start">
              <div className="bg-gray-50 w-12 h-12 flex items-center justify-center rounded-lg border border-gray-100 shadow-sm text-[#29abe2]">
                <FontAwesomeIcon icon={faPhoneAlt} size="lg" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-black">Call Us</h4>
                <p className="text-gray-500 text-sm">
                  +202 2414 5000<br />
                  +2011 5134 3431
                </p>
              </div>
            </div>

            {/* Live Interactive WhatsApp Widget Trigger */}
            <div className="flex gap-6 items-start">
              <div className="bg-gray-50 w-12 h-12 flex items-center justify-center rounded-lg border border-gray-100 shadow-sm text-[#25D366]">
                <FontAwesomeIcon icon={faWhatsapp} size="xl" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-2 text-black">WhatsApp</h4>
                <button 
                  onClick={() => setForcedOpenState(true)}
                  className="text-[#29abe2] font-semibold text-sm hover:underline uppercase tracking-wider text-left bg-transparent border-none p-0 cursor-pointer"
                >
                  Chat with us directly
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Note: ChatWidget invocation was completely cleanly shifted to root layout wrap inside App.jsx */}
      <Footer />
    </div>
  );
};

export default Contact;
