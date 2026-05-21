import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProduct } from '../../Context/DataContext';
import CustomScrollbar from '../CustomScrollbar';
import ProductCard from './ProductCard';

function TrendingNow() {
    const { trending } = useProduct();

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        const el = document.getElementById('trending-scroll');
        if (el) {
            const { scrollLeft, scrollWidth, clientWidth } = el;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft + clientWidth) < scrollWidth - 1);
        }
    };

    useEffect(() => {
        checkScroll();
        const el = document.getElementById('trending-scroll');
        if (el) {
            el.addEventListener('scroll', checkScroll);
            window.addEventListener('resize', checkScroll);

            const resizeObserver = new ResizeObserver(() => {
                checkScroll();
            });
            resizeObserver.observe(el);

            return () => {
                el.removeEventListener('scroll', checkScroll);
                window.removeEventListener('resize', checkScroll);
                resizeObserver.disconnect();
            };
        }
    }, [trending]);

    const scrollLeft = () => {
        const el = document.getElementById('trending-scroll');
        if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        const el = document.getElementById('trending-scroll');
        if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
    };

    return (
        <div className='relative px-[1rem] py-[2rem]'>
            <div className="text-center mb-[1rem]">
                <h3 className='text-[28px] font-optima'>Trending Now</h3>
                <p>Discover the beauty secrets the whole world has fallen in love with!</p>
            </div>

            {/* Biz buradakı 'group' klasını sildik, çünki o, carousel daxilindəki bütün kartların eyni anda hover şəklini işə salırdı. */}
            <div className="relative mt-4">
                <div
                    id="trending-scroll"
                    className="flex overflow-x-auto snap-x snap-mandatory gap-[10px] md:gap-[10px] lg:gap-[20px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4"
                >
                    {trending.map((item, index) => (
                        <ProductCard 
                            key={index} 
                            item={item} 
                        />
                    ))}
                </div>
                <CustomScrollbar elementId="trending-scroll" />
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

export default TrendingNow;