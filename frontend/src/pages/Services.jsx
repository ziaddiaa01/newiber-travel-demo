import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import DynamicHeader from '../components/DynamicHeader';
import Footer from '../components/Footer';
import ServiceList from '../components/ServiceList';
import pyramids from '../assets/pyramids.png';

const Services = () => {
  const { services } = useLoaderData();

  return (
    <div className="min-h-screen bg-white font-sans">
      <DynamicHeader />

      {/* --- HERO SECTION --- */}
      <section className="pt-20 pb-16 px-6 md:px-16 container mx-auto">
        <div className="max-w-4xl">
          <span className="text-blue-500 font-bold tracking-[0.3em] text-[10px] uppercase block mb-4">
            What we offer?
          </span>
          <h1 className="text-6xl md:text-8xl font-poppins font-[400] tracking-[5%] uppercase text-[#1c1c1c]">
            OUR
          </h1>
          <h2 className="text-5xl md:text-7xl font-display font-[400] text-[#474747] italic my-4 md:mt-8">
            Expertise
          </h2>
          <p className="max-w-xl text-[#474747] text-[18px] font-poppins leading-relaxed text-lg">
            Newiber Travel offers a comprehensive suite of services designed for the modern traveler.
            From corporate logistics to leisure escapes, we handle every detail with precision.
          </p>
          <div className="w-full h-[1px] bg-black mt-16" />
        </div>
      </section>

      {/* --- SERVICES LIST: public only --- */}
      <ServiceList services={services.data} isVip={false} />

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

      <Footer />
    </div>
  );
};

export default Services;
