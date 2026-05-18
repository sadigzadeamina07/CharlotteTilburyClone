import React from "react";
import { Link } from "react-router";
import { X } from "lucide-react";
import { useWishlist } from "../Context/WishlistContext";
import { useBasket } from "../Context/BasketContext";

function Fave() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { handleAddtoBasket } = useBasket();

  return (
    <main className="bg-white py-12 px-4 md:px-5">
      <div className="max-w-[1024px] mx-auto px-4">
        {wishlist.length === 0 ? (
          <section className="flex flex-col items-center justify-center py-16 text-center">
            <h1 className="text-[24px] md:text-[28px] text-[#340c0c] uppercase mb-2">
              YOUR WISHLIST IS EMPTY
            </h1>

            <p className="text-[#340c0c] max-w-[500px] mb-6 leading-relaxed text-[15px] font-light">
              Adding items to your wishlist by clicking the heart icon as you
              shop.
            </p>

            <Link
              to="/home"
              className="border border-[#340c0c] text-[#340c0c] px-16 py-3 hover:bg-[#340c0c] hover:text-white transition-colors duration-300 uppercase tracking-widest text-[13px] font-bold"
            >
              BEST SELLERS
            </Link>
          </section>
        ) : (
          <>
            <h1 className="text-[28px] text-[#340c0c] uppercase mb-2">
              WISHLIST
            </h1>

            <p className="text-[#340c0c] max-w-[500px] mb-4">
              Keep a list of all the gorgeous Charlotte Tilbury beauty products
              you love, or are dying to try next! You can log in on any device
              to see your saved wishlist.
            </p>

            {/* Mobildə 2 sütun, PC-də 3-4 sütun görünür */}
            <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10">
              {wishlist.map((item, index) => {
                // Məhsulun seçilmiş rəngi varsa onun şəklini götürür
                const shade = item.selectedShade;
                const shadeName =
                  shade?.name ||
                  item.shade ||
                  item.subtitle ||
                  item.subTitle ||
                  "Standard Size";

                const mainImage =
                  shade?.gallery?.[0] ||
                  shade?.galleryImages?.[0] ||
                  shade?.swatchImage ||
                  item.cardImages?.main ||
                  item.images?.main ||
                  item.image;

                // Hover zamanı varsa ikinci şəkil göstərilir
                const hoverImage =
                  shade?.gallery?.[1] ||
                  shade?.galleryImages?.[1] ||
                  item.cardImages?.hover ||
                  item.images?.hover ||
                  mainImage;

                const price = shade?.price || item.price;
                const hasHoverImage = hoverImage && hoverImage !== mainImage;

                return (
                  <article
                    key={`${item.title}-${shadeName}-${index}`}
                    className="flex flex-col w-full h-full text-left"
                  >
                    <div className="relative bg-[#f9f8f6] aspect-square flex justify-center items-center mb-3">
                      <button
                        onClick={() => removeFromWishlist(item)}
                        className="absolute top-2 left-2 text-[#340c0c] z-10 p-1 cursor-pointer hover:opacity-75 transition-opacity"
                        aria-label="Remove from wishlist"
                      >
                        <X size={32} strokeWidth={1} />
                      </button>

                      <Link
                        to="/product"
                        state={{ product: item }}
                        className="absolute inset-0 flex justify-center items-center p-6 group/img"
                      >
                        <img
                          src={mainImage}
                          alt={item.title}
                          className={
                            hasHoverImage
                              ? "absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-opacity duration-300 group-hover/img:opacity-0"
                              : "absolute inset-0 w-full h-full object-contain mix-blend-multiply transition-opacity duration-300"
                          }
                          loading="lazy"
                        />

                        {hasHoverImage && (
                          <img
                            src={hoverImage}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-contain mix-blend-multiply opacity-0 group-hover/img:opacity-100 transition-opacity duration-300"
                            loading="lazy"
                          />
                        )}
                      </Link>

                      {(item.badge || item.title?.toLowerCase().includes("magic")) && (
                        <div className="absolute bottom-2 left-2 bg-[#fbe1e1] text-[#340c0c] font-bold uppercase text-[10px] px-2 py-1 z-10">
                          {item.badge || "SUPERCHARGED FORMULA!"}
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col gap-1 mb-4 flex-1">
                      <Link
                        to="/product"
                        state={{ product: item }}
                        className="flex flex-col gap-1"
                      >
                        <h3 className="uppercase text-[14px] font-semibold text-[#340c0c] leading-tight line-clamp-2">
                          {item.title}
                        </h3>

                        <p className="text-gray-500 text-[13px] font-light leading-tight line-clamp-1">
                          {shadeName}
                        </p>

                        <p className="text-[#340c0c] text-[14px] mt-1 leading-tight">
                          {price}
                        </p>
                      </Link>
                    </div>

                    <button
                      onClick={() => handleAddtoBasket(item)}
                      className="mt-auto w-full border border-[#340c0c] bg-transparent text-[#340c0c] py-2.5 hover:bg-[#340c0c] hover:text-white transition-colors duration-300 uppercase tracking-wider text-[12px] cursor-pointer"
                    >
                      ADD TO BAG
                    </button>
                  </article>
                );
              })}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default Fave;