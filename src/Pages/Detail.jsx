import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams, useNavigate } from "react-router";
import { FaHeart, FaRegHeart, FaPlayCircle } from "react-icons/fa";
import {
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp,
  Truck, Gift, Coins, X, Check, ScanFace, Camera,
} from "lucide-react";
import { TbDiamondsFilled, TbDroplet, TbClock, TbFlower} from "react-icons/tb";
import { useProduct } from "../Context/DataContext";
import { useBasket } from "../Context/BasketContext";
import { useWishlist } from "../Context/WishlistContext";
import ProductGallery from "../Component/ProductGallery";
import ProductCard from "../Component/Home/ProductCard";

// Shade adının son sözünə görə group-ları detect et ("4 Medium" → "Medium")
const KNOWN_GROUPS = ["Fair", "Medium", "Tan", "Deep", "Cool", "Neutral", "Warm", "Light", "Dark"];
function detectShadeGroups(shades) {
  const groups = [];
  for (const s of shades) {
    const last = (s.name || "").split(" ").pop();
    if (KNOWN_GROUPS.includes(last) && !groups.includes(last)) groups.push(last);
  }
  return groups.length >= 2 ? groups : [];
}
// Bütün shade adları ml ilə bitirsə size dropdown göstər
function detectSizeProduct(shades) {
  return shades?.length > 0 && shades.every((s) => /\d+\s*ml/i.test(s.name));
}

function Detail() {
  const { trending, selectedCountry, formatPrice } = useProduct();
  const { addToBasket } = useBasket();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const location = useLocation();
  const { shade: shadeParam } = useParams();

  // URL-dən gələn məhsul varsa onu götür, yoxsa siyahının ilkini
  const product = location.state?.product || trending?.[0];

  const [activeImage,    setActiveImage]    = useState(0);
  const [selectedShade,  setSelectedShade]  = useState(null);
  const [drawerOpen,     setDrawerOpen]     = useState(false);
  const [openAccordions, setOpenAccordions] = useState({});
  const [videoOpen,      setVideoOpen]      = useState(false);
  const [activeGroup,    setActiveGroup]    = useState(null);


  // Desktop thumbnail sidebar — scroll active thumb into view on arrow nav
  const thumbSidebarRefs = useRef([]);
  useEffect(() => {
    thumbSidebarRefs.current[activeImage]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [activeImage]);

  // Məhsul və ya URL-dəki shade dəyişəndə: yuxarı sürüş, şəkli sıfırla, uyğun çaları seç
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveImage(0);
    setActiveGroup(null);

    const shades = product?.shades || product?.detailPageData?.shades || [];

    // URL-dəki shade adı ilə uyğun olanı tap
    // "Pink Liaison" → "pink-liaison" çeviririk, sonra URL ilə müqayisə edirik
    const matchedShade = shades.find((s) => {
      const shadeName = s.name?.toLowerCase().split(" ").join("-");
      const urlShade  = shadeParam?.toLowerCase();
      return shadeName === urlShade;
    });

    setSelectedShade(matchedShade || shades[0] || null);
  }, [product, shadeParam]);

  if (!trending?.length || !product) {
    return (
      <main className="h-screen flex justify-center items-center text-[#340c0c] font-optima text-2xl">
        Loading Magic...
      </main>
    );
  }

  // ─── Əsas dəyərlər ────────────────────────────────────────────────────────

  const title    = product.title || "";
  const subTitle = selectedShade?.name || product.subtitle || product.subTitle || "";
  const priceRaw = selectedShade?.price || product.price;
  const price    = formatPrice(priceRaw, selectedCountry);
  const currency = selectedCountry?.currency?.split(" ").pop() || "$";

  // Səbətə əlavə ediləcək məhsul (seçilmiş çalar varsa onu da əlavə et)
  const cartProduct = selectedShade ? { ...product, selectedShade } : product;

  // ─── Çalar vəziyyəti yoxlamaları ──────────────────────────────────────────

  const isShadeOOS  = (shade) =>
    !!shade?.outOfStock || (shade?.name || "").toLowerCase().includes("out of stock");

  const isShadeDisc = (shade) =>
    !!shade?.discontinued || (shade?.name || "").toLowerCase().includes("discontinued");

  // Çaların vəziyyət yazısını qaytar (yoxdursa null)
  const getShadeStatus = (shade) => {
    if (!shade) return null;
    if (isShadeDisc(shade)) return "Discontinued";
    if (isShadeOOS(shade))  return "Out of Stock";
    return null;
  };

  const isOOS  = selectedShade ? isShadeOOS(selectedShade)  : product.outOfStock;
  const isDisc = selectedShade ? isShadeDisc(selectedShade) : product.discontinued;

  // ─── Şəkil qalereyası ─────────────────────────────────────────────────────

  // Çaların şəkilləri varsa onları götür, yoxsa məhsulun şəkillərini
  const rawGallery = selectedShade?.galleryImages?.length
    ? selectedShade.galleryImages
    : product?.galleryImages?.length
    ? product.galleryImages
    : [product?.images?.main, product?.images?.hover].filter(Boolean);

  // Video, placeholder və SVG-ləri çıxar
 const gallery = rawGallery.filter(
  (img) => img?.type !== "video" && !img?.placeholder
);

  // Boşdursa ehtiyat kimi məhsulun əsas şəkillərini istifadə et
  const safeGallery = gallery.length
    ? gallery
    : [product?.images?.main, product?.images?.hover].filter(Boolean);

  const activeItem    = safeGallery[Math.min(activeImage, safeGallery.length - 1)] || safeGallery[0];
  const activeImgUrl  = typeof activeItem === "string" ? activeItem : activeItem?.url || product?.images?.main || "";

  const goToPrev = () => setActiveImage((i) => (i === 0 ? safeGallery.length - 1 : i - 1));
  const goToNext = () => setActiveImage((i) => (i >= safeGallery.length - 1 ? 0 : i + 1));

  // ─── Accordion ────────────────────────────────────────────────────────────

  const toggleAccordion = (key) =>
    setOpenAccordions((prev) => ({ ...prev, [key]: !prev[key] }));

  // Accordion məlumatlarını məhsuldan çək, yoxdursa boş siyahı qaytar
  const getAccordionItems = (titleKey, fallbackText, fallbackIcon, aliases = []) => {
    const allKeys = [titleKey, ...aliases];
    const found   = (product.accordions || []).find((a) =>
      allKeys.some((k) => (a.title || "").toUpperCase() === k.toUpperCase())
    );
    if (found?.items?.length) return found.items;

    const text = fallbackText || "";
    if (!text) return [];

    return text
      .split(". ")
      .map((s) => s.trim())
      .filter((s) => s.length > 10)
      .map((s) => ({ icon: fallbackIcon, text: s.endsWith(".") ? s : s + "." }));
  };

  // Hər accordion bölməsi üçün məlumatları hazırla
  // PRODUCT DETAILS: yalnız aboutTheProduct-dan oxu
  // WHAT MAKES IT MAGIC?: əgər whatMakesItMagic varsa onu götür,
  //   yoxdursa ingredientsAndBenefits-dən götür (aboutTheProduct-u təkrarlama)
  // INGREDIENTS: yalnız ingredientsAndBenefits-dən oxu (WHAT MAKES IT MAGIC? artıq onu
  //   istifadə etmirdisə göstər, əksinə isə gizlət)
  const magicText = product.whatMakesItMagic
    || (!product.ingredientsAndBenefits ? product.aboutTheProduct : product.ingredientsAndBenefits)
    || "";
  // Əgər magic-də ingredientsAndBenefits-i işlətdikse, INGREDIENTS-i gizlət (dublikat olmasın)
  const usingIngrForMagic = !product.whatMakesItMagic && !!product.ingredientsAndBenefits;

  const accordionSections = [
    {
      key:   "details",
      title: "PRODUCT DETAILS",
      items: getAccordionItems("PRODUCT DETAILS", product.productDetails || product.aboutTheProduct || "", "Sparkle", ["ABOUT THE PRODUCT"]),
    },
    {
      key:   "magic",
      title: "WHAT MAKES IT MAGIC?",
      items: getAccordionItems("WHAT MAKES IT MAGIC?", magicText, "Heart", ["WHAT MAKES IT MAGIC"]),
    },
    // INGREDIENTS: yalnız whatMakesItMagic var olduqda göstər (çünki yoxdursa artıq yuxarıda göstərilib)
    ...(!usingIngrForMagic ? [{
      key:   "ingr",
      title: "INGREDIENTS",
      items: getAccordionItems("INGREDIENTS", product.ingredients || product.ingredientsAndBenefits || "", "Leaf", ["INGREDIENTS + BENEFITS", "INGREDIENTS & BENEFITS"]),
    }] : []),
    {
      key:   "apply",
      title: "HOW TO APPLY",
      items: getAccordionItems("HOW TO APPLY", product.howToApply || "", "Drop"),
    },
    {
      key:   "shipping",
      title: "SHIPPING & DELIVERY INFORMATION",
      items: getAccordionItems(
        "SHIPPING & DELIVERY INFORMATION",
        `Free standard delivery on orders over ${currency}49. Orders processed within 1–2 business days. Easy 30-day returns on all eligible items.`,
        "Truck"
      ),
    },
  ].filter((s) => s.items.length > 0); // Boş bölmələri göstərmə

  // Icon adına görə uyğun komponenti qaytar
  const getIcon = (name) => {
    return                       <TbDiamondsFilled size={16} className="text-[#340c0c] shrink-0" />;
  };

  // ─── Çalar seçimi ─────────────────────────────────────────────────────────

  const shades = product.shades || product.detailPageData?.shades || [];
  const isSizeMode  = detectSizeProduct(shades);
  const shadeGroups = isSizeMode ? [] : detectShadeGroups(shades);
  const visibleShades = activeGroup
    ? shades.filter((s) => (s.name || "").split(" ").pop() === activeGroup)
    : shades;

  const navigate = useNavigate();

  const selectShade = (shade) => {
    setSelectedShade(shade);
    setActiveImage(0);

    // Shade seçiləndə URL-i yenilə
    const shadeName = shade.name?.toLowerCase().split(" ").join("-");
    navigate(`/product/${product.title}/${shadeName}`, {
      state: { product },
      replace: true,
    });
  };

  // ─── Digər hesablamalar ───────────────────────────────────────────────────

  // Oxşar məhsullar (eyni başlıqlı məhsulu çıxar, 4-ü göstər)
  const relatedProducts = trending.filter((item) => item.title !== product.title).slice(0, 4);

  // Endirim faizini hesabla
  let discountLabel = null;
  if (product.originalPrice) {
    const origNum    = parseFloat(String(product.originalPrice).replace(/[^0-9.]/g, ''));
    const currentNum = parseFloat(String(product.price).replace(/[^0-9.]/g, ''));
    if (!isNaN(origNum) && !isNaN(currentNum) && origNum > 0) {
      const pct = Math.round(100 - (currentNum / origNum) * 100);
      if (pct > 0) discountLabel = `${pct}% OFF`;
    }
  }

  // Təsvirin ilk 2 cümləsini götür
  const rawDesc   = product.description || product.detailPageData?.description || "";
  const shortDesc = rawDesc.split(". ").slice(0, 2).join(". ");

  // Email soruşub bildiriş ver
  const notifyMe = () => {
    const email = window.prompt("Enter your email to be notified when this product is back in stock:");
    if (email) window.alert(`Thank you! We'll notify you at ${email} when it's back.`);
  };

  // ─── UI hissələri ─────────────────────────────────────────────────────────

  const oosBanner = (
    <div className="flex items-center gap-3 border border-[#c97b2a] bg-[#fff8f1] px-4 py-3.5 mb-4">
      <span className="text-[#c97b2a] text-[18px] leading-none flex-shrink-0">⊙</span>
      <p className="text-[14px] font-helveticaN text-[#340c0c]">
        Oh no! This item is <span className="font-bold">out of stock.</span>
      </p>
    </div>
  );

  const discBanner = (
    <div className="flex items-center gap-3 border border-[#856d6d] bg-[#f9f8f6] px-4 py-3.5 mb-4">
      <span className="text-[#856d6d] text-[18px] leading-none flex-shrink-0">⊙</span>
      <p className="text-[14px] font-helveticaN text-[#340c0c]">
        This item has been <span className="font-bold">discontinued.</span>
      </p>
    </div>
  );

  // Çalar seçici (çalar yoxdursa render etmə)
  const shadePicker = shades.length > 0 && (
    <section className="mt-6 mb-6">

      {/* SIZE MODE: ml-li ölçülər üçün dropdown */}
      {isSizeMode ? (
        <div className="mb-4">
          <p className="font-helveticaN text-[13px] uppercase tracking-widest text-[#856d6d] mb-3 font-bold">SIZE</p>
          <div className="relative">
            <select
              value={selectedShade?.name || ""}
              onChange={(e) => {
                const s = shades.find((sh) => sh.name === e.target.value);
                if (s) selectShade(s);
              }}
              className="w-full appearance-none border border-[#340c0c] px-4 py-3.5 font-helveticaN text-[14px] text-[#340c0c] bg-white cursor-pointer pr-10 focus:outline-none"
            >
              {shades.map((s) => (
                <option key={s.name} value={s.name} disabled={isShadeOOS(s) || isShadeDisc(s)}>
                  {s.name}{isShadeOOS(s) ? " — Out of Stock" : ""}{isShadeDisc(s) ? " — Discontinued" : ""}{s.price ? `  —  ${formatPrice(s.price, selectedCountry)}` : ""}
                </option>
              ))}
            </select>
            <ChevronDown size={18} strokeWidth={1.5} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#340c0c]" />
          </div>
        </div>
      ) : (
        <>
          {/* GROUP FILTER TABS (Fair / Medium / Tan / Deep …) */}
          {shadeGroups.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              <button
                onClick={() => setActiveGroup(null)}
                className={activeGroup === null
                  ? "px-4 py-1.5 border border-[#340c0c] font-helveticaN text-[12px] uppercase tracking-widest text-[#340c0c] font-bold"
                  : "px-4 py-1.5 border border-[#eae6e6] font-helveticaN text-[12px] uppercase tracking-widest text-[#856d6d] hover:border-[#340c0c] hover:text-[#340c0c] transition-colors"}
              >
                All
              </button>
              {shadeGroups.map((group) => (
                <button
                  key={group}
                  onClick={() => setActiveGroup(group)}
                  className={activeGroup === group
                    ? "px-4 py-1.5 border border-[#340c0c] font-helveticaN text-[12px] uppercase tracking-widest text-[#340c0c] font-bold"
                    : "px-4 py-1.5 border border-[#eae6e6] font-helveticaN text-[12px] uppercase tracking-widest text-[#856d6d] hover:border-[#340c0c] hover:text-[#340c0c] transition-colors"}
                >
                  {group}
                </button>
              ))}
            </div>
          )}

          {/* Çalar şəbəkəsi */}
          <div className="grid grid-cols-6 md:grid-cols-7 gap-1 mb-5">
            {visibleShades.map((shade) => (
              <button
                key={shade.name}
                onClick={() => selectShade(shade)}
                title={`${shade.name}${getShadeStatus(shade) ? ` - ${getShadeStatus(shade)}` : ""}`}
                className={
                  selectedShade?.name === shade.name
                    ? "cursor-pointer aspect-square w-full border-[1.5px] border-[#340c0c] p-[2px] transition-all relative"
                    : "cursor-pointer aspect-square w-full border border-transparent hover:border-[#eae6e6] transition-all relative"
                }
              >
                <img
                  src={shade.swatchImage}
                  alt={shade.name}
                  className={`w-full h-full object-cover ${isShadeOOS(shade) || isShadeDisc(shade) ? "opacity-40" : ""}`}
                />
                {(isShadeOOS(shade) || isShadeDisc(shade)) && (
                  <span
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{
                      background: "linear-gradient(to top right, transparent calc(50% - 0.5px), #856d6d, transparent calc(50% + 0.5px))",
                    }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Seçilmiş çalar sırası + drawer açma düyməsi */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="cursor-pointer w-full flex items-center justify-between border border-[#eae6e6] p-4 hover:border-[#340c0c] transition-colors bg-white group"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-8 h-8 flex-shrink-0">
                <img
                  src={selectedShade?.swatchImage}
                  alt={selectedShade?.name}
                  className={`w-full h-full object-cover ${getShadeStatus(selectedShade) ? "opacity-40" : ""}`}
                />
                {getShadeStatus(selectedShade) && (
                  <span
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: "linear-gradient(to top right, transparent calc(50% - 0.5px), #856d6d, transparent calc(50% + 0.5px))",
                    }}
                  />
                )}
              </div>
              <div className="flex flex-col items-start">
                <span className="text-[#340c0c] font-helveticaN text-[15px]">{selectedShade?.name}</span>
                {getShadeStatus(selectedShade) && (
                  <span className="text-[11px] font-helveticaN text-[#856d6d] uppercase tracking-wide mt-0.5">
                    {getShadeStatus(selectedShade)}
                  </span>
                )}
              </div>
            </div>
            <ChevronRight size={20} strokeWidth={1} className="text-[#856d6d] group-hover:text-[#340c0c]" />
          </button>
        </>
      )}

      {/* Necə tətbiq etmək + sına düymələri */}
      <div className="grid grid-cols-2 gap-3 mt-4">
        <button className="cursor-pointer flex items-center justify-center gap-2 border border-[#eae6e6] py-3.5 hover:border-[#340c0c] transition-colors">
          <ScanFace size={16} strokeWidth={1.5} className="text-[#340c0c]" />
          <span className="font-helveticaN uppercase text-[12px] font-bold tracking-widest text-[#340c0c]">HOW TO APPLY</span>
        </button>
        <button className="cursor-pointer flex items-center justify-center gap-2 border border-[#eae6e6] py-3.5 hover:border-[#340c0c] transition-colors">
          <Camera size={16} strokeWidth={1.5} className="text-[#340c0c]" />
          <span className="font-helveticaN uppercase text-[12px] font-bold tracking-widest text-[#340c0c]">TRY ON</span>
        </button>
      </div>
    </section>
  );

  // Çalar drawer (sağdan açılan panel)
  const shadeDrawer = drawerOpen && (
    <div className="fixed inset-0 z-[999999] flex justify-end">
      <div onClick={() => setDrawerOpen(false)} className="absolute inset-0 bg-black/50" />
      <div className="relative w-full md:w-[420px] h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 z-[1000000]">
        <div className="flex items-center justify-between p-6 border-b border-[#eae6e6]">
          <h2 className="font-helveticaN font-bold text-[16px] tracking-widest text-[#340c0c] uppercase">
            {shades.length} SHADES
          </h2>
          <button onClick={() => setDrawerOpen(false)} className="text-[#856d6d] hover:text-[#340c0c]">
            <X size={28} strokeWidth={1} />
          </button>
        </div>
        {shadeGroups.length > 0 && (
          <div className="flex flex-wrap gap-2 px-4 py-3 border-b border-[#eae6e6]">
            <button
              onClick={() => setActiveGroup(null)}
              className={activeGroup === null
                ? "px-3 py-1 border border-[#340c0c] font-helveticaN text-[11px] uppercase tracking-widest text-[#340c0c] font-bold"
                : "px-3 py-1 border border-[#eae6e6] font-helveticaN text-[11px] uppercase tracking-widest text-[#856d6d] hover:border-[#340c0c]"}
            >All</button>
            {shadeGroups.map((group) => (
              <button
                key={group}
                onClick={() => setActiveGroup(group)}
                className={activeGroup === group
                  ? "px-3 py-1 border border-[#340c0c] font-helveticaN text-[11px] uppercase tracking-widest text-[#340c0c] font-bold"
                  : "px-3 py-1 border border-[#eae6e6] font-helveticaN text-[11px] uppercase tracking-widest text-[#856d6d] hover:border-[#340c0c]"}
              >{group}</button>
            ))}
          </div>
        )}
        <div className="flex-1 overflow-y-auto p-2">
          {(activeGroup ? shades.filter((s) => (s.name || "").split(" ").pop() === activeGroup) : shades).map((shade) => (
            <button
              key={shade.name}
              onClick={() => { selectShade(shade); setDrawerOpen(false); }}
              className={
                selectedShade?.name === shade.name
                  ? "w-full flex items-center justify-between p-4 bg-[#f9f8f6]"
                  : "w-full flex items-center justify-between p-4 hover:bg-[#f9f8f6]"
              }
            >
              <div className="flex items-center gap-5">
                <div className="relative w-10 h-10 flex-shrink-0">
                  <img
                    src={shade.swatchImage}
                    alt={shade.name}
                    className={`w-full h-full object-cover ${isShadeOOS(shade) || isShadeDisc(shade) ? "opacity-40" : ""}`}
                  />
                  {(isShadeOOS(shade) || isShadeDisc(shade)) && (
                    <span
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: "linear-gradient(to top right, transparent calc(50% - 0.5px), #856d6d, transparent calc(50% + 0.5px))",
                      }}
                    />
                  )}
                </div>
                <div className="flex flex-col items-start">
                  <span className={`font-helveticaN text-[15px] ${isShadeOOS(shade) || isShadeDisc(shade) ? "text-[#856d6d]" : "text-[#340c0c]"}`}>
                    {shade.name}
                  </span>
                  {getShadeStatus(shade) && (
                    <span className="text-[11px] font-helveticaN text-[#856d6d] uppercase tracking-wide mt-0.5">
                      {getShadeStatus(shade)}
                    </span>
                  )}
                </div>
              </div>
              {selectedShade?.name === shade.name && <Check size={24} strokeWidth={1} className="text-[#340c0c]" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  // Accordion siyahısı
  const accordionList = (
    <div className="flex flex-col mb-8 border-t border-[#eae6e6]">
      {accordionSections.map(({ key, title: sectionTitle, items }) => (
        <article
          key={key}
          onClick={() => toggleAccordion(key)}
          className="border-b border-[#eae6e6] py-5 cursor-pointer group"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-optima uppercase text-[17px] font-medium text-[#340c0c] tracking-wide group-hover:text-[#856d6d] transition-colors">
              {sectionTitle}
            </h3>
            {openAccordions[key]
              ? <ChevronUp size={20} className="text-[#340c0c]" />
              : <ChevronDown size={20} className="text-[#340c0c]" />
            }
          </div>
          {openAccordions[key] && (
            <div className="mt-5 space-y-4">
              {items.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
  
                  <p className="text-[14px] text-[#340c0c] font-helveticaN leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          )}
        </article>
      ))}

      {/* Video accordion (YouTube linki varsa göstər) */}
      {product.videoUrl && (() => {
        const match   = product.videoUrl.match(/(?:v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
        const videoId = match ? match[1] : null;
        if (!videoId) return null;
        const embedUrl = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
        return (
          <article className="border-b border-[#eae6e6] py-5">
            <div className="flex items-center justify-between cursor-pointer group" onClick={() => setVideoOpen((v) => !v)}>
              <div className="flex items-center gap-3">
                <FaPlayCircle size={22} className="text-[#340c0c]" />
                <span className="font-optima uppercase text-[17px] font-medium text-[#340c0c] tracking-wide group-hover:text-[#856d6d] transition-colors">
                  WATCH THE TUTORIAL
                </span>
              </div>
              {videoOpen ? <ChevronUp size={20} className="text-[#340c0c]" /> : <ChevronDown size={20} className="text-[#340c0c]" />}
            </div>
            {videoOpen && (
              <div className="mt-4 w-full aspect-video">
                <iframe
                  src={embedUrl}
                  title={`${title} Tutorial`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            )}
          </article>
        );
      })()}
    </div>
  );

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <main className="bg-white min-h-screen font-helveticaN pb-[90px]">
      {shadeDrawer}

      <div className="max-w-[1250px] mx-auto px-4 md:px-8">
        {/* Breadcrumb */}
        <nav className="py-4">
          <p className="text-xs text-[#856d6d] uppercase font-helveticaN tracking-wide line-clamp-1">
            Home / Makeup / <span className="text-[#340c0c] font-semibold">{title}</span>
          </p>
        </nav>

        <section className="py-4 md:py-6">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

            {/* ── Sol: Qaleriya ── */}
            <aside className="w-full lg:w-[63%] lg:sticky lg:top-8 lg:self-start">
              {/* Mobil: başlıq + qiymət qalereyadan əvvəl */}
              <div className="lg:hidden mb-6">
                <h1 className="text-3xl font-optima uppercase text-[#340c0c] tracking-wider leading-[1.1]">{title}</h1>
                {subTitle && (
                  <p className="text-[#856d6d] uppercase font-helveticaN text-sm mt-1 tracking-wide">{subTitle}</p>
                )}
                <div className="flex items-end gap-2 mt-4">
                  <span className="text-xl font-helveticaN font-medium text-[#340c0c]">{price}</span>
                  {product.originalPrice && (
                    <span className="text-[#856d6d] text-[15px] line-through mb-0.5 font-helveticaN">
                      {formatPrice(product.originalPrice, selectedCountry)}
                    </span>
                  )}
                </div>
              </div>

              {/* Desktop: kiçik şəkillər + böyük şəkil */}
              <div className="hidden lg:flex gap-4">
                <div className="w-[150px] max-h-[650px] overflow-y-auto no-scrollbar flex flex-col gap-3">
                  {safeGallery
                    .filter((img) => img?.type !== "video" && !img?.placeholder)
                    .map((img, index) => (
                      <button
                        key={index}
                        ref={(el) => (thumbSidebarRefs.current[index] = el)}
                        onClick={() => setActiveImage(index)}
                        className={
                          activeImage === index
                            ? "cursor-pointer relative w-full h-[150px] border border-[#340c0c] shadow-sm transition-all duration-200"
                            : "cursor-pointer relative w-full h-[150px] border border-transparent hover:border-[#eae6e6] transition-all duration-200"
                        }
                      >
                        <img
                          src={img?.url || img}
                          alt={`${title} Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover bg-[#f5f0ee]"
                        />
                      </button>
                    ))}
                </div>

                <div className="flex-1 bg-[#f5f0ee] flex items-center justify-center relative overflow-hidden group h-[650px]">
                  {product.badge && (
                    <div className="absolute top-4 left-4 bg-[#340c0c] text-white text-[11px] font-helveticaN uppercase tracking-widest px-3 py-1 z-10 shadow-sm">
                      {product.badge}
                    </div>
                  )}
                  {safeGallery.length > 1 && (
                    <>
                      <button onClick={goToPrev} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white flex items-center justify-center z-[20] shadow-sm cursor-pointer">
                        <ChevronLeft size={24} className="text-[#340c0c]" strokeWidth={1.5} />
                      </button>
                      <button onClick={goToNext} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white flex items-center justify-center z-[20] shadow-sm cursor-pointer">
                        <ChevronRight size={24} className="text-[#340c0c]" strokeWidth={1.5} />
                      </button>
                    </>
                  )}
                  <div className="relative w-full h-full">
                    <img src={activeImgUrl} alt={title} className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]" />
                  </div>
                </div>
              </div>

              {/* Mobil qaleriya */}
              <div className="lg:hidden">
                <ProductGallery galleryImages={safeGallery} productName={title} />
              </div>

              {/* Mobil: çalar seçici + banerlər */}
              <div className="lg:hidden mt-2">
                {shadePicker}
                {isOOS  && oosBanner}
                {isDisc && discBanner}
              </div>
            </aside>

            {/* ── Sağ: Məhsul məlumatları ── */}
            <article className="w-full lg:w-[37%] pb-12 lg:sticky lg:top-8 lg:self-start lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto no-scrollbar">

              {/* Desktop başlıq + istək siyahısı */}
              <header className="hidden lg:block">
                <div className="flex items-start justify-between gap-4">
                  <h1 className="text-[28px] font-optima uppercase text-[#340c0c] tracking-wider leading-[1.15]">{title}</h1>
                  <button onClick={() => toggleWishlist(cartProduct)} className="mt-1 hover:scale-110 transition-transform">
                    {isInWishlist(cartProduct)
                      ? <FaHeart    size={22} color="#3a080a" />
                      : <FaRegHeart size={22} color="#3a080a" />
                    }
                  </button>
                </div>
                {subTitle && (
                  <p className="text-[#856d6d] uppercase font-helveticaN text-[14px] mt-1 tracking-wide">{subTitle}</p>
                )}
                <div className="flex items-baseline gap-2 mt-5">
                  <span className="text-[22px] font-helveticaN font-medium text-[#340c0c]">{price}</span>
                  {product.unitPrice && (
                    <span className="text-[#856d6d] text-[13px] font-helveticaN">({product.unitPrice})</span>
                  )}
                  {product.originalPrice && (
                    <>
                      <span className="text-[#856d6d] text-[15px] line-through font-helveticaN">
                        {formatPrice(product.originalPrice, selectedCountry)}
                      </span>
                      {discountLabel && (
                        <span className="text-[#b94040] text-[13px] font-helveticaN font-medium">{discountLabel}</span>
                      )}
                    </>
                  )}
                </div>
              </header>

            
              {/* Desktop: çalar seçici + banerlər */}
              <div className="hidden lg:block">
                {shadePicker}
                {isOOS  && oosBanner}
                {isDisc && discBanner}
              </div>

              {accordionList}

              {/* Üstünlüklər bölməsi */}
              <section className="flex flex-col gap-4 mb-8">
                <div className="bg-[#fdf3f0] p-4 flex items-center gap-3">
                  <Gift size={24} className="text-[#340c0c]" />
                  <p className="text-sm text-[#340c0c] font-helveticaN">
                    <span className="font-bold">FREE MAGIC MOTHER'S DAY GIFTS!</span>{" "}
                    Choose a complimentary mini kit at checkout.
                  </p>
                </div>
                <div className="bg-[#f9f8f6] p-4 flex flex-col gap-3">
                  <h4 className="font-optima uppercase text-[#340c0c] text-sm tracking-wide font-bold">
                    Charlotte Tilbury Exclusives
                  </h4>
                  <div className="flex items-center gap-3">
                    <Coins size={18} className="text-[#340c0c]" />
                    <p className="text-xs text-[#340c0c] font-helveticaN">Earn Loyalty Coins every time you shop!</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Truck size={18} className="text-[#340c0c]" />
                    <p className="text-xs text-[#340c0c] font-helveticaN">Free standard delivery on orders over {currency}49</p>
                  </div>
                </div>
              </section>
            </article>
          </div>
        </section>

        {/* Oxşar məhsullar */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 mb-24 border-t border-[#eae6e6] pt-16">
            <h2 className="text-2xl md:text-[32px] font-optima text-center text-[#340c0c] uppercase tracking-widest mb-10">
              You May Also Love
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((item) => (
                <ProductCard key={item.title} item={item} className="w-full" />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ── Mobil alt bar ── */}
      <aside className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-[60] flex flex-col border-t border-[#eae6e6]">
        <div className="px-4 py-3 w-full flex justify-between items-center">
          <div className="flex items-center gap-3">
            {selectedShade?.swatchImage
              ? <img src={selectedShade.swatchImage} alt={subTitle} className="w-5 h-5 object-cover" />
              : <div className="w-5 h-5 bg-[#f5f0ee]" />
            }
            <span className="text-[#856d6d] uppercase text-[12px] font-helveticaN tracking-wide mt-0.5">{subTitle}</span>
          </div>
          <span className="font-medium text-[#340c0c] text-[14px] font-helveticaN">{price}</span>
        </div>
        <div className="px-4 pb-4">
          {isOOS ? (
            <button onClick={notifyMe} className="cursor-pointer w-full bg-white border-2 border-[#3a080a] text-[#3a080a] py-3.5 font-helveticaN uppercase tracking-widest text-[13px] font-bold hover:bg-[#f9f0f0]">
              NOTIFY ME
            </button>
          ) : (
            <button onClick={() => addToBasket(cartProduct)} className="cursor-pointer w-full bg-[#3a080a] hover:bg-[#2d0a0a] text-white py-3.5 font-helveticaN uppercase tracking-widest text-[13px] font-bold">
              ADD TO BAG
            </button>
          )}
        </div>
      </aside>

      {/* ── Desktop alt bar ── */}
      <aside className="hidden md:flex fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-[60] items-stretch h-[80px]">
        <div className="flex-1 max-w-[1470px] mx-auto w-full flex justify-between items-center px-8">
          <div className="flex items-center gap-4">
            <img
              src={safeGallery[0]?.url || safeGallery[0]}
              alt={`${title} Thumbnail`}
              className="h-[60px] w-[60px] object-cover border border-[#eae6e6] bg-[#f9f8f6]"
            />
            <div className="flex flex-col justify-center">
              <span className="font-optima uppercase text-[#340c0c] font-bold text-[15px] tracking-widest line-clamp-1">{title}</span>
              <span className="text-[#856d6d] uppercase text-[11px] font-helveticaN tracking-wide mt-0.5 line-clamp-1">{subTitle}</span>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <span className="font-medium text-[#340c0c] text-xl font-helveticaN">{price}</span>
            <button
              onClick={isOOS || isDisc ? notifyMe : () => addToBasket(cartProduct)}
              className={
                isOOS || isDisc
                  ? "cursor-pointer bg-white border-2 border-[#3a080a] text-[#3a080a] px-12 py-3.5 font-helveticaN uppercase tracking-widest text-[13px] font-bold whitespace-nowrap hover:bg-[#f9f0f0]"
                  : "cursor-pointer bg-[#3a080a] hover:bg-[#2d0a0a] text-white px-12 py-3.5 font-helveticaN uppercase tracking-widest text-[13px] font-bold whitespace-nowrap"
              }
            >
              {isOOS || isDisc ? "NOTIFY ME" : "ADD TO BAG"}
            </button>
          </div>
        </div>
      </aside>
    </main>
  );
}

export default Detail;
