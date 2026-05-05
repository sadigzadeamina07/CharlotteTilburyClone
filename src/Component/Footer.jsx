
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
        <div className='max-w-[1300px] py-6 mx-auto '>

          <div className=" hidden md:flex justify-center flex-wrap  items-center gap-10 ">
            <div className="text-center flex flex-col items-center">
              <img src="/assets/img/Footer/Bus.png" className='w-20' alt="" />
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
          <div className="   flex  md:hidden   ">
            <Swiper

              pagination={{
                dynamicBullets: true,
                clickable: true,
                dynamicMainBullets: 5
              }}

              slidesPerView={1}
              modules={[Pagination]}
              className="mySwiper3 
    pb-[70px]
    [&>.swiper-pagination]:!relative
    [&>.swiper-pagination]:!mt-1
    [&_.swiper-pagination]:!bottom-[15px]
    [&_.swiper-pagination-bullet-active]:!bg-[#340c0c]"
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


      <div className="my-12 ml-10  ">
        <div className="grid gap-5 grid-cols-1 md:grid-cols-4">
          <div>
            <h3 className='font-helveticaN uppercase mb-3.5 font-bold'>About</h3>
            <ul className='flex flex-col gap-6'>
              <li><Link to='/home'>Store Locator</Link></li>
              <li><Link to='/home'>About Charlotte</Link></li>
              <li><Link to='/home'>Careers</Link></li>
              <li><Link to='/home'>Privacy Policy</Link></li>
              <li><Link to='/home'>Cookies Policy</Link></li>
            </ul>
          </div>
          <div>
            <h3 className=' font-helveticaN uppercase mb-3.5 font-bold'>Support</h3>
            <ul className='flex flex-col gap-6'>
              <li><Link to='/home'>Customer Care</Link></li>
              <li><Link to='/home'>Shipping</Link></li>
              <li><Link to='/home'>Returns</Link></li>
              <li><Link to='/home'>FAQ</Link></li>
              <li><Link to='/home'>My Account</Link></li>
              <li><Link to='/home'>Charlotte's Darlings Loyalty Club</Link></li>
            </ul>
          </div>
          <div>
            <h3 className=' font-helveticaN uppercase mb-3.5 font-bold'>More from Charlotte</h3>
            <ul className='flex flex-col gap-6'>
              <li><Link to='/home'>Refer a Friend</Link></li>
              <li><Link to='/home'>Subscribe and Save</Link></li>
              <li><Link to='/home'>Pro Artist Programme</Link></li>
              <li><Link to='/home'>Affiliate and Ambassador Programme</Link></li>
              <li><Link to='/home'>Promotions and Savings</Link></li>
              <li><Link to='/home'>Charlotte's Magic Change</Link></li>
              <li><Link to='/home'>Accessibility Statement</Link></li>
            </ul>
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='font-helveticaN uppercase font-bold'>SIGN UP TO RECEIVE EMAILS</h3>
            <p className='mb-3'>Be the first to know about products, offers and tips</p>

            <label hclassName=" flex flex-col">
              <span className='text-sm'> Email Address</span>
              <div className="flex w-[90%]  justify-between  mt-1">
                <input type="text" className='focus:outline-0  w-[70%]   px-4 py-2.5 w-[] border-[#ae9e9e] border-1' /> <button className='font-helveticaN font-semibold   text-white bg-[#340c0c] py-2 px-4 '>SIGN UP</button>
              </div>
            </label>


            <p className='text-xs'>*T&Cs apply. By submitting your email address, you agree receive marketing information about Charlotte Tilbury Beauty Limited's products or services by email and social media platforms. For more information about how we use your personal information, please see our Privacy Policy. You can unsubscribe at any time by contacting us.</p>
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
      <div className="py-8 text-xs px-6">
        <p>2013-2026 © Charlotte Tilbury Beauty Inc., trading as Charlotte Tilbury Beauty. All rights reserved. Company number 5493834, registered in Delaware. Business Address 148 Lafayette Street, New York, NY 10013. VAT number: GB 144 0736 30. Contact us</p>


      </div>
    </div>

  )
}

export default Footer