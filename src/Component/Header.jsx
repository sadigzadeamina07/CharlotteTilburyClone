import { Heart, Menu, Search, User, X } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import { PiMagnifyingGlass } from "react-icons/pi";
import { Link } from 'react-router';
import { BasketProvider, useBasket } from '../Context/BasketContext';
const message = [
  "Create an account or log in to unlock 15% off + FREE ground shipping on your first order* with code DARLING15",
  "Unlock A Free Mini Skincare Duo When You Spend $90! T&Cs Apply.",
  'Up to 20% off Magical Savings!'
]
function Header() {
const {basket ,handleAddtoBasket, CloseBasket ,ToggleBasket, Basketopen} =useBasket()

  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [open, setOpen] = useState(false)

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
   const totalItems=basket.reduce((acc,item)=> acc+item.quantity,0)
   
  return (
    <header className='text-[#340c0c] relative' >
      <div className="bg-[#fde8e0] p-2">
        <div className="container max-w-[1470px] mx-auto">
          <div className="flex items-center justify-center text-center   h-[3rem] md:h-fit  text-[12px] md:text-sm ">
            <Link to='/' className={`transition-opacity duration-400 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'} `}>{message[index]} </Link>
          </div>
        </div>


      </div>
      <div className="bg-white px-[1rem] ">
        <div className="container max-w-[1470px]  py-1 md:pt-4 md:pb-2 mx-auto">
          <div className="hidden md:flex h-[10vh] justify-between items-center ">
            <div className="text-[12px]  gap-4">
              <p>United States| EN | USD $</p>

            </div>
            <Link to='/'>
              <img src="/assets/img/logo.svg" className='w-[230px] m-auto' alt="" />           </Link>
            <div className="flex gap-4 items-center  ">
              <User size={25} strokeWidth={1} color='#340c0c' />
              <Heart size={25} strokeWidth={1} color='#340c0c' />
              <PiMagnifyingGlass size={25} />
              <div className='relative font-helveticaN group flex items-center gap-2'>

                <div className=" flex items-center gap-2">
                  <Link to="/BasketDetail">
                  <img src="/assets/img/BasketIcon.svg "  className='w-[35px] relative  ' alt="" />
                 
                  </Link>
                   <div className={`fixed h-screen right-0 top-0 w-[400px] flex flex-col duration-400 z-25 ${Basketopen ? 'translate-x-0' : 'translate-x-full'} bg-white `}>
                    
                  <div className="py-[16px] ">
                      <div className=" flex justify-end  text-[24px]">
                      <X size={38} onClick={CloseBasket}  strokeWidth={1} />
                      
                      </div>

                      <h3 className='  text-[24px] uppercase font-helveticaN  mx-[16px]'>Added to bag</h3>
                                </div>
                      
                      <div className=" overflow-y-auto    ">
<div className="py-[16px] flex  items-center gap-[5px] p-[16px] mb-[8px] ">
                        <img src="/assets/img/Footer/Bus.png" className='w-[50px]  h-[30px]' alt="" />
                      <p className='font-sans'>Your order qualifies for <span className='font-semibold'>free ground shipping</span></p>
                      </div>

                      </div>

<div className="p-[16px] w-full border-t bg-white border-t-[#d6cece]  mt-auto">
        <button className='border border-[#340c0c] hover:bg-[#340c0c] w-full hover:text-white h-[44px] uppercase'>
            View bag (5)
        </button>
    </div>


                  </div>
                  <div className="bg-[#340c0c] text-white  -mt-1.5 -ml-5 px-[8px]  rounded-full border">{totalItems} </div>

                </div>

                <div className="absolute  top-[100%] opacity-0  mt-[16px] group-hover:opacity-100 right-0 z-20  ">
                  <div className=" bg-white p-[1rem] shadow-[0_0_2px_2px_#eae6e6]   w-[440px]">
                    <div className="flex text-[24px] mb-1 justify-between">
                      <h3 className='uppercase  '>Your Bag</h3>
                      <p>$0.00</p>
                    </div>
                    <div className="flex pb-[8px]  text-[#856d6d] text-[18px] uppercase mb-1 justify-between">
                      <h3 className='  '>0 items</h3>
                      <p>EXCL. delivery</p>
                    </div>
                    <div className="border-[#eae6e6] border-1 mt-[8px]"></div>
                    <p className='py-[5px] font-sans'>There are no items in your bag</p>
                  </div>
                </div>
              </div>

            </div>

          </div>
          <div className="flex relative md:hidden  h-[10vh] justify-between items-center ">
            <div className="flex  gap-4">
              <Menu size={25} strokeWidth={1} onClick={ToggleMenu} color='#340c0c' />

              <div className={`fixed bg-white left-0  transform transition-transform duration-400 ease-in-out  z-20 top-0 h-[100vh] w-[90%] ${open ? 'translate-x-0 ' : '-translate-x-full'}`}>
                <div className="flex justify-end  items-center px-3  h-[10vh]">
                  <X onClick={ToggleMenu} className='' />
                </div>

              </div>
              <Heart size={25} strokeWidth={1} color='#340c0c' />
            </div>
            <Link to='/'>
              <img src="/assets/img/logo.svg" className='w-[150px] m-auto' alt="" />
            </Link>

            <div className="flex items-center gap-4 py-2">
              <User size={25} strokeWidth={1} color='#340c0c' />

              <div className=" flex items-center gap-2">
                <img src="/assets/img/BasketIcon.svg " className='w-[35px]  ' alt="" />
                <div className="bg-[#340c0c] text-white  -mt-1.5 -ml-5 px-[8px]  rounded-full border">1</div>

              </div>
            </div>
          </div>
        </div>
        <div className="container max-w-[1300px] mx-auto">
          <div className="hidden  md:flex  justify-center items-center ">
            <ul className='font-helveticaN flex flex-wrap  font-black justify-center  gap-4  lg:gap-7 uppercase'>
              <li className='text-[#a06464] border-b border-transparent pb-2 hover:border-b-[#a06464]' ><Link to='/' >Up to a magical 20% off</Link></li>
              <li className='  group border-b  border-transparent pb-2 hover:border-[#340c0c]'><Link to='/' >New In</Link>
                <div className="absolute w-full bg-white p-2   flex flex-col  justify-center top-full opacity-0  invisible group-hover:visible group-hover:opacity-100 duration-200   z-50  left-0">
                  <ul className=' mx-auto  font-normal font-sans text-[14px]  normal-case'>
                    <li className="">
                      <Link to='/' className="">Shop New In</Link>
                    </li>
                    <li className="">
                      <Link to='/' className="">Pillow Talk Blush Balm Lip Tint</Link>
                    </li>
                    <li className="">
                      <Link to='/' className="">Pillow Talk Beauty Soulmates Palette in Flawless Rosewood</Link>
                    </li>
                    <li className="">
                      <Link to='/' className="">The Gift Of Pillow Talk Eyes & Lips</Link>
                    </li>
                    <li className="">
                      <Link to='/' className="">NEW! Charlotte's Magic Cream</Link>
                    </li>
                    <li className="">
                      <Link to='/' className="">Magic Love Frequency Body Cream</Link>
                    </li>
                    <li className="">
                      <Link to='/' className="">Airbrush Flawless Blur Concealer</Link>
                    </li>
                  </ul>

                </div>

              </li>
              <li className=' border-b border-transparent pb-2 hover:border-[#340c0c]'><Link to='/' >Makeup</Link></li>
              <li className=' border-b border-transparent pb-2 hover:border-[#340c0c]'><Link to='/' >Skincare</Link></li>
              <li className=' border-b border-transparent  pb-2 hover:border-[#340c0c]'><Link to='/' >Best Sellers</Link></li>
              <li className=' border-b border-transparent pb-2 hover:border-[#340c0c]'><Link to='/' >Gifts    </Link></li>
              <li className='border-b border-transparent  pb-2 hover:border-[#340c0c]'><Link to='/' >Fragrance</Link></li>
              <li className='border-b border-transparent pb-2 hover:border-[#340c0c]'><Link to='/' >SHADE MATCH TOOLS</Link></li>
              <li className='border-b border-transparent pb-2 hover:border-[#340c0c]'><Link to='/' >Services</Link></li>
            </ul>

          </div>
          <div className="md:hidden  flex  justify-center pb-4 items-center ">
            <label className='border-1 border-[#340c0c]   flex items-center rounded-full w-full  p-1  h-fit'>
              <PiMagnifyingGlass className='mx-2' size={25} />

              <input type="text" placeholder='' className=' focus:outline-0 w-[75%] md:w-[82%] ' />

            </label>

          </div>


        </div>




      </div>
    </header>
  )
}

export default Header