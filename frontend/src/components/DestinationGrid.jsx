import React from 'react';
import { useLoaderData } from 'react-router-dom';

const DestinationGrid = ({ destinations: passedDestinations }) => {
  // If you pass destinations as a prop, use that. 
  // Otherwise, pull it directly from the parent route's loader data.
  const loaderData = useLoaderData();
  const destinations = passedDestinations || loaderData?.destinations || [];

  if (!destinations.length) return null;

  return (
    <section className="w-full bg-black px-4 py-16 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">
        
        {/* Component Header matching your branding */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Favorite Destinations
          </h2>
          <p className="mt-2 text-sm text-zinc-400 tracking-wide">
            Explore our most popular curated travel spots across Egypt.
          </p>
        </div>

        {/* Asymmetrical Masonry Grid Layout matching your asset image */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-4">
          {destinations.map((dest) => (
            <div
              key={dest._id}
              className={`${dest.gridClass} group relative flex items-end overflow-hidden rounded-2xl bg-zinc-900 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,255,255,0.08)] cursor-pointer`}
            >
              {/* Background Image with Dark Linear Gradient for text contrast */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ 
                  backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.2) 50%, rgba(0, 0, 0, 0) 100%), url(${dest.imageUrl})` 
                }}
              />

              {/* Bottom aligned card geolocation markup */}
              <div className="relative z-10 p-6 flex items-center gap-2 text-white">
                <svg 
                  className="h-4 w-4 text-zinc-300 opacity-90" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor" 
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="text-base font-medium tracking-wide text-zinc-100 opacity-95">
                  {dest.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default DestinationGrid;
