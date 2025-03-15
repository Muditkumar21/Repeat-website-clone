import React from 'react'
import Button from './Button'

function Hero() {
  return (
    <>
        <div className="absolute bottom-[28%] left-10">
          <div className='mb-16'>
            <h1 className=" leading-6 text-[8.8vw] font-most font-normal mb-16">THE EASIEST WAY</h1>
            <div className="flex items-center gap-3">
              <img className="h-[102.4px]" src="src\assets\images\Group_48096082.avif" alt="" />
              <h1 className="text-[8.8vw] leading-10 font-most font-normal mb-3">TO AUTOMATE</h1>
            </div>
            <div className='flex items-center gap-24'>
              <h1 className="text-[8.8vw] leading-[8vw] font-most font-normal">REORDERING</h1>
              <Button heading = {<h1 className="text-[2.15rem] font-main font-normal z-[1]">BOOK A DEMO</h1>} paddingx = {4.8} paddingy = {2.4} svgheight = {1.6} gap = {1.5} margintop = {"mt-2"} marginleft={"ml-3"} border = {"border-black"}  />
            </div>
          </div>
          <div className="ps-32" >
              <h4 className="leading-none text-[1.7vw] font-most font-normal">
                  Repeat creates better email and SMS <br /> flows by analyzing your
                  customer's <br /> reorder behaviour and automatically turns <br /> that
                  insight into action.
              </h4>
          </div>
        </div>
    </>
  )
}

export default Hero