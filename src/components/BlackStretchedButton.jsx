import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function BlackStretchedButton({ heading, paddingx, paddingy, svgheight, gap, margintop, marginleft, marginright }) {
  const container = useRef();
  const firstCircleRef = useRef();
  const mainArrowRef = useRef();
  const extraArrowRef = useRef();
  const mainTextRef = useRef();
  const extraTextRef = useRef();
  const copyRef = useRef();
  
  const isHovered = useRef(false);
  const leaveTimeline = useRef();

  useGSAP(() => {
    // Set initial states
    gsap.set(firstCircleRef.current, { scale: 20 });
    gsap.set(extraArrowRef.current, { opacity: 0 });
  
    const resetElements = () => {
      gsap.set(firstCircleRef.current, { scale: 20, x: 0 });
      gsap.set(mainArrowRef.current, { x: 0, opacity: 1 });
      gsap.set(extraArrowRef.current, { opacity: 0, right: "76%", x: 0 });
      gsap.set(mainTextRef.current, { x: 0, opacity: 1 });
      gsap.set(extraTextRef.current, { x: 0 });
      gsap.set(copyRef.current, { opacity: 0, left: "-30rem" });
    };
  
    const resetOtherElements = () => {
      gsap.set(firstCircleRef.current, { scale: 20, x: 0 });
      gsap.set(mainArrowRef.current, { x: 0, opacity: 1 });
      gsap.set(extraArrowRef.current, { opacity: 0, right: "76%", x: 0 });
      gsap.set(mainTextRef.current, { x: 0, opacity: 1 });
      gsap.set(extraTextRef.current, { x: 0 });
    };
  
    const onEnter = () => {
      isHovered.current = true;
      gsap.killTweensOf([
        firstCircleRef.current, 
        mainArrowRef.current, 
        extraArrowRef.current, 
        mainTextRef.current, 
        extraTextRef.current, 
        copyRef.current
      ]);
      
      if (leaveTimeline.current) {
        leaveTimeline.current.kill();
        leaveTimeline.current = null;
      }
      
      resetElements();
  
      gsap.timeline()
        .to(firstCircleRef.current, { scale: 1, duration: 0.5 })
        .to(mainArrowRef.current, { x: "30rem", opacity: 0, duration: 0.6 }, 0)
        .to(extraArrowRef.current, { right: "11.5%", duration: 0.5 }, 0.1)
        .to(extraArrowRef.current, { opacity: 1, duration: 0.3 }, 0.3)
        .to(mainTextRef.current, { x: "200%", opacity: 0, duration: 0.6 }, 0);
    };
  
    const onLeave = () => {
      isHovered.current = false;
      gsap.killTweensOf([
        firstCircleRef.current, 
        mainArrowRef.current, 
        extraArrowRef.current, 
        mainTextRef.current, 
        extraTextRef.current, 
        copyRef.current
      ]);
      
      const tl = gsap.timeline();
      leaveTimeline.current = tl;
      
      tl.to(firstCircleRef.current, { x: "1000rem", duration: 0.5 })
        .to(extraArrowRef.current, { x: "20rem", duration: 0.5 }, 0)
        .to(extraTextRef.current, { x: "200%", duration: 0.5 }, 0)
        .to(copyRef.current, { opacity: 1, left: "0", duration: 0.3 }, 0)
        .add(() => resetOtherElements(), 2)
        .to(copyRef.current, { 
          opacity: 0,
          duration: 0.6
        }, 2)
        .add(() => {
          gsap.set(copyRef.current, { left: "-30rem" });
          leaveTimeline.current = null;
        }, 2.6);
    };
  
    const containerEl = container.current;
    containerEl.addEventListener("mouseenter", onEnter);
    containerEl.addEventListener("mouseleave", onLeave);
  
    return () => {
      containerEl.removeEventListener("mouseenter", onEnter);
      containerEl.removeEventListener("mouseleave", onLeave);
    };
  }, { scope: container });

  return (
    <div>
      <div
        ref={container}
        style={{ 
          padding: `${paddingy}rem ${paddingx}rem`, 
          gap: `${gap}rem`,
        }}
        className={`relative ${margintop} ${marginleft} ${marginright} inline-flex justify-center items-center text-base font-main border-solid border bg-yelloww border-black rounded-full whitespace-nowrap overflow-hidden`}
      >
        <div ref={extraArrowRef} className="z-[1] absolute top-[37.5%] right-[76%]">
          <svg
            style={{ height: `${svgheight}rem` }}
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6 12c.1-3 1.8-5 4.4-5.2V5.1c-2.6-.2-4.3-2-4.4-5.1l-2 .4a6.2 6.2 0 0 0 1.1 3c.7 1 1.4 1.5 2.2 1.7H0v1.7h13c-1 .3-1.6.9-2.3 1.8a6.2 6.2 0 0 0-1 3l1.9.4Z"
              fill="#F5FF7D"
            />
          </svg>
        </div>
        <div ref={extraTextRef} className="absolute left-[2.5rem] font-main text-base text-black">
          {heading}
        </div>
        <div ref={firstCircleRef} className="absolute top-[18%] right-[9%] w-[2rem] h-[2rem] rounded-full bg-black" />
        <div ref={copyRef} style={{ 
          padding: `${paddingy}rem ${paddingx}rem`, 
          gap: `${gap}rem`,
        }}
        className="absolute z-[3] left-[-30rem] inline-flex justify-center items-center text-base font-main bg-black rounded-full whitespace-nowrap"
        >
          <svg
            style={{ zIndex: 1, height: `${svgheight}rem` }}
            viewBox="0 0 16 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.6 12c.1-3 1.8-5 4.4-5.2V5.1c-2.6-.2-4.3-2-4.4-5.1l-2 .4a6.2 6.2 0 0 0 1.1 3c.7 1 1.4 1.5 2.2 1.7H0v1.7h13c-1 .3-1.6.9-2.3 1.8a6.2 6.2 0 0 0-1 3l1.9.4Z"
              fill="#F5FF7D"
            />
          </svg>
          <div className="text-white" > {heading} </div>
        </div>
        <svg
          ref={mainArrowRef}
          style={{ zIndex: 1, height: `${svgheight}rem` }}
          viewBox="0 0 16 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6 12c.1-3 1.8-5 4.4-5.2V5.1c-2.6-.2-4.3-2-4.4-5.1l-2 .4a6.2 6.2 0 0 0 1.1 3c.7 1 1.4 1.5 2.2 1.7H0v1.7h13c-1 .3-1.6.9-2.3 1.8a6.2 6.2 0 0 0-1 3l1.9.4Z"
            fill="#F5FF7D"
          />
        </svg>
        <div ref={mainTextRef} className="z-[1] text-white">{heading}</div>
      </div>
    </div>
  );
}

export default BlackStretchedButton;