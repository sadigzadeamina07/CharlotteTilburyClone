import React from 'react';
import { Link } from 'react-router';
import { useWishlist } from '../Context/WishlistContext';
import { useBasket } from '../Context/BasketContext';
import { X } from 'lucide-react';

function Fave() {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { handleAddtoBasket } = useBasket();

    return (
        <main className="bg-white min-h-[60vh] font-helveticaN py-12 px-4 md:px-8">
            <div className="container max-w-[1200px] mx-auto">
                <h1 className="text-center font-optima text-[28px]  md:text-[36px] text-[#340c0c] uppercase tracking-widest mb-12">
                    Wishlist
                </h1>

                {wishlist.length === 0 ? (
                    <section className="flex flex-col items-center justify-center py-16 text-center">
                        <h2 className="font-optima text-[24px] md:text-[28px] text-[#340c0c] uppercase tracking-wider mb-4">
                            YOUR WISHLIST IS EMPTY
                        </h2>
                        <p className="text-[#340c0c] text-[15px] max-w-[400px] mb-8 leading-relaxed">
                            Adding items to your wishlist by clicking the heart icon as you shop.
                        </p>
                        <Link 
                            to="/" 
                            className="border border-[#340c0c] text-[#340c0c] px-12 py-3.5 hover:bg-[#340c0c] hover:text-white transition-colors duration-300 font-helveticaN uppercase tracking-widest text-[13px] font-bold"
                        >
                            BEST SELLERS
                        </Link>
                    </section>
                ) : (
                    <>
                        <p className="text-[#340c0c] text-[14px] mb-8">
                            Keep a list of all the gorgeous Charlotte Tilbury beauty products you love, or are dying to try next! You can log in on any device to see your saved wishlist.
                        </p>
                        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                            {wishlist.map((item, idx) => (
                                <article key={idx} className="flex flex-col relative group">
                                    <div className="relative bg-[#f9f8f6] aspect-[4/5] flex justify-center items-center p-6 mb-4">
                                        <button 
                                            onClick={() => removeFromWishlist(item)}
                                            className="absolute top-3 left-3 text-[#340c0c] hover:scale-110 transition-transform z-10 p-1"
                                            aria-label="Remove from wishlist"
                                        >
                                            <X size={20} strokeWidth={1.5} />
                                        </button>
                                        <Link to="/product" state={{ product: item }} className="w-full h-full flex justify-center items-center overflow-hidden">
                                            <img 
                                                src={item.cardImages?.main || item.images?.main || item.image} 
                                                alt={item.title} 
                                                className="max-w-full max-h-full object-contain mix-blend-multiply transition-transform duration-700 group-hover:scale-105" 
                                            />
                                        </Link>
                                    </div>
                                    <div className="flex flex-col flex-grow">
                                        <Link to="/product" state={{ product: item }} className="group-hover:text-[#856d6d] transition-colors">
                                            <h3 className="font-optima uppercase text-[14px] font-bold text-[#340c0c] tracking-wide line-clamp-1 group-hover:underline">
                                                {item.title}
                                            </h3>
                                            <p className="text-[#856d6d] uppercase text-[11px] tracking-wider mb-2 mt-1 line-clamp-1">
                                                {item.subtitle || item.subTitle || "\u00A0"}
                                            </p>
                                        </Link>
                                        <div className="mt-auto pt-2">
                                            <p className="text-[#340c0c] font-medium text-[15px] mb-4">{item.price}</p>
                                            <button 
                                                onClick={() => handleAddtoBasket(item)}
                                                className="w-full border border-[#340c0c] text-[#340c0c] py-2.5 hover:bg-[#340c0c] hover:text-white transition-colors duration-300 font-helveticaN uppercase tracking-wider text-[12px]"
                                            >
                                                ADD TO BAG
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </section>
                    </>
                )}
            </div>
        </main>
    );
}

export default Fave;