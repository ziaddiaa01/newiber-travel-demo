import React, { useEffect, useRef, useState } from 'react';
import { useLoaderData } from 'react-router-dom';

/* ── Intersection-observer hook for staggered entrance ── */
function useReveal(count) {
  const [visible, setVisible] = useState(Array(count).fill(false));
  const refs = useRef([]);

  useEffect(() => {
    const observers = refs.current.map((el, i) => {
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 80); // 80 ms stagger per card
            obs.disconnect();
          }
        },
        { threshold: 0.12 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  return { visible, refs };
}

const DestinationGrid = ({ destinations: passedDestinations }) => {
  const loaderData = useLoaderData();
  const destinations = passedDestinations || loaderData?.destinations || [];
  const { visible, refs } = useReveal(destinations.length);

  if (!destinations.length) return null;

  return (
    <section className="w-full px-4 py-20 sm:px-8 lg:px-16">
      <div className="mx-auto max-w-7xl">

        {/* ── Header ── */}
        <div className="mb-12 text-center md:text-left">
          <p className="font-heading text-[10px] uppercase tracking-[0.45em] text-zinc-400 mb-3">
            Where to next?
          </p>
          <h2 className="font-display text-4xl sm:text-5xl font-normal tracking-tight text-zinc-900">
            Favorite Destinations
          </h2>
          <p className="font-body mt-3 text-sm text-zinc-500 tracking-wide max-w-md">
            Explore our most popular curated travel spots across Egypt.
          </p>
        </div>

        {/* ── Grid ──
            Mobile  : 1 col, each card 280px tall
            Tablet  : 2 col, each card 300px tall
            Desktop : 4-col / 4-row asymmetric driven by dest.gridClass
        ── */}
        <div
          className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-4 md:grid-rows-4
          "
        >
          {destinations.map((dest, idx) => (
            <div
              key={dest._id}
              ref={(el) => (refs.current[idx] = el)}

              /* On md+ use the DB-driven gridClass (e.g. "md:col-span-2 md:row-span-2").
                 On smaller screens every card is full-width / auto-height. */
              className={`
                ${dest.gridClass ?? ''}
                group relative overflow-hidden rounded-2xl bg-zinc-200
                h-[280px] sm:h-[300px] md:h-auto
                cursor-pointer

                /* entrance animation */
                transition-[opacity,transform]
                duration-700
                ease-[cubic-bezier(.22,1,.36,1)]
                ${visible[idx]
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'}

                /* hover */
                hover:-translate-y-2
                hover:shadow-[0_20px_50px_rgba(0,0,0,0.18)]
              `}
              style={{
                /* keeps hover on top of entrance transform */
                willChange: 'transform, opacity',
              }}
            >
              {/* ── Full-bleed image ── */}
              <img
                src={dest.imageUrl}
                alt={dest.title}
                loading={idx < 4 ? 'eager' : 'lazy'}
                className="
                  absolute inset-0 w-full h-full object-cover
                  transition-transform duration-700
                  ease-[cubic-bezier(.22,1,.36,1)]
                  group-hover:scale-110
                "
              />

              {/* ── Gradient scrim ── */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t from-black/65 via-black/10 to-transparent
                  transition-opacity duration-500
                  group-hover:from-black/80
                "
              />

              {/* ── Location label — slides up on hover ── */}
              <div
                className="
                  absolute bottom-0 left-0 right-0 z-10
                  p-5 flex items-center gap-2
                  translate-y-1 group-hover:translate-y-0
                  transition-transform duration-500
                  ease-[cubic-bezier(.22,1,.36,1)]
                "
              >
                <svg
                  className="h-3.5 w-3.5 text-white/80 flex-shrink-0"
                  fill="none" viewBox="0 0 24 24"
                  stroke="currentColor" strokeWidth="2.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <h3 className="font-heading text-[11px] uppercase tracking-[0.28em] text-white font-medium">
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
