import React from 'react';
import { Link } from 'react-router';
import { useWishlist } from '../Context/WishlistContext';
import { useBasket } from '../Context/BasketContext';
import { X } from 'lucide-react';

function Fave() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { handleAddtoBasket } = useBasket();

    return (
        <main className="bg-white  font-helveticaN py-12 px-4 md:px-5">
            <div className="container max-w-[1024px] mx-auto px-[16px]">
                {wishlist.length > 0 && (
                    <h1 className="font-helveticaN text-[28px] text-[#340c0c] uppercase mb-[8px]">WISHLIST</h1>
                )}

                {wishlist.length === 0 ? (
                    <section className="flex flex-col items-center justify-center py-16 text-center">
                    
                        <h1 className="font-helveticaN text-[24px] md:text-[28px] text-[#340c0c] uppercase mb-[8px] text-center">
                            YOUR WISHLIST IS EMPTY
                        </h1>
                        <p className="text-[#340c0c] font-helveticaN max-w-[500px] mb-[24px] leading-relaxed text-center font-light text-[15px]">
                            Adding items to your wishlist by clicking the heart icon as you shop.
                        </p>
                        <Link
                            to="/home"
                            className="border border-[#340c0c] text-[#340c0c] px-16 py-3 hover:bg-[#340c0c] hover:text-white transition-colors duration-300 font-helveticaN uppercase tracking-widest text-[13px] font-bold text-center inline-block"
                        >
                            BEST SELLERS
                        </Link>
                    </section>
                ) : (
                    <>
                        <p className="text-[#340c0c] font-helveticaN max-w-[500px] mb-[16px]">
                            Keep a list of all the gorgeous Charlotte Tilbury beauty products you love, or are dying to try next! You can log in on any device to see your saved wishlist.
                        </p>
                        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
                            {wishlist.map((item, idx) => {
                                const isImage = (url) => typeof url === 'string' && !url.match(/\.(mp4|webm|ogg|mov|avi)(\?|$)/i) && !url.startsWith('data:image/');
                                
                                const shadeGallery = item.selectedShade?.gallery || [];
                                const shadeGalleryImages = item.selectedShade?.galleryImages || [];
                                
                                const shadeImage = shadeGallery.find(isImage) || shadeGalleryImages.find(isImage) || (isImage(item.selectedShade?.swatchImage) && item.selectedShade?.swatchImage);
                                const displayImage = shadeImage || 
                                    (isImage(item.cardImages?.main) && item.cardImages?.main) || 
                                    (isImage(item.images?.main) && item.images?.main) || 
                                    (isImage(item.image) && item.image) ||
                                    item.images?.main || item.cardImages?.main || item.image || shadeGallery[0]; // Absolute fallback

                                const shadeName = item.selectedShade?.name || item.shade || item.subtitle || item.subTitle || "Standard Size";
                                
                                const shadeHoverImage = shadeGallery.filter(isImage)[1] || shadeGalleryImages.filter(isImage)[1];
                                const hoverImage = shadeHoverImage || 
                                    (isImage(item.cardImages?.hover) && item.cardImages?.hover) || 
                                    (isImage(item.images?.hover) && item.images?.hover) || 
                                    displayImage;

                                return (
                                    <article key={`${item.title}-${shadeName}-${idx}`} className="flex flex-col w-full text-left h-full">
                                        {/* Image Container */}
                                        <div className="relative bg-[#f9f8f6] aspect-square flex justify-center items-center mb-3">
                                            <button
                                                onClick={() => removeFromWishlist(item)}
                                                className="absolute top-2 left-2 text-[#340c0c] z-10 p-1 cursor-pointer hover:opacity-75 transition-opacity"
                                                aria-label="Remove from wishlist"
                                            >
                                                <X size={32} strokeWidth={1} />
                                            </button>

                                            <Link to="/product" state={{ product: item }} className="absolute inset-0 w-full h-full flex justify-center items-center p-6 group/img">
                                                <img
                                                    src={displayImage}
                                                    alt={item.title}
                                                    className={`absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-opacity duration-300 ${hoverImage !== displayImage ? 'group-hover/img:opacity-0' : ''}`}
                                                    loading="lazy"
                                                />
                                                {hoverImage !== displayImage && (
                                                    <img
                                                        src={hoverImage}
                                                        alt={item.title}
                                                        className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
                                                        loading="lazy"
                                                    />
                                                )}
                                            </Link>

                                            {/* Promo Badge */}
                                            {(item.badge || item.title?.toLowerCase().includes('magic')) && (
                                                <div className="absolute bottom-2 left-2 bg-[#fbe1e1] text-[#340c0c] font-bold uppercase text-[10px] px-2 py-1 z-10">
                                                    {item.badge || "SUPERCHARGED FORMULA!"}
                                                </div>
                                            )}
                                        </div>

                                        {/* Typography & Details */}
                                        <div className="flex flex-col gap-1 mb-4 flex-grow">
                                            <Link to="/product" state={{ product: item }} className="flex flex-col gap-1">
                                                <h3 className="font-optima uppercase text-[14px] font-semibold text-[#340c0c] leading-tight line-clamp-2">
                                                    {item.title}
                                                </h3>
                                                <p className="text-gray-500 text-[13px] font-light leading-tight line-clamp-1">
                                                    {shadeName}
                                                </p>
                                                <p className="text-[#340c0c] text-[14px] mt-1 leading-tight">
                                                    {item.selectedShade?.price || item.price}
                                                </p>
                                            </Link>
                                        </div>

                                        {/* Call-to-Action Button */}
                                        <button
                                            onClick={() => handleAddtoBasket(item)}
                                            className="mt-auto w-full border border-[#340c0c] bg-transparent text-[#340c0c] py-2.5 hover:bg-[#340c0c] hover:text-white transition-colors duration-300 font-helveticaN uppercase tracking-wider text-[12px] cursor-pointer"
                                        >
                                            ADD TO BAG
                                        </button>
                                    </article>
                                )
                            })}
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}

export default Fave;