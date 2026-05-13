import { Heart, Menu, Search, User, X, ChevronDown } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { PiMagnifyingGlass } from "react-icons/pi";
import { Link } from 'react-router';
import { BasketProvider, useBasket } from '../Context/BasketContext';
import { useProduct } from '../Context/DataContext';
import { useWishlist } from '../Context/WishlistContext';
import { FaHeart, FaRegHeart } from "react-icons/fa";
const message = [
  "Create an account or log in to unlock 15% off + FREE ground shipping on your first order* with code DARLING15",
  "Unlock A Free Mini Skincare Duo When You Spend $90! T&Cs Apply.",
  'Up to 20% off Magical Savings!'
]
function Header() {
  const { basket, handleAddtoBasket, CloseBasket, ToggleBasket, Basketopen } = useBasket();
  const { trending } = useProduct();
  const { toggleWishlist, isInWishlist, moveToWishlist } = useWishlist();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true)
  const [open, setOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState("United States | EN | USD $");
  const [tempRegion, setTempRegion] = useState("United States - English (USD $)");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  console.log(fade);

  useEffect(() => {

    const NextMessage = () => {
      setFade(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % message.length)
        setFade(true)
      }, 400)

    }
    const timer = setInterval(NextMessage, 4000)

    return () => clearInterval(timer)
  }, [])

  console.log(index);
  console.log(fade);
  const ToggleMenu = () => {
    setOpen(!open)
  }
  const totalItems = basket.reduce((acc, item) => acc + item.quantity, 0)
  const totalPrice = basket.reduce((acc, item) => {
    const priceStr = item.discountPrice || item.price || '0';
    if (priceStr.toUpperCase() === 'FREE') return acc;
    
    // Extract number by simply removing currency symbols instead of using regex flags
    const cleanPrice = priceStr.replace('$', '').replace('┬г', '').replace('тВм', '').trim();
    const priceNum = parseFloat(cleanPrice) || 0;
    
    return acc + (priceNum * item.quantity);
  }, 0);

  return (
    <header className='text-[#340c0c] relative' >
      <div className="bg-[#fde8e0] p-2">
        <div className="container max-w-[1470px] mx-auto">
          <div className="flex items-center justify-center text-center h-12 md:h-fit text-xs md:text-sm ">
            <Link to='/home' className={`transition-opacity duration-400 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'} `}>{message[index]} </Link>
          </div>
        </div>


      </div>
      <div className={`bg-white px-4 sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container max-w-[1470px]  py-1 md:pt-4 md:pb-2 mx-auto">
          <div className="hidden md:flex h-[10vh] justify-between items-center ">
            <div className="text-[12px] gap-4 z-[160]">
              <div className="relative group">
                <p 
                  className="cursor-pointer hover:text-[#a06464] transition-colors flex items-center gap-1"
                  onClick={() => {
                    setTempRegion(activeRegion); // reset tempRegion to current when opening
                    setIsCurrencyOpen(!isCurrencyOpen);
                  }}
                >
                  {activeRegion} 
                  <ChevronDown size={14} className={`transform transition-transform ${isCurrencyOpen ? 'rotate-180' : ''}`} />
                </p>

                {isCurrencyOpen && (
                  <div className="absolute top-[100%] left-0 mt-4 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-[#eae6e6] w-[260px] p-5 text-left before:content-[''] before:absolute before:-top-2 before:left-8 before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-[#eae6e6] before:transform before:rotate-45">
                    <label className="block text-[11px] font-sans font-bold text-[#340c0c] mb-2 tracking-wide">Shipping to*</label>
                    <div className="relative">
                      <select 
                        value={tempRegion}
                        onChange={(e) => setTempRegion(e.target.value)}
                        className="w-full border border-[#d6cece] p-2.5 text-[13px] font-sans text-[#340c0c] bg-white appearance-none outline-none cursor-pointer focus:border-[#340c0c] transition-colors rounded-none"
                      >
                        <option value="Please Select">Please Select</option>
                        <option value="Australia | EN | AUD $">Australia (AUD $)</option>
                        <option value="Austria | EN | EUR тВм">Austria (EUR тВм)</option>
                        <option value="Canada | EN | CAD $">Canada - English (CAD $)</option>
                        <option value="France | EN | EUR тВм">France - English (EUR тВм)</option>
                        <option value="Germany | EN | EUR тВм">Germany - English (EUR тВм)</option>
                        <option value="United Kingdom | EN | GBP ┬г">United Kingdom (GBP ┬г)</option>
                        <option value="United States | EN | USD $">United States - English (USD $)</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown size={16} color="#340c0c" />
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => {
                        if (tempRegion !== "Please Select") {
                          setActiveRegion(tempRegion);
                          setIsCurrencyOpen(false);
                        }
                      }}
                      className="w-full mt-5 bg-[#340c0c] text-white hover:bg-[#1e0505] transition-colors font-bold py-3 text-[12px] tracking-[0.15em] uppercase"
                    >
                      CONTINUE
                    </button>
                  </div>
                )}
              </div>
            </div>
            <Link to='/'>
              <img src="/assets/img/logo.svg" className='w-[230px] m-auto' alt="" />           </Link>
            <div className="flex gap-4 items-center  ">
              <User size={25} strokeWidth={1} color='#340c0c' />
              <Link to='/wishlist'>
                <Heart size={25} strokeWidth={1} color='#340c0c' />
              </Link>
              <PiMagnifyingGlass size={25} />
              <div className='relative font-helveticaN group flex items-center gap-2'>

                <div className=" flex items-center gap-2">
                  <Link to="/basket">
                    <img src="/assets/img/BasketIcon.svg " className='w-[35px] relative  ' alt="" />

                  </Link>
                  <div className={`fixed h-screen right-0 top-0 w-[400px] flex flex-col duration-400 z-[200] ${Basketopen ? 'translate-x-0' : 'translate-x-full'} bg-white shadow-2xl`}>

                    <div className="py-4 ">
                      <div className=" flex justify-end  text-[24px]">
                        <X size={38} onClick={CloseBasket} strokeWidth={1} />

                      </div>

                      <h3 className='  text-2xl uppercase font-helveticaN  mx-4'>Added to bag</h3>

                    </div>

                    <div className=" overflow-y-auto    ">
                      <div className="py-4 flex  items-center gap-1 p-4 mb-2 ">
                        <img src="/assets/img/Footer/Bus.png" className='w-[50px]  h-[30px]' alt="" />
                        <p className='font-sans'>Your order qualifies for <span className='font-semibold'>free ground shipping</span></p>
                      </div>
                      {basket.map((item) => (
                        <div className="p-[.5rem_1rem_1rem] flex gap-[1.25rem]  ">
                          <img src={item.images?.main || item.cardImages?.main || item.image} alt="" className='w-[140px] ' />
                          <div className="">

                            <h3 className='font-semibold mb-[4px]'>{item.title}</h3>
                            <p className='text-[#856d6d] mt-[8px]'>{item.subTitle}</p>
                            <p className='text-sm  my-[8px]'>{item.price}</p>
                            <button 
                                onClick={() => moveToWishlist(item)}
                                className="flex items-center gap-1.5 mt-2 text-[#856d6d] hover:text-[#340c0c] transition-colors"
                            >
                                {isInWishlist(item) ? <FaHeart size={14} color="#3a080a" /> : <FaRegHeart size={14} />}
                                <span className="underline font-optima text-[13px]">Move to Wishlist</span>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 w-full border-t bg-white border-t-[#d6cece]  mt-auto">
                      <button className='border border-[#340c0c] hover:bg-[#340c0c] w-full hover:text-white h-[44px] uppercase'>
                        View bag ( {totalItems} )
                      </button>
                    </div>


                  </div>
                  <div className={`bg-[#340c0c] text-white h-fit  -mt-1.5 -ml-5 ${totalItems >= 10 ? 'px-1.5 py-0.5' : 'px-2'}  rounded-full border`}>{totalItems} </div>

                </div>

                <div className="absolute top-[100%] opacity-0 mt-4 group-hover:opacity-100 right-0 z-[150] pointer-events-none group-hover:pointer-events-auto transition-opacity duration-300">
                  <div className="bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.15)] w-[400px] border border-[#eae6e6]">
                    <div className="flex text-[16px] font-sans font-bold mb-1 justify-between text-[#340c0c]">
                      <h3 className='uppercase'>Your Bag</h3>
                      <p>${totalPrice.toFixed(2)}</p>
                    </div>
                    <div className="flex pb-2 text-[#856d6d] text-[12px] uppercase mb-2 justify-between tracking-wide">
                      <h3>{totalItems} items</h3>
                      <p>EXCL. delivery</p>
                    </div>
                    <div className="border-b border-[#eae6e6]"></div>
                    
                    {basket.length === 0 ? (
                      <div className="py-8 text-center">
                        <p className='font-sans text-[14px] text-[#340c0c] mb-2'>There Are No Items In Your Bag</p>
                      </div>
                    ) : (
                      <>
                        <div className="max-h-[320px] overflow-y-auto py-2 pr-2 custom-scrollbar">
                          {basket.map((item, idx) => (
                            <div key={idx} className="flex gap-4 py-4 border-b border-[#eae6e6] last:border-0">
                              <div className="w-[60px] h-[60px] shrink-0 bg-[#f5f5f5]">
                                <img src={item.cardImages?.main || item.image || item.images?.main} alt={item.title} className="w-full h-full object-cover" />
                              </div>
                              <div className="flex-grow flex flex-col justify-between">
                                <div>
                                  <h4 className="text-[12px] font-bold text-[#340c0c] uppercase line-clamp-2 hover:underline cursor-pointer">{item.title}</h4>
                                  <p className="text-[11px] text-[#856d6d] uppercase mt-1 line-clamp-1">{item.subtitle || item.subTitle || 'Standard Size'}</p>
                                </div>
                                <div className="text-right mt-2">
                                  {item.price === 'FREE' ? (
                                    <p className="text-[11px] text-[#340c0c] font-bold uppercase tracking-wide">
                                      QTY: {item.quantity} <span className="line-through text-[#856d6d] mr-1">FREE</span> FREE
                                    </p>
                                  ) : item.discountPrice ? (
                                    <p className="text-[11px] text-[#340c0c] font-bold uppercase tracking-wide">
                                      QTY: {item.quantity} <span className="line-through text-[#856d6d] mr-1">{item.price}</span> <span className="text-[#a06464]">{item.discountPrice}</span>
                                    </p>
                                  ) : (
                                    <p className="text-[11px] text-[#340c0c] font-bold uppercase tracking-wide">
                                      QTY: {item.quantity} {item.price}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t border-[#eae6e6]">
                          <button onClick={() => { ToggleBasket(); }} className="w-full bg-[#220B13] hover:bg-[#340c0c] text-white py-3 uppercase text-[13px] tracking-widest font-bold transition-colors">
                            VIEW BAG & CHECKOUT
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

            </div>

          </div>
          <div className="flex relative md:hidden py-3 justify-between items-center ">
            {/* Left: Hamburger + Heart */}
            <div className="flex items-center gap-4 flex-1">
              <Menu size={26} strokeWidth={1.5} onClick={ToggleMenu} color='#340c0c' className="cursor-pointer" />

              <div className={`fixed bg-white left-0 transform transition-transform duration-400 ease-in-out z-20 top-0 h-[100vh] w-[90%] ${open ? 'translate-x-0 ' : '-translate-x-full'}`}>
                <div className="flex justify-end items-center px-3 h-[10vh]">
                  <X onClick={ToggleMenu} className='' />
                </div>
              </div>
              <Link to='/wishlist'>
                <Heart size={24} strokeWidth={1.5} color='#340c0c' />
              </Link>
            </div>
            
            {/* Center: Logo */}
            <div className="flex justify-center flex-1">
              <Link to='/'>
                <img src="/assets/img/logo.svg" className='w-[140px] m-auto' alt="CT Logo" />
              </Link>
            </div>

            {/* Right: User + Bag */}
            <div className="flex items-center justify-end gap-4 flex-1">
              <User size={24} strokeWidth={1.5} color='#340c0c' />

              <div className="flex items-center relative cursor-pointer" onClick={ToggleBasket}>
                <img src="/assets/img/BasketIcon.svg " className='w-[24px]' alt="" />
                <div className={`absolute -top-1 -right-2 bg-[#340c0c] text-white h-fit text-[10px] font-bold ${totalItems >= 10 ? 'px-1' : 'px-[5px]'} py-[1px] rounded-full leading-none flex items-center justify-center min-w-[16px] min-h-[16px]`}>
                  {totalItems}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container max-w-[1300px] mx-auto">
          {/* Desktop Nav */}
          <div className="hidden md:flex justify-center items-center ">
            <ul className='font-helveticaN flex flex-wrap  font-black justify-center  gap-4  lg:gap-7 uppercase'>
              <li className='text-[#a06464] border-b border-transparent pb-2 hover:border-b-[#a06464]' ><Link to='/home' >Up to a magical 20% off</Link></li>
              <li className='  group border-b  border-transparent pb-2 hover:border-[#340c0c]'><Link to='/home' >New In</Link>
                <div className="absolute w-full bg-white p-2   flex flex-col  justify-center top-full opacity-0  invisible group-hover:visible group-hover:opacity-100 duration-200   z-50  left-0">
                  <ul className=' mx-auto  font-normal font-sans text-[14px]  normal-case'>
                    <li className="">
                      <Link to='/home' className="">Shop New In</Link>
                    </li>
                    <li className="">
                      <Link to='/home' className="">Pillow Talk Blush Balm Lip Tint</Link>
                    </li>
                    <li className="">
                      <Link to='/home' className="">Pillow Talk Beauty Soulmates Palette in Flawless Rosewood</Link>
                    </li>
                    <li className="">
                      <Link to='/home' className="">The Gift Of Pillow Talk Eyes & Lips</Link>
                    </li>
                    <li className="">
                      <Link to='/home' className="">NEW! Charlotte's Magic Cream</Link>
                    </li>
                    <li className="">
                      <Link to='/home' className="">Magic Love Frequency Body Cream</Link>
                    </li>
                    <li className="">
                      <Link to='/home' className="">Airbrush Flawless Blur Concealer</Link>
                    </li>
                  </ul>

                </div>

              </li>
              <li className=' border-b border-transparent pb-2 hover:border-[#340c0c]'><Link to='/home' >Makeup</Link></li>
              <li className=' border-b border-transparent pb-2 hover:border-[#340c0c]'><Link to='/home' >Skincare</Link></li>
              <li className=' border-b border-transparent  pb-2 hover:border-[#340c0c]'><Link to='/home' >Best Sellers</Link></li>
              <li className=' border-b border-transparent pb-2 hover:border-[#340c0c]'><Link to='/home' >Gifts    </Link></li>
              <li className='border-b border-transparent  pb-2 hover:border-[#340c0c]'><Link to='/home' >Fragrance</Link></li>
              <li className='border-b border-transparent pb-2 hover:border-[#340c0c]'><Link to='/home' >SHADE MATCH TOOLS</Link></li>
              <li className='border-b border-transparent pb-2 hover:border-[#340c0c]'><Link to='/home' >Services</Link></li>
            </ul>

          </div>
          <div className="md:hidden flex justify-center pb-4 pt-1 items-center px-2">
            <label className='border border-[#a08a8a] flex items-center rounded-full w-full p-2 h-fit bg-white'>
              <PiMagnifyingGlass className='mx-2 text-[#856d6d]' size={20} />
              <input type="text" placeholder='Search product, shade, colour' className='font-sans text-[14px] text-[#340c0c] focus:outline-0 w-full bg-transparent placeholder-[#856d6d]' />
            </label>
          </div>


        </div>




      </div>
      {/* STICKY SLIDE-DOWN HEADER */}
      <div className={`fixed top-0 left-0 w-full bg-white z-[110] shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-transform duration-500 ease-in-out ${isScrolled && !Basketopen ? 'translate-y-0' : '-translate-y-full'}`}>
        
        {/* Desktop Sticky View */}
        <div className="hidden md:block h-[60px]">
          <div className="container max-w-[1470px] mx-auto h-full px-4 md:px-8">
            <div className="grid grid-cols-[1fr_auto_1fr] h-full items-center">
              {/* Left Links */}
              <div className="flex items-center gap-5 xl:gap-8 justify-start font-helveticaN font-bold uppercase text-[11px] xl:text-[12px]">
                <Link to='/home' className="text-[#6e1e2d] hover:text-[#340c0c] whitespace-nowrap transition-colors">GIFT MAGIC THIS MOTHER'S DAY! тЬж</Link>
                <Link to='/home' className="text-[#340c0c] hover:text-[#6e1e2d] whitespace-nowrap transition-colors">NEW IN</Link>
                <Link to='/home' className="text-[#340c0c] hover:text-[#6e1e2d] whitespace-nowrap transition-colors">MAKEUP</Link>
                <Link to='/home' className="text-[#340c0c] hover:text-[#6e1e2d] whitespace-nowrap transition-colors">SKINCARE</Link>
              </div>

              {/* Center CT Logo */}
              <div className="flex justify-center items-center h-full py-1">
                <Link to='/' className="flex items-center justify-center h-full">
                  <img src="/assets/img/logo.png" className="h-[48px] object-contain" alt="CT Logo" />
                </Link>
              </div>

              {/* Right Links & Icons */}
              <div className="flex items-center gap-5 xl:gap-8 justify-end font-helveticaN font-bold uppercase text-[11px] xl:text-[12px]">
                <Link to='/home' className="text-[#340c0c] hover:text-[#6e1e2d] whitespace-nowrap transition-colors">BEST SELLERS</Link>
                <Link to='/home' className="text-[#340c0c] hover:text-[#6e1e2d] whitespace-nowrap transition-colors">GIFTS</Link>
                <Link to='/home' className="text-[#340c0c] hover:text-[#6e1e2d] whitespace-nowrap transition-colors hidden lg:block">FRAGRANCE</Link>
                <Link to='/home' className="text-[#340c0c] hover:text-[#6e1e2d] whitespace-nowrap transition-colors hidden xl:block">SHADE MATCH TOOLS</Link>
                <Link to='/home' className="text-[#340c0c] hover:text-[#6e1e2d] whitespace-nowrap transition-colors hidden xl:block">SERVICES</Link>

                {/* Utilities - ONLY Cart in sticky view */}
                <div className="flex items-center ml-2">
                  <div className="relative font-helveticaN flex items-center cursor-pointer" onClick={ToggleBasket}>
                    <img src="/assets/img/BasketIcon.svg" className='w-[24px]' alt="Bag" />
                    <div className={`absolute -top-1 -right-2 bg-[#340c0c] text-white h-fit text-[10px] font-bold ${totalItems >= 10 ? 'px-1' : 'px-[5px]'} py-[1px] rounded-full leading-none flex items-center justify-center min-w-[16px] min-h-[16px]`}>
                      {totalItems}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky View */}
        <div className="md:hidden h-[60px] bg-white border-b border-[#eae6e6]">
          <div className="grid grid-cols-[1fr_auto_1fr] h-full items-center px-4">
            {/* Left */}
            <div className="flex justify-start items-center">
              <Menu size={26} strokeWidth={1.5} onClick={ToggleMenu} color='#340c0c' className="cursor-pointer" />
            </div>

            {/* Center */}
            <div className="flex justify-center items-center h-full py-1">
              <Link to='/' className="flex items-center justify-center h-full">
                <img src="/assets/img/logo.png" className="h-[44px] object-contain" alt="CT Logo" />
              </Link>
            </div>

            {/* Right */}
            <div className="flex items-center justify-end">
              <div className="relative font-helveticaN flex items-center cursor-pointer" onClick={ToggleBasket}>
                <img src="/assets/img/BasketIcon.svg" className='w-[24px]' alt="Bag" />
                <div className={`absolute -top-1 -right-2 bg-[#340c0c] text-white h-fit text-[10px] font-bold ${totalItems >= 10 ? 'px-1' : 'px-[5px]'} py-[1px] rounded-full leading-none flex items-center justify-center min-w-[16px] min-h-[16px]`}>
                  {totalItems}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
