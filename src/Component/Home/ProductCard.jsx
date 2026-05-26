import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useProduct } from '../../Context/DataContext';
import { useWishlist } from '../../Context/WishlistContext';
import { useBasket } from '../../Context/BasketContext';

function ProductCard({
  item,
  className = "w-1/2 lg:w-1/4 xl:w-1/6 shrink-0 snap-start",
  onClick
}) {
const { selectedCountry, formatPrice } = useProduct();
const { toggleWishlist, isInWishlist } = useWishlist();
const { handleAddtoBasket } = useBasket();
// State-lər
const [imageLoaded, setImageLoaded] = useState(false); // şəkil yüklənibmi?
const [isHovered, setIsHovered] = useState(false);     // mouse üstündədir?
// Bu məhsul wishlist-dədir?
const isLiked = isInWishlist(item);
// ── Şəkil seçimi ──────────────────────────────────────────
// Əgər məhsulun seçilmiş rəng variantı (shade) varsa, onun şəkillərini götür
const shade = item.selectedShade;
// Shade-in qalereya şəkillərini filtrələ: boş və "data:" ilə başlayanları çıxart
const shadeGallery = (shade?.galleryImages || []).filter(
  (img) => img && !img.startsWith("data:")
);
// Əsas şəkil: shade qalereyanın 1-ci şəkli → ya item.images.main → ya item.image → ya boş
const mainImage = shadeGallery[0] || item.images?.main || item.image || "";

// Hover şəkli: shade qalereyanın 2-ci şəkli → ya item.images.hover → ya əsas şəkil
const hoverImage = shadeGallery[1] || item.images?.hover || mainImage;
// ── Badge (etiket) məntiqi ─────────────────────────────────
// Başlığı və alt başlığı böyük hərflə yazırıq ki, müqayisə asan olsun
const titleUpper = item.title?.toUpperCase() || "";
const subUpper = item.subtitle?.toUpperCase() || item.subTitle?.toUpperCase() || "";
// Əvvəlcə birbaşa badge/label varsa onu götür, yoxsa null
let badgeText = item.badge || item.label || null;

// Badge yoxdursa, məntiqlə özümüz yaradırıq
if (!badgeText) {
  if (titleUpper.includes("NEW") || subUpper.includes("NEW")) {
    // Başlıqda "NEW" varsa
    badgeText = "NEW! ENHANCED FORMULA";
  } else if (titleUpper.includes("MAGIC") || titleUpper.includes("AWARD")) {
    // Başlıqda "MAGIC" ya "AWARD" varsa
    badgeText = "AWARD WINNING";
  } else if (item.price && String(item.price).includes("3")) {
    // Qiymətdə "3" rəqəmi varsa (məs: 34, 39...)
    badgeText = "SAVE 20%";
  }
}

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
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(item); }}
            className={`absolute right-3 top-3 bg-white p-2 rounded-full border transition-transform duration-200 hover:scale-110 z-10 shadow-sm ${isLiked ? 'border-[#3a080a]' : 'border-transparent'}`}
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

          {item.outOfStock ? (
            <img
              src={mainImage}
              className={`w-full h-full object-cover transition-opacity duration-500 opacity-60 ${imageLoaded ? 'block' : 'invisible'}`}
              alt={item.title}
              onLoad={() => setImageLoaded(true)}
            />
          ) : (
            <Link to='/product' state={{ product: item }} className="w-full h-full block" onClick={onClick}>
              <img
                src={mainImage}
                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                alt={item.title}
                onLoad={() => setImageLoaded(true)}
              />
              {hoverImage && hoverImage !== mainImage && (
                <img
                  src={hoverImage}
                  className={`w-full h-full absolute inset-0 object-cover bg-[#f5f5f5] transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
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
        <div className="flex flex-col flex-1 p-[10px] text-[1rem] font-helveticaN">
          <div className="px-1 md:px-[1rem] text-[13px] md:text-sm min-h-[3.5rem]">
            {item.outOfStock ? (
              <div>
                <h3 className='font-bold uppercase line-clamp-1 text-[#333333]'>{item.title}</h3>
                <p className='line-clamp-2 text-[#555]'>{item.selectedShade?.name || item.shade || item.subtitle || "Standard Size"}</p>
              </div>
            ) : (
              <Link to='/product' state={{ product: item }} onClick={onClick}>
                <h3 className='font-bold uppercase line-clamp-1 text-[#333333]'>{item.title}</h3>
                <p className='line-clamp-2 text-[#555]'>{item.selectedShade?.name || item.shade || item.subtitle || "Standard Size"}</p>
              </Link>
            )}
          </div>
          <div className="mt-auto pt-2">
            <p className="ml-1 md:ml-[1rem] text-[13px] md:text-sm font-bold text-[#333333]">
              {formatPrice(item.price, selectedCountry)}
            </p>
          </div>
        </div>

        {/* Düymə */}
        {item.outOfStock ? (
          <div className='w-full font-helveticaN uppercase py-2.5 md:py-3 bg-[#f5f5f5] text-[#b3b3b3] text-center text-[12px] md:text-xs font-bold tracking-widest mt-auto cursor-default border-t border-gray-100'>
            OUT OF STOCK
          </div>
        ) : (
          <button
            onClick={() => handleAddtoBasket(item)}
            className='w-full font-helveticaN cursor-pointer uppercase py-2.5 md:py-3 bg-white hover:bg-[#6e2132] hover:text-white text-[#3a080a] border border-[#3a080a]/20 hover:border-[#6e2132] transition-all duration-300 mt-auto text-[12px] md:text-xs tracking-widest font-bold'
          >
            Add to basket
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
