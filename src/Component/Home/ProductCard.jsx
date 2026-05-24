import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useProduct } from '../../Context/DataContext';
import { useWishlist } from '../../Context/WishlistContext';
import { useBasket } from '../../Context/BasketContext';
const getProductImages = (item) => {
    const shade = item.selectedShade;

    // Bütün real şəkilləri götür (base64 olanları çıxart)
    const shadeGallery = (shade?.galleryImages || []).filter(
        img => img && !img.startsWith('data:') && !img.startsWith('data:image/svg')
    );

    // Real şəkillərin sırası: [0]=packshot, [1]=model, [2]=texture...
    const mainImage =
        shadeGallery[0] ||
        item.images?.main ||
        item.image ||
        '';

    const hoverImage =
        shadeGallery[1] ||        // ← filtr sonrası həmişə model şəklidir
        item.images?.hover ||
        mainImage;

    return { mainImage, hoverImage };
};
const ProductCard = ({
    item,
    className = "w-[calc(50%-5px)] lg:w-[calc(25%-7.5px)] xl:w-[calc(16.666%-16.66px)] shrink-0 snap-start",
    onClick
}) => {
    // 1. Lazım olan Context-lərdən istifadə edirik (Prop drilling-dən qaçınmaq üçün)
    const { selectedCountry, formatPrice } = useProduct();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { handleAddtoBasket } = useBasket();

    // 2. Şəkil yüklənməsi və hover effekti üçün local state-lər
    const [imageLoaded, setImageLoaded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    // Məhsulun favoritlərdə (wishlist) olub-olmadığını yoxlayırıq
    const isLiked = isInWishlist(item);

    // Məhsul şəkillərini əldə edirik
    const { mainImage, hoverImage } = getProductImages(item);

    // --- Badge (Nişan) Məntiqi ---
    // Əgər məhsulun özündə badge və ya label yoxdursa, başlığındakı açar sözlərə görə avtomatik badge yaradırıq.
    const titleUpper = item.title?.toUpperCase() || '';
    const subUpper = item.subtitle?.toUpperCase() || item.subTitle?.toUpperCase() || '';
    let badgeText = item.badge || item.label || null;

    if (!badgeText) {
        if (titleUpper.includes('NEW') || subUpper.includes('NEW')) {
            badgeText = 'NEW! ENHANCED FORMULA';
        } else if (titleUpper.includes('MAGIC') || titleUpper.includes('AWARD')) {
            badgeText = 'AWARD WINNING';
        } else if (item.price && String(item.price).includes('3')) {
            badgeText = 'SAVE 20%';
        }
    }

    // Badge üslubları
    const badgeBgClass = 'bg-[#fde8e0]';
    const badgeTextClass = 'text-[#6e2132]';

    return (
        <div className={`${className} h-full flex`}>
            {/* Shimmer Skeleton Animasiyası */}
            <style>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>

            {/* Kartın əsas konteyneri */}
            <div className="w-full flex flex-col h-full border border-transparent">

                {/* ŞƏKİL BÖLMƏSİ (Şəklin üzərinə hover olduqda isHovered aktivləşir) */}
                <div
                    className="relative block aspect-square bg-[#f5f5f5] overflow-hidden cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Favorit Düyməsi (Wishlist Icon) - Həmişə şəklin üzərində absolute yerləşir */}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleWishlist(item);
                        }}
                        className={`absolute right-3 top-3 bg-white p-2 rounded-full border transition-transform duration-200 hover:scale-110 z-10 shadow-sm ${isLiked ? 'border-[#3a080a]' : 'border-transparent'
                            }`}
                        aria-label={isLiked ? "Remove from wishlist" : "Add to wishlist"}
                    >
                        {isLiked ? (
                            <FaHeart size={22} color="#3a080a" />
                        ) : (
                            <FaRegHeart size={22} color="#3a080a" />
                        )}
                    </button>

                    {/* Skeleton Shimmer Yüklənmə Ekranı */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#fafafa] to-[#eeeeee] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear] z-0" />
                    )}

                    {/* Əsas və Hover Şəkilləri */}
                    {item.outOfStock ? (
                        // Əgər məhsul bitibsə: Klikləməyi deaktiv edirik və Link istifadə etmirik.
                        // Şəkili solğun göstərmək üçün opacity-60 klası əlavə edirik.
                        <img
                            src={mainImage}
                            className={`w-full h-full object-cover transition-opacity duration-500 opacity-60 ${imageLoaded ? 'block' : 'invisible'
                                }`}
                            alt={item.title}
                            onLoad={() => setImageLoaded(true)}
                        />
                    ) : (
                        // Əgər məhsul satışdadırsa: Detallara gedən normal Link.
                        <Link
                            to='/product'
                            state={{ product: item }}
                            className="w-full h-full block"
                            onClick={onClick}
                        >
                            {/* Əsas Şəkil */}
                            <img
                                src={mainImage}
                                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                alt={item.title}
                                onLoad={() => setImageLoaded(true)}
                            />

                            {/* Hover Şəkli: Yalnız isHovered true olduqda və fərqli hover şəkli mövcud olduqda göstərilir */}
                            {hoverImage && hoverImage !== mainImage && (
                                <img
                                    src={hoverImage}
                                    className={`w-full h-full absolute inset-0 object-cover bg-[#f5f5f5] transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    alt={`${item.title} hover`}
                                />
                            )}
                        </Link>
                    )}
                </div>

                {/* BADGE (Nişan): Şəkildən sonra təbii axında yerləşir (Flexbox) */}
                {badgeText ? (
                    <div className={`w-full px-3 py-[7px] text-[10px] md:text-[11px] font-bold uppercase ${badgeBgClass} ${badgeTextClass} flex items-center tracking-wider font-sans`}>
                        {badgeText}
                    </div>
                ) : (
                    // Hündürlük fərqlərini aradan qaldırmaq üçün boş sahə saxlayırıq (visual alignment)
                    <div className="w-full px-3 py-[7px] text-[10px] md:text-[11px] h-[30px] flex items-center"></div>
                )}

                {/* MƏTN MƏLUMATLARI (Title, Shade, Price) */}
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

                {/* 4. DÜYMƏ BÖLMƏSİ: mt-auto sayəsində hər bir kartda alt xətt üzrə tam olaraq nizamlanır */}
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
};

export default ProductCard;
