import React, { useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { submitContact } from '../services/api'; 
import heroVideo from '../assets/Hero-video.mp4'; 
import fallbackImage from '../assets/Hero-poster.png'; 

import Footer from '../components/Footer';
import DynamicHeader from '../components/DynamicHeader';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const Home = () => {
  // services and testimonials are already resolved arrays
  const { services, testimonials } = useLoaderData();
  
  // Form State
  const [formData, setFormData] = useState({ firstName: '', email: '', message: '' });
  const [status, setStatus] = useState({ loading: false, success: null });

  const handleContact = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: null });
    try {
      await submitContact(formData);
      setStatus({ loading: false, success: 'Message sent successfully!' });
      setFormData({ firstName: '', email: '', message: '' });
    } catch (err) {
      setStatus({ loading: false, success: 'Failed to send message. Please try again.' });
    }
  };

  return (
    <div className="bg-white selection:bg-blue-100">
      <DynamicHeader />
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/50 z-10" />
          <video 
            src={heroVideo} 
            className="w-full h-full object-cover scale-105" 
            autoPlay 
            muted 
            loop 
            playsInline
            poster={fallbackImage}
          />
        </div>
        
        <div className="relative z-20 text-center text-white px-4">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-light tracking-tighter mb-4"
          >
            Explore Egypt <span className="font-serif italic">With Us</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xs md:text-sm uppercase tracking-[0.4em] font-light"
          >
            Enjoy Experience | Feel The Beauty
          </motion.p>
        </div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="py-24 container mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="w-4/5 aspect-[4/5] overflow-hidden rounded-sm shadow-2xl">
            <img src="https://images.unsplash.com/photo-1539768942893-dad53e448b5d?q=80&w=800" className="w-full h-full object-cover" alt="History" />
          </div>
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            className="absolute -bottom-10 -right-4 w-3/5 aspect-square border-[12px] border-white rounded-sm overflow-hidden shadow-2xl hidden md:block"
          >
            <img src="https://images.unsplash.com/photo-1572252009286-268acec5ca0a?q=80&w=800" className="w-full h-full object-cover" alt="Nile River" />
          </motion.div>
        </div>
        <motion.div {...fadeInUp}>
          <span className="text-blue-900 text-xs font-bold uppercase tracking-widest">About Us</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-6 leading-tight">We Create Journeys That Stay With You Forever.</h2>
          <p className="text-gray-500 leading-relaxed mb-8 text-lg">
            Simplicity is the ultimate sophistication. At Newiber Travel, we strip away the unnecessary to focus on what matters: your experience.
          </p>
          <p className="text-gray-500 leading-relaxed mb-8 text-lg">
            From the moment you arrive in Egypt until your departure, our "White Glove" service ensures seamless, private, and exquisite travel.
          </p>
          <Link to="/about" className="group text-sm font-bold uppercase tracking-widest border-b-2 border-blue-900 pb-2 hover:text-blue-700 transition-all">
            Explore More <span className="inline-block group-hover:translate-x-2 transition-transform">→</span>
          </Link>
        </motion.div>
      </section>

      {/* --- SERVICES SECTION (DYNAMIC) --- */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center mb-16">
          <span className="text-blue-900 text-xs font-bold uppercase tracking-widest">Our Features</span>
          <h2 className="text-4xl font-serif mt-2">What we Offer?</h2>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {services && services.length > 0 ? (
            services.map((service, index) => (
              <motion.div 
                key={service._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                <div className="h-72 overflow-hidden">
                  <img 
                    src={service.imageUrl || "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=800"} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-700" 
                    alt={service.title} 
                  />
                </div>
                <div className="p-8">
                  <span className="text-[10px] text-blue-900 font-black uppercase tracking-widest">Premium Service</span>
                  <h3 className="text-xl font-bold mt-2 mb-4">{service.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">{service.description}</p>
                  <Link to={`/services/${service._id}`} className="text-xs font-bold uppercase tracking-widest border-b pb-1 hover:border-blue-900 transition">View Details</Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center col-span-3 py-10">Loading exceptional services...</div>
          )}
        </div>
      </section>

      {/* --- CONTACT & TESTIMONIALS SECTION --- */}
      <section className="py-24 container mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-20">
          {/* Contact Form */}
          <motion.div {...fadeInUp}>
            <h2 className="text-4xl font-serif mb-8">Get In Touch</h2>
            <form onSubmit={handleContact} className="space-y-6">
              <input 
                required
                type="text" 
                placeholder="Your Name" 
                value={formData.firstName}
                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                className="w-full border-b border-gray-300 py-4 focus:border-blue-900 outline-none transition bg-transparent" 
              />
              <input 
                required
                type="email" 
                placeholder="Email Address" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full border-b border-gray-300 py-4 focus:border-blue-900 outline-none transition bg-transparent" 
              />
              <textarea 
                required
                placeholder="How can we help you?" 
                rows="4" 
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full border-b border-gray-300 py-4 focus:border-blue-900 outline-none transition bg-transparent resize-none"
              ></textarea>
              <button 
                disabled={status.loading}
                className="w-full md:w-auto bg-[#0b1c2c] text-white px-12 py-4 text-xs font-bold uppercase tracking-widest hover:bg-blue-900 transition-colors disabled:opacity-50"
              >
                {status.loading ? 'Sending...' : 'Send Message'}
              </button>
              {status.success && <p className="text-sm font-bold text-blue-900 mt-4">{status.success}</p>}
            </form>
          </motion.div>

          {/* Testimonials */}
          <div>
            <h3 className="text-2xl font-serif mb-8">Guest Experiences</h3>
            <div className="space-y-8">
              {testimonials && testimonials.length > 0 ? (
                testimonials.slice(0, 2).map((t) => (
                  <motion.div key={t._id} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="border-l-4 border-blue-900 pl-6 py-2">
                    <p className="italic text-gray-600 mb-4 font-light text-lg">"{t.content}"</p>
                    <p className="font-bold text-sm uppercase tracking-widest">— {t.clientName}</p>
                  </motion.div>
                ))
              ) : (
                <div className="text-gray-500">No testimonials yet.</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;