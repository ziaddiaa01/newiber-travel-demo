import React from 'react';
import { useLoaderData } from 'react-router-dom';

const DestinationGrid = ({ destinations: passedDestinations }) => {
  const loaderData = useLoaderData();
  const destinations = passedDestinations || loaderData?.destinations || [];

  if (!destinations.length) return null;

  return (
    <section className="w-full px-4 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-12 text-center md:text-left">
          <p className="font-heading text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-3">
            Where to next?
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-zinc-900">
            Favorite Destinations
          </h2>
          <p className="font-body mt-3 text-sm text-zinc-500 tracking-wide max-w-md">
            Explore our most popular curated travel spots across Egypt.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-4 sm:gap-5">
          {destinations.map((dest, idx) => (
            <div
              key={dest._id}
              className={`
                ${dest.gridClass}
                group relative overflow-hidden rounded-2xl bg-zinc-100
                min-h-[220px] sm:min-h-[260px] md:min-h-0
                cursor-pointer
                transition-all duration-500 ease-[cubic-bezier(.25,1,.5,1)]
                hover:-translate-y-1.5
                hover:shadow-2xl
              `}
            >
              {/* Image */}
              <img
                src={dest.imageUrl}
                alt={dest.title}
                loading={idx < 3 ? 'eager' : 'lazy'}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(.25,1,.5,1)] group-hover:scale-110"
              />

              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent transition-opacity duration-500 group-hover:from-black/80" />

              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 z-10 p-5 flex items-center gap-2 translate-y-1 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(.25,1,.5,1)]">
                <svg
                  className="h-3.5 w-3.5 text-white/80 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-heading text-[11px] uppercase tracking-[0.25em] text-white font-medium">
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
