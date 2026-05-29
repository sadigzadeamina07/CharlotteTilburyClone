import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useProduct } from '../../Context/DataContext';
import { useScrollCarousel } from '../../hooks/useScrollCarousel';
import CustomScrollbar from '../CustomScrollbar';
import ProductCard from './ProductCard';
import ProductCardSkeleton from './ProductCardSkeleton';

const SKELETON_COUNT = 6;

function TrendingNow() {
  const { trending } = useProduct();
  const isLoading = !trending || trending.length === 0;
  const { canScrollLeft, canScrollRight, scrollLeft, scrollRight,
    thumbWidth, scrollLeftPos, isDragging, setIsDragging } =
    useScrollCarousel('trending-scroll', trending);

  return (
    <div className='relative px-[1rem] py-[2rem]'>
      <div className="text-center mb-[1rem]">
        <h3 className='text-[28px] font-optima'>Trending Now</h3>
        <p>Discover the beauty secrets the whole world has fallen in love with!</p>
      </div>

      <div className="relative mt-4">
        <div
          id="trending-scroll"
          className="flex overflow-x-auto snap-x snap-mandatory gap-[10px] md:gap-[10px] lg:gap-[20px] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-4"
        >
          {isLoading
            ? Array.from({ length: SKELETON_COUNT }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))
            : trending.map((item, index) => (
              <ProductCard key={index} item={item} />
            ))}
        </div>
        <CustomScrollbar
          elementId="trending-scroll"
          thumbWidth={thumbWidth}
          scrollLeftPos={scrollLeftPos}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
        />
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

