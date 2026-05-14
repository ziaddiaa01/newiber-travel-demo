import React from 'react';
import DynamicHeader from '../components/DynamicHeader';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

// You will need to add this image to your assets folder
import pyramids from '../assets/pyramids.png'

const Terms = () => {
  const sections = [
    {
      id: "01",
      title: "INTRODUCTION",
      content: "These terms and conditions outline the rules and regulations for the use of Newiber Travel's Website."
    },
    {
      id: "02",
      title: "BOOKING CONDITIONS",
      content: "All bookings are subject to availability. A deposit is required to secure your reservation."
    },
    {
      id: "03",
      title: "PRIVACY",
      content: "We are committed to protecting your privacy. We use the information we collect about you to process orders and to provide a more personalized experience."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 flex flex-col selection:bg-[#29abe2]/30">
      <DynamicHeader />

      {/* --- MAIN CONTENT --- */}
      <main className="flex-grow pt-32">
        <div className="w-[80%] mx-auto px-6 md:px-8">
          
          {/* Header Area */}
          <div className="mb-8">
            <span className="text-[#29abe2] text-[10px] font-bold tracking-[0.2em] uppercase block mb-4">
              Terms & Conditions
            </span>
            <h1 className="text-5xl md:text-6xl font-bold leading-tight uppercase tracking-tight">
              <span className="block text-black">Know</span>
              <span className="block text-[#1a365d]">Your Rights</span>
            </h1>
            <p className="text-gray-500 text-xs mt-6 font-medium">
              Last updated: 2/9/2026
            </p>
          </div>

          {/* Divider line */}
          <hr className="border-t border-gray-300 w-full mb-10" />

          {/* Agreement Intro */}
          <p className="font-extrabold text-[#1a1a1a] text-2xl  mb-16">Welcome to Newiber Travel. By accessing our website, you agree to these terms.          </p>

          {/* Terms List */}
          <div className="space-y-12 mb-28">
            {sections.map((section) => (
              <div key={section.id}>
                {/* Large Number */}
                <div className="text-[80px] font-light text-[#e2e8f0] leading-none mb-1">
                  {section.id}
                </div>
                {/* Section Title */}
                <h3 className="text-lg font-bold text-[#1a1a1a] uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                {/* Section Content */}
                <p className="text-gray-500 text-[19px] leading-relaxed w-full">
                  {section.content}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* --- BOTTOM IMAGE BANNER --- */}
         {/* --- CALL TO ACTION SECTION --- */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={pyramids} 
            alt="Experience Egypt" 
            className="w-full h-full object-cover grayscale"
          />
        </div>
        <div className="relative z-20 text-center px-6">
          <h2 className="text-3xl md:text-5xl font-poppins font-[400] italic text-white mb-8">
            Ready to experience the difference?
          </h2>
          <Link 
            to="/contact" 
            className="inline-block px-12 py-4 border border-white text-white text-xs font-medium uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-300 rounded-[8px]"
          >
            Start Planning
          </Link>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;