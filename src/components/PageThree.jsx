import React ,{useRef} from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function PageThree() {

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
    <div className="relative h-[130vh] w-screen bg-yelloww flex rounded-t-[5rem] px-10">
      <div className='absolute top-0 left-0 h-[170vh] w-screen bg-black' ref={darkoverlay}></div>
      <div className="w-[59%] h-max mt-96 pt-28">
        <h2 className="text-[5.313rem] leading-[4.875rem] text-left uppercase font-most font-normal">
          Automatically <br />
          offer the right
          <br /> products
        </h2>
        <h5 className="leading-6 text-[1.333rem] font-most font-normal mt-6">
          With Repeat, the content of every message you
          <br /> send is automatically personalized based on what
          <br /> each customer purchased in the past. Our
          <br /> dynamic content tailors each message without
          <br /> creating a mess of branching logic.
        </h5>
      </div>
      <div className="border border-black w-[41%] h-[64%] rounded-3xl mt-48">
        <img
          className="w-full h-full object-cover rounded-3xl"
          src="src\assets\svgsss\svgexport-18.svg"
          alt=""
        />
      </div>
    </div>
  );
}

export default PageThree;
