import React, { useRef } from 'react';
import Button from './Button';
import { motion, useScroll, useSpring, useTransform, useMotionValue, useVelocity, useAnimationFrame } from "framer-motion";
import { wrap } from "@motionone/utils";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View, Environment } from '@react-three/drei';
import Bottle from './Bottle';
import Container from './Container';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function ParallaxImages({ images, baseVelocity }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });

  const velocityFactor = useTransform(smoothVelocity, (v) => {
    const absV = Math.abs(v);
    return Math.min(absV / 400, 5);
  }, { clamp: true });

  const x = useTransform(baseX, (v) => `${wrap(-97, -200, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    moveBy += directionFactor.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="z-10 parallax overflow-hidden">
      <motion.div className="scroller flex gap-4" style={{ x }}>
        {[...Array(4)].map((_, i) =>
          images.map((svg, index) => (
            <img
              key={`${i}-${index}`}
              className="px-20 py-20 object-contain h-full min-w-[300px] bg-black rounded-xl border border-white"
              src={svg}
              alt="svg"
            />
          ))
        )}
      </motion.div>
    </div>
  );
}

function PageFivth() {
  const pageFiveRef = useRef(null);
  const darkoverlay = useRef();

  const images = [
    'src/assets/svgsss/feastables.svg',
    'src/assets/svgsss/hydrant.svg',
    'src/assets/svgsss/olea.svg',
    'src/assets/svgsss/olipop.svg',
    'src/assets/svgsss/youthtothepeople.svg',
  ];

  useGSAP(() => {
    gsap.fromTo(darkoverlay.current, {
      opacity: 0,
    }, {
      opacity: 0.8,
      ease: "linear",
      scrollTrigger: {
        trigger: darkoverlay.current,
        start: "top -40%",
        end: "top -130%",
        scrub: true,
      },
    })
  });

  return (
    <>
      <div className='z-10 absolute top-0 left-0 h-[170vh] w-screen bg-black' ref={darkoverlay}></div>
      <div className="relative h-[130vh] w-screen flex flex-col gap-48 pt-24 overflow-hidden" ref={pageFiveRef}>
        <View className="absolute w-full h-full left-0 top-0">
          <Bottle pageFiveRef={pageFiveRef} />
          <Container pageFiveRef={pageFiveRef} />
          <Environment files="/hdr/lobby.hdr" environmentIntensity={1} />
        </View>
        <span className='h-max w-full px-10 z-10'>
          <h2 className='text-[5.313rem] text-white leading-[4.875rem] text-right uppercase font-most font-normal mb-3'>
            STOP FIGHTING WITH <br /> FLOWS. USE REPEAT.
          </h2>
          <Button 
            heading={<h1 className="text-[2.15rem] font-main font-normal">BOOK A DEMO</h1>} 
            paddingx={4.8} 
            paddingy={2.4} 
            svgheight={1.6} 
            gap={1.5} 
            margintop="mt-2" 
            marginleft="ml-[61.6rem]" 
            border="border-white"
          />
        </span>
        <ParallaxImages images={images} baseVelocity={-10} />
      </div>
    </>
  );
}

export default PageFivth;