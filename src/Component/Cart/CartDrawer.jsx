import React from "react"
import { useBasket } from "../../Context/BasketContext"
import { useProduct } from "../../Context/DataContext"
import useScrollLock from "../../hooks/useScrollLock"
import { Link } from "react-router"
import { X, ShoppingBag, Minus, Plus } from "lucide-react"

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

  const { selectedCountry, formatPrice, convertPrice } = useProduct()

  // Səbətin açıq/bağlı olması və skrolun kilidlənməsi
  const isOpen = basketOpen
  const handleClose = () => setBasketOpen(false)
  useScrollLock(isOpen)

  // Context-dən gələn limit (əgər yoxdursa default 50)
  const freeDeliveryThreshold = FREE_SHIPPING_THRESHOLD_GBP || 50

  // Valyuta çevirmələri
  const totalPriceConverted = convertPrice ? convertPrice(totalPrice, selectedCountry) : totalPrice
  const thresholdConverted = convertPrice ? convertPrice(freeDeliveryThreshold, selectedCountry) : freeDeliveryThreshold

  // Progress bar üçün faiz hesabı və pulsuz çatdırılma yoxlanışı
  const progressPercent = Math.min((totalPriceConverted / thresholdConverted) * 100, 100)
  const isFreeDelivery = totalPriceConverted >= thresholdConverted

  return (
    <>
      {/* Arxa fon qaraltısı */}
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
            Added to Bag ({basket.length})
          </h2>
          <button onClick={handleClose} className="p-2 text-slate-500 hover:text-black transition-colors">
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Sürüşdürülə bilən daxili hissə */}
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
              <ShoppingBag className="w-4 h-4 mr-2 stroke-[1.5]" />
              {isFreeDelivery ? (
                <span>Your order qualifies for <strong className="font-semibold">free express shipping</strong></span>
              ) : (
                <span>Spend {formatPrice(freeDeliveryThreshold - totalPrice, selectedCountry)} more for free delivery</span>
              )}
            </div>
          </div>

          {/* Səbətdəki məhsulların siyahısı */}
          <div className="px-4">
            {basket.length === 0 ? (
              <p className="py-8 text-center text-slate-500 font-sans">Your bag is empty.</p>
            ) : (
              basket.map((item, idx) => {
                const displayImage =
                  item.selectedShade?.galleryImages?.[0] ||
                  item.images?.main ||
                  item.image ||
                  item.cardImages?.main

                const shadeName = item.selectedShade?.name || item.shade || item.subtitle
                const itemPrice = Number(item.selectedShade?.price || item.price || 0)

                return (
                  <div key={`${item.id || item.title}-${idx}`} className="flex gap-4 py-4 border-b border-slate-200 relative group">
                    <img src={displayImage} alt={item.title} className="w-20 h-24 object-contain bg-slate-50" />

                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-serif text-sm tracking-wide text-black uppercase pr-8 leading-tight">
                          {item.title}
                        </h3>
                        {shadeName && (
                          <p className="text-sm text-slate-500 mt-1 uppercase font-sans">{shadeName}</p>
                        )}
                        <p className="text-sm font-semibold mt-1">
                          {formatPrice(itemPrice, selectedCountry)}
                        </p>
                      </div>

                      {/* Say idarəetmə düymələri */}
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center border border-slate-300 w-24 justify-between h-8 rounded-sm px-2">
                          <button onClick={() => updateQuantity(item, item.quantity - 1)} className="text-slate-500 hover:text-black">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-sans text-slate-800">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item, item.quantity + 1)} className="text-slate-500 hover:text-black">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Məhsulu tam silmək düyməsi */}
                    <button onClick={() => removeFromBasket(item)} className="absolute top-4 right-0 text-slate-400 hover:text-black transition-colors p-1">
                      <X className="w-4 h-4 stroke-[1.5]" />
                    </button>
                  </div>
                )
              })
            )}
          </div>
        </div>

        {/* Footer düyməsi */}
        <div className="border-t border-slate-200 bg-white p-4">
          <Link
            to="/basket"
            onClick={handleClose}
            className="w-full flex items-center justify-center border border-[#340c0c] text-[#340c0c] py-3.5 uppercase font-sans text-sm font-bold tracking-wide hover:bg-[#340c0c] hover:text-white transition-all duration-300"
          >
            VIEW BAG ({basket.length})
          </Link>
        </div>
      </div>
    </>
  )
}