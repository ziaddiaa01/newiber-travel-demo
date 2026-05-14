import React from 'react';
import DynamicHeader from '../components/DynamicHeader';
import Footer from '../components/Footer';
import about from '../assets/about.png'
const About = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <DynamicHeader />

      {/* --- HERO TITLE SECTION --- */}
      <section className="pt-12 pb-12 px-6 md:px-16 container mx-auto">
        <div className="max-w-7xl">
          <h1 className="text-6xl md:text-8xl font-poppins font-[400] tracking-[5%] uppercase  text-[#1c1c1c]">
            EGYPT
          </h1>
          <h2 className="text-5xl md:text-7xl font-display font-[400] text-[#474747] italic  my-4 md:mt-8 ml-1">
            Reimagined.
          </h2>
          <div className="w-full h-[1px] bg-black mt-12 mb-10" />
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <span className="text-[#2CACE3] font-bold tracking-widest text-xs uppercase">Est. 2016</span>
            <p className="max-w-xl text-[#474747] text-[18px] font-poppins leading-relaxed text-lg">
              We are not just a travel agency. We are your private gateway to the hidden wonders of the Nile. 
              Newiber Travel exists to bridge the gap between expectation and reality, delivering flawless 
              execution for the world's most discerning travelers.
            </p>
          </div>
        </div>
      </section>

      {/* --- FEATURE IMAGE SECTION --- */}
      <section className="px-6 md:px-16 container mx-auto py-10">
        <div className="relative w-full aspect-[16/7] overflow-hidden rounded-sm group">
          <img 
            src={about}
            alt="Ancient Egypt Architecture" 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Floating WhatsApp Button */}
          <div className="absolute bottom-6 right-6 bg-[#25D366] p-4 rounded-full shadow-lg cursor-pointer hover:scale-110 transition">
             <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-2.32 0-4.513 1.059-5.996 2.898a6.942 6.942 0 0 0-1.129 4.316c.112 1.39.638 2.648 1.488 3.56l-.552 2.015 2.071-.541c.854.475 1.83.743 2.871.743h.001c4.015 0 7.282-3.267 7.282-7.282s-3.267-7.309-7.036-6.709zm3.507 9.851c-.144.405-.838.775-1.141.819-.3.044-.67.065-1.144-.088-.306-.1-.68-.231-1.161-.439-2.04-.881-3.359-2.951-3.461-3.088-.102-.137-.829-1.102-.829-2.102 0-1 .513-1.494.697-1.699.184-.204.409-.255.545-.255s.272.001.391.007c.125.006.294-.047.46.353.167.402.573 1.398.623 1.498.05.1.084.217.017.35-.067.133-.1.217-.2.333-.1.117-.209.261-.299.35-.1.1-.205.21-.089.408.117.199.519.857 1.115 1.388.769.684 1.415.897 1.614.996.2.1.317.084.434-.05.117-.133.501-.584.634-.784.133-.2.267-.167.45-.1.184.067 1.168.55 1.368.65.2.1.333.15.384.234.05.083.05.483-.094.888z"/></svg>
          </div>
        </div>
      </section>

      {/* --- THREE PILLARS SECTION (01, 02, 03) --- */}
      <section className="py-24 px-6 md:px-16 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {/* Pillar 01 */}
          <div className="space-y-4">
            <span className="text-5xl md:text-7xl font-bold text-[#184784] opacity-[25%] block mb-2">01</span>
            <h3 className="text-xl font-black uppercase tracking-widest text-[#1c1c1c]">The Concierge</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our service doesn't end with a booking. It begins there. From VIP airport handling to 24/7 on-ground support, we are always one step ahead of your needs.
            </p>
          </div>

          {/* Pillar 02 */}
          <div className="space-y-4">
            <span className="text-5xl md:text-7xl font-bold text-[#184784] opacity-[25%] block mb-2">02</span>
            <h3 className="text-xl font-black uppercase tracking-widest text-[#1c1c1c]">The Access</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We hold the keys to doors others cannot open. Private viewings of the Sphinx paws, after-hours museum tours, and yacht charters on the Red Sea.
            </p>
          </div>

          {/* Pillar 03 */}
          <div className="space-y-4">
            <span className="text-5xl md:text-7xl font-bold text-[#184784] opacity-[25%] block mb-2">03</span>
            <h3 className="text-xl font-black uppercase tracking-widest text-[#1c1c1c]">The Trust</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Licensed, insured, and experienced. Our reputation is built on a decade of flawless execution for corporate clients and luxury travelers alike.
            </p>
          </div>
        </div>
      </section>

      {/* --- QUOTE SECTION --- */}
      <section className="bg-gray-50 py-32 px-6">
        <div className="mx-[11%]  text-left">
          <h2 className="text-[48px] pr-[8%] md:text-5xl leading-[135%] font-display italic text-[#474747] font-[400] ">
            "Our mission is simple: to ensure that when you leave Egypt, a part of it never leaves you."
          </h2>
          <div className="mt-10">
            <div className="w-12 h-[2px] bg-gray-300 mx-auto mb-6" />
            <p className="text-sm font-bold uppercase tracking-[0.3em] text-gray-900">The Management</p>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-widest">Newiber Travel</p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;