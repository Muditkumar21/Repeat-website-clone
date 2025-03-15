import React, { useRef, useEffect, useState } from 'react'
import PageZero from './components/PageZero';
import PageOne from './components/PageOne';
import PageTwo from './components/PageTwo';
import PageThree from './components/PageThree';
import Pagefourth from './components/Pagefourth';
import PageFivth from './components/PageFivth';
import { Canvas } from '@react-three/fiber';
import { View } from '@react-three/drei';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './components/Footer';
import Black from './components/Black';
import Lenis from '@studio-freight/lenis';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);
  
function App() {
  const pageOneRef = useRef();
  const oneRef = useRef();
  const twoRef = useRef();
  const threeRef = useRef();
  const fourRef = useRef();
  const canvasWrapper = useRef();
  const blackRef = useRef();
  const pageFiveRef = useRef();
  
// Add this useEffect at the top of your component
useEffect(() => {
  // Immediately reset browser's scroll position
  window.scrollTo(0, 0);
  
  // Add a small delay to ensure DOM is ready
  const timeout = setTimeout(() => {
    // Force Lenis to reset scroll position
    const lenis = new Lenis();
    lenis.scrollTo(0, { immediate: true });
    lenis.stop();
    lenis.destroy();
  }, 100);

  return () => clearTimeout(timeout);
}, []);

// Then keep your existing Lenis initialization
useEffect(() => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    smoothTouch: false,
    touchMultiplier: 2,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));

  return () => {
    lenis.destroy();
    gsap.ticker.remove(lenis.raf);
  };
}, []);

  useGSAP(() => {
    // Page Five enter/leave detection
    ScrollTrigger.create({
      trigger: pageFiveRef.current,
      start: '-30% 80%',
      end: 'bottom 20%',
      onEnter: () => handleCanvasZIndex(1),
      onLeaveBack: () => handleCanvasZIndex(-1),
    });

    // Page zero enter/leave detection
    ScrollTrigger.create({
      trigger: pageOneRef.current,
      start: 'top 20%',
      end: 'bottom 20%',
      onEnter: () => handleCanvasZIndex(-1),
      onEnterBack: () => handleCanvasZIndex(-1),
      onLeave: () => handleCanvasZIndex(-1),
      onLeaveBack: () => handleCanvasZIndex(-1),
    });
    
    // Set up all the scroll animations
    gsap.to(pageOneRef.current, {
      y: -590,
      ease: "power1.out",
      scrollTrigger: {
        trigger: pageOneRef.current,
        start: "top -90%",
        end: "top -300%",
        scrub: true,
        // markers: true
      },
    });
    
    gsap.to(oneRef.current, {
      y: -500,
      ease: "linear",
      scrollTrigger: {
        trigger: oneRef.current,
        start: "top -40%",
        end: "top -130%",
        scrub: true,
        // markers: true
      },
    });
    
    gsap.to(twoRef.current, {
      y: -450,
      ease: "linear",
      scrollTrigger: {
        trigger: twoRef.current,
        start: "top -40%",
        end: "top -130%",
        scrub: true,
        // markers: true
      },
    });
    
    gsap.to(threeRef.current, {
      y: -450,
      ease: "linear",
      scrollTrigger: {
        trigger: threeRef.current,
        start: "top -40%",
        end: "top -130%",
        scrub: true,
        // markers: true
      },
    });
    
    gsap.to(fourRef.current, {
      y: -450,
      ease: "linear",
      scrollTrigger: {
        trigger: fourRef.current,
        start: "top -40%",
        end: "top -130%",
        scrub: true,
        // markers: true
      },
    });
    
    gsap.to(pageFiveRef.current, {
      y: -350,
      ease: "linear",
      scrollTrigger: {
        trigger: pageFiveRef.current,
        start: "top -40%",
        end: "top -130%",
        scrub: true,
        // markers: true
      },
    });
    
    gsap.to(blackRef.current, {
      y: -350,
      ease: "linear",
      scrollTrigger: {
        trigger: blackRef.current,
        start: "top -40%",
        end: "top -130%",
        scrub: true,
        // markers: true
      },
    });
  }); // Re-run when loading state changes

  const handleCanvasZIndex = (zIndex) => {
    gsap.to(canvasWrapper.current, {
      zIndex: zIndex,
      duration: 0.1, // Minimal duration for smooth transition
      overwrite: true,
      onStart: () => {
        // Force GPU layer
        canvasWrapper.current.style.transform = 'translateZ(0)';
      },
      onComplete: () => {
        // Reset transform after animation
        canvasWrapper.current.style.transform = 'none';
      }
    });
  };

  return (
    <>
    <div className='pt-3'>
      <div id='main-container' ref={pageOneRef} className='sticky top-[-90%]'><PageZero/></div>
      <div ref={oneRef} className='sticky top-[-40%]' ><PageOne/></div>
      <div ref={twoRef} className='sticky top-[-40%] '><PageTwo/></div>
      <div ref={threeRef} className='sticky top-[-40%] ' ><PageThree/></div>
      <div ref={fourRef} className=' sticky top-[-40%] '><Pagefourth/></div>
      <div ref={blackRef} className='sticky z-[1] top-[-40%]'><Black/></div>
      <div ref={pageFiveRef} className='sticky z-[2] top-[-40%]'><PageFivth pageFiveRef={pageFiveRef}/></div>
      <div className='sticky z-[4]' ><Footer/></div>
      <div
        ref={canvasWrapper}
        className="fixed top-0 left-0 w-full h-full"
        style={{
          zIndex: 0,
          transform: 'translateZ(0)', // Force GPU layer
          willChange: 'z-index', // Optimize for z-index changes
        }}
      >
        <Canvas
          gl={{ antialias: true, powerPreference: 'low-power' }}
          dpr={window.devicePixelRatio}
          camera={{ fov: 65 }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <View.Port />
        </Canvas>
      </div>
    </div>
    </>
  );
}

export default App