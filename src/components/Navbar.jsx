import React, { useState, useRef, useLayoutEffect, useCallback } from 'react';
import SmallButton from './SmallButton';

const ALL_LINKS = ["COMPANY", "CONTENT", "CPG HOUSE", "PRICING"];

function Navbar() {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [backgroundStyle, setBackgroundStyle] = useState({ opacity: 0 });
  const linksRef = useRef([]);
  const containerRef = useRef(null);
  const timeoutRef = useRef(null);

  // Handle mouse entering a link
  const handleLinkMouseEnter = useCallback((index) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoverIndex(index);
  }, []);

  // Handle mouse leaving a link
  const handleLinkMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setHoverIndex(-1);
    }, 100); // 100ms delay to allow transition to another link
  }, []);

  // Update background style synchronously after DOM changes
  useLayoutEffect(() => {
    if (hoverIndex !== -1 && linksRef.current[hoverIndex]) {
      const link = linksRef.current[hoverIndex];
      const PADDING = 24; // Adjust this value to control background extension
      const left = link.offsetLeft - PADDING;
      const width = link.offsetWidth + 2 * PADDING;

      setBackgroundStyle({
        left: `${left}px`,
        width: `${width}px`,
        opacity: 1,
      });
    } else {
      setBackgroundStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [hoverIndex]);

  return (
    <div className="flex justify-between items-center mx-10">
      <img
        className="h-16 object-contain object-center mr-32"
        src="src/assets/images/logoRepeat.png"
        alt="Logo"
      />

      <div
        ref={containerRef}
        className="relative w-fit h-fit px-6 py-3 bg-skin flex flex-row gap-14 border border-black rounded-full overflow-hidden"
        onMouseLeave={() => {
          if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
          }
          setHoverIndex(-1); // Immediately hide background when leaving container
        }}
      >
        <div
          className="absolute bg-black rounded-full h-12 duration-300 ease-out"
          style={{
            ...backgroundStyle,
            transitionProperty: 'left, width, opacity',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        />

        {ALL_LINKS.map((item, index) => (
          <div
            key={index}
            ref={(el) => (linksRef.current[index] = el)}
            className="relative nav-link"
            onMouseEnter={() => handleLinkMouseEnter(index)}
            onMouseLeave={handleLinkMouseLeave}
          >
            <a
              href="#"
              className="relative text-base font-main transition-colors duration-300 z-10"
              style={{ color: hoverIndex === index ? 'white' : 'inherit' }}
            >
              {item}
            </a>
          </div>
        ))}
      </div>

      <div className="flex justify-center items-center">
        <div className="relative text-base font-main px-6 py-3 bg-skin border border-black rounded-full transition-colors duration-300 group-hover:text-white">
          <h5>LOGIN</h5>
        </div>
        <SmallButton
          heading={<h5>BOOK A DEMO</h5>}
          paddingx={1.5}
          paddingy={0.75}
          svgheight={0.75}
          gap={0.75}
          marginleft="ml-3"
          bg="bg-black"
          circle="bg-yelloww"
          maintext="text-black"
          extratext="text-white"
          arrow="black"
          border="border-black"
        />
      </div>
    </div>
  );
}

export default Navbar;