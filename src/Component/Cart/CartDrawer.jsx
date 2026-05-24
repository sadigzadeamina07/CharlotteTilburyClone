import React from "react";
import { Link } from "react-router";
import { X, Truck } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUI } from "../../Context/UIContext";
import { useBasket } from "../../Context/BasketContext";
import { useWishlist } from "../../Context/WishlistContext";
import useScrollLock from "../../hooks/useScrollLock";

function CartDrawer() {
  const { isCartOpen, closeCart } = useUI();
  const { basket, updateQuantity, removeFromBasket, totalPrice, Basketopen, CloseBasket } = useBasket();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const isOpen = isCartOpen || Basketopen;
  useScrollLock(isOpen);

  const closeDrawer = () => {
    closeCart();
    CloseBasket();
  };

  const freeLimit = 50;
  
  // JUNIOR YANAŞMASI: Qəliz Math.min sətirləri daha anlaşılan if-else-ə çevrildi
  let progress = (totalPrice / freeLimit) * 100;
  if (progress > 100) {
    progress = 100;
  }

  let hasFreeDelivery = false;
  if (totalPrice >= freeLimit) {
    hasFreeDelivery = true;
  }

  // toFixed(2) birbaşa dəyişənə yazıldı
  const leftForFreeDelivery = (freeLimit - totalPrice).toFixed(2);

  return (
    <>
      <div
        onClick={closeDrawer}
        className={
          isOpen
            ? "fixed inset-0 bg-black/40 z-[999] opacity-100 visible transition-opacity duration-500"
            : "fixed inset-0 bg-black/40 z-[999] opacity-0 invisible transition-opacity duration-500"
        }
      />

      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-white z-[1000] shadow-2xl flex flex-col transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-lg font-serif font-bold text-[#340c0c] uppercase tracking-wide">
            Your Bag ({basket.length})
          </h2>
          <button onClick={closeDrawer} className="cursor-pointer text-slate-500 hover:text-black">
            <X size={24} />
          </button>
        </div>

        {/* Pulsuz Çatdırılma Hissəsi */}
        <div className="p-4 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center gap-3 mb-2">
            <Truck size={20} className="text-[#340c0c]" />
            <p className="text-sm font-sans text-slate-700">
              {hasFreeDelivery ? (
                <span className="font-bold text-emerald-600">You've unlocked FREE standard delivery!</span>
              ) : (
                <span>You're <span className="font-bold">${leftForFreeDelivery}</span> away from FREE delivery!</span>
              )}
            </p>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#340c0c] transition-all duration-300"
              style={{ width: progress + "%" }} // String toplama ilə faiz təyini
            />
          </div>
        </div>

        {/* Məhsulların Siyahısı */}
        <div className="flex-1 overflow-y-auto p-4 no-scrollbar">
          <div className="flex flex-col gap-4">
            {basket.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-slate-400 font-sans mb-4">Your bag is empty</p>
              </div>
            ) : (
              basket.map((item, index) => {
                const liked = isInWishlist(item);
                return (
                  <div key={index} className="flex gap-4 border-b border-slate-100 pb-4 relative">
                    <div className="w-[90px] aspect-square bg-[#f5f0ee] rounded overflow-hidden">
                      <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
                    </div>

                    <div className="flex-1 pr-6 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-[15px] font-bold text-[#340c0c] line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-slate-500 font-sans mt-0.5 line-clamp-1">{item.subtitle}</p>
                        <p className="text-sm font-sans font-bold text-[#340c0c] mt-2">${item.discountPrice || item.price}</p>
                      </div>

                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center border border-slate-200 rounded">
                          <button onClick={() => updateQuantity(item, item.quantity - 1)} className="px-2.5 py-1 text-slate-500 hover:text-black">-</button>
                          <span className="px-2 text-sm font-sans font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item, item.quantity + 1)} className="px-2.5 py-1 text-slate-500 hover:text-black">+</button>
                        </div>

                        <button onClick={() => toggleWishlist(item)} className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-black font-sans group/btn">
                          {liked ? <FaHeart size={13} className="text-[#4A0404]" /> : <FaRegHeart size={13} />}
                          <span className="underline underline-offset-2">
                            {liked ? "Remove from Wishlist" : "Move to Wishlist"}
                          </span>
                        </button>
                      </div>
                    </div>

                    <button onClick={() => removeFromBasket(item)} className="cursor-pointer absolute top-4 right-0 text-slate-400 hover:text-black">
                      <X size={20} />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="border-t border-slate-200 bg-white p-4">
          <Link
            to="/basket"
            onClick={closeDrawer}
            className="w-full flex items-center justify-center border border-[#340c0c] text-[#340c0c] py-3.5 uppercase text-sm font-bold tracking-wide hover:bg-[#fafafa]"
          >
            VIEW BAG ({basket.length})
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartDrawer;