import React, { useState } from 'react';
import { X, Minus, Plus, Heart, ChevronDown, ChevronUp, Check, Lock } from 'lucide-react';
import { useBasket } from '../Context/BasketContext';
import { useWishlist } from '../Context/WishlistContext';
import { Link } from 'react-router'; 
import { FaHeart, FaRegHeart } from "react-icons/fa";

const Accordion = ({ title, placeholder, buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-[#eae6e6] bg-[#fdfcfc]">
      <button 
        className="flex w-full items-center justify-between px-4 py-4 font-helveticaN text-[13px] text-[#340c0c] hover:bg-[#f9f8f6] transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[#340c0c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
          {title}
        </span>
        {isOpen ? <ChevronUp size={16} strokeWidth={1.5} /> : <ChevronDown size={16} strokeWidth={1.5} />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40' : 'max-h-0'}`}>
        <div className="p-4 bg-white">
          <div className="flex border border-[#340c0c] h-12">
            <input 
              type="text" 
              placeholder={placeholder} 
              className="flex-grow bg-transparent px-4 text-[14px] focus:outline-none font-helveticaN text-[#340c0c] placeholder:text-gray-400"
            />
            <button className="text-[#340c0c] px-6 text-[12px] font-bold tracking-widest uppercase hover:bg-[#f9f8f6] transition-colors border-l border-[#340c0c] font-helveticaN">
              {buttonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function BasketDetail() {
  const { basket, increaseQuantity, decreaseQuantity, removeFromBasket } = useBasket();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const subtotal = basket.reduce((sum, item) => {
    const priceNum = parseFloat(item.price?.toString().replace(/[^0-9.]/g, '')) || 0;
    return sum + (priceNum * (item.quantity || 1));
  }, 0);

  const totalItems = basket.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const isFreeShipping = subtotal >= 50;
  const shippingCost = (basket.length === 0 || isFreeShipping) ? 0 : 5;
  const total = subtotal + shippingCost;

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-4 pb-32 md:pb-16 font-helveticaN">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        
        {/* Top Shipping Banner */}
        <div className="border border-[#145633] bg-[#f4f9f6] text-[#145633] p-3 text-[13px] flex items-center gap-2 mb-8 mt-2">
          <Check size={16} strokeWidth={2} />
          <span>Enjoy free delivery on this order</span>
        </div>

        {basket.length === 0 ? (
          <div className="text-center py-24 border-t border-[#eae6e6]">
            <p className="text-xl font-optima mb-6 text-[#340c0c] uppercase tracking-widest">Your bag is currently empty.</p>
            <Link to="/" className="inline-block border border-[#340c0c] text-[#340c0c] px-12 py-4 uppercase tracking-widest text-[12px] font-bold hover:bg-[#340c0c] hover:text-white transition-colors duration-300">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            
            {/* LEFT COLUMN: PRODUCTS (7 columns) */}
            <div className="col-span-1 lg:col-span-7">
              <div className="flex justify-between items-end mb-6">
                <h1 className="text-[22px] font-optima uppercase tracking-widest text-[#340c0c]">Your Bag</h1>
                <span className="text-[22px] font-optima text-[#340c0c]">${total.toFixed(2)}</span>
              </div>

              {/* Gift Banner */}
              <div className="bg-[#cd8c7c] text-white p-6 text-[15px] font-helveticaN mb-8 flex items-center justify-between cursor-pointer hover:bg-[#c08273] transition-colors shadow-sm">
                <div className="flex items-center gap-2">
                  <span>Darlings, unlock a free deluxe Airbrush Setting Spray + deluxe Matte Revolution in Pillow Talk Original when you spend over $95!*</span>
                </div>
              </div>

              <div className="space-y-0">
                {basket.map((item, idx) => {
                  const shadeImage = item.selectedShade?.gallery?.[0] || item.selectedShade?.galleryImages?.[0] || item.selectedShade?.swatchImage;
                  const displayImage = shadeImage || item.images?.main || item.cardImages?.main || item.image;
                  const shadeName = item.selectedShade?.name || item.shade || item.subtitle || item.subTitle || "Standard Size";
                  const itemPrice = item.selectedShade?.price || item.price;
                  const isLiked = isInWishlist(item);

                  return (
                  <div key={`${item.title}-${shadeName}-${idx}`} className="flex gap-6 py-8 border-b border-[#eae6e6] relative group">
                    
                    {/* Remove Button */}
                    <button 
                      onClick={() => window.confirm('Are you sure you want to remove this item?') && removeFromBasket(item)}
                      className="absolute top-8 right-0 text-[#856d6d] hover:text-[#340c0c] transition-colors p-1 z-10"
                      aria-label="Remove item"
                    >
                      <X size={24} strokeWidth={1} />
                    </button>

                    {/* Product Image */}
                    <Link to='/product' state={{ product: item }} className="w-24 h-24 md:w-32 md:h-32 bg-transparent shrink-0 block overflow-hidden relative">
                      <img 
                        src={displayImage} 
                        alt={item.title} 
                        className="w-full h-full object-contain mix-blend-multiply transition-transform hover:scale-105 duration-700"
                      />
                    </Link>
                    
                    {/* Product Info */}
                    <div className="flex flex-col pr-8 flex-grow justify-between">
                      <div>
                        <Link to='/product' state={{ product: item }} className="block group-hover:text-[#a06464] transition-colors">
                            <h3 className="font-optima uppercase text-[15px] font-bold text-[#340c0c] tracking-widest line-clamp-2 mb-1 leading-tight">
                              {item.title}
                            </h3>
                        </Link>
                        <p className="text-[#856d6d] text-[11px] uppercase tracking-wider mb-2 font-helveticaN">
                          {shadeName}
                        </p>
                        <p className="text-[#340c0c] font-helveticaN text-[14px] mb-4">{itemPrice}</p>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-2">
                        {/* Quantity Pill */}
                        <div className="flex items-center border border-[#d6cece] rounded-full w-max h-9">
                          <button 
                            onClick={() => decreaseQuantity(item)}
                            className="px-3 text-[#340c0c] hover:text-[#a06464] transition-colors flex items-center justify-center h-full"
                          >
                            <Minus size={14} strokeWidth={1} />
                          </button>
                          <span className="w-6 text-center text-[#340c0c] font-helveticaN text-[13px]">{item.quantity || 1}</span>
                          <button 
                            onClick={() => increaseQuantity(item)}
                            className="px-3 text-[#340c0c] hover:text-[#a06464] transition-colors flex items-center justify-center h-full"
                          >
                            <Plus size={14} strokeWidth={1} />
                          </button>
                        </div>

                        {/* Move to Wishlist */}
                        <button 
                          onClick={() => toggleWishlist(item)}
                          className="flex items-center gap-2 text-[12px] font-helveticaN text-[#340c0c] hover:text-[#a06464] transition-colors w-max group/btn"
                        >
                          {isLiked ? (
                              <FaHeart size={16} color="#4a0014" />
                          ) : (
                              <FaRegHeart size={16} className="group-hover/btn:scale-110 transition-transform" />
                          )}
                          <span className="underline underline-offset-4 decoration-[0.5px]">Move to wishlist</span>
                        </button>
                      </div>

                    </div>
                  </div>
                );
                })}
              </div>
            </div>

            {/* RIGHT COLUMN: ORDER SUMMARY (5 columns) */}
            <div className="col-span-1 lg:col-span-5 relative mt-4 lg:mt-0">
              <div className="sticky top-28">
                
                {/* Loyalty & Promotions Title */}
                <h2 className="font-optima uppercase tracking-widest text-[14px] text-[#340c0c] mb-3">Loyalty & Promotions</h2>
                
                {/* Dark Burgundy Loyalty Block */}
                <div className="bg-[#591b29] p-6 mb-6 text-white shadow-sm border border-[#4a0014]">
                  <h3 className="font-optima uppercase tracking-widest text-[14px] mb-5 flex items-center gap-2 font-bold">
                    Unlock Magic Loyalty Rewards <span className="text-[10px]">✦</span>
                  </h3>
                  
                  <ul className="space-y-4 mb-6 text-[13px] font-helveticaN">
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center shrink-0 text-[10px]">CT</span>
                      <span className="opacity-90">Earn {Math.floor(total)} Loyalty coins with this order</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 flex items-center justify-center shrink-0"><Check size={16} strokeWidth={1.5}/></span>
                      <span className="opacity-90">Get 15% off your first order</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 flex items-center justify-center shrink-0"><Heart size={14} fill="currentColor" strokeWidth={0}/></span>
                      <span className="opacity-90">See Loyalty rewards waiting for you!</span>
                    </li>
                  </ul>

                  <button className="bg-white text-[#340c0c] font-helveticaN text-[12px] font-bold tracking-widest uppercase py-4 px-6 hover:bg-[#f9f8f6] transition-colors w-full shadow-md hover:shadow-lg">
                    Login or create an account
                  </button>
                </div>

                {/* Accordions */}
                <div className="mb-8 border-t border-[#eae6e6]">
                  <Accordion title="Apply a promo code" placeholder="Enter code" buttonText="APPLY" />
                  <Accordion title="Apply a gift card" placeholder="Enter gift card" buttonText="APPLY" />
                </div>

                {/* Summary Block */}
                <div className="space-y-4 text-[13px] font-helveticaN text-[#555] mb-6">
                  <div className="flex justify-between font-bold text-[#340c0c]">
                    <span className="uppercase tracking-widest">Subtotal ({totalItems} items)</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center uppercase tracking-widest">
                    <span>Shipping <span className="normal-case text-[11px]">(Free over $50.00)</span></span>
                    <span>{isFreeShipping ? 'TBD' : '$5.00'}</span>
                  </div>
                  <div className="flex justify-between uppercase tracking-widest">
                    <span>Tax</span>
                    <span>TBD</span>
                  </div>
                </div>
                
                {/* TOTAL */}
                <div className="flex justify-between items-end text-[#340c0c] mb-6 border-t border-[#eae6e6] pt-4">
                  <span className="font-optima tracking-widest uppercase text-xl font-bold">Total</span>
                  <span className="text-[22px] font-optima font-bold">${total.toFixed(2)}</span>
                </div>

                {/* Free Samples Promo */}
                <div className="bg-[#fcf1f1] p-5 flex gap-4 items-start mb-6 border border-[#fae6e6]">
                  <div className="flex -space-x-2 shrink-0">
                    <div className="w-6 h-8 bg-[#cd8c7c] rotate-[-10deg] border border-white"></div>
                    <div className="w-6 h-8 bg-[#cd8c7c] rotate-[10deg] border border-white"></div>
                  </div>
                  <div>
                    <h4 className="text-[#340c0c] font-optima text-[15px] uppercase tracking-wide mb-1">2 Free Samples with every order!</h4>
                    <p className="text-[#856d6d] text-[12px] font-helveticaN leading-relaxed">Choose 2 free samples at checkout! Including Charlotte's Fragrance, Skincare & Makeup!</p>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-[#340c0c] text-white py-4 px-4 uppercase tracking-widest text-[13px] font-bold hover:bg-[#2d0a0a] transition-all flex justify-center items-center group shadow-md hover:shadow-lg">
                    <Lock size={16} strokeWidth={1.5} className="mr-3 opacity-80 group-hover:opacity-100 transition-opacity" />
                    <span>Checkout | ${total.toFixed(2)}</span>
                  </button>
                  
                  <button className="w-full bg-white border border-[#d6cece] py-3 flex justify-center items-center hover:bg-[#f9f8f6] transition-colors shadow-sm">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-[22px]" />
                  </button>
                </div>

                {/* Buy Now Pay Later Texts */}
                <div className="mt-6 text-center text-[#856d6d] text-[11px] font-helveticaN space-y-2">
                  <p>From $11/month or 4 payments at 0% interest with <span className="font-bold text-[#340c0c]">Klarna.</span></p>
                  <p>Pay in 4 interest-free payments with <span className="font-bold text-[#340c0c]">Afterpay.</span></p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}