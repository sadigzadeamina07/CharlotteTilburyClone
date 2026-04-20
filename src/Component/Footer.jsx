
import { Link } from 'react-router'
import { BiLogoFacebookSquare } from "react-icons/bi";
import { FaInstagram, FaTiktok, FaYoutube, FaTwitch } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
function Footer() {
  return (
    <div className='text-[#340c0c]'>
      <div className="bg-[#f5f3f3]">
        <div className='max-w-[1300px] py-[24px] mx-auto '>

          <div className=" hidden md:flex justify-center flex-wrap  items-center gap-10 ">
            <div className="text-center flex flex-col items-center">
              <img src="/assets/img/Footer/Bus.png" className='w-[80px]' alt="" />
              <h3 className='font-semibold'>Free Delivery & Returns</h3>
              <p>on all orders over $50</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <img src="/assets/img/Footer/Lips.png" className='w-[100px]' alt="" />
              <h3 className='font-semibold '>Get 2 free samples </h3>
              <p>with all orders</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <img src="/assets/img/Footer/Miror.png" className='w-[70px]' alt="" />
              <h3 className='font-semibold '>Free Delivery & Returns</h3>
              <p>on all orders over $50</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <img src="/assets/img/Footer/Logo.png" className='w-[65px]' alt="" />
              <h3 className='font-semibold '>Get 2 free samples </h3>
              <p>with all orders</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <img src="/assets/img/Footer/Phone.png" className='w-[70px]' alt="" />
              <h3 className='font-semibold'>Get 2 free samples </h3>
              <p>with all orders</p>
            </div>
          </div>
          <div className="   flex  md:hidden ">
 <Swiper
        pagination={{
          dynamicBullets: true,
        }}
        slidesPerView={1}
        modules={[Pagination]}
        className="mySwiper3"
      >
        <SwiperSlide>
      <div className="text-center flex flex-col items-center">
              <img src="/assets/img/Footer/Bus.png" className='w-[80px]' alt="" />
              <h3 className='font-semibold'>Free Delivery & Returns</h3>
              <p>on all orders over $50</p>
            </div>
      </SwiperSlide>
        <SwiperSlide>
          <div className="text-center flex flex-col items-center">
              <img src="/assets/img/Footer/Lips.png" className='w-[100px]' alt="" />
              <h3 className='font-semibold '>Get 2 free samples </h3>
              <p>with all orders</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="text-center flex flex-col items-center">
              <img src="/assets/img/Footer/Miror.png" className='w-[70px]' alt="" />
              <h3 className='font-semibold '>Free Delivery & Returns</h3>
              <p>on all orders over $50</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
                <div className="text-center flex flex-col items-center">
              <img src="/assets/img/Footer/Logo.png" className='w-[65px]' alt="" />
              <h3 className='font-semibold '>Get 2 free samples </h3>
              <p>with all orders</p>
            </div>
        </SwiperSlide>
        <SwiperSlide>
             <div className="text-center flex flex-col items-center">
              <img src="/assets/img/Footer/Phone.png" className='w-[70px]' alt="" />
              <h3 className='font-semibold'>Get 2 free samples </h3>
              <p>with all orders</p>
            </div>
        </SwiperSlide>
      </Swiper>
          </div>
    
        </div>
      </div>


      <div className="m-[3rem]  ">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-4">
          <div>
            <h3 className='font-helveticaN uppercase font-bold'>About</h3>
            <ul className='flex flex-col gap-2'>
              <li><Link to='/'>Store Locator</Link></li>
              <li><Link to='/'>About Charlotte</Link></li>
              <li><Link to='/'>Careers</Link></li>
              <li><Link to='/'>Privacy Policy</Link></li>
              <li><Link to='/'>Cookies Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className=' font-helveticaN uppercase font-bold'>Support</h3>
            <ul className='flex flex-col gap-2'>
              <li><Link to='/'>Customer Care</Link></li>
              <li><Link to='/'>Shipping</Link></li>
              <li><Link to='/'>Returns</Link></li>
              <li><Link to='/'>FAQ</Link></li>
              <li><Link to='/'>My Account</Link></li>
              <li><Link to='/'>Charlotte's Darlings Loyalty Club</Link></li>
            </ul>
          </div>
          <div>
            <h3 className=' font-helveticaN uppercase font-bold'>Support</h3>
            <ul className='flex flex-col gap-2'>
              <li><Link to='/'>Customer Care</Link></li>
              <li><Link to='/'>Shipping</Link></li>
              <li><Link to='/'>Returns</Link></li>
              <li><Link to='/'>FAQ</Link></li>
              <li><Link to='/'>My Account</Link></li>
              <li><Link to='/'>Charlotte's Darlings Loyalty Club</Link></li>
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='font-helveticaN uppercase font-bold'>SIGN UP TO RECEIVE EMAILS</h3>
            <p>Be the first to know about products, offers and tips</p>
            <div className="flex">
              <input type="text" /> <button className='font-helveticaN'>SIGN UP</button>
            </div>

            <p className='text-[12px]'>*T&Cs apply. By submitting your email address, you agree receive marketing information about Charlotte Tilbury Beauty Limited's products or services by email and social media platforms. For more information about how we use your personal information, please see our Privacy Policy. You can unsubscribe at any time by contacting us.</p>
            <div className="flex justify-center gap-7">
              <BiLogoFacebookSquare />
              <FaInstagram />
              <FaTiktok />
              <FaXTwitter />
              <FaYoutube />
              <FaTwitch />
            </div>
          </div>

        </div>


      </div>
      <img src="/assets/img/Footer/footer.webp" className=' hidden md:block  object-cover w-full' alt="" />
      <img src="/assets/img/Footer/footermobile.png" className='md:hidden block object-cover w-full ' alt="" />
 <div className="py-[32px] text-[12px] px-[24px]">
  <p>2013-2026 © Charlotte Tilbury Beauty Inc., trading as Charlotte Tilbury Beauty. All rights reserved. Company number 5493834, registered in Delaware. Business Address 148 Lafayette Street, New York, NY 10013. VAT number: GB 144 0736 30. Contact us</p>
  

 </div>
   </div>

  )
}

export default Footer