import React, { useState, useEffect } from "react"
import { Link } from "react-router"
import {
  X,
  Minus,
  Plus,
  Heart,
  ChevronDown,
  ChevronUp,
  Check,
  Lock,
  Tag,
} from "lucide-react"

import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useBasket } from "../Context/BasketContext"
import { useWishlist } from "../Context/WishlistContext"
import { useProduct } from "../Context/DataContext"

function BasketDetail() {
  useEffect(() => {
  window.scrollTo({ top: 0, behavior: "instant" })
}, [])
  const {
    basket,
    updateQuantity,
    removeFromBasket,
    totalPrice,
    totalItems,
    FREE_SHIPPING_THRESHOLD_GBP,
  } = useBasket()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { formatPrice, selectedCountry, convertPrice } = useProduct()
  const [promoOpen, setPromoOpen] = useState(false)
  const [giftOpen, setGiftOpen] = useState(false)
  const totalPriceConverted = convertPrice(totalPrice, selectedCountry)
  const thresholdConverted = convertPrice(FREE_SHIPPING_THRESHOLD_GBP, selectedCountry,)
  const isFreeShipping = basket.length === 0 || totalPriceConverted >= thresholdConverted
  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-4 pb-32 md:pb-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        {/* <div className="border border-[#145633] bg-[#f4f9f6] text-[#145633] p-3 text-[13px] flex items-center gap-2 mb-8 mt-2">
          <Check size={16} strokeWidth={2} />
          <span>Enjoy free delivery on this order</span>
        </div> */}

        {basket.length === 0 ? (
          <div className="text-center py-24 border-t border-[#eae6e6]">
            <p className="text-xl font-optima mb-6 text-[#340c0c] uppercase  ">
              Your bag is currently empty.
            </p>
            <Link
              to="/home"
              className="inline-block border border-[#340c0c] text-[#340c0c] px-12 py-4 uppercase   text-[12px] font-bold hover:bg-[#340c0c] hover:text-white   duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex justify-between items-end mb-6">
                <h1 className="text-[22px] font-optima uppercase   text-[#340c0c]">
                  Your Bag
                </h1>
                <span className="text-[22px] font-optima text-[#340c0c]">
                  {formatPrice(totalPrice, selectedCountry)}
                </span>
              </div>

              <div className="bg-[#cd8c7c] text-white p-6 text-[15px] mb-8 flex items-center justify-between cursor-pointer hover:bg-[#c08273]   shadow-sm">
                <span>
                  Darlings, unlock a free deluxe Airbrush Setting Spray + deluxe
                  Matte Revolution in Pillow Talk Original when you spend over{" "}
                  {formatPrice(95, selectedCountry)}!*
                </span>
              </div>

              {basket.map((item, index) => {
                const image =
                  item.selectedShade?.galleryImages?.[0] ||
                  item.images?.main
                const shadeName = item.selectedShade?.name || item.shade || item.subtitle
                const itemPrice = item.price
                const liked = isInWishlist(item)
                return (
                  <div
                    key={`${item.title}-${shadeName}-${index}`}
                    className="flex gap-6 py-8 border-b border-[#eae6e6] relative group"
                  >
                    <button
                      onClick={() => removeFromBasket(item)}
                      className="absolute top-8 right-0 text-[#856d6d] hover:text-[#340c0c]  p-1 z-10"
                      aria-label="Remove item"
                    >
                      <X size={24} strokeWidth={1} />
                    </button>

                    <Link
                      to="/product"
                      state={{ product: item }}
                      className="w-24 h-24 md:w-32 md:h-32 bg-transparent block overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={item.title}
                        className="w-full h-full object-contain    bg-white  hover:scale-105 duration-700"
                      />
                    </Link>

                    <div className="flex flex-col pr-8 flex-1 justify-between">
                      <div>
                        <Link
                          to="/product"
                          state={{ product: item }}
                          className="block group-hover:text-[#a06464]  "
                        >
                          <h3 className="font-optima uppercase text-[15px] font-bold text-[#340c0c]   line-clamp-2 mb-1  ">
                            {item.title}
                          </h3>
                        </Link>
                        <p className="text-[#856d6d] text-[11px] uppercase  mb-2">
                          {shadeName}
                        </p>
                        <p className="text-[#340c0c] text-[14px] mb-4">
                          {formatPrice(itemPrice, selectedCountry)}
                        </p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-2">
                        <div className="flex items-center border border-[#d6cece] rounded-full      h-9">
                          <button
                            onClick={() =>
                              updateQuantity(item, item.quantity - 1)
                            }
                            className="px-3 text-[#340c0c] hover:text-[#a06464]   flex items-center justify-center h-full"
                          >
                            <Minus size={14} strokeWidth={1} />
                          </button>
                          <span className="w-6 text-center text-[#340c0c] text-[13px]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item, item.quantity + 1)
                            }
                            className="px-3 text-[#340c0c] hover:text-[#a06464]   flex items-center justify-center h-full"
                          >
                            <Plus size={14} strokeWidth={1} />
                          </button>
                        </div>

                        <button
                          onClick={() => toggleWishlist(item)}
                          className="group flex items-center gap-2 text-[12px] text-[#340c0c] hover:text-[#a06464]"
                        >
                          {liked ? (
                            <FaHeart size={16} color="#4a0014" />
                          ) : (
                            <FaRegHeart
                              size={16}
                              className=" group-hover:scale-110"
                            />
                          )}
                          <span style={{ textDecorationLine: 'underline', textUnderlineOffset: '4px', textDecorationThickness: '0.5px' }}>
                            {liked ? "Remove from wishlist" : "Move to wishlist"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── Right: order summary ── */}
            <div className="lg:col-span-5 mt-4 lg:mt-0">
              <div className="lg:sticky lg:top-28">
                <h2 className="font-optima uppercase   text-[14px] text-[#340c0c] mb-3">
                  Loyalty & Promotions
                </h2>

                {/* Loyalty card */}
                <div className="bg-[#591b29] p-6 mb-6 text-white shadow-sm border border-[#4a0014]">
                  <h3 className="font-optima uppercase   text-[14px] mb-5 flex items-center gap-2 font-bold">
                    Unlock Magic Loyalty Rewards
                    <span className="text-[10px]">✦</span>
                  </h3>
                  <ul className="flex flex-col  gap-4 mb-6 text-[13px]">
                    <li className="flex      gap-3">
                      <span className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-[10px]">
                        CT
                      </span>
                      <span className="opacity-90">
                        Earn {Math.floor(totalPrice)} Loyalty coins with this
                        order
                      </span>
                    </li>
                    <li className="flex      gap-3">
                      <span className="w-5 h-5 flex items-center justify-center">
                        <Check size={16} strokeWidth={1.5} />
                      </span>
                      <span className="opacity-90">
                        Get 15% off your first order
                      </span>
                    </li>
                    <li className="flex      gap-3">
                      <span className="w-5 h-5 flex items-center justify-center">
                        <Heart size={14} fill="currentColor" strokeWidth={0} />
                      </span>
                      <span className="opacity-90">
                        See Loyalty rewards waiting for you!
                      </span>
                    </li>
                  </ul>
                  <button className="bg-white text-[#340c0c] text-[12px] font-bold   uppercase py-4 px-6 hover:bg-[#f9f8f6]   w-full shadow-md hover:shadow-lg">
                    Login or create an account
                  </button>
                </div>

                {/* Promo + gift card accordions */}
                <div className="mb-8 border-t border-[#eae6e6]">
                  <div className="border-b border-[#eae6e6] bg-[#fdfcfc]">
                    <button
                      onClick={() => setPromoOpen(!promoOpen)}
                      className="flex w-full items-center justify-between px-4 py-4 text-[13px] text-[#340c0c] hover:bg-[#f9f8f6]  "
                    >
                      <span className="flex items-center gap-2">
                        <Tag size={18} strokeWidth={1.2} />
                        Apply a promo code
                      </span>
                      {promoOpen ? (
                        <ChevronUp size={16} strokeWidth={1.5} />
                      ) : (
                        <ChevronDown size={16} strokeWidth={1.5} />
                      )}
                    </button>
                    {promoOpen && (
                      <div className="p-4 bg-white">
                        <div className="flex border border-[#340c0c] h-12">
                          <input
                            type="text"
                            placeholder="Enter code"
                            className="flex-1 bg-transparent px-4 text-[14px] outline-none text-[#340c0c] placeholder:text-gray-400"
                          />
                          <button className="text-[#340c0c] px-6 text-[12px] font-bold   uppercase hover:bg-[#f9f8f6]   border-l border-[#340c0c]">
                            APPLY
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="border-b border-[#eae6e6] bg-[#fdfcfc]">
                    <button
                      onClick={() => setGiftOpen(!giftOpen)}
                      className="flex w-full items-center justify-between px-4 py-4 text-[13px] text-[#340c0c] hover:bg-[#f9f8f6]  "
                    >
                      <span className="flex items-center gap-2">
                        <Tag size={18} strokeWidth={1.2} />
                        Apply a gift card
                      </span>
                      {giftOpen ? (
                        <ChevronUp size={16} strokeWidth={1.5} />
                      ) : (
                        <ChevronDown size={16} strokeWidth={1.5} />
                      )}
                    </button>
                    {giftOpen && (
                      <div className="p-4 bg-white">
                        <div className="flex border border-[#340c0c] h-12">
                          <input
                            type="text"
                            placeholder="Enter gift card"
                            className="flex-1 bg-transparent px-4 text-[14px] outline-none text-[#340c0c] placeholder:text-gray-400"
                          />
                          <button className="text-[#340c0c] px-6 text-[12px] font-bold   uppercase hover:bg-[#f9f8f6]   border-l border-[#340c0c]">
                            APPLY
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Price breakdown */}
                <div className="flex flex-col  gap-4 text-[13px] text-[#555] mb-6">
                  <div className="flex justify-between font-bold text-[#340c0c]">
                    <span className="uppercase  ">
                      Subtotal ({totalItems} items)
                    </span>
                    <span>{formatPrice(totalPrice, selectedCountry)}</span>
                  </div>
                  <div className="flex justify-between items-center uppercase  ">
                    <span>
                      <span className="normal-case text-[11px]">
                        (Free over {formatPrice(50, selectedCountry)})
                      </span>
                    </span>
                    <span>
                      TBD
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex justify-between items-end text-[#340c0c] mb-6 border-t border-[#eae6e6] pt-4">
                  <span className="font-optima   uppercase text-xl font-bold">
                    Total
                  </span>
                  <span className="text-[22px] font-optima font-bold">
                    {formatPrice(totalPrice, selectedCountry)}
                  </span>
                </div>

                {/* Free samples */}
                <div className="bg-[#fcf1f1] p-5 flex gap-4      mb-6 border border-[#fae6e6]">
                  <div className="flex -gap-2">
                    <div className="w-6 h-8 bg-[#cd8c7c] rotate-[-10deg] border border-white" />
                    <div className="w-6 h-8 bg-[#cd8c7c] rotate-[10deg] border border-white" />
                  </div>
                  <div>
                    <h4 className="text-[#340c0c] font-optima text-[15px] uppercase  mb-1">
                      2 Free Samples with every order!
                    </h4>
                    <p className="text-[#856d6d] text-[12px]">
                      Choose 2 free samples at checkout! Including Charlotte's
                      Fragrance, Skincare & Makeup!
                    </p>
                  </div>
                </div>

                {/* Checkout buttons */}
                <div className="flex flex-col  gap-3 ">
                  <button className="w-full bg-[#340c0c] text-white py-4 px-4 uppercase   text-[13px] font-bold hover:bg-[#2d0a0a] transition-all flex justify-center items-center group shadow-md hover:shadow-lg">
                    <Lock
                      size={16}
                      strokeWidth={1.5}
                      className="mr-3 opacity-80 group-hover:opacity-100   "
                    />
                    <span>
                      Checkout | {formatPrice(totalPrice, selectedCountry)}
                    </span>
                  </button>
                  <button className="w-full bg-white border border-[#d6cece] py-3 flex justify-center items-center hover:bg-[#f9f8f6]   shadow-sm">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                      alt="Google Pay"
                      className="h-[22px]"
                    />
                  </button>
                </div>

                {/* BNPL info */}
                <div className="mt-6 text-center text-[#856d6d] text-[11px] flex flex-col  gap-2">
                  <p>
                    From {formatPrice(11, selectedCountry)}/month or 4 payments
                    at 0% interest with{" "}
                    <span className="font-bold text-[#340c0c]">Klarna.</span>
                  </p>
                  <p>
                    Pay in 4 interest-free payments with{" "}
                    <span className="font-bold text-[#340c0c]">Afterpay.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BasketDetail
