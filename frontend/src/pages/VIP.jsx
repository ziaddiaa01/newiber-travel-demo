import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLoaderData } from 'react-router-dom';
import Footer from '../components/Footer';
import HeaderTransparent from '../components/HeaderTransparent';
import hero from '../assets/Vip.jpg';

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="1.5">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const KeyIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c5a059" strokeWidth="1.5">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3m-3-3l-2.5-2.5" />
  </svg>
);

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] },
};

const VIP = () => {
  const { services } = useLoaderData();

 // Add a fallback to an empty array ([]) if services or services.data is undefined
const vipServices = (services?.data || []).filter((s) => s.isVip).sort((a, b) => a.order - b.order);

  if (!services) {
    return <div className="min-h-screen bg-[#0d0d0d] text-white">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white font-sans overflow-x-hidden selection:bg-[#c5a059]/30">
      <HeaderTransparent />

      {/* --- HERO --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 3, ease: 'easeOut' }}
          className="absolute inset-0 z-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-[#0d0d0d] z-10" />
          <img src={hero} className="w-full h-full object-cover" alt="VIP Hero" />
        </motion.div>
        <div className="relative z-20 text-center w-[80%]">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.5em' }}
            transition={{ duration: 1.5 }}
            className="text-[#c5a059] uppercase w-full text-[10px] mb-8"
          >
            Newiber Private
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.5 }}
            className="text-4xl md:text-7xl w-full font-serif italic font-light mb-8"
          >
            "The World Is Yours, <span className="text-[#c5a059]">Exclusively.</span>"
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="max-w-2xl mx-auto text-gray-400 text-[10px] md:text-xs tracking-[0.3em] uppercase leading-relaxed"
          >
            A dedicated division for those who demand the exceptional, privacy, precision, and unparalleled access.
          </motion.p>
        </div>
      </section>

      {/* --- THE ART OF INVISIBILITY --- */}
      <section className="py-40 max-w-[80%] mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div {...fadeUp}>
            <span className="text-[#c5a059] text-[9px] uppercase tracking-[0.4em] mb-6 block">About VIP Service</span>
            <h2 className="text-4xl font-light uppercase tracking-tight mb-8">The Art Of Invisibility</h2>
            <p className="text-gray-400 font-light leading-loose mb-10 text-sm">
              True luxury is seamless. It is felt, not seen. Our VIP division specializes in crafting journeys that flow effortlessly.
              From tarmac-side pickups to private island buyouts, we operate in the background so you can live in the moment.
            </p>
            <Link to="/contact" className="text-[#c5a059] text-[10px] uppercase tracking-[0.4em] flex items-center gap-3 group">
              Discover VIP Services <span className="group-hover:translate-y-1 transition-transform">↓</span>
            </Link>
          </motion.div>
          <div className="grid grid-cols-2 gap-4">
            <motion.div whileHover={{ borderColor: '#c5a059' }} className="bg-[#151515] p-12 border border-white/5 transition-colors text-center">
              <div className="flex justify-center mb-6"><ShieldIcon /></div>
              <h4 className="uppercase text-[10px] tracking-[0.3em] mb-2 font-bold">Security</h4>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest">Discreet & Professional</p>
            </motion.div>
            <motion.div whileHover={{ borderColor: '#c5a059' }} className="bg-[#151515] p-12 border border-white/5 transition-colors text-center">
              <div className="flex justify-center mb-6"><KeyIcon /></div>
              <h4 className="uppercase text-[10px] tracking-[0.3em] mb-2 font-bold">Access</h4>
              <p className="text-[9px] text-gray-500 uppercase tracking-widest">Closed Doors Opened</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- THE COLLECTION --- */}
      <section className="py-32 bg-[#0a0a0a]">
        <div className="px-6 mx-auto max-w-[91.9%] md:px-24">
          <motion.h2 {...fadeUp} className="text-3xl font-light uppercase tracking-[0.4em] mb-24">The Collection</motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            {vipServices.length === 0 ? (
              <div className="col-span-3 text-center text-gray-400 py-20">No VIP services available at this time.</div>
            ) : (
              vipServices.map((item, idx) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2, duration: 1 }}
                  viewport={{ once: true }}
                  className="group relative h-[650px] overflow-hidden cursor-pointer bg-[#111]"
                >
                  <img
                    src={item.imageUrl}
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 opacity-60 group-hover:opacity-100"
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                  <div className="absolute bottom-12 left-10 right-10">
                    <span className="text-[#c5a059] mb-4 block text-xl"><i className={item.icon}></i></span>
                    <h3 className="text-2xl font-light uppercase tracking-widest mb-4">{item.title}</h3>
                    <p className="text-[11px] text-gray-400 uppercase leading-relaxed tracking-widest transition-all duration-700 opacity-80 group-hover:opacity-100">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* --- INVITATION --- */}
      <section className="py-48 flex flex-col items-center justify-center text-center px-6 border-t border-white/5">
        <motion.div {...fadeUp} className="max-w-[65%]">
          <h2 className="text-4xl font-bold uppercase tracking-tighter mb-6">Request an Invitation</h2>
          <p className="text-gray-500 text-xs tracking-widest uppercase leading-loose mb-16 px-10">
            Membership to our Private Client list is by application or referral only. Please provide your details below for a confidential consultation.
          </p>
          <form className="w-full space-y-12">
            <input type="text" placeholder="FULL NAME" className="w-full bg-transparent border-b border-white/20 py-4 text-[10px] tracking-[0.4em] focus:border-[#c5a059] outline-none transition-colors placeholder:text-gray-700" />
            <input type="email" placeholder="PRIVATE EMAIL" className="w-full bg-transparent border-b border-white/20 py-4 text-[10px] tracking-[0.4em] focus:border-[#c5a059] outline-none transition-colors placeholder:text-gray-700" />
            <div className="pt-8">
              <button type="submit" className="px-16 py-5 border border-[#c5a059]/40 text-[#c5a059] text-[10px] tracking-[0.5em] uppercase hover:bg-[#c5a059] hover:text-black transition-all duration-500 rounded-sm">
                Submit Request
              </button>
            </div>
          </form>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default VIP;
