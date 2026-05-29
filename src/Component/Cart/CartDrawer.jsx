import React, { useState } from "react"
import { useBasket } from "../../Context/BasketContext"
import { useWishlist } from "../../Context/WishlistContext"
import { useProduct } from "../../Context/DataContext"
import useScrollLock from "../../hooks/useScrollLock"
import { Link } from "react-router"

export default function CartDrawer() {
  const {
    basket,
    updateQuantity,
    removeFromBasket,
    totalPrice,
    basketOpen,
    setBasketOpen,
    totalItems,
    FREE_SHIPPING_THRESHOLD_GBP,
  } = useBasket()

  const { moveToWishlist } = useWishlist()
  const { selectedCountry, formatPrice, convertPrice } = useProduct()

  const isOpen = basketOpen
  const handleClose = () => setBasketOpen(false)
  useScrollLock(isOpen)

  // Artıq BasketContext-dən gələn 50 limitini istifadə edirik
  const freeDeliveryThreshold = FREE_SHIPPING_THRESHOLD_GBP || 50

  // Fərqli ölkələrin valyutalarına görə düzgün faiz hesablama məntiqi
  const totalPriceConverted = convertPrice
    ? convertPrice(totalPrice, selectedCountry)
    : totalPrice
  const thresholdConverted = convertPrice
    ? convertPrice(freeDeliveryThreshold, selectedCountry)
    : freeDeliveryThreshold

  const progressPercent = Math.min(
    (totalPriceConverted / thresholdConverted) * 100,
    100,
  )
  const isFreeDelivery = totalPriceConverted >= thresholdConverted

  return (
    <>
      {/* Arxa fon qaraltısı (Overlay) */}
      <div
        className={`fixed inset-0 bg-black/40 z-[999] transition-opacity duration-500 ease-in-out ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={handleClose}
      />

      {/* Drawer gövdəsi */}
      <div
        className={`fixed right-0 bottom-0 top-auto md:top-0 w-full h-[85dvh] md:h-full md:w-[450px] bg-white z-[1000] transform transition-all duration-500 ease-in-out shadow-2xl flex flex-col ${isOpen ? "translate-y-0 md:translate-x-0 md:translate-y-0 opacity-100" : "translate-y-full md:translate-y-0 md:translate-x-full opacity-0"} rounded-t-2xl md:rounded-none`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-xl font-serif text-[#4A0404] tracking-wide uppercase">
            Added to Bag ({totalItems})
          </h2>
          <button
            onClick={handleClose}
            className="p-2 text-slate-500 hover:text-black transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Sürüşdürülə bilən daxili hissə (Scrollable Content) */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Progress Bar */}
          <div className="p-4 bg-white">
            <div className="h-2 w-full bg-slate-200 rounded-full mb-3 relative">
              <div
                className="h-full bg-[#4A0404] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
              {isFreeDelivery && (
                <div className="absolute right-0 -top-1 w-4 h-4 bg-[#4A0404] rounded-full flex items-center justify-center text-white text-[10px]">
                  ✓
                </div>
              )}
            </div>
            <div className="flex items-center text-sm font-sans text-slate-800">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              {isFreeDelivery ? (
                <span>
                  Your order qualifies for{" "}
                  <strong className="font-semibold">
                    free express shipping
                  </strong>
                </span>
              ) : (
                <span>
                  Spend{" "}
                  {formatPrice(
                    freeDeliveryThreshold - totalPrice,
                    selectedCountry,
                  )}{" "}
                  more for free delivery
                </span>
              )}
            </div>
          </div>

          {/* Səbətdəki məhsulların siyahısı */}
          <div className="px-4">
            {basket.length === 0 ? (
              <p className="py-8 text-center text-slate-500 font-sans">
                Your bag is empty.
              </p>
            ) : (
              basket.map((item, idx) => {
                const shadeImage =
                  item.selectedShade?.gallery?.[0] ||
                  item.selectedShade?.galleryImages?.[0] ||
                  item.selectedShade?.swatchImage
                const displayImage =
                  shadeImage ||
                  item.cardImages?.main ||
                  item.images?.main ||
                  item.image
                const shadeName =
                  item.selectedShade?.name ||
                  item.shade ||
                  item.subtitle ||
                  item.subTitle
                const itemPrice = item.selectedShade?.price || item.price

                return (
                  <div
                    key={`${item.title}-${shadeName}-${idx}`}
                    className="flex gap-4 py-4 border-b border-slate-200 relative group"
                  >
                    <img
                      src={displayImage}
                      alt={item.title}
                      className="w-20 h-24 object-contain bg-slate-50"
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-serif text-sm tracking-wide text-black uppercase pr-8 leading-tight">
                          {item.title}
                        </h3>
                        {shadeName && (
                          <p className="text-sm text-slate-500 mt-1 uppercase font-sans">
                            {shadeName}
                          </p>
                        )}
                        <p className="text-sm font-semibold mt-1">
                          {formatPrice(itemPrice, selectedCountry)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-slate-300 w-24 justify-between h-8 rounded-sm">
                          <button
                            onClick={() =>
                              updateQuantity(item, item.quantity - 1)
                            }
                            className="px-3 text-slate-500 hover:text-black transition-colors h-full flex items-center"
                          >
                            -
                          </button>
                          <span className="text-sm font-sans text-slate-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item, item.quantity + 1)
                            }
                            className="px-3 text-slate-500 hover:text-black transition-colors h-full flex items-center"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromBasket(item)}
                      className="absolute top-4 right-0 text-slate-400 hover:text-black transition-colors p-1"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Footer alt düymə hissəsi */}
        <div className="border-t border-slate-200 bg-white p-4">
          <Link
            to="/basket" // Əgər sənin App.jsx faylında səbətin url-i fərqlidirsə, buranı dəyiş (Məsələn: "/basketdetail")
            onClick={handleClose}
            className="w-full flex items-center justify-center border border-[#340c0c] text-[#340c0c] py-3.5 uppercase font-sans text-sm font-bold tracking-wide hover:bg-[#340c0c] hover:text-white transition-all duration-300"
          >
            VIEW BAG ({totalItems})
          </Link>
        </div>
      </div>
    </>
  )
}
