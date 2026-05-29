import React, { useEffect, useState } from "react"
import { Link, useNavigate, useLocation } from "react-router"
import { useBasket } from "../Context/BasketContext"
import { useProduct } from "../Context/DataContext"
import { useWishlist } from "../Context/WishlistContext"
import { Heart, Menu, ChevronDown, ChevronRight, ChevronLeft, Globe, X, User } from "lucide-react"
import { PiMagnifyingGlass } from "react-icons/pi"
import useScrollLock from "../hooks/useScrollLock"
import CartDrawer from "./Cart/CartDrawer"

const promoMessages = [
  "Create an account or log in to unlock 15% off + FREE ground shipping on your first order* with code DARLING15",
  "Unlock A Free Mini Skincare Duo When You Spend $90! T&Cs Apply.",
  "Up to 20% off Magical Savings!",
]

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()
  
  // Custom kontekstlərimiz
  const { basket, Basketopen } = useBasket()
  const { wishlist } = useWishlist()
  const {
    selectedCountry,
    setSelectedCountry,
    countries,
    menuData,
    mobileMenuData,
    formatPrice,
  } = useProduct()

  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false)
  const [tempRegionName, setTempRegionName] = useState(selectedCountry?.name || "")
  const [promoIndex, setPromoIndex] = useState(0)
  const [fade, setFade] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuTop, setMenuTop] = useState(135)
  const [activeCategory, setActiveCategory] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isHoverDropdownOpen, setIsHoverDropdownOpen] = useState(false)
  const [cartTimeout, setCartTimeout] = useState(null)
  const [menuStack, setMenuStack] = useState([{ title: "Menu", items: mobileMenuData }])

  // Scroll hadisəsini izləmək (Header-i daraltmaq üçün)
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 40
      setIsScrolled(scrolled)
      setMenuTop(scrolled ? 65 : 150 - window.scrollY)
    }
    
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Yuxarıdakı karusel tipli yazıların dövr etməsi
  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false)
      setTimeout(() => {
        setPromoIndex((prev) => (prev + 1) % promoMessages.length)
        setFade(true)
      }, 400)
    }, 4000)
    
    return () => clearInterval(interval)
  }, [])

  // Menyu açıq olanda arxa tərəfin scroll olmasını bağlayırıq
  useScrollLock(Basketopen)
  useScrollLock(isMobileMenuOpen)

  // Ölkə dəyişəndə temporary (müvəqqəti) state-i də yeniləyirik
  useEffect(() => {
    if (selectedCountry) {
      setTempRegionName(selectedCountry.name)
    }
  }, [selectedCountry])

  // Məhsulun şəklini təyin etmək (üstünlük: seçilmiş rəng -> əsas şəkil -> köhnə struktur)
  const getItemImage = (item) => {
    if (item.selectedShade?.galleryImages?.[0]) return item.selectedShade.galleryImages[0]
    if (item.images?.main) return item.images.main
    return item.image || ""
  }

  // Məhsulun alt başlığını (rəng, ölçü və s.) tapmaq
  const getItemShade = (item) => {
    return item.selectedShade?.name || item.shade || item.subtitle || item.subTitle || "Standard Size"
  }

  // Səbətin ümumi məbləğini hesablamaq
  const totalPrice = basket.reduce((total, item) => {
    const currentPrice = Number(item.discountPrice || item.price || 0)
    return total + currentPrice * item.quantity
  }, 0)

  // Axtarış düyməsinə klik funksiyası (Gözəl və professional React tərzi)
  const handleSearchClick = () => {
    if (location.pathname === "/search") {
      navigate("/home")
    } else {
      navigate("/search")
    }
  }

  // Səbət ikonunun üzərinə gələndə (Yalnız Desktop mühitində)
  const handleCartEnter = () => {
    if (window.innerWidth < 1024) return
    if (cartTimeout) clearTimeout(cartTimeout)
    setIsHoverDropdownOpen(true)
  }

  // Səbət ikonundan çıxanda (İstifadəçi rahat keçsin deyə biraz gecikmə qoyuruq)
  const handleCartLeave = () => {
    const timeout = setTimeout(() => {
      setIsHoverDropdownOpen(false)
    }, 400)
    setCartTimeout(timeout)
  }

  const handleMenuEnter = (category) => {
    setActiveCategory(category)
    setIsOpen(true)
  }

  const toggleMobileMenu = () => {
    if (!isMobileMenuOpen) {
      setMenuStack([{ title: "Menu", items: mobileMenuData }])
    }
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const handleMobileItemClick = (item) => {
    if (item.children || item.isShipping) {
      setMenuStack([...menuStack, { ...item, items: item.children || [] }])
    } else {
      setIsMobileMenuOpen(false)
    }
  }

  const handleGoBackMenu = () => {
    if (menuStack.length > 1) {
      setMenuStack(menuStack.slice(0, -1))
    }
  }

  const renderCartDropdownContent = () => (
    <div className="bg-white p-6 shadow-lg w-[400px] border border-[#eae6e6] pointer-events-auto">
      <div className="flex items-center justify-between mb-1 font-bold text-base text-[#340c0c]">
        <h3 className="uppercase">Your Bag</h3>
        <p>{formatPrice(totalPrice, selectedCountry)}</p>
      </div>

      <div className="flex items-center justify-between pb-2 mb-2 text-xs text-[#856d6d] uppercase    ">
        <span>{basket.length} items</span>
        <span>EXCL. delivery</span>
      </div>

      <div className="border-b border-[#eae6e6]" />

      {basket.length === 0 ? (
        <div className="py-8 text-center">
          <p className="text-sm text-[#340c0c]">There Are No Items In Your Bag</p>
        </div>
      ) : (
        <>
          <div className="max-h-80 overflow-y-auto py-2 pr-2 custom-scrollbar">
            {basket.map((item, idx) => (
              <div key={idx} className="flex gap-4 py-4 border-b border-[#eae6e6] last:border-0">
                <div className="w-[60px] h-[60px] shrink-0 bg-[#f5f5f5]">
                  <img src={getItemImage(item)} alt={item.title} className="w-full h-full object-cover" />
                </div>

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-[#340c0c] uppercase line-clamp-2 hover:underline cursor-pointer">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-[#856d6d] uppercase mt-1 line-clamp-1">
                      {getItemShade(item)}
                    </p>
                  </div>

                  <p className="text-[11px] text-[#340c0c] font-bold uppercase     text-right mt-2">
                    QTY: {item.quantity}{" "}
                    {String(item.price).toUpperCase() === "FREE" ? (
                      <>
                        <span className="line-through text-[#856d6d] mr-1">FREE</span>
                        FREE
                      </>
                    ) : item.discountPrice ? (
                      <>
                        <span className="line-through text-[#856d6d] mr-1">
                          {formatPrice(item.price, selectedCountry)}
                        </span>
                        <span className="text-[#a06464]">
                          {formatPrice(item.discountPrice, selectedCountry)}
                        </span>
                      </>
                    ) : (
                      formatPrice(item.price, selectedCountry)
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#eae6e6]">
            <Link
              to="/basket"
              className="block w-full bg-[#220B13] hover:bg-[#340c0c] text-white py-3 text-sm font-bold uppercase   text-center    "
            >
              VIEW BAG & CHECKOUT
            </Link>
          </div>
        </>
      )}
    </div>
  )

  const renderMegaMenuContent = (title) => {
    const menuItem = menuData.find((d) => d.title === title)
    if (!menuItem?.subMenu && !menuItem?.products) return null

    return (
      <div className="w-[58.9375rem] mx-auto py-6 px-4 text-left">
        <div className="flex justify-between     ">
          <div className={`flex gap-16 shrink-0 ${menuItem.products ? "w-[30%]" : "w-full"}`}>
            {menuItem.subMenu?.map((col, i) => (
              <div key={i} className="flex flex-col">
                <h4 className="font-helveticaN font-bold text-sm mb-6 text-[#340c0c] uppercase    ">
                  {col.title}
                </h4>
                <ul className="flex flex-col gap-4 text-sm text-[#555]">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <Link to={link.url} className="hover:underline underline-offset-4 decoration-[#340c0c] transition-all inline-block">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {menuItem.products && (
            <div className="flex-grow border-l border-[#eae6e6] pl-10">
              <div className="grid grid-cols-4 gap-6">
                {menuItem.products.map((prod, i) => (
                  <Link key={i} to={prod.url || "/home"} className="flex flex-col text-center group/product">
                    <div className="w-full aspect-square mb-4 overflow-hidden relative flex items-center justify-center">
                      {prod.badge && (
                        <span className="absolute top-0 left-0 bg-[#340c0c] text-white text-[10px] font-bold px-2 py-1 uppercase   z-10">
                          {prod.badge}
                        </span>
                      )}
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-[85%] h-[85%] object-contain group-hover/product:opacity-70     duration-300"
                      />
                    </div>
                    <h4 className="text-xs font-bold text-[#340c0c] uppercase     group-hover/product:underline underline-offset-2 line-clamp-2 px-2">
                      {prod.name}
                    </h4>
                    <p className="text-[11px] text-[#856d6d] uppercase mt-1.5    ">
                      {prod.subtitle}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <header className="sticky top-0 left-0 w-full text-[#340c0c] z-[150] bg-white">
      {/* Top Banner */}
      <div className="bg-[#fde8e0] p-2">
        <div className="container max-w-[1470px] mx-auto">
          <div className="flex items-center justify-center text-center h-12 md:h-fit text-xs md:text-sm ">
            <Link to="/home" className={`    duration-400 ease-in-out ${fade ? "opacity-100" : "opacity-0"}`}>
              {promoMessages[promoIndex]}
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className={`relative bg-white/90 px-4 z-[110] transition-all duration-500 ${isScrolled ? "shadow-[0_2px_20px_rgba(52,12,12,0.06)]" : ""}`}>
        <div className="absolute inset-0 backdrop-blur-xl pointer-events-none -z-10" />
        <div className="container max-w-[1470px] py-1 min-[1029px]:pt-4 min-[1029px]:pb-2 mx-auto">
          
          {/* Desktop Layout */}
          <div className="hidden min-[1029px]:flex h-[10vh] justify-between items-center ">
            <div className="text-[12px] gap-4 z-[160]">
              <div className="relative group">
                <p
                  className="cursor-pointer     flex items-center gap-1"
                  onClick={() => {
                    setTempRegionName(selectedCountry?.name || "")
                    setIsCurrencyOpen(!isCurrencyOpen)
                  }}
                >
                  {selectedCountry?.name} | EN | {selectedCountry?.currency}
                </p>

                {isCurrencyOpen && (
                  <div className="absolute top-[100%] left-0 mt-4 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-[#eae6e6] w-[260px] p-5 text-left before:content-[''] before:absolute before:-top-2 before:left-8 before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-[#eae6e6] before:transform before:rotate-45">
                    <label className="block text-[11px] font-sans font-bold text-[#340c0c] mb-2    ">
                      Shipping to*
                    </label>
                    <div className="relative">
                      <select
                        value={tempRegionName}
                        onChange={(e) => setTempRegionName(e.target.value)}
                        className="w-full border border-[#d6cece] p-2.5 text-[13px] font-sans text-[#340c0c] bg-white appearance-none outline-none cursor-pointer focus:border-[#340c0c]     rounded-none"
                      >
                        <option value="" disabled>Please Select</option>
                        {Object.values(countries).flat().map((c) => (
                          <option key={c.name} value={c.name}>
                            {c.name} ({c.currency})
                          </option>
                        ))}
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown size={16} color="#340c0c" />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (tempRegionName) {
                          const allCountries = Object.values(countries).flat()
                          const found = allCountries.find((c) => c.name === tempRegionName)
                          if (found) {
                            setSelectedCountry(found)
                            setIsCurrencyOpen(false)
                          }
                        }
                      }}
                      className="w-full mt-5 bg-[#340c0c] text-white hover:bg-[#1e0505]     font-bold py-3 text-[12px] tracking-[0.15em] uppercase"
                    >
                      CONTINUE
                    </button>
                  </div>
                )}
              </div>
            </div>

            <Link to="/home">
              <img src="/assets/img/logo.svg" className="w-[230px] m-auto" alt="Logo" />
            </Link>

            <div className="flex gap-4 items-center">
              <User size={25} strokeWidth={1} color="#340c0c" />
              <Link to="/wishlist" className="relative">
                <Heart size={25} strokeWidth={1} color="#340c0c" />
                {wishlist.length > 0 && (
                  <div className={`absolute -top-1 -right-2 bg-[#340c0c] text-white h-fit text-[10px] font-bold ${wishlist.length >= 10 ? "px-1" : "px-[5px]"} py-[1px] rounded-full      flex items-center justify-center min-w-[16px] min-h-[16px]`}>
                    {wishlist.length}
                  </div>
                )}
              </Link>
              <button
                onClick={handleSearchClick}
                aria-label="Open search"
                className="hover:opacity-70     cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
              >
                <PiMagnifyingGlass size={25} />
              </button>
              <div
                className="relative font-helveticaN flex items-center gap-2 cursor-pointer"
                onMouseEnter={handleCartEnter}
                onMouseLeave={handleCartLeave}
              >
                <div className="flex items-center gap-2">
                  <Link to="/basket">
                    <img src="/assets/img/BasketIcon.svg" className="w-[35px] relative hover:scale-105 transition-transform" alt="Basket" />
                  </Link>
                  <div className={`bg-[#340c0c] text-white h-fit -mt-1.5 -ml-5 ${basket.length >= 10 ? "px-1.5 py-0.5" : "px-2"} rounded-full border`}>
                    {basket.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className="flex min-[1029px]:hidden py-3 justify-between items-center ">
            <div className="flex items-center gap-4 flex-1">
              <Menu size={26} strokeWidth={1.5} onClick={toggleMobileMenu} color="#340c0c" className="cursor-pointer" />
              <Link to="/wishlist" className="relative flex items-center" aria-label="Wishlist">
                <Heart size={24} strokeWidth={1.5} color="#340c0c" />
                {wishlist.length > 0 && (
                  <div className={`absolute -top-1 -right-2 bg-[#340c0c] text-white h-fit text-[10px] font-bold ${wishlist.length >= 10 ? "px-1" : "px-[5px]"} py-[1px] rounded-full      flex items-center justify-center min-w-[16px] min-h-[16px]`}>
                    {wishlist.length}
                  </div>
                )}
              </Link>

              {isMobileMenuOpen && (
                <>
                  <div className="fixed inset-0 z-[490] min-[1029px]:hidden bg-black/20" onClick={toggleMobileMenu} />
                  <div className="fixed left-0 top-0 bottom-0 h-screen w-[90%] bg-white shadow-2xl flex flex-col z-[9999] transform transition-transform duration-400 ease-in-out translate-x-0">
                    <div className="flex-1 overflow-x-hidden overflow-y-auto relative">
                      <div
                        className="flex h-full transition-transform duration-300 ease-in-out"
                        style={{ transform: `translateX(-${(menuStack.length - 1) * 100}%)`, width: "100%" }}
                      >
                        {menuStack.map((screen, level) => (
                          <div key={level} className="w-full h-full shrink-0 bg-white flex flex-col">
                            {level === 0 && (
                              <div className="sticky top-0 flex justify-between items-center px-4 py-4 bg-white z-20 shrink-0">
                                <div className="w-8 h-8" />
                                <X onClick={toggleMobileMenu} className="cursor-pointer text-[#340c0c] shrink-0" size={28} strokeWidth={1} />
                              </div>
                            )}
                            {level === 0 && (
                              <div className="bg-[#6e1e2d] px-4 py-3 flex justify-between items-center text-white shrink-0">
                                <div className="text-[12px] font-sans">
                                  <Link to="/login" onClick={toggleMobileMenu} className="font-bold hover:underline">Log in</Link>
                                  <span className="mx-1">|</span>
                                  <Link to="/register" onClick={toggleMobileMenu} className="hover:underline">Create account</Link>
                                </div>
                                <div className="text-[12px] flex items-center gap-1 cursor-pointer">
                                  English <ChevronDown size={14} />
                                </div>
                              </div>
                            )}
                            {level > 0 && (
                              <div className="sticky top-0 flex items-center justify-between px-4 py-4 border-b border-[#eae6e6] bg-white z-20 shrink-0">
                                <div className="flex items-center gap-2 cursor-pointer" onClick={handleGoBackMenu}>
                                  <ChevronLeft size={20} className="text-[#340c0c]" strokeWidth={1.5} />
                                  <span className="font-sans font-medium text-[16px] text-[#340c0c]">{screen.title}</span>
                                </div>
                                <X onClick={toggleMobileMenu} className="cursor-pointer text-[#340c0c]" size={28} strokeWidth={1} />
                              </div>
                            )}
                            {screen.imageBanner && level > 0 && (
                              <div className="px-6 py-4 shrink-0">
                                <img src={screen.imageBanner} alt={screen.title} className="w-full h-auto object-cover rounded-sm shadow-sm" />
                              </div>
                            )}
                            <div className="flex-1 overflow-y-auto overflow-x-hidden pb-8 custom-scrollbar">
                              <div className="flex-1">
                                {screen.items?.map((item, idx) => {
                                  const hasChildren = item.children?.length > 0
                                  return (
                                    <div key={idx} className={level > 0 ? "border-b border-[#eae6e6] mx-4" : "border-b border-[#eae6e6]"}>
                                      <div
                                        className={`flex justify-between items-center py-4 cursor-pointer bg-white     ${level === 0 ? "px-4 hover:bg-[#fafafa]" : "hover:opacity-70"}`}
                                        onClick={() => hasChildren || item.isShipping ? handleMobileItemClick(item) : toggleMobileMenu()}
                                      >
                                        <div className="flex items-center gap-4 flex-1 min-w-0 pr-2">
                                          {level === 0 && item.image && (
                                            <img src={item.image} className="w-14 h-14 object-cover shrink-0" alt="" />
                                          )}
                                          <div className="flex-1 min-w-0">
                                            {!hasChildren ? (
                                              <Link
                                                to={item.link || "/home"}
                                                className={`block break-words   ${level === 0 ? "uppercase font-helveticaN text-[14px]" : "font-sans text-[14px]"}     ${item.highlight ? "text-[#6e1e2d] font-bold" : "text-[#340c0c]"} ${level > 0 && !item.highlight ? "text-[#555]" : ""}`}
                                              >
                                                {item.title || item.name}
                                                {item.sparkles && <span className="ml-1 text-[#82293b] text-[16px]">✦</span>}
                                              </Link>
                                            ) : (
                                              <span className={`block break-words   ${level === 0 ? "uppercase font-helveticaN text-[14px]" : "font-sans text-[14px]"}     ${item.highlight ? "text-[#6e1e2d] font-bold" : "text-[#340c0c]"} ${level > 0 && !item.highlight ? "text-[#555]" : ""}`}>
                                                {item.title || item.name}
                                                {item.sparkles && <span className="ml-1 text-[#82293b] text-[16px]">✦ ✦</span>}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                        {hasChildren && <ChevronRight size={18} className="text-[#340c0c] shrink-0" strokeWidth={1.5} />}
                                      </div>
                                    </div>
                                  )
                                })}
                              </div>

                              {level === 0 && (
                                <>
                                  <div className="bg-[#fcf5f5] px-4 py-5 flex flex-col gap-4">
                                    <div className="flex items-center gap-3">
                                      <img
                                        src="https://media.charlottetilbury.com/image/upload/v1611849174/avatar-charlotte-tilbury.png"
                                        alt="Avatar"
                                        className="w-12 h-12 rounded-full object-cover shrink-0 border border-[#eae6e6]"
                                        onError={(e) => { e.target.style.display = "none" }}
                                      />
                                      <p className="uppercase font-helveticaN font-bold text-[13px] text-[#340c0c]       text-left flex-1">
                                        DARLING, UNLOCK YOUR PERFECT MAKEUP MATCHES WITH ME!
                                      </p>
                                    </div>
                                    <button className="w-full bg-[#340c0c] text-white py-3 uppercase text-[12px] font-bold   hover:bg-[#1a080a]     border border-[#340c0c]">
                                      FIND YOUR PERFECT MATCHES
                                    </button>
                                  </div>

                                  <div className="px-4 py-6 border-t border-[#eae6e6] mt-4">
                                    <p className="uppercase font-helveticaN font-bold text-[13px] text-[#340c0c] mb-4">SHIPPING TO:</p>
                                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleMobileItemClick({ title: "REGION & CURRENCY", isShipping: true })}>
                                      <Globe size={22} className="text-[#340c0c]" strokeWidth={1.5} />
                                      <span className="font-sans text-[14px] text-[#555]">{selectedCountry?.name} ({selectedCountry?.currency})</span>
                                    </div>
                                  </div>
                                </>
                              )}

                              {screen.isShipping && (
                                <div className="px-6 py-5">
                                  <h4 className="font-bold text-[13px] mb-4 uppercase text-[#340c0c]">Select Region</h4>
                                  <ul className="flex flex-col gap-4">
                                    {Object.values(countries).flat().map((c) => {
                                      const isSelected = selectedCountry?.name === c.name
                                      return (
                                        <li
                                          key={c.name}
                                          onClick={() => {
                                            setSelectedCountry(c)
                                            toggleMobileMenu()
                                          }}
                                          className={`text-[14px] font-sans text-[#340c0c] cursor-pointer hover:underline ${isSelected ? "font-bold underline" : ""}`}
                                        >
                                          {c.name} ({c.currency})
                                        </li>
                                      )
                                    })}
                                  </ul>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-center flex-1">
              <Link to="/home">
                <img src="/assets/img/logo.svg" className="w-[140px] m-auto" alt="Logo" />
              </Link>
            </div>

            <div className="flex items-center justify-end gap-4 flex-1">
              <User size={24} strokeWidth={1.5} color="#340c0c" />
              <Link to="/basket" className="flex items-center relative cursor-pointer">
                <img src="/assets/img/BasketIcon.svg" className="w-[24px]" alt="Basket" />
                <div className={`absolute -top-1 -right-2 bg-[#340c0c] text-white h-fit text-[10px] font-bold ${basket.length >= 10 ? "px-1" : "px-[5px]"} py-[1px] rounded-full      flex items-center justify-center min-w-[16px] min-h-[16px]`}>
                  {basket.length}
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Categories Menu */}
        <div className="container max-w-[1300px] mx-auto">
          <div className="hidden min-[1029px]:flex justify-center items-center ">
            <ul className="font-helveticaN flex flex-wrap font-black justify-center gap-4 lg:gap-7 uppercase">
              <li className="text-[#a06464] border-b border-transparent pb-2 hover:border-b-[#a06464]">
                <Link to="/home">Up to a magical 20% off</Link>
              </li>
              {["NEW IN", "MAKEUP", "SKINCARE", "BEST SELLERS", "GIFTS", "FRAGRANCE", "SHADE MATCH TOOLS", "SERVICES"].map((cat) => (
                <li
                  key={cat}
                  className={`border-b pb-2 cursor-pointer     ${activeCategory === cat && isOpen ? "border-[#340c0c]" : "border-transparent hover:border-[#340c0c]"}`}
                  onMouseEnter={() => handleMenuEnter(cat)}
                  onMouseLeave={() => setIsOpen(false)}
                >
                  <Link to="/home">{cat.charAt(0) + cat.slice(1).toLowerCase()}</Link>
                </li>
              ))}
            </ul>
          </div>
          {location.pathname !== "/search" && (
            <div className="min-[1029px]:hidden flex justify-center pb-4 pt-1 items-center px-2">
              <button
                onClick={handleSearchClick}
                className="border border-[#a08a8a] flex items-center rounded-full w-full p-2 h-[44px] bg-white cursor-pointer hover:border-[#856d6d]    "
                aria-label="Open search"
              >
                <PiMagnifyingGlass className="mx-2 text-[#856d6d]" size={20} />
                <span className="font-sans text-[14px] text-[#856d6d] text-left">Search product, shade, colour</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Sticky Slide-down Header on Scroll */}
      <div
        className="fixed top-0 left-0 w-full bg-white z-[200] shadow-[0_2px_20px_rgba(52,12,12,0.08)] transition-transform duration-300 ease-in-out hidden min-[1029px]:block"
        style={{ transform: isScrolled ? "translateY(0)" : "translateY(-110%)" }}
      >
        <div className="bg-[#340c0c] h-[1rem] flex items-center justify-center"></div>
        <div className="hidden min-[1029px]:block">
          <div className="container max-w-[100rem] mx-auto h-full px-4 md:px-8">
            <div className="grid grid-cols-[1fr_auto_1fr] h-full items-center relative">
              <div className="flex items-center gap-[32px] justify-end font-helveticaN font-bold uppercase h-full pr-[16px]">
                <Link to="/home" className="text-[#a06464] whitespace-nowrap     flex items-center h-full">
                  PILLOW TALK COLLECTION ✦
                </Link>
                {["NEW IN", "MAKEUP", "SKINCARE"].map((cat) => (
                  <div key={cat} className="h-full flex items-center cursor-pointer" onMouseEnter={() => handleMenuEnter(cat)} onMouseLeave={() => setIsOpen(false)}>
                    <Link to="/home" className={`whitespace-nowrap     ${activeCategory === cat && isOpen ? "border-b border-[#a06464]" : ""}`}>
                      {cat}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center h-full py-1 z-10">
                <Link to="/home" className="flex items-center justify-center h-full">
                  <img src="/assets/img/logo.png" className="h-[42px] object-contain" alt="Logo" />
                </Link>
              </div>

              <div className="flex items-center justify-between font-helveticaN font-bold uppercase h-full pl-[16px]">
                <div className="flex items-center gap-[32px] h-full">
                  {["BEST SELLERS", "GIFTS"].map((cat) => (
                    <div key={cat} className="h-full flex items-center cursor-pointer" onMouseEnter={() => handleMenuEnter(cat)} onMouseLeave={() => setIsOpen(false)}>
                      <Link to="/home" className={`whitespace-nowrap     ${activeCategory === cat && isOpen ? "border-b border-[#a06464]" : ""}`}>
                        {cat}
                      </Link>
                    </div>
                  ))}
                  <div className="h-full items-center hidden lg:flex cursor-pointer" onMouseEnter={() => handleMenuEnter("FRAGRANCE")} onMouseLeave={() => setIsOpen(false)}>
                    <Link to="/home" className={`whitespace-nowrap     ${activeCategory === "FRAGRANCE" && isOpen ? "border-b border-[#a06464]" : ""}`}>
                      FRAGRANCE
                    </Link>
                  </div>
                  {["SHADE MATCH TOOLS", "SERVICES"].map((cat) => (
                    <div key={cat} className="h-full items-center hidden xl:flex cursor-pointer" onMouseEnter={() => handleMenuEnter(cat)} onMouseLeave={() => setIsOpen(false)}>
                      <Link to="/home" className={`whitespace-nowrap     ${activeCategory === cat && isOpen ? "border-b border-[#a06464]" : ""}`}>
                        {cat}
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="flex items-center ml-auto pl-4 gap-4">
                  <Link to="/wishlist" className="relative hover:opacity-75    ">
                    <Heart size={22} strokeWidth={1} color="#340c0c" />
                    {wishlist.length > 0 && (
                      <div className={`absolute -top-1 -right-2 bg-[#340c0c] text-white h-fit text-[10px] font-bold ${wishlist.length >= 10 ? "px-1" : "px-[5px]"} py-[1px] rounded-full      flex items-center justify-center min-w-[16px] min-h-[16px]`}>
                        {wishlist.length}
                      </div>
                    )}
                  </Link>
                  <div className="relative font-helveticaN flex items-center cursor-pointer" onMouseEnter={handleCartEnter} onMouseLeave={handleCartLeave}>
                    <Link to="/basket" className="relative flex items-center">
                      <img src="/assets/img/BasketIcon.svg" className="w-[22px] hover:scale-105 transition-transform" alt="Bag" />
                      <div className={`absolute -top-1 -right-2 bg-[#340c0c] text-white h-fit text-[10px] font-bold ${basket.length >= 10 ? "px-1" : "px-[5px]"} py-[1px] rounded-full      flex items-center justify-center min-w-[16px] min-h-[16px]`}>
                        {basket.length}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mega Menu Dropdown */}
      <div
        className={`fixed left-0 w-full bg-white shadow-[0_15px_30px_rgba(0,0,0,0.08)] border-t border-[#eae6e6]     duration-300 ease-in-out z-[105] ${isOpen ? "opacity-100 visible pointer-events-auto" : "opacity-0 invisible pointer-events-none"}`}
        style={{ top: menuTop + "px" }}
        onMouseEnter={() => activeCategory && handleMenuEnter(activeCategory)}
        onMouseLeave={() => setIsOpen(false)}
      >
        {activeCategory && renderMegaMenuContent(activeCategory)}
      </div>

      {/* Cart Hover Dropdown */}
      <div
        className={`fixed left-0 w-full transition-all duration-400 ease-out z-[105] pointer-events-none ${isHoverDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"}`}
        style={{ top: menuTop + "px" }}
      >
        <div className="container max-w-[1470px] mx-auto relative h-full px-4 md:px-8">
          <div
            className="absolute right-4 md:right-8 top-0 pt-4 pointer-events-auto"
            onMouseEnter={handleCartEnter}
            onMouseLeave={handleCartLeave}
          >
            {renderCartDropdownContent()}
          </div>
        </div>
      </div>

      <CartDrawer />
    </header>
  )
}