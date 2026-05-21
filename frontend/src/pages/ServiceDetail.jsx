import React, { useEffect } from 'react';
import { useLoaderData, Link, useLocation } from 'react-router-dom';
import DynamicHeader from '../components/DynamicHeader';
import Footer from '../components/Footer';
import pyramids from '../assets/pyramids.png';
import { masterImageMap } from '../utils/imageRegistry';
import ServiceList from '../components/ServiceList'; 

const ServiceDetail = () => {
  // 1. Get data from your loader (defined in App.js)
  const { service, allServices } = useLoaderData();
  const { pathname } = useLocation();

  // 2. Scroll to top automatically when the ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (!service) return null;

  return (
    <div className="min-h-screen bg-white font-sans">
      <DynamicHeader />

      {/* --- HERO SECTION --- */}
      <section className="pt-24 px-6 md:px-16 container mx-auto">
        <div className="w-full aspect-[21/9] overflow-hidden rounded-sm mb-12 shadow-sm">
          <img 
            src={masterImageMap[service.imageUrl] || service.imageUrl || '/images/default-service.jpg'} 
            className="w-full h-full object-cover" 
            alt={service.title} 
          />
        </div>

        <div className="max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-sans font-black uppercase tracking-tight text-[#1c1c1c] mb-6">
            {service.title}
          </h1>
          <p className="max-w-3xl text-[#474747] text-lg font-poppins leading-relaxed mb-12">
            {service.description}
          </p>
          
        
        </div>
      </section>
          <div className="w-[74%] mx-auto h-[1px] bg-black mt-16" />

      {/* --- OTHER SERVICES LIST --- */}
      <div className="mt-32 py-20 bg-gray-50">
        
        <div className="container mx-auto px-6 md:px-16">
          
            <ServiceList services={allServices.filter(s => s._id !== service._id)} />
        </div>
      </div>

      {/* --- BRAND CTA SECTION --- */}
      <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img src={pyramids} className="w-full h-full object-cover grayscale" alt="CTA Background" />
        </div>
        <div className="relative z-20 text-center px-6">
          <h2 className="text-3xl md:text-5xl font-serif italic text-white mb-10">
            Ready to experience the difference?
          </h2>
          <Link 
            to="/contact" 
            className="inline-block px-12 py-4 border border-white text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all rounded-sm"
          >
            Start Planning
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ServiceDetail;
