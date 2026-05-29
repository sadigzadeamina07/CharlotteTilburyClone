import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination } from "swiper/modules"
import { ChevronDown, Globe, X } from "lucide-react"
import { BiLogoFacebookSquare } from "react-icons/bi"
import { FaInstagram, FaTiktok, FaYoutube, FaTwitch } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"
import "swiper/css"
import "swiper/css/pagination"
import { useProduct } from "../Context/DataContext"

function Footer() {
  const location = useLocation()
  const {
    selectedCountry,
    setSelectedCountry,
    countries,
    footerLinks,
    topCards,
  } = useProduct()

  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [openMenu, setOpenMenu] = useState("")
  const [countryOpen, setCountryOpen] = useState(false)
  const [desktopCountryOpen, setDesktopCountryOpen] = useState(false)
  const [tempDesktopCountryName, setTempDesktopCountryName] = useState(
    selectedCountry?.name || "",
  )

  useEffect(() => {
    if (selectedCountry) setTempDesktopCountryName(selectedCountry.name)
  }, [selectedCountry])

  if (location.pathname === "/search") return null
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!email) return setError("Please enter your email address.")
    if (!email.includes("@") || !email.includes("."))
      return setError(
        "Your email address must have an @ and a valid domain (i.e @domain.com)",
      )
    setError("")
    setEmail("")
  }
  const allCountries = Object.values(countries).flat()

  return (
    <footer className="w-full overflow-hidden text-[#340c0c] bg-[#faf8f8] lg:bg-white">
      {/* Üst kartlar */}
      <div className="bg-[#f5f3f3]">
        <div className="mx-auto w-full max-w-[1300px] overflow-hidden py-6">
          {/* Desktop grid */}
          <div className="hidden lg:grid lg:grid-cols-6 gap-[30px] justify-items-center">
            {topCards.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center mb-[10px]">
                  <img
                    src={item.img}
                    alt=""
                    className="h-[48px] object-cover"
                  />
                </div>
                <h3 className="font-bold text-[14px]   mb-1 text-[#333333]">
                  {item.title}
                </h3>
                <p className="text-[13px]   text-[#333333]">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* Mobile swiper */}
          <div className="lg:hidden">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              modules={[Pagination]}
              pagination={{ clickable: true, dynamicBullets: true }}
              breakpoints={{
                480: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 30 },
              }}
              className="pb-12 [&_.swiper-pagination-bullet-active]:!bg-[#333333]"
            >
              {topCards.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <div className="flex flex-col items-center text-center px-4">
                    <div className="flex h-[48px] items-center justify-center mb-[10px]">
                      <img
                        src={item.img}
                        alt=""
                        className="h-[48px] object-cover"
                      />
                    </div>
                    <h3 className="font-bold text-[14px]   mb-1 text-[#333333]">
                      {item.title}
                    </h3>
                    <p className="text-[13px]   text-[#333333]">
                      {item.text}
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* Əsas footer bloku */}
      <div className="bg-transparent lg:bg-white">
        <div className="mx-auto w-full max-w-[1400px] px-[20px] lg:py-[50px] pt-10 pb-4 lg:pb-10">
          <div className="flex flex-col lg:flex-row-reverse lg:justify-between">
            {/* Sağ tərəf - Email qeydiyyatı */}
            <div className="w-full lg:w-[35%] lg:pl-10 mb-8 lg:mb-0 flex flex-col text-left">
              <h3 className="font-helveticaN text-[14px] font-bold uppercase text-[#333333]">
                Sign up to receive emails
              </h3>
              <p className="mb-6 mt-3 text-[13px]       text-[#333333]">
                Be the first to know about products, offers and tips
              </p>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col w-full text-left"
              >
                <span className="block mb-2 text-[13px] text-[#333333] font-sans font-bold">
                  Email Address
                </span>
                <div className="flex flex-row gap-2 w-full">
                  <input
                    type="email"
                    value={email}
                    placeholder="Email Address"
                    onChange={(e) => {
                      setEmail(e.target.value)
                      setError("")
                    }}
                    className={`h-[45px] flex-1 border bg-white px-3 outline-none text-[13px] rounded-none ${error ? "border-red-500" : "border-[#ccc]"}`}
                  />
                  <button
                    type="submit"
                    className="h-[45px] w-[110px] md:w-[120px] bg-[#d3d3d3] hover:bg-[#c0c0c0]     text-white font-bold uppercase text-[12px] md:text-[14px] flex items-center justify-center shrink-0 rounded-none border-none"
                  >
                    SIGN UP
                  </button>
                </div>
                {error && (
                  <p className="mt-2 text-[12px] text-red-500 text-left">
                    {error}
                  </p>
                )}
              </form>

              <p className="mt-4 text-[11px]     text-left text-[#555]">
                *T&Cs apply. By submitting your email address, you agree to
                receive marketing information about Charlotte Tilbury Beauty
                Limited's products or services by email and social media
                platforms. For more information about how we use your personal
                information, please see our{" "}
                <a href="#" className="underline">
                  Privacy Policy
                </a>
                . You can unsubscribe at any time by contacting us.
              </p>

              {/* Sosial media ikonları */}
              <div className="mt-8 flex items-center justify-start gap-[20px] text-[20px] text-[#333333] lg:mt-auto w-full">
                <BiLogoFacebookSquare className="cursor-pointer hover:opacity-70     " />
                <FaInstagram className="cursor-pointer hover:opacity-70     " />
                <FaTiktok className="cursor-pointer hover:opacity-70     " />
                <FaXTwitter className="cursor-pointer hover:opacity-70     " />
                <FaYoutube className="cursor-pointer hover:opacity-70     " />
                <FaTwitch className="cursor-pointer hover:opacity-70     " />
              </div>

              {/* Mobile - Shipping To düyməsi */}
              <div className="mt-10 lg:hidden text-left mb-2 block w-full border-t border-[#e5e5e5] pt-6">
                <h3 className="font-bold uppercase text-[14px] text-[#333333] mb-3">
                  SHIPPING TO:
                </h3>
                <button
                  onClick={() => setCountryOpen(true)}
                  className="flex items-center hover:underline text-[#333333] font-sans"
                >
                  <Globe size={18} strokeWidth={1.5} className="mr-2" />
                  <span className="text-[13px] font-medium">
                    {selectedCountry.name} ({selectedCountry.currency})
                  </span>
                </button>
              </div>
            </div>

            {/* Sol tərəf - Footer linklər */}
            <div className="w-full lg:w-[65%] lg:pr-10 lg:border-r lg:border-[#e5e5e5] flex flex-col lg:grid lg:grid-cols-3 lg:gap-[30px] lg:pt-0">
              {Object.entries(footerLinks).map(([title, items], index) => {
                const isActive = openMenu === title
                const isLast = index === Object.entries(footerLinks).length - 1

                return (
                  <div
                    key={title}
                    className={`border-t lg:border-0 border-[#e5e5e5] w-full ${isLast ? "border-b lg:border-b-0" : ""}`}
                  >
                    {/* Mobile accordion başlığı */}
                    <button
                      onClick={() => setOpenMenu(isActive ? "" : title)}
                      className="flex w-full items-center justify-between py-4 lg:hidden border-none bg-transparent"
                    >
                      <h3 className="font-sans font-bold uppercase text-[13px] tracking-wide text-[#333333]">
                        {title}
                      </h3>
                      <ChevronDown
                        size={18}
                        className={`text-[#333333] transition-transform duration-300 ${isActive ? "rotate-180" : ""}`}
                      />
                    </button>

                    {/* Desktop başlığı */}
                    <h3 className="hidden lg:block font-sans font-bold uppercase text-[13px] tracking-wide text-[#333333] mb-4">
                      {title}
                    </h3>

                    {/* Linklər siyahısı */}
                    <div
                      className={`overflow-hidden transition-all duration-300 lg:max-h-full lg:overflow-visible ${isActive ? "max-h-[500px] pb-4" : "max-h-0"}`}
                    >
                      <ul className="flex flex-col gap-[12px] lg:gap-[16px]">
                        {items.map((item) => (
                          <li key={item}>
                            <Link
                              to="/home"
                              className="text-[13px] flex items-center"
                            >
                              {item}
                            </Link>
                          </li>
                        ))}
                      </ul>

                      {/* Desktop - Shipping To (yalnız About bölməsinin altında) */}
                      {title === "About" && (
                        <div className="hidden lg:block mt-[60px] relative">
                          <h3 className="font-bold uppercase text-[14px] text-[#333333] mb-4">
                            SHIPPING TO
                          </h3>
                          <button
                            onClick={() => {
                              setTempDesktopCountryName(selectedCountry.name)
                              setDesktopCountryOpen(!desktopCountryOpen)
                            }}
                            className="flex items-center gap-1 hover:underline text-[#333333]"
                          >
                            <span className="text-[13px]">
                              {selectedCountry.name} | EN |{" "}
                              {selectedCountry.currency}
                            </span>
                          </button>

                          {/* Desktop Shipping popover — same design as Header currency card */}
                          {desktopCountryOpen && (
                            <div className="absolute top-[calc(100%+15px)] left-0 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-[#eae6e6] w-[260px] p-5 z-[100] before:content-[''] before:absolute before:-top-2 before:left-8 before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-[#eae6e6] before:transform before:rotate-45">
                              <div className="relative z-10">
                                <label className="block text-[11px] font-sans font-bold text-[#340c0c] mb-2 tracking-wide">
                                  Shipping to*
                                </label>
                                <div className="relative">
                                  <select
                                    value={tempDesktopCountryName}
                                    onChange={(e) =>
                                      setTempDesktopCountryName(e.target.value)
                                    }
                                    className="w-full border border-[#d6cece] p-2.5 text-[13px] font-sans text-[#340c0c] bg-white appearance-none outline-none cursor-pointer focus:border-[#340c0c]     rounded-none"
                                  >
                                    <option value="" disabled>
                                      Please Select
                                    </option>
                                    {allCountries.map((c) => (
                                      <option key={c.name} value={c.name}>
                                        {c.name} ({c.currency})
                                      </option>
                                    ))}
                                  </select>
                                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <ChevronDown size={16} color="#340c0c" />
                                  </div>
                                </div>
                              </div>
                              <button
                                disabled={!tempDesktopCountryName}
                                onClick={() => {
                                  const found = allCountries.find(
                                    (c) => c.name === tempDesktopCountryName,
                                  )
                                  if (found) {
                                    setSelectedCountry(found)
                                    setDesktopCountryOpen(false)
                                  }
                                }}
                                className={`w-full mt-5 font-bold uppercase text-[12px] py-3 tracking-[0.15em]     rounded-none ${
                                  tempDesktopCountryName
                                    ? "bg-[#340c0c] hover:bg-[#1e0505] text-white cursor-pointer"
                                    : "bg-[#d3d3d3] text-white cursor-not-allowed"
                                }`}
                              >
                                CONTINUE
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile - Ölkə seçim drawer-i (backdrop) */}
      <div
        className={`fixed inset-0 bg-black/40 z-[9999]      duration-300 ${countryOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setCountryOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile - Ölkə seçim drawer-i (panel) */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-full sm:w-[400px] bg-white z-[10000] transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col ${countryOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-[#e5e5e5] px-6 py-6 shrink-0">
          <h2 className="font-sans font-bold uppercase text-[15px] tracking-wider text-[#333333]">
            Shipping To
          </h2>
          <button
            onClick={() => setCountryOpen(false)}
            className="p-2 hover:bg-gray-100    "
          >
            <X size={24} strokeWidth={1.5} className="text-[#333333]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto max-h-full">
          {Object.entries(countries).map(([region, list]) => (
            <div key={region} className="mb-2">
              <h3 className="px-6 py-3 text-[13px] font-sans font-bold uppercase tracking-wider text-[#333333] bg-[#faf8f8] sticky top-0 border-y border-[#f5f5f5] z-10">
                {region}
              </h3>
              <div className="flex flex-col">
                {list.map((country) => {
                  const isSelected = selectedCountry.name === country.name
                  return (
                    <button
                      key={country.name}
                      onClick={() => {
                        setSelectedCountry(country)
                        setCountryOpen(false)
                      }}
                      className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-[#faf8f8]     border-b border-[#f5f5f5] last:border-none"
                    >
                      <span className="font-sans text-[14px] text-[#555]">
                        {country.name} ({country.currency})
                      </span>
                      {isSelected && (
                        <span className="text-[18px] text-[#333333] font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer şəkilləri */}
      <img
        src="/assets/img/Footer/footer.webp"
        alt=""
        className="hidden w-full object-cover md:block"
      />
      <img
        src="/assets/img/Footer/footermobile.png"
        alt=""
        className="block w-full object-cover md:hidden"
      />

      {/* Alt copyright */}
      <div className="px-6 py-8 text-xs bg-white border-t border-[#e5e5e5]">
        <p className="text-center md:text-left text-[#555]">
          2013-2026 © Charlotte Tilbury Beauty Inc. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
