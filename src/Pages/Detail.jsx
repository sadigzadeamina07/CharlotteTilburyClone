import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { FaHeart, FaRegHeart, FaPlayCircle } from "react-icons/fa";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Truck, Gift, Coins, X, Check, ScanFace, Camera, } from "lucide-react";
import { TbDiamondsFilled, TbDroplet, TbClock, TbFlower, } from "react-icons/tb";
import { useProduct } from "../Context/DataContext";
import { useBasket } from "../Context/BasketContext";
import { useWishlist } from "../Context/WishlistContext";
import ProductGallery from "../Component/ProductGallery";
import ProductCard from "../Component/Home/ProductCard";
import { createPortal } from "react-dom";

function getGallery(product, shade) {
  // Shade-in şəkilləri varsa onları göstər
  if (shade?.galleryImages?.length) return shade.galleryImages;

  // Yoxdursa məhsulun öz şəkillərini göstər
  if (product?.galleryImages?.length) return product.galleryImages;

  // Fallback: kart şəkillərindən götür
  return [product?.images?.main, product?.images?.hover].filter(Boolean);
}

function InfoIcon({ name }) {
  if (name === "Heart") return <FaRegHeart size={16} className="text-[#340c0c] mt-0.5" />;
  if (name === "Drop") return <TbDroplet size={18} className="text-[#340c0c] mt-0.5" />;
  if (name === "Leaf") return <TbFlower size={18} className="text-[#340c0c] mt-0.5" />;
  if (name === "Clock") return <TbClock size={18} className="text-[#340c0c] mt-0.5" />;

  return <TbDiamondsFilled size={18} className="text-[#340c0c] mt-0.5" />;
}

function Accordion({ title, items }) {
  const [open, setOpen] = useState(false);

  if (!items?.length) return null;

  return (
    <article
      onClick={() => setOpen(!open)}
      className="border-b border-[#eae6e6] py-5 cursor-pointer group"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-optima uppercase text-[17px] font-medium text-[#340c0c] tracking-wide group-hover:text-[#856d6d] transition-colors">
          {title}
        </h3>

        {open ? (
          <ChevronUp size={20} className="text-[#340c0c]" />
        ) : (
          <ChevronDown size={20} className="text-[#340c0c]" />
        )}
      </div>

      {open && (
        <div className="mt-5 space-y-4">
          {items.map((item, index) => (
            <div key={index} className="flex items-start gap-3">
              <InfoIcon name={item.icon} />
              <p className="text-[14px] text-[#340c0c] font-helveticaN leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </article>
  );
}

function ShadePicker({ shades, selectedShade, onSelectShade, resetImage }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  if (!shades?.length) return null;

  const chooseShade = (shade) => {
    onSelectShade(shade);
    resetImage();
  };

  return (
    <section className="mt-6 mb-6">
      <div className="grid grid-cols-6 md:grid-cols-7 gap-1 mb-5">
        {shades.map((shade) => (
          <button
            key={shade.name}
            onClick={() => chooseShade(shade)}
            title={shade.name}
            className={
              selectedShade?.name === shade.name
                ? "cursor-pointer aspect-square w-full border-[1.5px] border-[#340c0c] p-[2px] transition-all"
                : "cursor-pointer aspect-square w-full border border-transparent hover:border-[#eae6e6] transition-all"
            }
          >
            <img
              src={shade.swatchImage}
              alt={shade.name}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Seçilmiş shade və drawer açma düyməsi */}
      <button
        onClick={() => setDrawerOpen(true)}
        className="cursor-pointer w-full flex items-center justify-between border border-[#eae6e6] p-4 hover:border-[#340c0c] transition-colors bg-white group"
      >
        <div className="flex items-center gap-4">
          <img
            src={selectedShade?.swatchImage}
            alt={selectedShade?.name}
            className="w-8 h-8 object-cover"
          />
          <span className="text-[#340c0c] font-helveticaN text-[15px]">
            {selectedShade?.name}
          </span>
        </div>

        <ChevronRight
          size={20}
          strokeWidth={1}
          className="text-[#856d6d] group-hover:text-[#340c0c]"
        />
      </button>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <button className="cursor-pointer flex items-center justify-center gap-2 border border-[#eae6e6] py-3.5 hover:border-[#340c0c] transition-colors">
          <ScanFace size={16} strokeWidth={1.5} className="text-[#340c0c]" />
          <span className="font-helveticaN uppercase text-[12px] font-bold tracking-widest text-[#340c0c]">
            HOW TO APPLY
          </span>
        </button>

        <button className="cursor-pointer flex items-center justify-center gap-2 border border-[#eae6e6] py-3.5 hover:border-[#340c0c] transition-colors">
          <Camera size={16} strokeWidth={1.5} className="text-[#340c0c]" />
          <span className="font-helveticaN uppercase text-[12px] font-bold tracking-widest text-[#340c0c]">
            TRY ON
          </span>
        </button>
      </div>

      {drawerOpen && createPortal(
        <div className="fixed inset-0 z-[999999] flex justify-end">
          <div
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/50 transition-all duration-300"
          ></div>

          <div className="relative w-full md:w-[420px] h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 z-[1000000]">
            <div className="flex items-center justify-between p-6 border-b border-[#eae6e6]">
              <h2 className="font-helveticaN font-bold text-[16px] tracking-widest text-[#340c0c] uppercase">
                {shades.length} SHADES
              </h2>

              <button
                onClick={() => setDrawerOpen(false)}
                className="text-[#856d6d] hover:text-[#340c0c] transition-colors"
              >
                <X size={28} strokeWidth={1} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-2">
              {shades.map((shade) => (
                <button
                  key={shade.name}
                  onClick={() => {
                    chooseShade(shade);
                    setDrawerOpen(false);
                  }}
                  className={
                    selectedShade?.name === shade.name
                      ? "w-full flex items-center justify-between p-4 bg-[#f9f8f6] hover:bg-[#f9f8f6] transition-colors"
                      : "w-full flex items-center justify-between p-4 hover:bg-[#f9f8f6] transition-colors"
                  }
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={shade.swatchImage}
                      alt={shade.name}
                      className="w-10 h-10 object-cover"
                    />
                    <span className="text-[#340c0c] font-helveticaN text-[15px]">
                      {shade.name}
                    </span>
                  </div>

                  {selectedShade?.name === shade.name && (
                    <Check size={24} strokeWidth={1} className="text-[#340c0c]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}


function Detail() {
  const { trending, selectedCountry, formatPrice } = useProduct();
  const { handleAddtoBasket } = useBasket();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const location = useLocation();

  const product = location.state?.product || trending?.[0];

  const [activeImage, setActiveImage] = useState(0);
  const [selectedShade, setSelectedShade] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImage(0);

    // Məhsul dəyişəndə default olaraq birinci shade seçilir
    const firstShade = product?.shades?.[0] || product?.detailPageData?.shades?.[0] || null;
    setSelectedShade(firstShade);
  }, [product]);

  if (!trending?.length || !product) {
    return (
      <main className="h-screen flex justify-center items-center text-[#340c0c] font-optima text-2xl">
        Loading Magic...
      </main>
    );
  }

  const title = product.title || "PRODUCT TITLE";
  const subTitle = selectedShade?.name || product.subtitle || product.subTitle || "";
  const priceRaw = selectedShade?.price || product.price;
  const price = formatPrice(priceRaw, selectedCountry);
  const cartProduct = selectedShade ? { ...product, selectedShade } : product;

  const gallery = getGallery(product, selectedShade);
  const activeMedia = gallery[activeImage] || gallery[0];
  const currency = selectedCountry?.currency?.split(" ").pop() || "$";

  const accordions = product.detailPageData?.accordions || [];
  const magicText =
    accordions.find((item) => item.title === "WHAT MAKES IT MAGIC")?.content ||
    "Smoothing, pore-blurring effect";
  const ingredientsText =
    accordions.find((item) => item.title === "INGREDIENTS")?.content ||
    "Nourishing ingredients";
  const applyText =
    accordions.find((item) => item.title === "HOW TO APPLY")?.content ||
    "Apply precisely for maximum magical effect!";

  const magicItems = magicText.split("\n").map((text, index) => ({
    icon: index % 2 === 0 ? "Sparkle" : "Drop",
    text,
  }));

  const ingredientItems = [{ icon: "Leaf", text: ingredientsText }];
  const applyItems = [{ icon: "Sparkle", text: applyText }];

  const crossSells = trending
    .filter((item) => item.title !== product.title)
    .slice(0, 4);

  const prevImage = () => {
    if (activeImage === 0) {
      setActiveImage(gallery.length - 1);
    } else {
      setActiveImage(activeImage - 1);
    }
  };

  const nextImage = () => {
    if (activeImage === gallery.length - 1) {
      setActiveImage(0);
    } else {
      setActiveImage(activeImage + 1);
    }
  };

  return (
    <main className="bg-white min-h-screen font-helveticaN pb-[90px]">
      <div className="max-w-[1250px] mx-auto px-4 md:px-8">
        <nav className="py-4">
          <p className="text-xs text-[#856d6d] uppercase font-helveticaN tracking-wide line-clamp-1">
            Home / Makeup /{" "}
            <span className="text-[#340c0c] font-semibold">{title}</span>
          </p>
        </nav>

        <section className="py-4 md:py-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
            <aside className="w-full lg:w-[58%]">
              {/* Mobil görünüşdə title və qiymət gallery-dən əvvəl göstərilir */}
              <div className="lg:hidden mb-6">
                <h1 className="text-3xl font-optima uppercase text-[#340c0c] tracking-wider leading-[1.1]">
                  {title}
                </h1>

                {subTitle && (
                  <p className="text-[#856d6d] uppercase font-helveticaN text-sm mt-1 tracking-wide">
                    {subTitle}
                  </p>
                )}

                <div className="flex items-end gap-2 mt-4">
                  <span className="text-xl font-helveticaN font-medium text-[#340c0c]">
                    {price}
                  </span>

                  {product.originalPrice && (
                    <span className="text-[#856d6d] text-[15px] line-through mb-0.5 font-helveticaN">
                      {formatPrice(product.originalPrice, selectedCountry)}
                    </span>
                  )}
                </div>
              </div>

              {/* PC-də custom thumbnail gallery, mobil görünüşdə hazır ProductGallery işləyir */}
              <div className="hidden lg:flex gap-4">
                <div className="w-[150px] max-h-[650px] overflow-y-auto no-scrollbar flex flex-col gap-3">
                  {gallery.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveImage(index)}
                      className={
                        activeImage === index
                          ? "cursor-pointer relative w-full h-[150px] border border-[#340c0c] shadow-sm transition-all duration-200"
                          : "cursor-pointer relative w-full h-[150px] border border-transparent hover:border-[#eae6e6] transition-all duration-200"
                      }
                    >
                      {img?.type === "video" || img?.placeholder ? (
                        <div className="w-full h-full bg-[#ede8e3] flex items-center justify-center">
                          <FaPlayCircle size={20} className="text-white/80" />
                        </div>
                      ) : (
                        <img
                          src={img?.url || img}
                          alt={`${title} Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover bg-[#f5f0ee]"
                        />
                      )}
                    </button>
                  ))}
                </div>

                <div className="flex-1 bg-[#f5f0ee] flex items-center justify-center relative overflow-hidden group">
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-[#340c0c] text-white text-[11px] font-helveticaN uppercase tracking-widest px-3 py-1 z-10 shadow-sm">
                      {product.badge}
                    </div>
                  )}

                  {gallery.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white flex items-center justify-center z-[20] shadow-sm transition-colors border-none cursor-pointer"
                      >
                        <ChevronLeft
                          size={24}
                          className="text-[#340c0c]"
                          strokeWidth={1.5}
                        />
                      </button>

                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white flex items-center justify-center z-[20] shadow-sm transition-colors border-none cursor-pointer"
                      >
                        <ChevronRight
                          size={24}
                          className="text-[#340c0c]"
                          strokeWidth={1.5}
                        />
                      </button>
                    </>
                  )}

                  {activeMedia?.type === "video" && !activeMedia.placeholder ? (
                    <video
                      src={activeMedia.url}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="w-full h-auto object-contain"
                    />
                  ) : activeMedia?.placeholder ? (
                    <div className="flex flex-col items-center justify-center text-[#9c8a82] font-optima uppercase tracking-wider w-full min-h-[500px]">
                      <FaPlayCircle size={48} className="mb-4 text-[#340c0c]/50" />
                      <span>Video coming soon</span>
                    </div>
                  ) : (
                    <img
                      src={activeMedia?.url || activeMedia}
                      alt={title}
                      className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  )}
                </div>
              </div>

              <div className="lg:hidden">
                <ProductGallery galleryImages={gallery} productName={title} />
              </div>

              <div className="lg:hidden mt-2">
                <ShadePicker
                  shades={product.shades || product.detailPageData?.shades}
                  selectedShade={selectedShade}
                  onSelectShade={setSelectedShade}
                  resetImage={() => setActiveImage(0)}
                />
              </div>
            </aside>

            <article className="w-full lg:w-[42%] lg:sticky lg:top-28 pb-12">
              <header className="hidden lg:block">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-[28px] font-optima uppercase text-[#340c0c] tracking-wider leading-[1.15]">
                    {title}
                  </h1>

                  <button
                    onClick={() => toggleWishlist(cartProduct)}
                    className="mt-1 hover:scale-110 transition-transform"
                  >
                    {isInWishlist(cartProduct) ? (
                      <FaHeart size={22} color="#3a080a" />
                    ) : (
                      <FaRegHeart size={22} color="#3a080a" />
                    )}
                  </button>
                </div>

                {subTitle && (
                  <p className="text-[#856d6d] uppercase font-helveticaN text-[14px] mt-1 tracking-wide">
                    {subTitle}
                  </p>
                )}

                <div className="flex items-baseline gap-2 mt-5">
                  <span className="text-[22px] font-helveticaN font-medium text-[#340c0c]">
                    {price}
                  </span>

                  {product.unitPrice && (
                    <span className="text-[#856d6d] text-[13px] font-helveticaN">
                      ({product.unitPrice})
                    </span>
                  )}

                  {product.originalPrice && (
                    <span className="text-[#856d6d] text-[15px] line-through font-helveticaN">
                      {formatPrice(product.originalPrice, selectedCountry)}
                    </span>
                  )}
                </div>
              </header>

              <p className="text-[#340c0c] font-helveticaN text-[15px] leading-relaxed mb-6">
                {product.detailPageData?.description ||
                  "Experience the flawless Charlotte Tilbury magic! Perfectly formulated for an elegant finish."}
              </p>

              <div className="hidden lg:block">
                <ShadePicker
                  shades={product.shades || product.detailPageData?.shades}
                  selectedShade={selectedShade}
                  onSelectShade={setSelectedShade}
                  resetImage={() => setActiveImage(0)}
                />
              </div>

              <div className="flex flex-col mb-8 border-t border-[#eae6e6]">
                <Accordion title="What Makes It Magic?" items={magicItems} />
                <Accordion title="Ingredients" items={ingredientItems} />
                <Accordion title="How To Apply" items={applyItems} />
              </div>

              <section className="flex flex-col gap-4 mb-8">
                <div className="bg-[#fdf3f0] p-4 flex items-center gap-3">
                  <Gift size={24} className="text-[#340c0c]" />
                  <p className="text-sm text-[#340c0c] font-helveticaN">
                    <span className="font-bold">
                      FREE MAGIC MOTHER'S DAY GIFTS!
                    </span>{" "}
                    Choose a complimentary mini kit at checkout.
                  </p>
                </div>

                <div className="bg-[#f9f8f6] p-4 flex flex-col gap-3">
                  <h4 className="font-optima uppercase text-[#340c0c] text-sm tracking-wide font-bold">
                    Charlotte Tilbury Exclusives
                  </h4>

                  <div className="flex items-center gap-3">
                    <Coins size={18} className="text-[#340c0c]" />
                    <p className="text-xs text-[#340c0c] font-helveticaN">
                      Earn Loyalty Coins every time you shop!
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Truck size={18} className="text-[#340c0c]" />
                    <p className="text-xs text-[#340c0c] font-helveticaN">
                      Free standard delivery on orders over {currency}49
                    </p>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </section>

        {crossSells.length > 0 && (
          <section className="mt-16 mb-24 border-t border-[#eae6e6] pt-16">
            <h2 className="text-2xl md:text-[32px] font-optima text-center text-[#340c0c] uppercase tracking-widest mb-10">
              You May Also Love
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {crossSells.map((item) => (
                <ProductCard
                  key={item.title}
                  item={item}
                  className="w-full"
                />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Mobil bottom bar */}
      <aside className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-[60] flex flex-col border-t border-[#eae6e6]">
        <div className="px-4 py-3 w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            {selectedShade?.swatchImage ? (
              <img
                src={selectedShade.swatchImage}
                alt={subTitle}
                className="w-5 h-5 object-cover"
              />
            ) : (
              <div className="w-5 h-5 bg-[#f5f0ee]"></div>
            )}

            <span className="text-[#856d6d] uppercase text-[12px] font-helveticaN tracking-wide mt-0.5">
              {subTitle}
            </span>
          </div>

          <span className="font-medium text-[#340c0c] text-[14px] font-helveticaN">
            {price}
          </span>
        </div>

        <div className="px-4 pb-4">
          <button
            onClick={() => handleAddtoBasket(cartProduct)}
            className="cursor-pointer w-full bg-[#3a080a] hover:bg-[#2d0a0a] text-white py-3.5 font-helveticaN uppercase tracking-widest text-[13px] transition-colors font-bold shadow-sm"
          >
            ADD TO BAG
          </button>
        </div>
      </aside>

      {/* PC bottom bar */}
      <aside className="hidden md:flex fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-[60] items-stretch h-[80px]">
        <div className="flex-1 max-w-[1470px] mx-auto w-full flex justify-between items-center px-8">
          <div className="flex items-center gap-4">
            <img
              src={gallery[0]?.url || gallery[0]}
              alt={`${title} Thumbnail`}
              className="h-[60px] w-[60px] object-cover border border-[#eae6e6] bg-[#f9f8f6]"
            />

            <div className="flex flex-col justify-center">
              <span className="font-optima uppercase text-[#340c0c] font-bold text-[15px] tracking-widest line-clamp-1">
                {title}
              </span>

              <span className="text-[#856d6d] uppercase text-[11px] font-helveticaN tracking-wide mt-0.5 line-clamp-1">
                {subTitle}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-8">
            <span className="font-medium text-[#340c0c] text-xl font-helveticaN">
              {price}
            </span>

            <button
              onClick={() => handleAddtoBasket(cartProduct)}
              className="cursor-pointer bg-[#3a080a] hover:bg-[#2d0a0a] text-white px-12 py-3.5 font-helveticaN uppercase tracking-widest text-[13px] transition-colors font-bold shadow-sm whitespace-nowrap"
            >
              ADD TO BAG
            </button>
          </div>
        </div>
      </aside>
    </main>
  );
}

export default Detail;