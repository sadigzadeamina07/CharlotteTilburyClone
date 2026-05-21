import React, { useState } from "react";
import { Link } from "react-router";
import {
  X,
  Minus,
  Plus,
  Heart,
  ChevronDown,
  ChevronUp,
  Check,
  Lock,
  Tag,
} from "lucide-react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useBasket } from "../Context/BasketContext";
import { useWishlist } from "../Context/WishlistContext";
import { useProduct } from "../Context/DataContext";

function Accordion({ title, placeholder, buttonText }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-[#eae6e6] bg-[#fdfcfc]">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-4 py-4 text-[13px] text-[#340c0c] hover:bg-[#f9f8f6] transition-colors"
      >
        <span className="flex items-center gap-2">
          <Tag size={18} strokeWidth={1.2} />
          {title}
        </span>

        {open ? (
          <ChevronUp size={16} strokeWidth={1.5} />
        ) : (
          <ChevronDown size={16} strokeWidth={1.5} />
        )}
      </button>

      {open && (
        <div className="p-4 bg-white">
          <div className="flex border border-[#340c0c] h-12">
            <input
              type="text"
              placeholder={placeholder}
              className="flex-1 bg-transparent px-4 text-[14px] outline-none text-[#340c0c] placeholder:text-gray-400"
            />

            <button className="text-[#340c0c] px-6 text-[12px] font-bold tracking-widest uppercase hover:bg-[#f9f8f6] transition-colors border-l border-[#340c0c]">
              {buttonText}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function BasketDetail() {
  const { basket, increaseQuantity, decreaseQuantity, removeFromBasket } =
    useBasket();

  const { toggleWishlist, isInWishlist } = useWishlist();
  const { formatPrice, selectedCountry } = useProduct();

  // Səbətdəki məhsulların ümumi qiymətini hesablayır
  let subtotal = 0;
  let totalItems = 0;

  basket.forEach((item) => {
    const price = item.selectedShade?.price || item.price || 0;
    if (String(price).toUpperCase() === 'FREE') return;
    const formatted = formatPrice(price, selectedCountry);
    const cleanPrice = Number(formatted.replace(/[^0-9.]/g, "")) || 0;
    const quantity = item.quantity || 1;

    subtotal += cleanPrice * quantity;
    totalItems += quantity;
  });

  // 50$-dan yuxarı olanda çatdırılma pulsuz olur
  const isFreeShipping = subtotal >= 50;
  const shippingCost = basket.length === 0 || isFreeShipping ? 0 : 5;
  const total = subtotal + shippingCost;

  return (
    <div className="bg-[#fcfcfc] min-h-screen pt-4 pb-32 md:pb-16">
      <div className="max-w-[1200px] mx-auto px-4 md:px-8">
        <div className="border border-[#145633] bg-[#f4f9f6] text-[#145633] p-3 text-[13px] flex items-center gap-2 mb-8 mt-2">
          <Check size={16} strokeWidth={2} />
          <span>Enjoy free delivery on this order</span>
        </div>

        {basket.length === 0 ? (
          <div className="text-center py-24 border-t border-[#eae6e6]">
            <p className="text-xl font-optima mb-6 text-[#340c0c] uppercase tracking-widest">
              Your bag is currently empty.
            </p>

            <Link
              to="/"
              className="inline-block border border-[#340c0c] text-[#340c0c] px-12 py-4 uppercase tracking-widest text-[12px] font-bold hover:bg-[#340c0c] hover:text-white transition-colors duration-300"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="flex justify-between items-end mb-6">
                <h1 className="text-[22px] font-optima uppercase tracking-widest text-[#340c0c]">
                  Your Bag
                </h1>

                <span className="text-[22px] font-optima text-[#340c0c]">
                  {selectedCountry?.currency?.split(' ')[1] || '£'}{total.toFixed(2)}
                </span>
              </div>

              <div className="bg-[#cd8c7c] text-white p-6 text-[15px] mb-8 flex items-center justify-between cursor-pointer hover:bg-[#c08273] transition-colors shadow-sm">
                <span>
                  Darlings, unlock a free deluxe Airbrush Setting Spray + deluxe
                  Matte Revolution in Pillow Talk Original when you spend over
                  $95!*
                </span>
              </div>

              {/* Səbətdəki məhsullar burada list kimi göstərilir */}
              <div>
                {basket.map((item, index) => {
                  const shade = item.selectedShade;
                  const image = item.selectedShade?.gallery?.[0] || item.images?.main || item.cardImages?.main || item.gallery?.[0] || item.image || '';
                  const shadeName = item.selectedShade?.name || item.shade || item.subtitle || "Standard Size";

                  const itemPrice = shade?.price || item.price;
                  const liked = isInWishlist(item);

                  return (
                    <div
                      key={`${item.title}-${shadeName}-${index}`}
                      className="flex gap-6 py-8 border-b border-[#eae6e6] relative group"
                    >
                      <button
                        onClick={() => removeFromBasket(item)}
                        className="absolute top-8 right-0 text-[#856d6d] hover:text-[#340c0c] transition-colors p-1 z-10"
                        aria-label="Remove item"
                      >
                        <X size={24} strokeWidth={1} />
                      </button>

                      <Link
                        to="/product"
                        state={{ product: item }}
                        className="w-24 h-24 md:w-32 md:h-32 bg-transparent block overflow-hidden"
                      >
                        <img
                          src={image}
                          alt={item.title}
                          className="w-full h-full object-contain mix-blend-multiply transition-transform hover:scale-105 duration-700"
                        />
                      </Link>

                      <div className="flex flex-col pr-8 flex-1 justify-between">
                        <div>
                          <Link
                            to="/product"
                            state={{ product: item }}
                            className="block group-hover:text-[#a06464] transition-colors"
                          >
                            <h3 className="font-optima uppercase text-[15px] font-bold text-[#340c0c] tracking-widest line-clamp-2 mb-1 leading-tight">
                              {item.title}
                            </h3>
                          </Link>

                          <p className="text-[#856d6d] text-[11px] uppercase tracking-wider mb-2">
                            {shadeName}
                          </p>

                          <p className="text-[#340c0c] text-[14px] mb-4">
                            {formatPrice(itemPrice, selectedCountry)}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6 mt-2">
                          {/* Say artırıb azaltmaq üçün düymələr */}
                          <div className="flex items-center border border-[#d6cece] rounded-full w-max h-9">
                            <button
                              onClick={() => decreaseQuantity(item)}
                              className="px-3 text-[#340c0c] hover:text-[#a06464] transition-colors flex items-center justify-center h-full"
                            >
                              <Minus size={14} strokeWidth={1} />
                            </button>

                            <span className="w-6 text-center text-[#340c0c] text-[13px]">
                              {item.quantity || 1}
                            </span>

                            <button
                              onClick={() => increaseQuantity(item)}
                              className="px-3 text-[#340c0c] hover:text-[#a06464] transition-colors flex items-center justify-center h-full"
                            >
                              <Plus size={14} strokeWidth={1} />
                            </button>
                          </div>

                          <button
                            onClick={() => toggleWishlist(item)}
                            className="flex items-center gap-2 text-[12px] text-[#340c0c] hover:text-[#a06464] transition-colors w-max group/btn"
                          >
                            {liked ? (
                              <FaHeart size={16} color="#4a0014" />
                            ) : (
                              <FaRegHeart
                                size={16}
                                className="group-hover/btn:scale-110 transition-transform"
                              />
                            )}

                            <span className="underline underline-offset-4 decoration-[0.5px]">
                              {liked
                                ? "Remove from wishlist"
                                : "Move to wishlist"}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobil ekranda summary aşağıda, PC-də sağ sütunda sticky qalır */}
            <div className="lg:col-span-5 mt-4 lg:mt-0">
              <div className="lg:sticky lg:top-28">
                <h2 className="font-optima uppercase tracking-widest text-[14px] text-[#340c0c] mb-3">
                  Loyalty & Promotions
                </h2>

                <div className="bg-[#591b29] p-6 mb-6 text-white shadow-sm border border-[#4a0014]">
                  <h3 className="font-optima uppercase tracking-widest text-[14px] mb-5 flex items-center gap-2 font-bold">
                    Unlock Magic Loyalty Rewards
                    <span className="text-[10px]">✦</span>
                  </h3>

                  <ul className="space-y-4 mb-6 text-[13px]">
                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full border border-white/40 flex items-center justify-center text-[10px]">
                        CT
                      </span>
                      <span className="opacity-90">
                        Earn {Math.floor(total)} Loyalty coins with this order
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 flex items-center justify-center">
                        <Check size={16} strokeWidth={1.5} />
                      </span>
                      <span className="opacity-90">
                        Get 15% off your first order
                      </span>
                    </li>

                    <li className="flex items-start gap-3">
                      <span className="w-5 h-5 flex items-center justify-center">
                        <Heart size={14} fill="currentColor" strokeWidth={0} />
                      </span>
                      <span className="opacity-90">
                        See Loyalty rewards waiting for you!
                      </span>
                    </li>
                  </ul>

                  <button className="bg-white text-[#340c0c] text-[12px] font-bold tracking-widest uppercase py-4 px-6 hover:bg-[#f9f8f6] transition-colors w-full shadow-md hover:shadow-lg">
                    Login or create an account
                  </button>
                </div>

                <div className="mb-8 border-t border-[#eae6e6]">
                  <Accordion
                    title="Apply a promo code"
                    placeholder="Enter code"
                    buttonText="APPLY"
                  />

                  <Accordion
                    title="Apply a gift card"
                    placeholder="Enter gift card"
                    buttonText="APPLY"
                  />
                </div>

                {/* Sifariş qiymətləri */}
                <div className="space-y-4 text-[13px] text-[#555] mb-6">
                  <div className="flex justify-between font-bold text-[#340c0c]">
                    <span className="uppercase tracking-widest">
                      Subtotal ({totalItems} items)
                    </span>
                    <span>{selectedCountry?.currency?.split(' ')[1] || '£'}{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between items-center uppercase tracking-widest">
                    <span>
                      Shipping{" "}
                      <span className="normal-case text-[11px]">
                        (Free over {selectedCountry?.currency?.split(' ')[1] || '£'}50.00)
                      </span>
                    </span>
                    <span>{isFreeShipping ? "TBD" : `${selectedCountry?.currency?.split(' ')[1] || '£'}5.00`}</span>
                  </div>

                  <div className="flex justify-between uppercase tracking-widest">
                    <span>Tax</span>
                    <span>TBD</span>
                  </div>
                </div>

                <div className="flex justify-between items-end text-[#340c0c] mb-6 border-t border-[#eae6e6] pt-4">
                  <span className="font-optima tracking-widest uppercase text-xl font-bold">
                    Total
                  </span>
                  <span className="text-[22px] font-optima font-bold">
                    {selectedCountry?.currency?.split(' ')[1] || '£'}{total.toFixed(2)}
                  </span>
                </div>

                <div className="bg-[#fcf1f1] p-5 flex gap-4 items-start mb-6 border border-[#fae6e6]">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-8 bg-[#cd8c7c] rotate-[-10deg] border border-white"></div>
                    <div className="w-6 h-8 bg-[#cd8c7c] rotate-[10deg] border border-white"></div>
                  </div>

                  <div>
                    <h4 className="text-[#340c0c] font-optima text-[15px] uppercase tracking-wide mb-1">
                      2 Free Samples with every order!
                    </h4>

                    <p className="text-[#856d6d] text-[12px] leading-relaxed">
                      Choose 2 free samples at checkout! Including Charlotte's
                      Fragrance, Skincare & Makeup!
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <button className="w-full bg-[#340c0c] text-white py-4 px-4 uppercase tracking-widest text-[13px] font-bold hover:bg-[#2d0a0a] transition-all flex justify-center items-center group shadow-md hover:shadow-lg">
                    <Lock
                      size={16}
                      strokeWidth={1.5}
                      className="mr-3 opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                    <span>Checkout | {selectedCountry?.currency?.split(' ')[1] || '£'}{total.toFixed(2)}</span>
                  </button>

                  <button className="w-full bg-white border border-[#d6cece] py-3 flex justify-center items-center hover:bg-[#f9f8f6] transition-colors shadow-sm">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg"
                      alt="Google Pay"
                      className="h-[22px]"
                    />
                  </button>
                </div>

                <div className="mt-6 text-center text-[#856d6d] text-[11px] space-y-2">
                  <p>
                    From $11/month or 4 payments at 0% interest with{" "}
                    <span className="font-bold text-[#340c0c]">Klarna.</span>
                  </p>
                  <p>
                    Pay in 4 interest-free payments with{" "}
                    <span className="font-bold text-[#340c0c]">Afterpay.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BasketDetail;