import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import HeaderSolid from './HeaderSolid';
import HeaderTransparent from './HeaderTransparent';

const DynamicHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Define which pages should have a transparent header on load.
  // We'll only enable it for the Home page and maybe specific landing pages.
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    // If not on the homepage, the header should always be solid.
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    // On the homepage, check the scroll position.
    const handleScroll = () => {
      // Show the solid header after scrolling 50 pixels down.
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Initialize the scroll state.
    handleScroll();

    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount.
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isHomePage]);

  return (
    <>
      {isHomePage ? (
        <>
          {/* Transparent header, hidden when scrolled */}
          <HeaderTransparent isHidden={isScrolled} />
          {/* Solid header, shown when scrolled */}
          <HeaderSolid isVisible={isScrolled} isFixed={true} />
        </>
      ) : (
        // For other pages, show the solid header by default (not fixed).
        <HeaderSolid isVisible={true} isFixed={false} />
      )}
    </>
  );
};

export default DynamicHeader;