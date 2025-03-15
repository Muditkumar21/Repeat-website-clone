import React from 'react'
import Navbar from './Navbar'
import Canvass from './Canvass'
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function PageZero() {
    const darkoverlay = useRef();

    useGSAP(() => {
        gsap.fromTo(darkoverlay.current, {
            opacity: 0,
            }, {
            opacity: 0.4,
            ease: "linear",
            scrollTrigger: {
                trigger: darkoverlay.current,
                start: "top -70%",
                end: "top -120%",
                scrub: true,
                // markers: true
            },
        });
    });

  return (
    <div className='relative'>
        <div ref={darkoverlay} className='z-[2] absolute top-0 left-0 h-[170vh] w-screen bg-black pointer-events-none'></div>
        <Navbar/>
        <Canvass/>
    </div>
  )
}

export default PageZero