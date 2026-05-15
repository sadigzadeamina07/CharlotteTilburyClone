
import { Link, useLocation } from 'react-router'
import { BiLogoFacebookSquare } from "react-icons/bi";
import { FaInstagram, FaTiktok, FaYoutube, FaTwitch } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { ChevronDown, X, Globe } from 'lucide-react';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

// ── Mobile Footer Accordion ──
const FooterAccordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#d6cece]">
      {/* Mobile: clickable toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden w-full flex justify-between items-center py-4"
      >
        <h3 className="font-helveticaN uppercase font-bold text-[14px] tracking-wide">{title}</h3>
        <ChevronDown
          size={20}
          strokeWidth={1.5}
          className={`text-[#340c0c] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {/* Desktop: always visible heading */}
      <h3 className="hidden md:block font-helveticaN uppercase mb-3.5 font-bold">{title}</h3>

      {/* Content: collapsible on mobile, always open on desktop */}
      <div
        className={`md:!max-h-[1000px] md:!opacity-100 md:!pb-0 overflow-hidden transition-all duration-400 ease-in-out ${
          isOpen ? 'max-h-[500px] opacity-100 pb-4' : 'max-h-0 opacity-0 pb-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
};

// ── Countries Data Grouped by Region ──
const groupedCountries = {
  "EUROPE": [
    { name: 'Austria', lang: '', currency: 'EUR €' },
    { name: 'Belgium', lang: '', currency: 'EUR €' },
    { name: 'Bosnia-Herzegovina', lang: '', currency: 'EUR €' },
    { name: 'Bulgaria', lang: '', currency: 'EUR €' },
    { name: 'Croatia', lang: '', currency: 'EUR €' },
    { name: 'Czech Republic', lang: '', currency: 'EUR €' },
    { name: 'Denmark', lang: '', currency: 'EUR €' },
    { name: 'Estonia', lang: '', currency: 'EUR €' },
    { name: 'Finland', lang: '', currency: 'EUR €' },
    { name: 'France - English', lang: '', currency: 'EUR €' },
    { name: 'France - Français', lang: '', currency: 'EUR €' },
    { name: 'Germany - Deutsch', lang: '', currency: 'EUR €' },
    { name: 'Germany - English', lang: '', currency: 'EUR €' },
    { name: 'Greece', lang: '', currency: 'EUR €' },
  ],
  "NORTH AMERICA": [
    { name: 'United States', lang: 'English', currency: 'USD $' },
    { name: 'Canada', lang: 'English', currency: 'CAD $' }
  ],
  "MIDDLE EAST": [
    { name: 'UAE', lang: 'English', currency: 'AED د.إ' },
    { name: 'Saudi Arabia', lang: 'English', currency: 'SAR ﷼' }
  ],
  "ASIA & PACIFIC": [
    { name: 'Australia', lang: 'English', currency: 'AUD $' },
    { name: 'Japan', lang: '日本語', currency: 'JPY ¥' },
    { name: 'South Korea', lang: '한국어', currency: 'KRW ₩' },
    { name: 'China', lang: '中文', currency: 'CNY ¥' },
    { name: 'India', lang: 'English', currency: 'INR ₹' }
  ]
};

// ── Country Selector Modal ──
const CountryModal = ({ isOpen, onClose, selectedCountry, onSelect }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[300] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative w-full md:w-[480px] max-h-[85vh] bg-white flex flex-col rounded-t-2xl md:rounded-2xl shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#eae6e6]">
          <h2 className="font-helveticaN font-bold text-[16px] uppercase tracking-wider text-[#340c0c]">
            Shipping To
          </h2>
          <button onClick={onClose} className="text-[#856d6d] hover:text-[#340c0c] transition-colors">
            <X size={24} strokeWidth={1} />
          </button>
        </div>

        {/* Country list */}
        <div className="flex-1 overflow-y-auto pb-4">
          {Object.entries(groupedCountries).map(([region, countries], regionIdx) => (
            <div key={regionIdx} className="mb-2">
              <h3 className="px-5 py-3 font-helveticaN font-bold text-[13px] tracking-wider text-[#340c0c] border-b border-[#eae6e6]">
                {region}
              </h3>
              {countries.map((country, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    onSelect(country);
                    onClose();
                  }}
                  className={`w-full flex items-center justify-between px-5 py-3.5 hover:bg-[#f9f8f6] transition-colors border-b border-[#f0eded] ${
                    selectedCountry.name === country.name ? 'bg-[#f9f8f6]' : ''
                  }`}
                >
                  <span className="text-[#340c0c] font-helveticaN text-[14px]">
                    {country.name} {country.lang ? `- ${country.lang}` : ''} ({country.currency})
                  </span>
                  {selectedCountry.name === country.name && (
                    <span className="text-[#340c0c] text-lg">✓</span>
                  )}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

function Footer() {
  // Newsletter state
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);

  // Country selector state
  const [isCountryOpen, setIsCountryOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(groupedCountries["NORTH AMERICA"][0]);

  const location = useLocation();
  if (location.pathname === '/search') return null;

  const validateEmail = (value) => {
    if (!value || value.trim() === '') {
      return 'Enter your email';
    }
    // Must have @ and a valid domain
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Your email address must have an @ and a valid domain (i.e @domain.com)';
    }
    return '';
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setEmailTouched(true);
    const error = validateEmail(email);
    setEmailError(error);
    if (!error) {
      // Success
      setEmail('');
      setEmailTouched(false);
      setEmailError('');
    }
  };

  const handleEmailChange = (e) => {
    const val = e.target.value;
    setEmail(val);
    if (emailTouched) {
      setEmailError(validateEmail(val));
    }
  };

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


      <div className="my-8 md:my-12 px-6 md:ml-10">
        <div className="grid gap-0 md:gap-5 grid-cols-1 md:grid-cols-4">

          {/* ── ABOUT ── */}
          <FooterAccordion title="About">
            <ul className='flex flex-col gap-4 md:gap-6'>
              <li><Link to='/home' className="">Store Locator</Link></li>
              <li><Link to='/home' className="">About Charlotte</Link></li>
              <li><Link to='/home' className="">Careers</Link></li>
              <li><Link to='/home' className="">Privacy Policy</Link></li>
              <li><Link to='/home' className="">Cookies Policy</Link></li>
            </ul>
          </FooterAccordion>

          {/* ── SUPPORT ── */}
          <FooterAccordion title="Support">
            <ul className='flex flex-col gap-4 md:gap-6'>
              <li><Link to='/home' className="">Customer Care</Link></li>
              <li><Link to='/home' className="">Shipping</Link></li>
              <li><Link to='/home' className="">Returns</Link></li>
              <li><Link to='/home' className="">FAQ</Link></li>
              <li><Link to='/home' className="">My Account</Link></li>
              <li><Link to='/home' className="">Charlotte's Darlings Loyalty Club</Link></li>
            </ul>
          </FooterAccordion>

          {/* ── MORE FROM CHARLOTTE ── */}
          <FooterAccordion title="More from Charlotte">
            <ul className='flex flex-col gap-4 md:gap-6'>
              <li><Link to='/home' className="">Refer a Friend</Link></li>
              <li><Link to='/home' className="">Subscribe and Save</Link></li>
              <li><Link to='/home' className="">Pro Artist Programme</Link></li>
              <li><Link to='/home' className="">Affiliate and Ambassador Programme</Link></li>
              <li><Link to='/home' className="">Promotions and Savings</Link></li>
              <li><Link to='/home' className="">Charlotte's Magic Change</Link></li>
              <li><Link to='/home' className="">Accessibility Statement</Link></li>
            </ul>
          </FooterAccordion>

          {/* ── NEWSLETTER + SOCIALS ── */}
          <div className='flex flex-col gap-2 pt-4 md:pt-0'>
            <h3 className='font-helveticaN uppercase font-bold'>SIGN UP TO RECEIVE EMAILS</h3>
            <p className='mb-3'>Be the first to know about products, offers and tips</p>

            <form noValidate onSubmit={handleSignUp} className="flex flex-col">
              <span className='text-sm'> Email Address</span>
              <div className="flex w-full mt-1">
                <input
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  className={`focus:outline-0 flex-1 px-4 py-2 border transition-colors ${
                    emailError && emailTouched
                      ? 'border-red-500'
                      : 'border-[#ae9e9e] border-r-0'
                  }`}
                />
                <button
                  type="submit"
                  className='font-helveticaN font-semibold text-white bg-[#340c0c] py-2 px-6 hover:bg-[#1e0505] transition-colors whitespace-nowrap'
                >
                  SIGN UP
                </button>
              </div>
              {/* Custom error message */}
              {emailError && emailTouched && (
                <p className="text-red-500 text-[13px] mt-2 font-sans leading-snug">{emailError}</p>
              )}
            </form>

            <p className='text-xs mt-2'>*T&Cs apply. By submitting your email address, you agree receive marketing information about Charlotte Tilbury Beauty Limited's products or services by email and social media platforms. For more information about how we use your personal information, please see our Privacy Policy. You can unsubscribe at any time by contacting us.</p>
            
            <div className="flex justify-center gap-7 mt-4">
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

      {/* ── Mobile Shipping To Selector ── */}
      <div className="md:hidden border-t border-[#d6cece] px-6 py-4">
        <button
          onClick={() => setIsCountryOpen(true)}
          className="w-full flex items-center justify-between py-3"
        >
          <div className="flex items-center gap-2">
            <Globe size={18} strokeWidth={1.5} className="text-[#340c0c]" />
            <span className="font-helveticaN text-[13px] uppercase tracking-wide">
              Shipping to: {selectedCountry.name} ({selectedCountry.currency})
            </span>
          </div>
          <ChevronDown size={18} strokeWidth={1.5} className="text-[#340c0c]" />
        </button>
      </div>

      <CountryModal
        isOpen={isCountryOpen}
        onClose={() => setIsCountryOpen(false)}
        selectedCountry={selectedCountry}
        onSelect={setSelectedCountry}
      />

      <img src="/assets/img/Footer/footer.webp" className=' hidden md:block  object-cover w-full' alt="" />
      <img src="/assets/img/Footer/footermobile.png" className='md:hidden block object-cover w-full ' alt="" />
      <div className="py-8 text-xs px-6">
        <p>2013-2026 © Charlotte Tilbury Beauty Inc., trading as Charlotte Tilbury Beauty. All rights reserved. Company number 5493834, registered in Delaware. Business Address 148 Lafayette Street, New York, NY 10013. VAT number: GB 144 0736 30. Contact us</p>


      </div>
    </div>

  )
}

export default Footer