import React, { useRef, useState, useEffect } from 'react';
import { CiCirclePlus } from "react-icons/ci";
import BlackStretchedButton from './BlackStretchedButton';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function PageOne() {
  const itemsData = [
    {
      title: '4x Revenue from flows',
      text: 'With Repeat’s flow automation, Kopari was able to consolidate a complex web of post purchase email flows in a single optimized one, resulting in 4x more revenue from automations.',
      buttonText: 'SIMPLIFY EMAIL FLOWS',
      gap: '3.85rem',
      image: 'src/assets/images/Repeat_Homepage-03-Kopari.avif'
    },
    {
      title: '+15% Conversion Rate',
      text: 'Dr. Squatch relies on Repeat’s reorder automations to time their SMS notifications. Each message is sent when a customer is likely running low. Resulting in a +15% conversion rate.',
      buttonText: 'SIMPLIFY SMS FLOWS',
      gap: '5.6rem',
      image: 'src/assets/images/Repeat_Homepage-02-Squatch.avif'
    },
    {
      title: '+30% Average Order Value',
      text: 'Olipop uses reorder automation across their email strategy to always give returning customers an easy path to restock. leading to a 30% increase in AOV from those customers.',
      buttonText: 'OLIPOP CASE STUDY',
      gap: '1.35rem',
      image: 'src/assets/images/Repeat_Homepage-01-Olipop.avif'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef([]);
  const iconRefs = useRef([]);

  useEffect(() => {
    itemRefs.current.forEach((ref, index) => {
      gsap.set(ref, { height: index === 0 ? '26.5rem' : '7rem' });
      gsap.set(ref.querySelector('p'), { opacity: index === 0 ? 1 : 0 });
    });

    iconRefs.current.forEach((ref, index) => {
      gsap.set(ref, { opacity: index === 0 ? 0 : 1, rotation: 0 });
    });
  }, []);

  const handleClick = (index) => {
    if (index === activeIndex) return;
    const previousActive = activeIndex;

    // Animate out previous active
    gsap.to(itemRefs.current[previousActive], { height: '7rem', duration: 0.5 });
    gsap.to(itemRefs.current[previousActive].querySelector('p'), { opacity: 0, duration: 0.1 });
    gsap.to(iconRefs.current[previousActive], {
      opacity: 1,
      rotation: -90,
      duration: 0.3,
      ease: "power1.in",
    });

    // Animate in new active
    gsap.to(itemRefs.current[index], { height: '26.5rem', duration: 0.5 });
    gsap.to(itemRefs.current[index].querySelector('p'), { opacity: 1, duration: 0.1 });
    gsap.to(iconRefs.current[index], {
      opacity: 0,
      rotation: 100,
      duration: 0.3,
      ease: "power1.in",
    });

    setActiveIndex(index);
  };  

  //overlayeffectby Krish the great
  const darkoverlay = useRef();

  useGSAP(() => {
      gsap.fromTo(darkoverlay.current, {
          opacity: 0,
          }, {
          opacity: 0.4,
          ease: "linear",
          scrollTrigger: {
              trigger: darkoverlay.current,
              start: "top -40%",
              end: "top -130%",
              scrub: true,
              // markers: true
          },
      });
  });

  return (
      <div className='relative h-[130vh] bg-skin w-screen rounded-t-[5rem] pt-24 px-10 z-10'>
        <div className='absolute top-0 left-0 h-[160vh] w-screen bg-black pointer-events-none' ref={darkoverlay}></div>
        <div className='mb-20'>
          <h2 className='text-[5.313rem] leading-[4.875rem] text-right uppercase font-most font-normal'>
            Get more from your automations and flows
          </h2>
        </div>
        <div className="border border-black rounded-[2rem] h-[69%] w-full flex flex-row justify-center items-center overflow-hidden">
          <div className='h-full w-[35%] border-r border-black'>
            {itemsData.map((item, index) => (
              <div
                key={index}
                ref={el => itemRefs.current[index] = el}
                className={`overflow-hidden cursor-pointer transition-colors duration-200 ${
                  index < itemsData.length - 1 ? 'border-b border-black' : ''
                }`}
                onClick={() => handleClick(index)}
                style={{ backgroundColor: activeIndex === index ? '#F5FF7D' : 'transparent' }}
              >
                <div className="flex items-center px-6 pt-10 mb-2" style={{ gap: item.gap }}>
                  <h3 className='uppercase text-[1.6rem] font-main font-normal'>{item.title}</h3>
                  <div ref={el => iconRefs.current[index] = el}>
                    <CiCirclePlus className='text-[2.5rem]' />
                  </div>
                </div>
                <p className='px-6 font-most text-[1.05rem] leading-5 pb-5'>{item.text}</p>
                <BlackStretchedButton 
                  heading={<h5>{item.buttonText}</h5>} 
                  paddingx={2} 
                  paddingy={0.75} 
                  svgheight={0.75} 
                  gap={2} 
                  marginleft="ml-6" 
                />
              </div>
            ))}
          </div>
          <div className='h-full w-[65%]'>
            <img 
              src={itemsData[activeIndex].image} 
              alt='Active item' 
              className='h-full w-full object-cover' 
            />
          </div>
        </div>
      </div>
  );
}

export default PageOne;