import React, { useState } from 'react';
import { useUI } from '../../Context/UIContext';
import { useBasket } from '../../Context/BasketContext';
import { useWishlist } from '../../Context/WishlistContext';
import useScrollLock from '../../hooks/useScrollLock';
import { Link } from 'react-router';
// Hardcoded recommendations and gifts as per the visual requirements
const MOCK_RECOMMENDATIONS = [
  {
    id: 'rec1',
    title: 'AIRBRUSH FLAWLESS BLUR CONCEALER',
    shade: '4 Fair-Medium',
    price: 36.00,
    image: 'https://via.placeholder.com/80x100/f8f8f8/333333?text=Concealer',
  },
  {
    id: 'rec2',
    title: 'AIRBRUSH FLAWLESS FINISH POWDER',
    shade: '2 Medium',
    price: 48.00,
    image: 'https://via.placeholder.com/80x100/f8f8f8/333333?text=Powder',
  }
];

export default function CartDrawer() {
  const { isCartOpen, closeCart } = useUI();
  const { basket, updateQuantity, removeFromBasket, totalPrice, Basketopen, CloseBasket } = useBasket();
  const { moveToWishlist } = useWishlist();
  const [promoOpen, setPromoOpen] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);

  // Drawer opens from either UIContext (icon click) or BasketContext (add to basket)
  const isOpen = isCartOpen || Basketopen;
  useScrollLock(isOpen);

  const handleClose = () => {
    closeCart();
    CloseBasket();
  };


  // Delivery Threshold Calculation
  const freeDeliveryThreshold = 50;
  const progressPercent = Math.min((totalPrice / freeDeliveryThreshold) * 100, 100);
  const isFreeDelivery = totalPrice >= freeDeliveryThreshold;

  // Tax and Shipping logic
  const shippingCost = isFreeDelivery ? 0 : (totalPrice > 0 ? 5.95 : 0);
  const tax = totalPrice * 0.08; // 8% tax example
  const finalTotal = totalPrice + shippingCost + tax;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/40 z-[999] transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={handleClose}
      />

      <div 
        className={`fixed right-0 bottom-0 top-auto md:top-0 w-full h-[85dvh] md:h-full md:w-[450px] bg-white z-[1000] transform transition-transform duration-500 ease-in-out shadow-2xl flex flex-col ${isOpen ? 'translate-y-0 md:translate-x-0 md:translate-y-0' : 'translate-y-full md:translate-y-0 md:translate-x-full'} rounded-t-2xl md:rounded-none`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-xl font-serif text-[#4A0404] tracking-wide uppercase">
            Added to Bag
          </h2>
          <button onClick={handleClose} className="p-2 text-slate-500 hover:text-black transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto bg-white">
          {/* Progress Bar */}
          <div className="p-4 bg-white">
            <div className="h-2 w-full bg-slate-200 rounded-full mb-3 relative">
              <div 
                className="h-full bg-[#4A0404] rounded-full transition-all duration-500" 
                style={{ width: `${progressPercent}%` }} 
              />
              {isFreeDelivery && (
                <div className="absolute right-0 -top-1 w-4 h-4 bg-[#4A0404] rounded-full flex items-center justify-center text-white text-[10px]">
                  ✓
                </div>
              )}
            </div>
            <div className="flex items-center text-sm font-sans text-slate-800">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {isFreeDelivery 
                ? <span>Your order qualifies for <strong className="font-semibold">free express shipping</strong></span>
                : <span>Spend ${(freeDeliveryThreshold - totalPrice).toFixed(2)} more for free delivery</span>}
            </div>
          </div>


          {/* Cart Items */}
          <div className="px-4">
            {basket.length === 0 ? (
              <p className="py-8 text-center text-slate-500 font-sans">Your bag is empty.</p>
            ) : (
              basket.map((item, idx) => {
                const shadeImage = item.selectedShade?.gallery?.[0] || item.selectedShade?.galleryImages?.[0] || item.selectedShade?.swatchImage;
                const displayImage = shadeImage || item.cardImages?.main || item.images?.main || item.image;
                const shadeName = item.selectedShade?.name || item.shade || item.subtitle || item.subTitle;
                const itemPrice = item.selectedShade?.price || item.price;
                return (
                <div key={`${item.title}-${shadeName}-${idx}`} className="flex gap-4 py-4 border-b border-slate-200 relative group">
                  <img src={displayImage} alt={item.title} className="w-20 h-24 object-contain bg-slate-50" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-sm tracking-wide text-black uppercase pr-8 leading-tight">
                        {item.title}
                      </h3>
                      {shadeName && <p className="text-sm text-slate-500 mt-1 uppercase font-sans">{shadeName}</p>}
                      <p className="text-sm font-semibold mt-1">${parseFloat(itemPrice?.toString().replace(/[^0-9.]/g, '') || 0).toFixed(2)}</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Control */}
                      <div className="flex items-center border border-slate-300 w-24">
                        <button onClick={() => updateQuantity(item, item.quantity - 1)} className="px-3 py-1 text-slate-500 hover:text-black transition-colors">-</button>
                        <span className="flex-1 text-center text-sm font-sans">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item, item.quantity + 1)} className="px-3 py-1 text-slate-500 hover:text-black transition-colors">+</button>
                      </div>
                      <button 
                        onClick={() => moveToWishlist(item)}
                        className="text-xs text-slate-500 underline font-sans hover:text-black transition-colors"
                      >
                        Move to Wishlist
                      </button>
                    </div>
                  </div>
                  {/* Remove Item */}
                  <button 
                    onClick={() => removeFromBasket(item)}
                    className="absolute top-4 right-0 text-slate-400 hover:text-black transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                );
              })
            )}
          </div>

          {/* Use It With Carousel */}
          {basket.length > 0 && (
            <div className="bg-slate-50 p-4 mt-6">
              <h3 className="font-serif text-lg text-[#4A0404] mb-4">Use it with</h3>
              <div className="flex overflow-x-auto gap-4 pb-4 snap-x">
                {MOCK_RECOMMENDATIONS.map(rec => (
                  <div key={rec.id} className="min-w-[240px] bg-white p-3 snap-start flex gap-3 shadow-sm border border-slate-100">
                    <img src={rec.image} alt={rec.title} className="w-16 h-20 object-contain" />
                    <div className="flex flex-col justify-between">
                      <div>
                        <h4 className="font-serif text-[11px] leading-tight uppercase tracking-wide">{rec.title}</h4>
                        <p className="text-[11px] text-slate-500 mt-1">{rec.shade}</p>
                        <p className="text-xs font-semibold mt-1">${rec.price.toFixed(2)}</p>
                      </div>
                      <button className="text-xs font-sans font-semibold border border-black py-1 mt-2 hover:bg-black hover:text-white transition-colors">
                        ADD TO BAG
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Free Samples */}
          <div className="p-4 mt-4 mx-4 bg-orange-50 border border-orange-100 flex items-start gap-4">
            <svg className="w-8 h-8 text-[#4A0404]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <div>
              <h4 className="font-serif text-sm tracking-wide">2 FREE SAMPLES with every order!</h4>
              <p className="text-xs text-slate-700 mt-1 font-sans leading-relaxed">Choose 2 free samples at checkout! Including Charlotte's Fragrance, Skincare & Makeup!</p>
            </div>
          </div>


        </div>

        {/* Footer View Bag Button */}
        <div className="border-t border-slate-200 bg-white p-4">
          <Link 
            to="/basket" 
            onClick={handleClose}
            className="w-full flex items-center justify-center border border-[#340c0c] text-[#340c0c] py-3.5 uppercase font-sans text-sm font-bold tracking-wide hover:bg-[#fafafa] transition-colors"
          >
            VIEW BAG ({basket.length})
          </Link>
        </div>

      </div>
    </>
  );
}
