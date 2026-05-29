import React from "react"
import { Link } from "react-router"
import PromoMiniSkincareDuo from "/assets/img/Exclusives/FreeMiniSkincareDuo.webp"
import PromoLoyaltyGift from "/assets/img/Exclusives/ExclusiveLoyaltyGift.png"
import PromoBridalBeautyKit from "/assets/img/Exclusives/ExclusiveBridalBeautyKit.png"
import PromoSkincareDiscount from "/assets/img/Exclusives/SkincareKits.webp"

function Exclusives() {
  return (
    <div className="bg-[#f5f3f3] px-3">
      <div className="max-w-[1300px] mx-auto">
        <div className="text-center text-[#3a080a]">
          <h3 className="text-[28px] p-[24px] font-optima">
            Charlotte Tilbury Exclusives
          </h3>
          <div className="grid flex-wrap grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-[24px]">
            <div className="hover:underline flex flex-col items-center">
              <img
                src={PromoMiniSkincareDuo}
                className="h-[42vh] w-fit object-cover"
                alt="Free Mini Skincare Duo"
              />
              <Link to="/home" className="p-[1rem]">
                Free Mini Skincare Duo!
              </Link>
            </div>
            <div className="hover:underline flex flex-col items-center">
              <img
                src={PromoLoyaltyGift}
                className="h-[42vh] w-fit object-cover"
                alt="Exclusive Loyalty Gift"
              />
              <Link to="/home" className="p-[1rem]">
                Unlock An Exclusive Loyalty Gift!
              </Link>
            </div>
            <div className="hover:underline flex flex-col items-center">
              <img
                src={PromoBridalBeautyKit}
                className="h-[42vh] w-fit object-cover"
                alt="Exclusive Bridal Beauty Kit"
              />
              <Link to="/home" className="p-[1rem]">
                NEW! App-Exclusive Bridal Beauty Kit!
              </Link>
            </div>
            <div className="hover:underline flex flex-col items-center">
              <img
                src={PromoSkincareDiscount}
                className="h-[42vh] w-fit object-cover"
                alt="Skincare Kits"
              />
              <Link to="/home" className="p-[1rem]">
                Up To 15% Off Skincare Kits!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Exclusives
