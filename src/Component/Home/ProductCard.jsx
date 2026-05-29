import React, { useState } from "react"
import { Link } from "react-router"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useProduct } from "../../Context/DataContext"
import { useWishlist } from "../../Context/WishlistContext"
import { useBasket } from "../../Context/BasketContext"

function ProductCard({
  item,
  className = "w-1/2 lg:w-1/4 xl:w-1/6 shrink-0 snap-start",
  onClick,
}) {
  const { selectedCountry, formatPrice } = useProduct()
  const { toggleWishlist, isInWishlist } = useWishlist()
  const { addToBasket } = useBasket()

  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  // Wishlist üçün item-ə selectedShade əlavə et (JSON-dan gələndə yoxdur)
  // subtitle artıq seçilmiş çalardır — shades-dən tap, tapılmasa shades[0] götür
  const defaultShade =
    item.shades?.find((s) => s.name === item.subtitle) ||
    item.shades?.[0] ||
    null
  const wishlistItem = item.selectedShade
    ? item
    : { ...item, selectedShade: defaultShade }
  const isLiked = isInWishlist(wishlistItem)
  const isOOS = item.outOfStock === true || item.outOfStock === "true"

  // Şəkil seçimi — shade variantı üstünlük təşkil edir
  const shadeGallery = (item.selectedShade?.galleryImages || []).filter(
    (img) => img && !img.startsWith("data:"),
  )
  const mainImage = shadeGallery[0] || item.images?.main || item.image || ""
  const hoverImage = shadeGallery[1] || item.images?.hover || mainImage

  // Badge — badge/label datada yoxdur, yalnız endirim hesablanır
  // originalPrice: '£73.00' formatında string | price: number
  const origNum = parseFloat(String(item.originalPrice).replace(/[^0-9.]/g, ""))
  const discount =
    !isNaN(origNum) && origNum > item.price
      ? Math.round(100 - (item.price / origNum) * 100)
      : 0
  const badgeText = discount > 0 ? `SAVE ${discount}%` : null

  // Məhsula aid slug — iki yerdə istifadə olunur
  const shadeName = (
    item.selectedShade?.name ||
    item.shades?.[0]?.name ||
    "default"
  )
    .toLowerCase()
    .split(" ")
    .join("-")
  const productPath = `/product/${item.title}/${shadeName}`
  const shadeLabel =
    item.selectedShade?.name || item.shade || item.subtitle || "Standard Size"

  return (
    <div className={`${className} h-full flex`}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <div className="w-full flex flex-col h-full border border-transparent">
        {/* Şəkil bölməsi */}
        <div
          className="relative block aspect-square bg-[#f5f5f5] overflow-hidden cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Wishlist düyməsi */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              toggleWishlist(wishlistItem)
            }}
            className={`absolute right-3 top-3 bg-white p-2 rounded-full border transition-transform duration-200 hover:scale-110 z-10 shadow-sm ${isLiked ? "border-[#3a080a]" : "border-transparent"}`}
            aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
          >
            {isLiked ? (
              <FaHeart size={22} color="#3a080a" />
            ) : (
              <FaRegHeart size={22} color="#3a080a" />
            )}
          </button>

          {/* Shimmer yüklənmə */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#fafafa] to-[#eeeeee] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear] z-0" />
          )}

          {isOOS ? (
            <>
              <img
                src={mainImage}
                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "invisible"}`}
                alt={item.title}
                onLoad={() => setImageLoaded(true)}
              />
              <div className="absolute inset-0 bg-white/55 flex items-center justify-center">
                <span className="bg-white/90 border border-[#ccc] text-[#888] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 font-helveticaN">
                  Out of Stock
                </span>
              </div>
            </>
          ) : (
            <Link
              to={productPath}
              state={{ product: item }}
              className="w-full h-full block"
              onClick={onClick}
            >
              <img
                src={mainImage}
                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                alt={item.title}
                onLoad={() => setImageLoaded(true)}
              />
              {hoverImage !== mainImage && (
                <img
                  src={hoverImage}
                  className={`w-full h-full absolute inset-0 object-cover bg-[#f5f5f5] transition-opacity duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                  alt={`${item.title} hover`}
                />
              )}
            </Link>
          )}
        </div>

        {/* Badge */}
        {badgeText ? (
          <div className="w-full px-3 py-[7px] text-[10px] md:text-[11px] font-bold uppercase bg-[#fde8e0] text-[#6e2132] flex items-center tracking-wider font-sans">
            {badgeText}
          </div>
        ) : (
          <div className="w-full px-3 py-[7px] text-[10px] md:text-[11px] h-[30px] flex items-center" />
        )}

        {/* Mətn məlumatları */}
        <div className="flex flex-col p-[10px] text-[1rem] font-helveticaN">
          <div className="px-1 md:px-[1rem] text-[13px] md:text-sm min-h-[3.5rem]">
            {isOOS ? (
              <div>
                <h3 className="font-bold uppercase line-clamp-1 text-[#aaa]">
                  {item.title}
                </h3>
                <p className="line-clamp-2 text-[#bbb]">{shadeLabel}</p>
              </div>
            ) : (
              <Link
                to={productPath}
                state={{ product: item }}
                onClick={onClick}
              >
                <h3 className="font-bold uppercase line-clamp-1 text-[#333333]">
                  {item.title}
                </h3>
                <p className="line-clamp-2 text-[#555]">{shadeLabel}</p>
              </Link>
            )}
          </div>
          <div className="mt-auto pt-2">
            <p
              className={`ml-1 md:ml-[1rem] text-[13px] md:text-sm font-bold ${isOOS ? "text-[#bbb]" : "text-[#333333]"}`}
            >
              {formatPrice(item.price, selectedCountry)}
            </p>
          </div>
        </div>

        {/* Düymə */}
        {isOOS ? (
          <div
            className="w-full font-helveticaN uppercase py-2.5 md:py-3 bg-[#f9f9f9] text-[#c0b8b8] text-center text-[11px] font-bold tracking-widest mt-auto cursor-not-allowed border-t border-[#ebebeb] select-none"
            aria-disabled="true"
          >
            OUT OF STOCK
          </div>
        ) : (
          <button
            onClick={() => {
              if (isAdding) return
              setIsAdding(true)
              setTimeout(() => {
                addToBasket(item)
                setIsAdding(false)
              }, 650)
            }}
            className={`w-full font-helveticaN cursor-pointer uppercase py-2.5 md:py-3 border border-[#3a080a]/20 transition-all duration-300 mt-auto text-[12px] md:text-xs tracking-widest font-bold flex items-center justify-center gap-2
              ${
                isAdding
                  ? "bg-[#6e2132] text-white border-[#6e2132]"
                  : "bg-white hover:bg-[#6e2132] hover:text-white text-[#3a080a] hover:border-[#6e2132]"
              }`}
          >
            {isAdding ? (
              <>
                <span
                  className="inline-block w-3.5 h-3.5 border-2 border-white/40 border-t-white rounded-full"
                  style={{ animation: "spin 0.7s linear infinite" }}
                />
                Adding...
              </>
            ) : (
              "Add to basket"
            )}
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
