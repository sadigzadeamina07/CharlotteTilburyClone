import React from "react"
import { Link } from "react-router"
import ServiceFoundationMatch from "/assets/img/SkinMatches/FoundationShadeMatch.png"
import ServiceLipstickMatch from "/assets/img/SkinMatches/LipstickShadeMatch.png"
import ServiceSkinAnalysis from "/assets/img/SkinMatches/AnalyseYourSkin.png"
import ServiceOnlineConsultation from "/assets/img/SkinMatches/OnlineBeautyConsultation.jpeg"

function PerfectMatches() {
  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="text-center text-[#3a080a] px-3">
        <h3 className="text-[28px] p-[24px] font-semibold font-optima">
          Find Your Perfect Makeup + Skincare Matches
        </h3>
        <div className="grid flex-wrap grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-[24px]">
          <div className="hover:underline flex flex-col items-center">
            <Link to="/home">
              <img
                src={ServiceFoundationMatch}
                className="h-[42vh] w-fit object-cover"
                alt="Foundation Shade Match"
              />
            </Link>
            <Link to="/home" className="p-[1rem]">
              Foundation Shade Match
            </Link>
          </div>
          <div className="hover:underline flex flex-col items-center">
            <img
              src={ServiceLipstickMatch}
              className="h-[42vh] w-fit object-cover"
              alt="Lipstick Shade Match"
            />
            <Link to="/home" className="p-[1rem]">
              Lipstick Shade Match
            </Link>
          </div>
          <div className="hover:underline flex flex-col items-center">
            <img
              src={ServiceSkinAnalysis}
              className="h-[42vh] w-fit object-cover"
              alt="Analyse Your Skin"
            />
            <Link to="/home" className="p-[1rem]">
              Analyse Your Skin
            </Link>
          </div>
          <div className="hover:underline flex flex-col items-center">
            <img
              src={ServiceOnlineConsultation}
              className="h-[42vh] w-fit object-cover"
              alt="Book a 1:1 Online Beauty Consultation"
            />
            <Link to="/home" className="p-[1rem]">
              Book a 1:1 Online Beauty Consultation
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PerfectMatches
