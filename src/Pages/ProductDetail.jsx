import React, { useState } from "react";
import { Link, useLocation } from "react-router";
import { Heart, ChevronDown, Ruler } from "lucide-react";
import ProductGallery from "../Component/ProductGallery";
import { useProduct, staticProductDetail } from "../Context/DataContext";

function ProductDetail() {
  const { formatPrice, selectedCountry } = useProduct();
  const location = useLocation();

  const product = location.state?.product || staticProductDetail;

  const defaultShade =
    product.selectedShade ||
    product.shades?.[0] ||
    { name: product.subtitle || "", galleryImages: product.galleryImages || [], swatchImage: "" };

  const [selectedShade, setSelectedShade] = useState(defaultShade);
  const [purchaseType, setPurchaseType] = useState("one-time");

  const isSubscribe = purchaseType === "subscribe";

  const infoSections = [
    "THE MAGIC & SCIENCE",
    "MAGIC INGREDIENTS",
    "ABOUT THE PRODUCT",
    "SHIPPING & DELIVERY INFORMATION",
  ];

  return (
    <div className="min-h-screen bg-white pt-6 pb-20">
      <div className="max-w-[1470px] mx-auto px-4 md:px-8">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-[#856d6d] uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-[#340c0c] transition-colors">HOME</Link>
          <span className="text-[#eae6e6]">/</span>
          <Link to="/makeup" className="hover:text-[#340c0c] transition-colors">
            {staticProductDetail.category}
          </Link>
          <span className="text-[#eae6e6]">/</span>
          <span className="text-[#340c0c] line-clamp-1">{staticProductDetail.title}</span>
        </div>

        {/* Main layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-start">

          {/* Left - Gallery */}
          <div className="w-full lg:w-[58%]">
            <ProductGallery
              galleryImages={selectedShade.galleryImages}
              productName={staticProductDetail.title}
            />
          </div>

          {/* Right - Product info */}
          <div className="w-full lg:w-[42%] lg:sticky lg:top-[100px] flex flex-col text-[#340c0c]">

            {/* Title + Wishlist button */}
            <div className="flex justify-between items-start mb-2">
              <h1 className="text-[28px] font-normal uppercase leading-tight pr-4">
                {product.title}
              </h1>
              <button className="p-2 hover:bg-[#f5f5f5] rounded-full transition-colors">
                <Heart size={24} strokeWidth={1} color="#340c0c" />
              </button>
            </div>

            {/* Selected shade name */}
            <p className="text-[14px] uppercase text-[#856d6d] tracking-wide mb-4">
              {selectedShade.name}
            </p>

            {/* Price */}
            <p className="text-[20px] font-bold mb-6">
              {formatPrice(product.price, selectedCountry)}
            </p>

            {/* Shade selector */}
            <div className="mb-6">
              <div className="flex gap-2 border border-[#eae6e6] p-3 mb-4 cursor-pointer hover:border-[#340c0c] transition-colors">
                <div className="w-[30px] h-[30px] overflow-hidden bg-[#f5f5f5]">
                  <img
                    src={selectedShade.swatchImage}
                    alt={selectedShade.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex justify-between items-center text-[13px] font-bold">
                  <span>{selectedShade.name}</span>
                  <ChevronDown size={18} />
                </div>
              </div>

              <div className="flex gap-2 flex-wrap">
                {product.shades.map((shade) => (
                  <button
                    key={shade.name}
                    onClick={() => setSelectedShade(shade)}
                    title={shade.name}
                    className={
                      selectedShade.name === shade.name
                        ? "w-[45px] h-[45px] overflow-hidden border-2 border-[#340c0c] scale-110 transition-all outline-none"
                        : "w-[45px] h-[45px] overflow-hidden border-2 border-transparent hover:border-[#eae6e6] transition-all outline-none"
                    }
                  >
                    <img
                      src={shade.swatchImage}
                      alt={shade.name}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase options */}
            <div className="flex flex-col gap-4 mb-8">

              {/* How to apply button */}
              <button className="w-full border border-[#340c0c] py-3 uppercase text-[12px] font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-[#f5f5f5] transition-colors">
                <Ruler size={16} />
                HOW TO APPLY
              </button>

              {/* Purchase type toggle */}
              <div className="border border-[#eae6e6]">

                {/* One-time purchase */}
                <label className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${purchaseType === "one-time" ? "bg-[#fcfcfc]" : ""}`}>
                  <input
                    type="radio"
                    name="purchaseType"
                    checked={purchaseType === "one-time"}
                    onChange={() => setPurchaseType("one-time")}
                    className="accent-[#340c0c] w-4 h-4 cursor-pointer"
                  />
                  <div className="flex-1 flex justify-between items-center text-[14px]">
                    <span>One-time purchase</span>
                    <span>{formatPrice(product.price, selectedCountry)}</span>
                  </div>
                </label>

                <div className="h-[1px] bg-[#eae6e6]" />

                {/* Subscribe */}
                <label className={`flex items-start gap-4 p-4 cursor-pointer transition-colors ${isSubscribe ? "bg-[#fcfcfc]" : ""}`}>
                  <input
                    type="radio"
                    name="purchaseType"
                    checked={isSubscribe}
                    onChange={() => setPurchaseType("subscribe")}
                    className="accent-[#340c0c] w-4 h-4 mt-1 cursor-pointer"
                  />
                  <div className="flex-1 text-[14px]">
                    <div className="flex justify-between items-center mb-1">
                      <span>Subscribe + save 15%</span>
                      <span>$42.50</span>
                    </div>
                    <p className="text-[#856d6d] text-[12px] leading-relaxed mb-2">
                      Save a magical 15% and enjoy free standard delivery on every scheduled order!
                    </p>
                    {isSubscribe && (
                      <select className="w-full border border-[#eae6e6] p-2 text-[13px] outline-none focus:border-[#340c0c] mt-3">
                        <option>every 3 months</option>
                        <option>every 4 months</option>
                      </select>
                    )}
                  </div>
                </label>
              </div>

              {/* Add to bag button */}
              <button className="w-full bg-[#340c0c] text-white py-4 uppercase text-[14px] font-bold tracking-widest hover:bg-[#1e0505] transition-colors shadow-lg mt-2">
                {isSubscribe ? "SET UP SUBSCRIPTION" : "ADD TO BAG"}
              </button>
            </div>

            {/* Product description */}
            <p className="text-[13px] text-[#340c0c] mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Info accordion sections */}
            <div className="border-t border-[#eae6e6]">
              {infoSections.map((title) => (
                <div
                  key={title}
                  className="border-b border-[#eae6e6] py-4 flex justify-between items-center cursor-pointer hover:bg-[#fcfcfc] transition-colors px-2"
                >
                  <span className="uppercase text-[12px] font-bold tracking-wider">{title}</span>
                  <ChevronDown size={16} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
