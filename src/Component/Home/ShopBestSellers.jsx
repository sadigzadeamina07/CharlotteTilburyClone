import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { useBasket } from '../../Context/BasketContext';
import { useWishlist } from '../../Context/WishlistContext';
import { useProduct } from '../../Context/DataContext';
import CustomScrollbar from '../CustomScrollbar';

import ProductCard from './ProductCard';

function ShopBestSellers() {
    const { bestSellers } = useProduct();
    const { handleAddtoBasket } = useBasket();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const scrollRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const scrollLeft = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        if (scrollRef.current) scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        const ref = scrollRef.current;
        if (ref) {
            ref.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);

            const resizeObserver = new ResizeObserver(() => {
                checkScroll();
            });
            resizeObserver.observe(ref);

            return () => {
                ref.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
                resizeObserver.disconnect();
            };
        }
    }, [bestSellers]);

    if (!bestSellers || !bestSellers.length) return null;

    return (
        <div className='relative px-[1rem] py-[2rem]'>
            <div className="text-center mb-[1rem]">
                <h3 className='text-[28px] font-optima'>Shop Best Sellers</h3>
            </div>

            <div className="relative group mt-4">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto snap-x snap-mandatory gap-[10px] md:gap-[10px] lg:gap-[20px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4"
                >
                    {bestSellers.map((item, index) => {
                        const isLiked = isInWishlist(item);
                        return (
                            <ProductCard
                                key={index}
                                item={item}
                                isLiked={isLiked}
                                toggleWishlist={toggleWishlist}
                                handleAddtoBasket={handleAddtoBasket}
                            />
                        );
                    })}
                </div>
                <CustomScrollbar scrollRef={scrollRef} />
            </div>

            <button disabled={!canScrollLeft} onClick={scrollLeft} className='hidden md:block absolute left-1 lg:left-auto lg:right-14 top-[7.5%] -translate-y-1/2 shadow-2xl z-10 disabled:opacity-30 disabled:cursor-not-allowed bg-white/80 lg:bg-transparent rounded-full p-1 lg:p-0 transition-opacity cursor-pointer'>
                <ChevronLeft size={24} className="lg:hidden" />
                <ChevronLeft size={36} className="hidden lg:block" />
            </button>
            <button disabled={!canScrollRight} onClick={scrollRight} className='hidden md:block absolute right-1 lg:right-2 top-[7.5%] -translate-y-1/2 shadow-2xl z-10 disabled:opacity-30 disabled:cursor-not-allowed bg-white/80 lg:bg-transparent rounded-full p-1 lg:p-0 transition-opacity cursor-pointer'>
                <ChevronRight size={24} className="lg:hidden" />
                <ChevronRight size={36} className="hidden lg:block" />
            </button>
        </div>
    );
}

export default ShopBestSellers;
