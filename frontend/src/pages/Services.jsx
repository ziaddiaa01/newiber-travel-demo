import React from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import DynamicHeader from '../components/DynamicHeader';
import Footer from '../components/Footer';
import pyramids from '../assets/pyramids.png'

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
          <h2 className="text-5xl md:text-7xl font-display font-[400] text-[#474747] italic my-4 md:mt-8 ">
            Expertise
          </h2>
          <p className="max-w-xl text-[#474747] text-[18px] font-poppins leading-relaxed text-lg">
            Newiber Travel offers a comprehensive suite of services designed for the modern traveler. 
            From corporate logistics to leisure escapes, we handle every detail with precision.
          </p>
          <div className="w-full h-[1px] bg-black mt-16" />
        </div>
      </section>

      {/* --- SERVICES LIST (Alternating Layout) --- */}
      <section className="pb-24 px-6 md:px-16 container mx-auto space-y-32">
        {services.data.map((service, index) => (
          <div 
            key={service._id} 
            className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
          >
            {/* Text Side */}
            <div className="flex-1 space-y-6">
              <span className="text-5xl md:text-7xl font-bold text-[#184784] opacity-[25%] block mb-2">
                0{index + 1}
              </span>

              {/* 1. CLICKABLE TITLE */}
              <Link to={`/services/${service._id}`} className="inline-block group">
                <h3 className="text-2xl font-black uppercase tracking-widest text-[#474747] group-hover:text-blue-500 transition-colors duration-300">
                  {service.title}
                </h3>
              </Link>

              <p className="text-gray-400 text-sm leading-relaxed max-w-md">
                {service.description}
              </p>
              
              <ul className="space-y-2 text-gray-500 text-xs font-medium">
                {service.features?.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link 
                to={`/services/${service._id}`} 
                className="inline-block text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase hover:text-blue-600 transition group"
              >
                Discover More <span className="inline-block transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </Link>
            </div>

            {/* Image Side */}
            <div className="flex-1 w-full relative">
              {/* 2. CLICKABLE IMAGE */}
              <Link 
                to={`/services/${service._id}`} 
                className="block aspect-[4/3] overflow-hidden rounded-sm shadow-2xl group"
              >
                <img 
                  src={service.imageUrl}
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
              </Link>

              {index === 0 && (
                 <div className="absolute bottom-4 right-4 bg-[#25D366] p-3 rounded-full text-white shadow-lg pointer-events-none">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 6.172c-2.32 0-4.513 1.059-5.996 2.898a6.942 6.942 0 0 0-1.129 4.316c.112 1.39.638 2.648 1.488 3.56l-.552 2.015 2.071-.541c.854.475 1.83.743 2.871.743h.001c4.015 0 7.282-3.267 7.282-7.282s-3.267-7.309-7.036-6.709zm3.507 9.851c-.144.405-.838.775-1.141.819-.3.044-.67.065-1.144-.088-.306-.1-.68-.231-1.161-.439-2.04-.881-3.359-2.951-3.461-3.088-.102-.137-.829-1.102-.829-2.102 0-1 .513-1.494.697-1.699.184-.204.409-.255.545-.255s.272.001.391.007c.125.006.294-.047.46.353.167.402.573 1.398.623 1.498.05.1.084.217.017.35-.067.133-.1.217-.2.333-.1.117-.209.261-.299.35-.1.1-.205.21-.089.408.117.199.519.857 1.115 1.388.769.684 1.415.897 1.614.996.2.1.317.084.434-.05.117-.133.501-.584.634-.784.133-.2.267-.167.45-.1.184.067 1.168.55 1.368.65.2.1.333.15.384.234.05.083.05.483-.094.888z"/></svg>
                 </div>
              )}
            </div>
          </div>
        ))}
      </section>

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
