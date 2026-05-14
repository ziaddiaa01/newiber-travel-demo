import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faClock, faShieldAlt, faCertificate } from '@fortawesome/free-solid-svg-icons';
import DynamicHeader from '../components/DynamicHeader';
import Footer from '../components/Footer';
import pyramidBg from '../assets/whyUs.jpg'; // Path to your grayscale pyramid image

const WhyUs = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const features = [
    {
      title: "Unmatched Local Mastery",
      desc: "We don't just know Egypt; we live it. Our team consists of historians, Egyptologists, and local connoisseurs who provide context, not just commentary. You won't just see the sites; you'll understand their soul.",
      icon: faStar
    },
    {
      title: "Dedicated 24/7 Concierge",
      desc: "Travel is unpredictable; our service is not. From the moment you land until your departure, a dedicated concierge is assigned to you, ensuring every reservation, transfer, and request is handled instantly.",
      icon: faClock
    },
    {
      title: "Trust & Transparency",
      desc: "No hidden fees. No tourist traps. We operate with complete transparency and are fully licensed by the Egyptian Ministry of Tourism, giving you peace of mind in every transaction.",
      icon: faShieldAlt
    },
    {
      title: "Curated Authenticity",
      desc: "We steer clear of the 'cookie-cutter' routes. We take you to the best local eateries, the quietest corners of the temples, and the most authentic artisan markets, ensuring a genuine connection with the culture.",
      icon: faCertificate
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-[#29abe2]/30">
      <DynamicHeader />

      {/* --- HERO SECTION --- */}
      <section className="pt-32 pb-16 px-6 md:px-24 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <span className="text-[#29abe2] text-[10px] uppercase tracking-[0.4em] font-bold block mb-4">
            The Distinction
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-[#1a1a1a] leading-tight">
            WHY <br />
            <span className="font-serif italic font-light text-gray-500">NEWIBER?</span>
          </h1>
        </motion.div>
        
        <div className="h-[1px] bg-gray-200 w-full mb-20" />

        {/* --- FEATURES GRID --- */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 mb-32"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              className="p-10 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow bg-[#fafafa]"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm mb-6 text-[#2b5a9e]">
                <FontAwesomeIcon icon={feature.icon} />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">{feature.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* --- QUOTE SECTION --- */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <img 
          src={pyramidBg} 
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-75" 
          alt="Egyptian Pyramids" 
        />
        <div className="relative z-10 text-center px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-white text-3xl md:text-5xl font-serif italic font-light leading-relaxed"
          >
            "Details matter, <br />
            <span className="text-white font-sans font-bold not-italic">because you matter."</span>
          </motion.h2>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WhyUs;