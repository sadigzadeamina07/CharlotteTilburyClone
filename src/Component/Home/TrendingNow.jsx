import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Scrollbar } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { BasketProvider, useBasket } from '../../Context/BasketContext';
import { useProduct } from '../../Context/DataContext';
import { useWishlist } from '../../Context/WishlistContext';

function TrendingNow() {
    const { trending } = useProduct();
    const { handleAddtoBasket } = useBasket();
    const { toggleWishlist, isInWishlist } = useWishlist();

    return (
        <div className='relative px-[1rem] py-[2rem]'>
            <div className="text-center mb-[1rem]">
                <h3 className='text-[28px] font-optima'>Trending Now</h3>
                <p>Discover the beauty secrets the whole world has fallen in love with!</p>
            </div>

            <Swiper
                pagination={{
                    type: 'progressbar',
                    hide: false,
                    draggable: true

                }}
                slidesPerView={2}
                spaceBetween={10}
                breakpoints={{
                    768: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1440: {
                        slidesPerView: 5,
                        spaceBetween: 30,
                    }
                }}
                navigation={{
                    prevEl: '.custom-prev-button',
                    nextEl: '.custom-next-button',
                }}
                observer={true}
                modules={[Pagination, Navigation, Scrollbar]}
                className="mySwiper relative !pb-10 
      [&_.swiper-pagination-progressbar]:!bg-gray-200 
[&_.swiper-pagination-progressbar]:!h-[4px] 
[&_.swiper-pagination-progressbar]:!w-[200px] 
[&_.swiper-pagination-progressbar]:!top-auto 
[&_.swiper-pagination-progressbar]:!bottom-0 
[&_.swiper-pagination-progressbar]:!left-1/2 
[&_.swiper-pagination-progressbar]:!-translate-x-1/2 
[&_.swiper-pagination-progressbar]:!rounded-full 

[&_.swiper-pagination-progressbar-fill]:!bg-[#3a080a] 
[&_.swiper-pagination-progressbar-fill]:!rounded-full
       "
            >
                {trending.map((item, index) => {
                    const isLiked = isInWishlist(item);
                    return (
                        <SwiperSlide key={index} className='h-auto'>
                            <div className="w-full   group relative">
                                <Link to='/product' state={{ product: item }}>
                                    <img src={item.images?.main || item.cardImages?.main} className='w-full h-fit    bg-[#f5f5f5] object-cover' alt={item.title} />
                                    <img src={item.images?.hover || item.cardImages?.hover || item.images?.main} className='w-full h-fit    absolute inset-0  duration-300 hover:opacity-100 opacity-0    bg-[#f5f5f5] object-cover' alt={item.title} />
                                </Link>
                                <div onClick={() => toggleWishlist(item)} className={`absolute ${isLiked ? 'border-[#3a080a]' : 'border-none'} right-3 bg-white p-2 rounded-full border top-3 cursor-pointer hover:scale-110 transition-transform`}>
                                    {isLiked ? <FaHeart size={22} color="#3a080a" /> : <FaRegHeart size={22} color="#3a080a" />}
                                </div>

                                <div className="p-[10px]  text-[1rem]     font-helveticaN  ">
                                    <div className="px-[1rem] text-sm  ">
                                        <Link to='/product' state={{ product: item }}>
                                            <h3 className='font-bold  uppercase  line-clamp-1'>{item.title}</h3>
                                            <p className=' '>{item.subtitle || item.subTitle}</p>
                                        </Link>


                                    </div>
                                    <div className=" mt-15">
                                        <p className="ml-[1rem] text-sm font-bold ">{item.price}</p>
                                    </div>


                                </div>
                                <button onClick={() => handleAddtoBasket(item)} className='border mt-auto duration-200 w-full font-helveticaN   uppercase py-2 hover:bg-[#6e2132] hover:text-white border-[#3a080a]'>
                                    Add to basket
                                </button>


                            </div>
                        </SwiperSlide>
                    );
                })}
            </Swiper>

            <button className='custom-prev-button hidden md:block absolute right-14 top-[7.5%] -translate-y-1/2 shadow-2xl z-10 disabled:opacity-50'>
                <ChevronLeft size={36} />
            </button>
            <button className='custom-next-button hidden md:block absolute right-2 top-[7.5%] -translate-y-1/2 shadow-2xl z-10 disabled:opacity-50'>
                <ChevronRight size={36} />
            </button>
        </div>
    );
}

export default TrendingNow;