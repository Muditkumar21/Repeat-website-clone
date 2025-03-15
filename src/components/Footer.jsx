import React from "react";
import SmallButton from "./SmallButton";
import { motion } from "framer-motion";

function Footer() {
    const headings = [
        "FROM EMAIL",
        "FROM SMS",
        "FROM QR CODES",
        "SUBSCRIPTION PAGES",
        {
          text: "SUPPORT",
          icon: "src/assets/images/svgexport-26.png"
        }
      ];

      const headingsTwo = [
        "ABOUT US",
        "COMMUNITY",
        {
          text: "PARTNERS",
          icon: "src/assets/images/svgexport-26.png"
        },
        {
            text: "GET IN TOUCH",
            icon: "src/assets/images/svgexport-26.png"
        },
        "PRIVACY",
        "TERMS"
      ];

      const headingsThree = [
        "RESOURCES HUB",
        {
          text: "BLOG",
          icon: "src/assets/images/svgexport-26.png"
        },
        {
            text: "PODCAST",
            icon: "src/assets/images/svgexport-26.png"
        },
        {
            text: "NEWSLETTER",
            icon: "src/assets/images/svgexport-26.png"
        },
      ];

      const headingsFourth = [
        {
          text: "LINKEDIN",
          icon: "src/assets/images/svgexport-26.png"
        },
        {
            text: "TWITTER",
            icon: "src/assets/images/svgexport-26.png"
        },
        {
            text: "INSTAGRAM",
            icon: "src/assets/images/svgexport-26.png"
        },
        {
            text: "TIKTOK",
            icon: "src/assets/images/svgexport-26.png"
        }
      ];

      const images = [
        "src/assets/svgsss/svgexport-28.svg",
        "src/assets/svgsss/svgexport-28.svg",
        "src/assets/svgsss/svgexport-28.svg",
        "src/assets/svgsss/svgexport-28.svg",
      ];

  return (
    <div className="h-[85vh] w-full bg-black pl-10 pr-10 pb-10">
      <div className="h-full w-full pt-16 rounded-[2.5rem] bg-yelloww flex flex-col justify-center items-center overflow-hidden">
        <div className=" h-2/3 w-full grid grid-cols-6 grid-rows-1 gap-5 pr-20">
          <div className="col-span-2 pl-10">
            <h3 className="text-2xl leading-none font-main mb-7">
              SUBSCRIBE FOR FRESH <br /> CONTENT & PRODUCT UPDATES.
            </h3>
            <input
              className="mb-4 h-12 w-[25rem] bg-transparent border border-black rounded-lg focus:outline-none placeholder:text-slate-500 font-main text-opacity-5 pl-6"
              type="email"
              name="email"
              placeholder="ENTER YOUR EMAIL..."
            />
            <SmallButton
              heading={<h5>SUBSCRIBE</h5>}
              paddingx={1.5}
              paddingy={0.75}
              svgheight={0.75}
              gap={0.75}
              bg = "bg-yelloww" circle="bg-black" maintext="text-white" extratext="text-black" arrow="#F5FF7D" border="border-black"
            />
          </div>
          <div className=" ml-20">
            <h6 className=" font-main text-xs font-light mb-5">PRODUCT</h6>
            <div className="flex flex-col gap-2">
              {headings.map((item, index) => (
                typeof item === "string" ? (
                  <h5 key={index} className="w-48 font-main font-medium">{item}</h5>
                ) : (
                  <span key={index} className="flex gap-[0.2rem] items-center">
                    <h5 className="font-main font-medium">{item.text}</h5>
                    <img className="h-3" src={item.icon} alt="Support Icon" />
                  </span>
                )
              ))}
            </div>
          </div>
          <div className=" ml-[5rem]">
            <h6 className="font-main text-xs font-light mb-5">COMPANY</h6> 
            <div className="flex flex-col gap-2">
              {headingsTwo.map((item, index) => (
                typeof item === "string" ? (
                  <h5 key={index} className=" font-main font-medium">{item}</h5>
                ) : (
                  <span key={index} className="flex gap-[0.2rem] items-center">
                    <h5 className="font-main font-medium">{item.text}</h5>
                    <img className="h-3" src={item.icon} alt="Support Icon" />
                  </span>
                )
              ))}
            </div>
          </div>
          <div className="ml-8">
            <h6 className="font-main text-xs font-light mb-5">CONTENT</h6> 
            <div className="flex flex-col gap-2">
              {headingsThree.map((item, index) => (
                typeof item === "string" ? (
                  <h5 key={index} className=" font-main font-medium">{item}</h5>
                ) : (
                  <span key={index} className="flex gap-[0.2rem] items-center">
                    <h5 className="font-main font-medium">{item.text}</h5>
                    <img className="h-3" src={item.icon} alt="Support Icon" />
                  </span>
                )
              ))}
            </div>
          </div>
          <div>
            <h6 className="font-main text-xs font-light mb-5">SOCIAL</h6> 
            <div className="flex flex-col gap-2">
              {headingsFourth.map((item, index) => (
                typeof item === "string" ? (
                  <h5 key={index} className="font-main font-medium">{item}</h5>
                ) : (
                  <span key={index} className="flex gap-[0.2rem] items-center">
                    <h5 className="font-main font-medium">{item.text}</h5>
                    <img className="h-3" src={item.icon} alt="Support Icon" />
                  </span>
                )
              ))}
            </div>
          </div>
        </div>
        <div className="h-1/3 w-full flex">
                <motion.div initial={{ x: 0 }} animate={{ x: "-100%" }} transition={{ repeat: Infinity, duration: 25 , ease: "linear" }}  className="h-[60%] w-full flex flex-shrink-0 whitespace-nowrap flex-nowrap gap-2 mt-10">
                    {images.map((item, index) => <img key={index} className="object-cover" src={item} alt="" />)}
                </motion.div>
            </div>
      </div>
    </div>
  );
}

export default Footer;