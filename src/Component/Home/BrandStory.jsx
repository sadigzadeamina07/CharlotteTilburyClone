import React, { useState, useRef } from 'react'; 
import BrandStoryVideo from '/assets/img/LEGENDARY_ORIGIN_EN_360.mp4';
import { TbDiamondsFilled } from "react-icons/tb";
import { Volume2, VolumeOff } from 'lucide-react';
import { MdPause } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
function BrandStory() {
    
    const [isMuted, setIsMuted] = useState(true)
    const [isPaused, setIsPaused] = useState(false)
           const videoRef = useRef(null);
    const toggleMute = () => {
       setIsMuted(!isMuted)
    }
   const togglePause = () => {
       setIsPaused(!isPaused);
       
       if (videoRef.current) {
           if (!isPaused) {
               videoRef.current.pause();
           } else {
               videoRef.current.play();
           }
       }
    }
    return (
        <div className="max-w-[900px] mx-auto mb-8">
            <div className="bg-[#f5f5f5] text-center">
                <h3 className='text-3xl py-4 font-optima'>Legendary Beauty For A Reason</h3>
                <div className="relative w-fit m-auto ">
      <video ref={videoRef} src={BrandStoryVideo} autoPlay muted={isMuted} loop playsInline className="" />
                <div onClick={toggleMute} className=" absolute  p-2 bottom-4 right-4  flex items-center bg-[#ffffffe6] rounded-full h-fit">
                {isMuted ? <VolumeOff size={14} /> : <Volume2 size={14} />}
                </div>
                <div onClick={togglePause} className=" absolute  p-2 bottom-4 right-13  flex items-center bg-[#ffffffe6] rounded-full h-fit">
                {isPaused ? <FaPlay  size={14} /> : <MdPause size={14} />}
                </div>
                </div>
        


                <p className='py-6 flex gap-3  md:flex-row flex-col justify-center items-center font-bold font-helveticaN uppercase'><span> Makeup artist to the stars </span> <TbDiamondsFilled size={22} style={{ transform: 'scaleX(0.7)' }} /> <span>Skincare performance expert </span> <TbDiamondsFilled size={22} style={{ transform: 'scaleX(0.7)' }} /><span> Fragrance innovator </span> </p>
            </div>
        </div>
    );
}

export default BrandStory;