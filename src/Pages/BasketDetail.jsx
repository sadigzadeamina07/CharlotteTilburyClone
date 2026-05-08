import React, { useState } from 'react';
import { X, Minus, Plus, Heart, ChevronDown, ChevronUp, Check, Lock } from 'lucide-react';
import { useBasket } from '../Context/BasketContext';
import { useWishlist } from '../Context/WishlistContext';
import { Link } from 'react-router'; 

const Accordion = ({ title, placeholder, buttonText }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-t border-gray-300 py-4">
      <button 
        className="flex w-full items-center justify-between font-sans uppercase tracking-widest text-[12px] text-gray-800"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        {isOpen ? <ChevronUp size={16} strokeWidth={1} /> : <ChevronDown size={16} strokeWidth={1} />}
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-40 mt-4' : 'max-h-0'}`}>
        <div className="flex border border-gray-300">
          <input 
            type="text" 
            placeholder={placeholder} 
            className="flex-grow bg-transparent p-3 text-sm focus:outline-none font-sans"
          />
          <button className="text-gray-800 px-4 text-xs font-bold tracking-widest uppercase hover:text-black transition-colors font-sans">
            {buttonText}
          </button>
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
  const isFreeShipping = subtotal > 50;
  const shippingCost = isFreeShipping ? 0 : 5;
  const total = subtotal + shippingCost;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans text-gray-900 bg-white min-h-screen">
      
      {/* Header Row */}
      <div className="flex flex-col md:flex-row justify-between md:items-end border-b border-gray-200 pb-4 mb-4 gap-4">
        <h1 className="text-3xl lg:text-4xl font-serif uppercase tracking-wide text-black">Your Bag</h1>
        <span className="text-xl font-serif">${total.toFixed(2)}</span>
      </div>

      {/* Light Pink Alert Banner */}
      <div className="bg-[#fcf1f1] text-[#4b0012] p-3 text-sm flex justify-between items-center mb-8 font-sans tracking-tight cursor-pointer hover:bg-[#fae6e6] transition-colors">
        <span>Darling you've redeemed Charlotte's free gifts!</span>
        <span>&gt;</span>
      </div>
      
      {basket.length === 0 ? (
        <div className="text-center py-24 border-t border-gray-200">
          <p className="text-xl font-serif mb-6 text-gray-500">Your bag is currently empty.</p>
          <Link to="/" className="inline-block bg-black text-white px-10 py-4 uppercase tracking-widest text-xs hover:bg-gray-800 transition-colors rounded-none">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-14">
          
          {/* LEFT COLUMN: PRODUCTS (8 columns) */}
          <div className="col-span-1 md:col-span-8">
            <div className="space-y-6">
              {basket.map((item, idx) => (
                <div key={idx} className="flex gap-6 border-b border-gray-200 pb-6 relative group">
                  
                  {/* Remove Button */}
                  <button 
                    onClick={() => window.confirm('Are you sure you want to remove this item?') && removeFromBasket(item)}
                    className="absolute top-0 right-0 text-gray-400 hover:text-black transition-colors p-1"
                    title="Remove item"
                  >
                    <X size={26} strokeWidth={0.75} />
                  </button>

                  {/* Product Image */}
                  <Link to='/product' state={{ product: item }} className="w-32 h-32 md:w-44 md:h-44 bg-[#f8f8f8] shrink-0 block overflow-hidden rounded-none">
                    <img 
                      src={item.images?.main || item.cardImages?.main || item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover mix-blend-multiply transition-transform hover:scale-105 duration-700"
                    />
                  </Link>
                  
                  {/* Product Info */}
                  <div className="flex flex-col pr-10 flex-grow">
                    <div>
                      <Link to='/product' state={{ product: item }}>
                          <h3 className="font-sans uppercase text-[15px] font-bold text-black tracking-widest line-clamp-2 hover:underline mb-1">
                            {item.title}
                          </h3>
                      </Link>
                      <p className="text-gray-500 text-[12px] uppercase tracking-wider mb-2">
                        {item.subtitle || item.subTitle || "Standard Size"}
                      </p>
                      <p className="text-black font-sans text-sm mb-4">{item.price}</p>
                    </div>

                    {/* Quantity Box */}
                    <div className="flex items-center border border-gray-300 w-max mb-3 rounded-none">
                      <button 
                        onClick={() => decreaseQuantity(item)}
                        className="px-3 py-1.5 text-gray-500 hover:text-black transition-colors"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="px-3 py-1.5 text-[13px] w-8 text-center text-black font-medium">{item.quantity || 1}</span>
                      <button 
                        onClick={() => increaseQuantity(item)}
                        className="px-3 py-1.5 text-gray-500 hover:text-black transition-colors"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>

                    {/* Move to Wishlist */}
                    <button 
                      onClick={() => toggleWishlist(item)}
                      className="flex items-center gap-2 text-[11px] font-sans text-gray-500 hover:text-black transition-colors w-max"
                    >
                      {isInWishlist?.(item) ? (
                          <Heart size={14} fill="#000" color="#000" strokeWidth={1} /> 
                      ) : (
                          <Heart size={14} strokeWidth={1} />
                      )}
                      <span className="tracking-wide">Move to wishlist</span>
                    </button>

                    {/* Conditional Bundle Text */}
                    {idx === 0 && (
                      <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-[#008248] uppercase tracking-widest border border-[#008248] bg-white px-2 py-1.5 w-max rounded-none">
                        <Check size={12} strokeWidth={3} /> Bundle Saving Applied!
                      </div>
                    )}

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY (4 columns, sticky) */}
          <div className="col-span-1 md:col-span-4 relative">
            <div className="sticky top-10">
              
              {/* Loyalty & Promotions */}
              <h2 className="font-serif uppercase tracking-widest text-[16px] text-black mb-3">Loyalty & Promotions</h2>
              <div className="bg-[#4b0012] p-6 mb-6 text-center text-white flex flex-col items-center shadow-sm">
                <p className="font-serif tracking-wide text-[16px] mb-5 text-[#fcf1f1]">UNLOCK MAGIC LOYALTY REWARDS</p>
                <button className="bg-white text-black font-sans text-[11px] font-bold tracking-widest uppercase py-3.5 px-6 hover:bg-gray-100 transition-colors w-full rounded-none">
                  Login or create an account
                </button>
              </div>

              {/* Accordions */}
              <div className="mb-8">
                <Accordion title="Apply a promo code" placeholder="Enter code" buttonText="APPLY" />
                <Accordion title="Apply a gift card" placeholder="Enter gift card" buttonText="APPLY" />
                <div className="border-t border-gray-300"></div>
              </div>

              {/* Summary Block */}
              <div className="space-y-6 text-[13px] tracking-widest font-sans uppercase mb-8">
                <div className="flex justify-between text-[#4b0012] font-medium">
                  <span>Total Savings</span>
                  <span>-$0.00</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-black">
                  <span className="flex flex-col sm:flex-row sm:items-center gap-1">
                    Shipping 
                    <span className="text-gray-500 text-[10px] normal-case tracking-normal">FREE (OVER $50.00)</span>
                  </span>
                  <span>{isFreeShipping ? 'FREE' : '$5.00'}</span>
                </div>
                <div className="flex justify-between text-black">
                  <span>Tax</span>
                  <span className="text-gray-500 normal-case tracking-normal text-[12px]">TBD</span>
                </div>
              </div>
              
              {/* TOTAL */}
              <div className="flex justify-between items-end text-black mb-6 border-t border-gray-300 pt-5">
                <span className="font-serif tracking-widest uppercase text-xl font-bold">Total</span>
                <span className="text-3xl font-serif">${total.toFixed(2)}</span>
              </div>

              {/* Checkout Buttons */}
              <div className="space-y-4">
                <button className="w-full bg-black text-white py-4 px-4 uppercase tracking-widest text-[13px] font-bold hover:bg-gray-800 transition-colors flex justify-center items-center rounded-none group shadow-md">
                  <Lock size={16} strokeWidth={1.5} className="mr-3 opacity-70 group-hover:opacity-100 transition-opacity" />
                  <span>Checkout</span>
                  <span className="mx-3 opacity-40 font-light">|</span>
                  <span>${total.toFixed(2)}</span>
                </button>
                
                <button className="w-full bg-white border border-gray-300 py-3 flex justify-center items-center hover:bg-gray-50 transition-colors shadow-sm rounded-none">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-[20px]" />
                </button>
              </div>

              {/* Buy Now Pay Later Texts */}
              <div className="mt-8 text-center text-gray-500 text-[11px] tracking-tight font-sans space-y-1.5">
                <p>Pay in 4 interest-free payments with <span className="font-bold text-black">Klarna.</span></p>
                <p>Pay in 4 interest-free payments with <span className="font-bold text-black">Afterpay.</span></p>
              </div>

              {/* Payment Logos */}
              <div className="mt-6 flex justify-center gap-3 items-center opacity-70">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3.5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Mastercard_2019_logo.svg" alt="Mastercard" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" className="h-5 rounded-sm" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/1/14/Klarna_Logotype.png" alt="Klarna" className="h-4" />
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}