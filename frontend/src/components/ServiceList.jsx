import React from 'react';
import { Link } from 'react-router-dom';

const ServiceList = ({ services }) => {
  return (
    <section className="pb-24 px-6 md:px-16 container mx-auto space-y-32">
      {services.map((service, index) => (
        <div 
          key={service._id} 
          className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-24`}
        >
          <div className="flex-1 space-y-6">
            <span className="text-5xl md:text-7xl font-bold text-[#184784] opacity-[25%] block mb-2">0{index + 1}</span>
            <Link to={`/services/${service._id}`} className="inline-block group">
              <h3 className="text-2xl font-black uppercase tracking-widest text-[#474747] group-hover:text-blue-500 transition-colors duration-300">
                {service.title}
              </h3>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">{service.description}</p>
            <ul className="space-y-2 text-gray-500 text-xs font-medium">
              {service.features?.map((f, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full" /> {f}
                </li>
              ))}
            </ul>
            <Link to={`/services/${service._id}`} className="text-[10px] font-bold tracking-[0.2em] text-blue-400 uppercase group">
              Discover More <span className="inline-block transition-transform group-hover:translate-x-1">↗</span>
            </Link>
          </div>
          <div className="flex-1 w-full relative">
            <Link to={`/services/${service._id}`} className="block aspect-[4/3] overflow-hidden rounded-sm shadow-2xl group">
              <img src={service.imageUrl} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt={service.title} />
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default ServiceList;
