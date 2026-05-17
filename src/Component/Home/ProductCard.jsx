import React, { useState } from 'react';
import { Link } from 'react-router';
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ProductCard = ({ item, isLiked, toggleWishlist, handleAddtoBasket }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [hoverImageLoaded, setHoverImageLoaded] = useState(false);

    // Fallback/Demo logic for badges if item.badge is not explicitly provided.
    // We try to use item.badge or item.label first, then fall back to keyword checking in title/subtitle.
    const titleUpper = item.title?.toUpperCase() || '';
    const subUpper = item.subtitle?.toUpperCase() || item.subTitle?.toUpperCase() || '';
    
    let badgeText = item.badge || item.label || null;
    
    if (!badgeText) {
        if (titleUpper.includes('NEW') || subUpper.includes('NEW')) badgeText = 'NEW! ENHANCED FORMULA';
        else if (titleUpper.includes('MAGIC') || titleUpper.includes('AWARD')) badgeText = 'AWARD WINNING';
        else if (item.price && item.price.includes('£3')) badgeText = 'SAVE 20%';
    }

    const getBadgeStyle = (text) => {
        if (!text) return null;
        return { bg: 'bg-[#fde8e0]', text: 'text-[#6e2132]', icon: '' };
    };

    const badgeStyle = getBadgeStyle(badgeText);

    return (
        <div className="w-[calc(50%-5px)] lg:w-[calc(25%-7.5px)] xl:w-[calc(16.666%-16.66px)] shrink-0 snap-start h-full flex">
            <style>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
            <div className="w-full group relative flex flex-col h-full border border-transparent">
                <div className="relative block aspect-square bg-[#f5f5f5] overflow-hidden">
                    
                    {/* Badge Overlay */}
                    {badgeText && badgeStyle && (
                        <div className={`absolute bottom-0 left-0 w-full z-10 px-3 py-[6px] text-[10px] md:text-[11px] font-bold uppercase tracking-wider ${badgeStyle.bg} ${badgeStyle.text} justify-start text-left flex items-center`}>
                            {badgeStyle.icon && <span className="mr-1">{badgeStyle.icon}</span>}
                            {badgeText}
                        </div>
                    )}

                    {/* Wishlist Icon */}
                    <div onClick={() => toggleWishlist(item)} className={`absolute ${isLiked ? 'border-[#3a080a]' : 'border-none'} right-3 bg-white p-2 rounded-full border top-3 cursor-pointer hover:scale-110 transition-transform z-10 shadow-sm`}>
                        {isLiked ? <FaHeart size={22} color="#3a080a" /> : <FaRegHeart size={22} color="#3a080a" />}
                    </div>

                    {/* Skeleton Shimmer Background */}
                    {!imageLoaded && (
                        <div className="absolute inset-0 bg-gradient-to-r from-[#eeeeee] via-[#fafafa] to-[#eeeeee] bg-[length:200%_100%] animate-[shimmer_1.5s_infinite_linear]" />
                    )}

                    {/* Product Images */}
                    {item.outOfStock ? (
                        <img 
                            src={item.images?.main || item.cardImages?.main} 
                            className={`w-full h-full object-cover transition-opacity duration-500 opacity-60 ${imageLoaded ? 'block' : 'invisible'}`} 
                            alt={item.title} 
                            onLoad={() => setImageLoaded(true)}
                        />
                    ) : (
                        <Link to='/product' state={{ product: item }} className="w-full h-full block">
                            <img 
                                src={item.images?.main || item.cardImages?.main} 
                                className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} 
                                alt={item.title} 
                                onLoad={() => setImageLoaded(true)}
                            />
                            {(item.images?.hover || item.cardImages?.hover) && (
                                <img 
                                    src={item.images?.hover || item.cardImages?.hover} 
                                    className={`w-full h-full absolute inset-0 object-cover transition-opacity duration-500 opacity-0 hover:opacity-100 ${hoverImageLoaded ? '' : 'invisible'}`} 
                                    alt={`${item.title} hover`} 
                                    onLoad={() => setHoverImageLoaded(true)}
                                />
                            )}
                        </Link>
                    )}
                </div>

                <div className="flex flex-col flex-1 p-[10px] text-[1rem] font-helveticaN">
                    <div className="px-1 md:px-[1rem] text-[13px] md:text-sm min-h-[3.5rem]">
                        {item.outOfStock ? (
                            <div>
                                <h3 className='font-bold uppercase line-clamp-1 text-[#333333]'>{item.title}</h3>
                                <p className='line-clamp-2 text-[#555]'>{item.subtitle || item.subTitle}</p>
                            </div>
                        ) : (
                            <Link to='/product' state={{ product: item }}>
                                <h3 className='font-bold uppercase line-clamp-1 text-[#333333] group-hover:underline'>{item.title}</h3>
                                <p className='line-clamp-2 text-[#555]'>{item.subtitle || item.subTitle}</p>
                            </Link>
                        )}
                    </div>
                    <div className="mt-auto pt-2">
                        <p className="ml-1 md:ml-[1rem] text-[13px] md:text-sm font-bold text-[#333333]">{item.price}</p>
                    </div>
                </div>
                
                {/* Action Button */}
                {item.outOfStock ? (
                    <div className='w-full font-helveticaN uppercase py-2 md:py-3 bg-[#f5f5f5] text-[#b3b3b3] text-center text-[12px] md:text-sm font-bold tracking-widest mt-auto cursor-default'>
                        OUT OF STOCK
                    </div>
                ) : (
                    <button onClick={() => handleAddtoBasket(item)} className='border duration-200 w-full font-helveticaN uppercase py-2 md:py-3 hover:bg-[#6e2132] hover:text-white text-[#3a080a] border-[#3a080a] mt-auto text-[12px] md:text-sm tracking-wider font-bold'>
                        Add to basket
                    </button>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
