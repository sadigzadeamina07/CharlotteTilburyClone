import React, { useState } from 'react';
import { Link, useLocation } from 'react-router';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

import { ChevronDown, Globe, X } from 'lucide-react';

import { BiLogoFacebookSquare } from 'react-icons/bi';
import { FaInstagram, FaTiktok, FaYoutube, FaTwitch } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import 'swiper/css';
import 'swiper/css/pagination';
import { useProduct } from '../Context/DataContext';

function Footer() {
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const [openMenu, setOpenMenu] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);
  const [desktopCountryOpen, setDesktopCountryOpen] = useState(false);
  const [tempDesktopCountryName, setTempDesktopCountryName] = useState('');

  const { selectedCountry, setSelectedCountry, countries } = useProduct();

  // Axtarış səhifəsində footer görünməsin
  if (location.pathname === '/search') return null;

  const footerLinks = {
    About: [
      'Store Locator',
      'About Charlotte',
      'Careers',
      'Privacy Policy',
      'Cookies Policy',
    ],
    Support: [
      'Customer Care',
      'Shipping',
      'Returns',
      'FAQ',
      'My Account',
    ],
    'More from Charlotte': [
      'Refer a Friend',
      'Subscribe and Save',
      'Promotions and Savings',
      "Charlotte's Magic Change",
      'Accessibility Statement',
    ],
  };

  const topCards = [
    {
      img: '/assets/img/Footer/Bus.png',
      title: 'Free Delivery',
      text: 'on all orders over £49',
      width: 'w-20',
    },
    {
      img: '/assets/img/Footer/Cards.png',
      title: 'Get 2 free samples',
      text: 'with all orders',
      width: 'w-24',
    },
    {
      img: '/assets/img/Footer/Lips.png',
      title: 'Unlock rewards and benefits',
      text: "with Charlotte's Darlings Loyalty Club",
      width: 'w-16',
    },
    {
      img: '/assets/img/Footer/Miror.png',
      title: 'Complete your Beauty Profile',
      text: 'to get personalised recommendations',
      width: 'w-14',
    },
    {
      img: '/assets/img/Footer/Logo.png',
      title: 'Download the App',
      text: 'Easy beauty for you',
      width: 'w-16',
    },
    {
      img: '/assets/img/Footer/Phone.png',
      title: 'Book a 1:1 Online Beauty Consultation',
      text: "With Charlotte's pro makeup artists.",
      width: 'w-16',
    },
  ];

  if (location.pathname === '/search') return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email address.');
      return;
    }

    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!validEmail.test(email)) {
      setError('Your email address must have an @ and a valid domain (i.e @domain.com)');
      return;
    }

    setError('');
    setEmail('');
  };

  return (
    <footer className="w-full overflow-hidden text-[#340c0c] bg-[#faf8f8] lg:bg-white">
      {/* top cards */}
      {location.pathname !== '/search' && (
        <div className="bg-[#f5f3f3]">
          <div className="mx-auto w-full max-w-[1300px] overflow-hidden py-6">
            {/* Desktop/Laptop Grid (lg and above) */}
            <div className="hidden lg:grid lg:grid-cols-6 gap-[30px] justify-items-center">
              {topCards.map((item, idx) => (
                <div key={idx} className="flex flex-col items-center text-center">
                  <div className="flex  items-center justify-center mb-[10px]">
                    <img src={item.img} alt="" className="h-[48px] object-cover" />
                  </div>
                  <h3 className="font-bold text-[14px] leading-tight mb-1 text-[#333333]">
                    {item.title}
                  </h3>
                  <p className="text-[13px] leading-tight text-[#333333]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Mobile/Tablet Swipeable Swiper with Pagination Dots (lg:hidden) */}
            <div className="lg:hidden">
              <Swiper
                slidesPerView={1}
                spaceBetween={20}
                modules={[Pagination]}
                pagination={{
                  clickable: true,
                  dynamicBullets: true,
                }}
                breakpoints={{
                  480: {
                    slidesPerView: 2,
                    spaceBetween: 20
                  },
                  768: {
                    slidesPerView: 3,
                    spaceBetween: 30
                  }
                }}
                className="pb-12 [&_.swiper-pagination-bullet-active]:!bg-[#333333]"
              >
                {topCards.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="flex flex-col items-center text-center px-4">
                      <div className="flex h-[48px] items-center justify-center mb-[10px]">
                        <img src={item.img} alt="" className='h-[48px] object-cover' />
                      </div>
                      <h3 className="font-bold text-[14px] leading-tight mb-1 text-[#333333]">
                        {item.title}
                      </h3>
                      <p className="text-[13px] leading-tight text-[#333333]">{item.text}</p>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      )}

      {/* Main Footer Block */}
      <div className="bg-transparent lg:bg-white">
        <div className="mx-auto w-full max-w-[1400px] px-[20px] lg:py-[50px] pt-10 pb-4 lg:pb-10">
          <div className="flex flex-col lg:flex-row-reverse lg:justify-between">
            {/* Right Side (Sign Up) - Appears first on mobile */}
            <div className="w-full lg:w-[35%] lg:pl-10 mb-8 lg:mb-0 flex flex-col text-left">
              <h3 className="font-helveticaN text-[14px] font-bold uppercase text-[#333333]">
                Sign up to receive emails
              </h3>
              <p className="mb-6 mt-3 text-[13px] leading-6 text-[#333333]">
                Be the first to know about products, offers and tips
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col w-full text-left">
                <span className="block mb-2 text-[13px] text-[#333333] font-sans font-bold">
                  Email Address
                </span>
                <div className="flex flex-row gap-2 w-full">
                  <input
                    type="email"
                    value={email}
                    placeholder="Email Address"
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    className={`h-[45px] flex-1 border bg-white px-3 outline-none text-[13px] rounded-none ${error ? 'border-red-500' : 'border-[#ccc]'
                      }`}
                  />
                  <button
                    type="submit"
                    className="h-[45px] w-[110px] md:w-[120px] bg-[#d3d3d3] hover:bg-[#c0c0c0] transition-colors text-white font-bold uppercase text-[12px] md:text-[14px] flex items-center justify-center shrink-0 rounded-none border-none"
                  >
                    SIGN UP
                  </button>
                </div>
                {error && <p className="mt-2 text-[12px] text-red-500 text-left">{error}</p>}
              </form>

              <p className="mt-4 text-[11px] leading-4 text-left text-[#555]">
                *T&Cs apply. By submitting your email address, you agree to receive marketing information about Charlotte Tilbury Beauty Limited's products or services by email and social media platforms. For more information about how we use your personal information, please see our <a href="#" className="underline ">Privacy Policy</a>. You can unsubscribe at any time by contacting us.
              </p>

              {/* Social Icons */}
              <div className="mt-8 flex items-center justify-start gap-[20px] text-[20px] text-[#333333] lg:mt-auto w-full">
                <BiLogoFacebookSquare className="cursor-pointer hover:opacity-70 transition-opacity" />
                <FaInstagram className="cursor-pointer hover:opacity-70 transition-opacity" />
                <FaTiktok className="cursor-pointer hover:opacity-70 transition-opacity" />
                <FaXTwitter className="cursor-pointer hover:opacity-70 transition-opacity" />
                <FaYoutube className="cursor-pointer hover:opacity-70 transition-opacity" />
                <FaTwitch className="cursor-pointer hover:opacity-70 transition-opacity" />
              </div>

              {/* Mobile Shipping To (Only visible on mobile) */}
              <div className="mt-10 lg:hidden text-left mb-2 block w-full border-t border-[#e5e5e5] pt-6">
                <h3 className="font-bold uppercase text-[14px] text-[#333333] mb-3">SHIPPING TO:</h3>
                <button
                  onClick={() => setCountryOpen(true)}
                  className="flex items-center hover:underline text-[#333333] font-sans"
                >
                  <Globe size={18} strokeWidth={1.5} className="mr-2" />
                  <span className="text-[13px] font-medium">
                    {selectedCountry.name} ({selectedCountry.currency})
                  </span>
                </button>
              </div>
            </div>

            {/* Left Side (Links) */}
            <div className="w-full lg:w-[65%] lg:pr-10 lg:border-r lg:border-[#e5e5e5] flex flex-col lg:grid lg:grid-cols-3 lg:gap-[30px] lg:pt-0">
              {Object.entries(footerLinks).map(([title, items], index) => {
                const active = openMenu === title;

                return (
                  <div key={title} className={`border-t lg:border-0 border-[#e5e5e5] w-full ${index === Object.entries(footerLinks).length - 1 ? 'border-b lg:border-b-0' : ''}`}>
                    {/* Mobile Accordion Header */}
                    <button
                      onClick={() => setOpenMenu(active ? '' : title)}
                      className="flex w-full items-center justify-between py-4 lg:hidden border-none bg-transparent"
                    >
                      <h3 className="font-sans font-bold uppercase text-[13px] tracking-wide text-[#333333]">
                        {title}
                      </h3>
                      <ChevronDown size={18} className={`text-[#333333] transition-transform duration-300 ${active ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Desktop/Tablet Header */}
                    <h3 className="hidden lg:block font-sans font-bold uppercase text-[13px] tracking-wide text-[#333333] mb-4">
                      {title}
                    </h3>

                    {/* Links List */}
                    <div
                      className={`overflow-hidden transition-all duration-300 lg:max-h-full lg:overflow-visible ${active ? 'max-h-[500px] pb-4' : 'max-h-0'
                        }`}
                    >
                      <ul className="flex flex-col gap-[12px] lg:gap-[16px]">
                        {items.map((item) => (
                          <li key={item}>
                            <Link to="/home" className="text-[13px]  flex items-center">
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* Desktop Shipping To (Only under ABOUT) */}
                      {title === 'About' && (
                        <div className="hidden lg:block mt-[60px] relative">
                          <h3 className="font-bold uppercase text-[14px] text-[#333333] mb-4">SHIPPING TO</h3>
                          <button
                            onClick={() => {
                              setTempDesktopCountryName(selectedCountry.name);
                              setDesktopCountryOpen(!desktopCountryOpen);
                            }}
                            className="flex items-center gap-1 hover:underline text-[#333333]"
                          >
                            <span className="text-[13px]">
                              {selectedCountry.name} | EN | {selectedCountry.currency}
                            </span>
                          </button>

                          {/* Desktop Shipping Popover */}
                          {desktopCountryOpen && (
                            <div className="absolute top-[calc(100%+15px)] left-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] p-5 w-[320px] z-[100] border border-[#eae6e6]">
                              <div className="absolute -top-2 left-8 w-4 h-4 bg-white border-t border-l border-[#eae6e6] transform rotate-45 shadow-[2px_2px_5px_rgba(0,0,0,0.05)]"></div>
                              <div className="mb-4 relative z-10">
                                <label className="block text-[13px] font-sans text-[#333333] mb-2 font-medium">Shipping to*</label>
                                <div className="relative">
                                  <select
                                    value={tempDesktopCountryName}
                                    onChange={(e) => setTempDesktopCountryName(e.target.value)}
                                    className="w-full border border-[#ccc] text-[13px] text-[#333333] p-3 appearance-none outline-none focus:border-[#333333] bg-white cursor-pointer rounded-none"
                                  >
                                    <option value="">Please Select</option>
                                    {Object.entries(countries).flatMap(([_, list]) => list).map(c => (
                                      <option key={c.name} value={c.name}>{c.name} ({c.currency})</option>
                                    ))}
                                  </select>
                                  <ChevronDown size={16} strokeWidth={1.5} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#333333] pointer-events-none" />
                                </div>
                              </div>
                              <button
                                disabled={!tempDesktopCountryName}
                                onClick={() => {
                                  const allCountries = Object.entries(countries).flatMap(([_, list]) => list);
                                  const found = allCountries.find(c => c.name === tempDesktopCountryName);
                                  if (found) {
                                    setSelectedCountry(found);
                                    setDesktopCountryOpen(false);
                                  }
                                }}
                                className={`w-full transition-colors text-white font-bold uppercase text-[14px] py-3 tracking-wider relative z-10 rounded-none ${tempDesktopCountryName ? 'bg-[#333333] hover:bg-black cursor-pointer' : 'bg-[#d3d3d3] cursor-not-allowed'}`}
                              >
                                CONTINUE
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* The Shipping To Drawer (Left Drawer matching Header's MobileMenu) */}
      <div
        className={`fixed inset-0 bg-black/40 z-[9999] transition-opacity duration-300 ${countryOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        onClick={() => setCountryOpen(false)}
        aria-hidden="true"
      />

      <div
        className={`fixed top-0 left-0 bottom-0 w-full sm:w-[400px] bg-white z-[10000] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${countryOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-6 shrink-0">
          <h2 className="font-sans font-bold uppercase text-[15px] tracking-wider text-[#333333]">
            Shipping To
          </h2>
          <button onClick={() => setCountryOpen(false)} className="p-2 hover:bg-gray-100 transition-colors">
            <X size={24} strokeWidth={1.5} className="text-[#333333]" />
          </button>
        </div>

        {/* countries */}
        <div className="flex-1 overflow-y-auto max-h-full">
          {Object.entries(countries).map(([region, list]) => (
            <div key={region} className="mb-2">
              <h3 className="px-6 py-3 text-[13px] font-sans font-bold uppercase tracking-wider text-[#333333] bg-[#faf8f8] sticky top-0 border-y border-[#f5f5f5] z-10">
                {region}
              </h3>
              <div className="flex flex-col">
                {list.map((country) => {
                  const active = selectedCountry.name === country.name;
                  return (
                    <button
                      key={country.name}
                      onClick={() => {
                        setSelectedCountry(country);
                        setCountryOpen(false);
                      }}
                      className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-[#faf8f8] transition-colors border-b border-[#f5f5f5] last:border-none"
                    >
                      <span className="font-sans text-[14px] text-[#555]">
                        {country.name} ({country.currency})
                      </span>
                      {active && <span className="text-[18px] text-[#333333] font-bold">✓</span>}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* images */}
      <img
        src="/assets/img/Footer/footer.webp"
        alt=""
        className="hidden w-full object-cover md:block"
      />
      <img
        src="/assets/img/Footer/footermobile.png"
        alt=""
        className="block w-full object-cover md:hidden"
      />

      {/* bottom */}
      <div className="px-6 py-8 text-xs bg-white border-t border-[#e5e5e5]">
        <p className="text-center md:text-left text-[#555]">
          2013-2026 © Charlotte Tilbury Beauty Inc.
          All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;