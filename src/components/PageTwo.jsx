import React ,{useRef} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function PageTwo() {

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
    <div className="relative h-[130vh] w-screen bg-[#FFFFFF] flex rounded-t-[5rem] px-10">
      <div className='absolute top-0 left-0 h-[170vh] w-screen bg-black' ref={darkoverlay}></div>
      <div className="w-[59%] h-max mt-96 pt-28">
        <h2 className="text-[5.313rem] leading-[4.875rem] text-left uppercase font-most font-normal">
          Automatically <br /> trigger your <br /> reorder flows
        </h2>
        <h5 className="leading-6 text-[1.333rem] font-most font-normal mt-6">
          Repeat triggers email & SMS messaging when a <br /> customer is ready
          to buy again. By analyzing your <br /> store’s reorder intervals on a
          per-SKU and per- <br />
          customer basis, we get the timing just right.
        </h5>
      </div>
      <div className="w-[41%] h-[64%] rounded-3xl mt-48 overflow-hidden">
        <img className="w-full h-full object-cover rounded-3xl" src="src\assets\svgsss\svgexport-15.svg" alt="" />
      </div>
    </div>
  );
}

export default PageTwo;