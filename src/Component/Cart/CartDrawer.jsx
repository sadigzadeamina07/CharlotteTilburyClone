import React from "react";
import { Link } from "react-router";
import { X, Truck } from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useUI } from "../../Context/UIContext";
import { useBasket } from "../../Context/BasketContext";
import { useWishlist } from "../../Context/WishlistContext";
import useScrollLock from "../../hooks/useScrollLock";

function getItemImage(item) {
  // Əvvəl seçilmiş shade şəklini yoxlayır, yoxdursa məhsulun əsas şəklini götürür
  return (
    item.selectedShade?.gallery?.[0] ||
    item.selectedShade?.galleryImages?.[0] ||
    item.selectedShade?.swatchImage ||
    item.cardImages?.main ||
    item.images?.main ||
    item.image
  );
}

function getItemPrice(item) {
  // Qiyməti yazıdan rəqəmə çevirir: "$45.00" -> 45.00
  const price = item.selectedShade?.price || item.price || "0";
  const number = String(price).replace(/[^0-9.]/g, "");

  return Number(number || 0).toFixed(2);
}

function CartDrawer() {
  const { isCartOpen, closeCart } = useUI();
  const {
    basket,
    updateQuantity,
    removeFromBasket,
    totalPrice,
    Basketopen,
    CloseBasket,
  } = useBasket();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Cart həm header-dən, həm də add to basket-dən açıla bilir
  const isOpen = isCartOpen || Basketopen;

  // Drawer açıq olanda arxa səhifənin scroll-u bağlanır
  useScrollLock(isOpen);

  const closeDrawer = () => {
    closeCart();
    CloseBasket();
  };

  // Free delivery progress bar üçün hesablamalar
  const freeLimit = 50;
  const progress = Math.min((totalPrice / freeLimit) * 100, 100);
  const hasFreeDelivery = totalPrice >= freeLimit;
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

      {/* Mobildə aşağıdan, PC-də sağdan açılır */}
      <div
        className={
          isOpen
            ? "fixed right-0 bottom-0 md:top-0 w-full h-[85dvh] md:h-full md:w-[450px] bg-white z-[1000] translate-y-0 md:translate-x-0 opacity-100 transition-all duration-500 shadow-2xl flex flex-col rounded-t-2xl md:rounded-none"
            : "fixed right-0 bottom-0 md:top-0 w-full h-[85dvh] md:h-full md:w-[450px] bg-white z-[1000] translate-y-full md:translate-y-0 md:translate-x-full opacity-0 transition-all duration-500 shadow-2xl flex flex-col rounded-t-2xl md:rounded-none"
        }
      >
        <div className="flex items-center justify-between p-4 border-b border-slate-200">
          <h2 className="text-xl font-serif text-[#4A0404] tracking-wide uppercase">
            Added to Bag
          </h2>

          <button
            onClick={closeDrawer}
            className="cursor-pointer p-2 text-slate-500 hover:text-black transition-colors"
          >
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto bg-white">
          <div className="p-4">
            <div className="h-2 w-full bg-slate-200 rounded-full mb-3 relative">
              <div
                className="h-full bg-[#4A0404] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />

              {hasFreeDelivery && (
                <div className="absolute right-0 -top-1 w-4 h-4 bg-[#4A0404] rounded-full flex items-center justify-center text-white text-[10px]">
                  ✓
                </div>
              )}
            </div>

            <div className="flex items-center text-sm text-slate-800">
              <Truck size={20} className="mr-2" strokeWidth={1.5} />

              {hasFreeDelivery ? (
                <span>
                  Your order qualifies for{" "}
                  <strong className="font-semibold">
                    free express shipping
                  </strong>
                </span>
              ) : (
                <span>Spend ${leftForFreeDelivery} more for free delivery</span>
              )}
            </div>
          </div>

          <div className="px-4">
            {basket.length === 0 ? (
              <p className="py-8 text-center text-slate-500">
                Your bag is empty.
              </p>
            ) : (
              basket.map((item, index) => {
                const image = getItemImage(item);
                const shadeName =
                  item.selectedShade?.name ||
                  item.shade ||
                  item.subtitle ||
                  item.subTitle;

                const liked = isInWishlist(item);

                return (
                  <div
                    key={`${item.title}-${shadeName}-${index}`}
                    className="flex gap-4 py-4 border-b border-slate-200 relative group"
                  >
                    <img
                      src={image}
                      alt={item.title}
                      className="w-20 h-24 object-contain bg-slate-50"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-serif text-sm tracking-wide text-black uppercase pr-8 leading-tight">
                          {item.title}
                        </h3>

                        {shadeName && (
                          <p className="text-sm text-slate-500 mt-1 uppercase">
                            {shadeName}
                          </p>
                        )}

                        <p className="text-sm font-semibold mt-1">
                          ${getItemPrice(item)}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        {/* Məhsul sayını artırıb-azaldır */}
                        <div className="flex items-center border border-slate-300 w-24">
                          <button
                            onClick={() =>
                              updateQuantity(item, item.quantity - 1)
                            }
                            className="cursor-pointer px-3 py-1 text-slate-500 hover:text-black transition-colors"
                          >
                            -
                          </button>

                          <span className="flex-1 text-center text-sm">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              updateQuantity(item, item.quantity + 1)
                            }
                            className="cursor-pointer px-3 py-1 text-slate-500 hover:text-black transition-colors"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => toggleWishlist(item)}
                          className="cursor-pointer flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#4A0404] transition-colors group/btn"
                        >
                          {liked ? (
                            <FaHeart size={13} className="text-[#4A0404]" />
                          ) : (
                            <FaRegHeart
                              size={13}
                              className="group-hover/btn:scale-110 transition-transform"
                            />
                          )}

                          <span className="underline underline-offset-2">
                            {liked
                              ? "Remove from Wishlist"
                              : "Move to Wishlist"}
                          </span>
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromBasket(item)}
                      className="cursor-pointer absolute top-4 right-0 text-slate-400 hover:text-black transition-colors"
                    >
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
            className="w-full flex items-center justify-center border border-[#340c0c] text-[#340c0c] py-3.5 uppercase text-sm font-bold tracking-wide hover:bg-[#fafafa] transition-colors"
          >
            VIEW BAG ({basket.length})
          </Link>
        </div>
      </div>
    </>
  );
}

export default CartDrawer;