import React from "react"
import { Link } from "react-router"
import CategoryMakeup from "/assets/img/ShopByCategory/MakeUp.png"
import CategorySkincare from "/assets/img/ShopByCategory/Skincare.png"
import CategoryFoundation from "/assets/img/ShopByCategory/Foundation.webp"
import CategoryNewIn from "/assets/img/ShopByCategory/Newin.webp"

function ShopByCategory() {
  return (
    <div className="max-w-[1300px] mx-auto">
      <div className="text-center px-3">
        <h3 className="font-optima text-[28px] p-[24px]">Shop By Category</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 mb-[24px]">
          <div className="hover:underline flex flex-col items-center">
            <Link to="/home">
              <img
                src={CategoryMakeup}
                className="h-[42vh] w-fit object-cover"
                alt="Makeup Category"
              />
            </Link>
            <Link to="/home" className="p-[1rem]">
              Makeup
            </Link>
          </div>
          <div className="hover:underline flex flex-col items-center">
            <img
              src={CategorySkincare}
              className="h-[42vh] w-fit object-cover"
              alt="Skincare Category"
            />
            <Link to="/home" className="p-[1rem]">
              Skincare
            </Link>
          </div>
          <div className="hover:underline flex flex-col items-center">
            <img
              src={CategoryFoundation}
              className="h-[42vh] w-fit object-cover"
              alt="Foundation Category"
            />
            <Link to="/home" className="p-[1rem]">
              Foundation
            </Link>
          </div>
          <div className="hover:underline flex flex-col items-center">
            <img
              src={CategoryNewIn}
              className="h-[42vh] w-fit object-cover"
              alt="New In Category"
            />
            <Link to="/home" className="p-[1rem]">
              New In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShopByCategory
