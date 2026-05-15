import { Heart, Menu, Search, User, X, ChevronDown, ChevronRight, ChevronLeft, Globe } from 'lucide-react';
import React, { useEffect, useState, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { PiMagnifyingGlass } from "react-icons/pi";
import { Link, useLocation, useNavigate } from 'react-router';
import { BasketProvider, useBasket } from '../Context/BasketContext';
import { useProduct } from '../Context/DataContext';
import { useWishlist } from '../Context/WishlistContext';
import { useUI } from '../Context/UIContext';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import useScrollLock from '../hooks/useScrollLock';
import CartDrawer from './Cart/CartDrawer';
import { MobileMenu } from './MobileMenu/MobileMenu';
import { NavProvider, useNav } from '../Context/NavContext';
const message = [
  "Create an account or log in to unlock 15% off + FREE ground shipping on your first order* with code DARLING15",
  "Unlock A Free Mini Skincare Duo When You Spend $90! T&Cs Apply.",
  'Up to 20% off Magical Savings!'
]

export const menuData = [
  {
    title: "PILLOW TALK COLLECTION ✦",
    link: "/home",
    highlight: true,
  },
  {
    title: "NEW IN",
    link: "/home",
    subMenu: [
      {
        title: "NEW IN",
        links: [
          { name: "Shop New In", url: "/home" },
          { name: "Pillow Talk Blush Balm Lip Tint", url: "/home" },
          { name: "Pillow Talk Beauty Soulmates Palette in Flawless Rosewood", url: "/home" },
          { name: "The Gift Of Pillow Talk Eyes & Lips", url: "/home" },
          { name: "NEW! Charlotte's Magic Cream", url: "/home" },
          { name: "Magic Love Frequency Body Cream", url: "/home" },
          { name: "Airbrush Flawless Blur Concealer", url: "/home" }
        ]
      }
    ],
    products: [
      { name: "PILLOW TALK BLUSH BALM LIP TINT", subtitle: "PILLOW TALK", badge: "NEW IN", image: "https://images.ctfassets.net/wlke2cbybljx/1bBBG2CbTFT5Bs23lRHE9h/70230b8eb57d1ec8592185b26bae92a4/PT_Blush_Balm_-_PT_-_Open.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "CHARLOTTE'S MAGIC CREAM", subtitle: "30 ML MOISTURISER", image: "https://images.ctfassets.net/wlke2cbybljx/1HZf99QHJsP7duxB7JZgCy/0984aa020ba7a0900a452b4fa72fd3d7/MC-30ml.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "PILLOW TALK BLUSH BALM LIP KIT", subtitle: "LIP KIT", image: "https://images.ctfassets.net/wlke2cbybljx/70lW64bmLCt06huj3wAysW/56200f4d2ef6386e30078b77656300d6/Lip_Kit_-_Bundle.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "AIRBRUSH FLAWLESS BLUR CONCEALER KIT", subtitle: "FACE KIT", image: "https://images.ctfassets.net/wlke2cbybljx/5Uons9BGIEEp6woKgm54fT/635e65c4fb143768379445a279b6a541/B9_-_Concealer___Complexion_Brush.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" }
    ]
  },
  {
    title: "MAKEUP",
    link: "/home",
    subMenu: [
      {
        title: "FACE",
        links: [
          { name: "Your Complexion Matches", url: "/home" },
          { name: "Shop All Face", url: "/home" },
          { name: "Foundation", url: "/home" },
          { name: "Primer", url: "/home" },
          { name: "Concealer And Colour Corrector", url: "/home" },
          { name: "Powder", url: "/home" },
          { name: "Hollywood Flawless Filter", url: "/home" },
          { name: "Setting Spray", url: "/home" },
          { name: "Face Palettes", url: "/home" },
          { name: "Face Kits", url: "/home" },
          { name: "Brushes And Makeup Bags", url: "/home" },
          { name: "Makeup Kits & Sets", url: "/home" }
        ]
      },
      {
        title: "CHEEK",
        links: [
          { name: "Shop All Cheek", url: "/home" },
          { name: "Contour", url: "/home" },
          { name: "Cream Bronzer", url: "/home" },
          { name: "Bronzer", url: "/home" },
          { name: "Beauty Light Wands", url: "/home" },
          { name: "Liquid Blush", url: "/home" },
          { name: "Blush", url: "/home" },
          { name: "Blush Shade Finder", url: "/home" },
          { name: "Highlighter", url: "/home" },
          { name: "Highlighter Shade Finder", url: "/home" },
          { name: "Cheek Kits", url: "/home" }
        ]
      },
      {
        title: "EYES",
        links: [
          { name: "Shop All Eyes", url: "/home" },
          { name: "Shop By Eye Colour", url: "/home" },
          { name: "Eyeshadow", url: "/home" },
          { name: "Mascara", url: "/home" },
          { name: "Eyeliner", url: "/home" },
          { name: "Eyebrow Makeup", url: "/home" },
          { name: "Brushes And Makeup Bags", url: "/home" },
          { name: "Eye Kits", url: "/home" },
          { name: "Cream Eyeshadow", url: "/home" }
        ]
      },
      {
        title: "LIPS",
        links: [
          { name: "Lipstick Shade Finder", url: "/home" },
          { name: "Shop All Lips", url: "/home" },
          { name: "Lipstick", url: "/home" },
          { name: "Lip Gloss", url: "/home" },
          { name: "Plumping Lip Gloss", url: "/home" },
          { name: "Lip Liner", url: "/home" },
          { name: "Lip Care", url: "/home" },
          { name: "Lip Brush", url: "/home" },
          { name: "Lip Kits", url: "/home" },
          { name: "Lip Oil", url: "/home" },
          { name: "Lip Balm", url: "/home" }
        ]
      },
      {
        title: "EVEN MORE MAGIC!",
        links: [
          { name: "Shop All Makeup", url: "/home" },
          { name: "Magical Savings!", url: "/home" },
          { name: "Wedding Makeup", url: "/home" },
          { name: "Gift Sets", url: "/home" },
          { name: "Trending Now!", url: "/home" },
          { name: "Online Exclusives", url: "/home" },
          { name: "Travel Essentials", url: "/home" },
          { name: "NEW! Pillow Talk In Bloom", url: "/home" },
          { name: "Airbrush Collection", url: "/home" },
          { name: "Makeup Collections", url: "/home" }
        ]
      }
    ]
  },
  {
    title: "SKINCARE",
    link: "/home",
    subMenu: [
      {
        title: "MOISTURISER",
        links: [
          { name: "Shop All Moisturiser", url: "/home" },
          { name: "Magic Cream", url: "/home" },
          { name: "Night Cream", url: "/home" },
          { name: "Eye Cream", url: "/home" }
        ]
      },
      {
        title: "CLEANSER",
        links: [
          { name: "Shop All Cleansers", url: "/home" },
          { name: "Balm Cleanser", url: "/home" },
          { name: "Toner", url: "/home" }
        ]
      }
    ],
    products: [
      { name: "CHARLOTTE'S MAGIC CREAM", subtitle: "30 ML MOISTURISER", image: "https://images.ctfassets.net/wlke2cbybljx/1HZf99QHJsP7duxB7JZgCy/0984aa020ba7a0900a452b4fa72fd3d7/MC-30ml.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "CHARLOTTE'S MAGIC SERUM CRYSTAL ELIXIR", subtitle: "30 ML", image: "https://images.ctfassets.net/wlke2cbybljx/10WWrtmviweMiGoBN0PHra/04b79ee86e45c5c5c8dcecd118599207/MAGIC-SERUM-100ML-PACKSHOT.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "CHARLOTTE'S MAGIC CREAM", subtitle: "50 ML MOISTURISER REFILL", image: "https://images.ctfassets.net/wlke2cbybljx/5xXdVeP9tQkMCuvd0gw9BX/9b65fabc9e106b1c5e2303263357762d/MC-50ml-refill.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "BEAUTIFUL SKIN ISLAND GLOW EASY TANNING DROPS", subtitle: "FAIR TO MEDIUM", image: "https://images.ctfassets.net/wlke2cbybljx/2adnkbQzDauP8p8bn08ngD/9014d8cf023ebe26178a4bdde73cb24d/Open-Packshot.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" }
    ]
  },
  {
    title: "BEST SELLERS",
    link: "/home",
    subMenu: [
      {
        title: "BEST SELLERS",
        links: [
          { name: "Shop all Best Sellers", url: "/home" },
          { name: "Magical Savings!", url: "/home" },
          { name: "NEW! Pillow Talk In Bloom", url: "/home" },
          { name: "Mini Legendary Icons Kit", url: "/home" },
          { name: "Charlotte's Legendary Beauty Icons Kit", url: "/home" },
          { name: "Discover Charlotte's Legendary Origin Stories", url: "/home" }
        ]
      }
    ],
    products: [
      { name: "AIRBRUSH FLAWLESS SETTING SPRAY", subtitle: "ORIGINAL 100 ML", image: "https://images.ctfassets.net/wlke2cbybljx/23p4TKjqpeC3zePOLb2HpY/8f458a41d1c2e7549a59796ad7d658f7/Updated_Settng_Spray.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "MINI PILLOW TALK LIP KIT", subtitle: "PILLOW TALK ORIGINAL", image: "https://images.ctfassets.net/wlke2cbybljx/5Xeq3WmQt9nx9R4V5U021K/c485a69e5006cb79fd43e658969273c8/pdp-pt-lipkit-original-shadow.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "AIRBRUSH FLAWLESS FINISH", subtitle: "1 FAIR", image: "https://images.ctfassets.net/wlke2cbybljx/6ileyoGfVFJlandkVZfwIa/c78adef575452a1a97f781ca914af3ba/airbrush-flawless-light-packshot.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "BEAUTY CHECK-IN KIT", subtitle: "TRAVEL SIZE MAKEUP KIT", image: "https://images.ctfassets.net/wlke2cbybljx/5cY9kCWU2wFWa2uR7eJlOF/cce8b94d3ad169bfbe70212e36c398d3/BEAUTY_CHECK-IN_KIT-BUNDLE.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" }
    ]
  },
  {
    title: "GIFTS",
    link: "/home",
    subMenu: [
      {
        title: "GIFTS",
        links: [
          { name: "Shop All Gifts", url: "/home" },
          { name: "Gift Finder", url: "/home" },
          { name: "Gifts By Price", url: "/home" },
          { name: "Shop By Category", url: "/home" },
          { name: "Perfectly Packaged Gift Sets", url: "/home" },
          { name: "E-Gift Cards", url: "/home" },
          { name: "Gift Wrapping & Engraving", url: "/home" },
          { name: "Gift A 1:1 Online Beauty Consultation", url: "/home" }
        ]
      }
    ],
    products: [
      { name: "THE GIFT OF PILLOW TALK EYES & LIPS", subtitle: "GIFT SET", image: "https://images.ctfassets.net/wlke2cbybljx/4RbwyZUi7BOEOmo8HHFIBk/0984388394b461e3a571a4214e123a11/The_Gift_of_Pillow_Talk_Eyes___Lips.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "CHARLOTTE'S MAGIC CREAM", subtitle: "50 ML MOISTURISER", image: "https://images.ctfassets.net/wlke2cbybljx/23rB75ulm58tirnkCOX995/538a58394c515e05b4932d46ff2c0e28/MC-50ml.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "JUICY, PLUMPER-LOOKING LIPS KIT", subtitle: "LIP KIT", image: "https://images.ctfassets.net/wlke2cbybljx/1Fg7sDh30VpzrbzJwqfapJ/809477c68fa621b565d192ee453054c2/Jucy-Plumper-Looking-Lip-Kit-Product.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "IMMEDIATE SKIN REVIVAL + FLAWLESS BASE KIT", subtitle: "HYDRATE & PRIME ICONS KIT", image: "https://images.ctfassets.net/wlke2cbybljx/6KQEiMhcOmqvpREqYICkl9/f250b3b0625b4b3b49ff07e2130e52f6/Immediate_Skin_Revival___Flawless_Base_Kit_-_flatlay.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" }
    ]
  },
  {
    title: "FRAGRANCE",
    link: "/home",
    subMenu: [
      {
        title: "FRAGRANCE",
        links: [
          { name: "Shop All Fragrance", url: "/home" },
          { name: "Discover Charlotte's Fragrance Story", url: "/home" },
          { name: "Find Your Perfect Scent Match", url: "/home" }
        ]
      }
    ],
    products: [
      { name: "CHARLOTTE'S FRAGRANCE COLLECTION OF EMOTIONS", subtitle: "4 X 2ML DISCOVERY SET", image: "https://images.ctfassets.net/wlke2cbybljx/41Vsmp25BgNN6vuA7JfeGN/f458921090199606349cb2d0a48e0621/Charlottes_Fragrance_Collections_of_Emotions.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "STAR CONFIDENCE", subtitle: "50 ML FRAGRANCE", image: "https://images.ctfassets.net/wlke2cbybljx/3XpsgjdNNCJikFl5tCNaRb/8095dd73ae756945067a2305517dea70/50ml_StarConfidance.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "STAR CONFIDENCE", subtitle: "100 ML FRAGRANCE", image: "https://images.ctfassets.net/wlke2cbybljx/4K9CEzHT8RK4DHaLoVSx8i/f647371386bfde5d1e524337651dbfec/100ml_StarConfidance.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" },
      { name: "CHARLOTTE'S MAGIC BODY CREAM", subtitle: "LOVE FREQUENCY 200ML", image: "https://images.ctfassets.net/wlke2cbybljx/6qdtZbDN4xkRzVxcH893km/d66987af07601076e7b14b9d943b1390/Love_Frequency_MBC.png?w=660&h=660&fit=fill&q=80&fm=webp", url: "/home" }
    ]
  },
  {
    title: "SHADE MATCH TOOLS",
    link: "/home",
    subMenu: [
      {
        title: "SKINCARE FINDERS",
        links: [{ name: "Find Your Skincare Routine", url: "/home" }]
      },
      {
        title: "MAKEUP FINDERS",
        links: [
          { name: "Lipstick Shade Finder", url: "/home" },
          { name: "Makeup Shade Match", url: "/home" },
          { name: "Blush Shade Finder", url: "/home" },
          { name: "Highlighter Shade Finder", url: "/home" }
        ]
      },
      {
        title: "COMPLEXION FINDERS",
        links: [
          { name: "Foundation Shade Finder", url: "/home" },
          { name: "Concealer Shade Finder", url: "/home" }
        ]
      },
      {
        title: "OTHER FINDERS",
        links: [
          { name: "Gift Finder", url: "/home" },
          { name: "Find Your Scent Match", url: "/home" }
        ]
      }
    ]
  },
  {
    title: "SERVICES",
    link: "/home",
    subMenu: [
      {
        title: "ONLINE SERVICES",
        links: [
          { name: "1:1 Online Beauty Consultations", url: "/home" },
          { name: "Gift A 1:1 Online Beauty Consultation", url: "/home" },
          { name: "Book An Appointment In-Store Or Online!", url: "/home" },
          { name: "Find Your Nearest Store", url: "/home" },
          { name: "Gift Wrap & Engraving", url: "/home" },
          { name: "Pro Artist Programme", url: "/home" }
        ]
      },
      {
        title: "IN-PERSON SERVICES",
        links: [
          { name: "Book An In Store Appointment!", url: "/home" }
        ]
      },
      {
        title: "LEARN",
        links: [
          { name: "NEW! Charlotte's Easy Beauty School", url: "/home" },
          { name: "Beauty Tutorials", url: "/home" }
        ]
      },
      {
        title: "DISCOVER",
        links: [
          { name: "Loyalty Programme", url: "/home" },
          { name: "Pro Artist Programme", url: "/home" },
          { name: "About Charlotte Tilbury", url: "/home" },
          { name: "About Sofia Tilbury", url: "/home" },
          { name: "Find Your Nearest Store", url: "/home" }
        ]
      }
    ]
  }
];

export const mobileMenuData = [
  {
    title: "GIFT MAGIC THIS MOTHER'S DAY!",
    image: "/assets/img/Header/Cat_box_-_BYOBK_-_MWC_-_Launch_2026-05-09_12_13_21.568762.webp",
    highlight: true,
  },
  {
    title: "NEW IN",
    image: "/assets/img/Header/uk-row-pt-in-bloom-nav-image-duo__1__2026-05-09_12_13_21.933270.webp",
    children: [
      { title: "Shop New In" },
      { title: "Pillow Talk Blush Balm Lip Tint" },
      { title: "Pillow Talk Beauty Soulmates Palette in Flawless Rosewood" },
      { title: "The Gift of Pillow Talk Eyes & Lips" },
      { title: "NEW! Charlotte's Magic Cream" },
      { title: "Magic Love Frequency Body Cream" },
      { title: "Airbrush Flawless Blur Concealer" }
    ]
  },
  {
    title: "MAKEUP",
    image: "/assets/img/Header/ukrow-newyearskin-catbox-makeup_2026-05-09_12_13_21.421601.webp",
    children: [
      { title: "10% Off Build Your Own Beauty Kit!", highlight: true },
      { title: "Shop All Makeup" },
      { title: "Face", children: [{ title: "Your Complexion Matches" }, { title: "Shop All Face" }, { title: "Foundation" }, { title: "Primer" }, { title: "Concealer" }] },
      { title: "Cheek", children: [{ title: "Shop All Cheek" }, { title: "Contour" }, { title: "Cream Bronzer" }] },
      { title: "Eyes", children: [{ title: "Shop All Eyes" }, { title: "Eyeshadow" }, { title: "Mascara" }] },
      { title: "Lips", children: [{ title: "Shop All Lips" }, { title: "Lipstick" }, { title: "Lip Gloss" }] },
      { title: "Magical Savings!", highlight: true },
      { title: "Wedding Makeup" },
      { title: "Gift Sets" },
      { title: "Trending Now!" },
      { title: "Online Exclusives" },
      { title: "Travel Essentials" }
    ]
  },
  {
    title: "SKINCARE",
    image: "/assets/img/Header/ukrow-newyearskin-catbox-skincare_2026-05-09_12_13_22.273930.webp",
    children: [
      { title: "Shop All Skincare" },
      { title: "Moisturiser", children: [{ title: "Magic Cream" }, { title: "Night Cream" }] },
      { title: "Cleanser", children: [{ title: "Balm" }] }
    ]
  },
  {
    title: "BEST SELLERS",
    image: "/assets/img/Header/Airbrush_Family_2026-05-09_12_13_22.108498.webp",
    children: [{ title: "Shop All Best Sellers" }]
  },
  {
    title: "GIFTS",
    image: "/assets/img/Header/ukrow-reasons-to-shop-catbox-free-gifts__1___1__2026-05-09_12_13_22.429201.webp",
    children: [{ title: "Shop All Gifts" }]
  },
  {
    title: "FRAGRANCE",
    image: "/assets/img/Header/251000_Holiday_25_sl_CD_202505_Star-Confidence-Fragrance___R5_V2_Vignette_2000-x-2000__2__2026-05-09_12_13_21.720670.webp",
    children: [{ title: "Shop All Fragrance" }]
  },
  {
    title: "SHADE MATCH TOOLS",
    image: "/assets/img/Header/ProSkinAnalyser-CatBox__1___1___1___1___1___1___1___1___1___1___1___1__2026-05-09_12_13_22.593245.webp",
    children: [{ title: "Foundation Finder" }]
  },
  {
    title: "SERVICES",
    image: "/assets/img/Header/Screenshot_2024-01-22_at_10.11.53__1__2026-05-09_12_13_22.757695.webp",
    children: [
      { title: "Online Services", children: [{ title: "Virtual Consultation" }] },
      { title: "In-Person Services", children: [{ title: "Store Appointments" }] },
      { title: "Learn", children: [{ title: "Masterclasses" }] },
      { title: "Discover", children: [{ title: "Pro Artist" }] }
    ]
  },
  {
    title: "CHARLOTTE'S DARLINGS LOYALTY CLUB",
    image: "/assets/img/Header/loyalty-nav-lips-3976efc65dd9c534da12aaec86d0a1ca_2026-05-09_12_13_21.272777.webp",
    children: [{ title: "Join Now" }]
  }
];

const renderMegaMenuContent = (title) => {
  const itemData = menuData.find(d => d.title === title);
  if (!itemData || (!itemData.subMenu && !itemData.products)) return null;
  return (
      <div className="container max-w-[1470px] mx-auto py-12 px-4 md:px-8 text-left">
        <div className="flex justify-between items-start">

          {/* Left Side: Categories/Links */}
          <div className={`flex gap-16 shrink-0 ${itemData.products ? 'w-[30%]' : 'w-full'}`}>
            {itemData.subMenu && itemData.subMenu.map((col, colIndex) => (
              <div key={colIndex} className="flex flex-col">
                <h4 className="font-helveticaN font-bold text-[13px] mb-6 text-[#340c0c] uppercase tracking-wider">{col.title}</h4>
                <ul className="flex flex-col gap-4 font-sans text-[14px] text-[#555]">
                  {col.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to={link.url} className="hover:underline underline-offset-4 decoration-[#340c0c] transition-all inline-block">{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right Side: Products Grid */}
          {itemData.products && (
            <div className="flex-grow border-l border-[#eae6e6] pl-10">
              <div className="grid grid-cols-4 gap-6">
                {itemData.products.map((prod, pIdx) => (
                  <Link to={prod.url || '/home'} key={pIdx} className="flex flex-col text-center group/product">
                    <div className="w-full aspect-square mb-4 overflow-hidden bg-transparent relative flex items-center justify-center">
                      {prod.badge && <span className="absolute top-0 left-0 bg-[#340c0c] text-white text-[10px] font-bold px-2 py-1 uppercase tracking-widest z-10">{prod.badge}</span>}
                      <img src={prod.image} alt={prod.name} title={`${prod.name} - ${prod.subtitle} Packshot Open`} className="w-[85%] h-[85%] object-contain group-hover/product:opacity-70 transition-opacity duration-300 ease-out" />
                    </div>
                    <h4 className="font-sans text-[12px] font-bold text-[#340c0c] uppercase leading-snug group-hover/product:underline underline-offset-2 decoration-[#340c0c] line-clamp-2 px-2">{prod.name}</h4>
                    <p className="font-sans text-[11px] text-[#856d6d] uppercase mt-1.5 tracking-wider">{prod.subtitle}</p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
  );
};

function HeaderInner() {
  const { basket, handleAddtoBasket, CloseBasket, Basketopen } = useBasket();
  const { trending } = useProduct();
  const { wishlist, toggleWishlist, isInWishlist, moveToWishlist } = useWishlist();
  const { openCart, isCartOpen } = useUI();
  const { handleMenuState } = useNav();

  const location = useLocation();
  const navigate = useNavigate();

  const handleSearchClick = () => {
    if (location.pathname === '/search') {
      navigate('/home');
    } else {
      navigate('/search');
    }
  };

  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [activeRegion, setActiveRegion] = useState("United States | EN | USD $");
  const [tempRegion, setTempRegion] = useState("United States - English (USD $)");

  const [activeCategory, setActiveCategory] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const hoverTimeoutRef = React.useRef(null);
  const normalHeaderRef = React.useRef(null);
  
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const cartHoverTimeoutRef = React.useRef(null);

  const handleCartEnter = () => {
    if (cartHoverTimeoutRef.current) clearTimeout(cartHoverTimeoutRef.current);
    setIsCartDropdownOpen(true);
  };

  const handleCartLeave = () => {
    cartHoverTimeoutRef.current = setTimeout(() => {
      setIsCartDropdownOpen(false);
    }, 250);
  };
  const [menuTop, setMenuTop] = useState(0);

  const handleMenuEnter = (category) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setActiveCategory(category);
    setIsOpen(true);
  };

  const handleMenuLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsOpen(false);
      // We do NOT set activeCategory(null) here so the content doesn't abruptly disappear while fading out
    }, 250); // Increased debounce to 250ms to prevent flickering when mouse crosses gaps
  };

  useEffect(() => {
    const updateMenuTop = () => {
      if (isScrolled) {
        setMenuTop(60); // height of sticky header
      } else if (normalHeaderRef.current) {
        setMenuTop(normalHeaderRef.current.getBoundingClientRect().bottom);
      }
    };
    
    updateMenuTop();
    window.addEventListener('scroll', updateMenuTop);
    window.addEventListener('resize', updateMenuTop);
    return () => {
      window.removeEventListener('scroll', updateMenuTop);
      window.removeEventListener('resize', updateMenuTop);
    };
  }, [isScrolled, activeCategory]);

  // Body scroll lock handled automatically by UIContext for these overlays
  useScrollLock(Basketopen);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 150);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const NextMessage = () => {
      setFade(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % message.length)
        setFade(true)
      }, 400)
    }
    const timer = setInterval(NextMessage, 4000)
    return () => clearInterval(timer)
  }, [])

  const [open, setOpen] = useState(false);
  const [menuStack, setMenuStack] = useState([{ title: 'Menu', items: mobileMenuData }]);

  useScrollLock(open);

  const ToggleMenu = () => {
    if (!open) {
      setMenuStack([{ title: 'Menu', items: mobileMenuData }]);
    }
    setOpen(!open);
  };

  const handleItemClick = (item) => {
    if (item.children) {
      setMenuStack([...menuStack, { ...item, items: item.children }]);
    } else {
      setOpen(false);
    }
  };

  const goBack = () => {
    if (menuStack.length > 1) {
      setMenuStack(menuStack.slice(0, -1));
    }
  };
  const totalItems = basket.length;
  const totalPrice = basket.reduce((acc, item) => {
    const priceStr = item.discountPrice || item.price || '0';
    if (priceStr.toUpperCase() === 'FREE') return acc;

    // Extract number by simply removing currency symbols instead of using regex flags
    const cleanPrice = priceStr.replace('$', '').replace('£', '').replace('€', '').trim();
    const priceNum = parseFloat(cleanPrice) || 0;

    return acc + (priceNum * item.quantity);
  }, 0);

  const renderCartDropdownContent = () => (
    <div className="bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.15)] w-[400px] border border-[#eae6e6] pointer-events-auto">
      <div className="flex text-[16px] font-sans font-bold mb-1 justify-between text-[#340c0c]">
        <h3 className='uppercase'>Your Bag</h3>
        <p>${totalPrice.toFixed(2)}</p>
      </div>
      <div className="flex pb-2 text-[#856d6d] text-[12px] uppercase mb-2 justify-between tracking-wide">
        <h3>{totalItems} items</h3>
        <p>EXCL. delivery</p>
      </div>
      <div className="border-b border-[#eae6e6]"></div>

      {basket.length === 0 ? (
        <div className="py-8 text-center">
          <p className='font-sans text-[14px] text-[#340c0c] mb-2'>There Are No Items In Your Bag</p>
        </div>
      ) : (
        <>
          <div className="max-h-[320px] overflow-y-auto py-2 pr-2 custom-scrollbar">
            {basket.map((item, idx) => (
              <div key={idx} className="flex gap-4 py-4 border-b border-[#eae6e6] last:border-0">
                <div className="w-[60px] h-[60px] shrink-0 bg-[#f5f5f5]">
                  <img src={item.selectedShade?.gallery?.[0] || item.selectedShade?.galleryImages?.[0] || item.selectedShade?.swatchImage || item.cardImages?.main || item.image || item.images?.main} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h4 className="text-[12px] font-bold text-[#340c0c] uppercase line-clamp-2 hover:underline cursor-pointer">{item.title}</h4>
                    <p className="text-[11px] text-[#856d6d] uppercase mt-1 line-clamp-1">{item.selectedShade?.name || item.shade || item.subtitle || item.subTitle || 'Standard Size'}</p>
                  </div>
                  <div className="text-right mt-2">
                    {item.price === 'FREE' ? (
                      <p className="text-[11px] text-[#340c0c] font-bold uppercase tracking-wide">
                        QTY: {item.quantity} <span className="line-through text-[#856d6d] mr-1">FREE</span> FREE
                      </p>
                    ) : item.discountPrice ? (
                      <p className="text-[11px] text-[#340c0c] font-bold uppercase tracking-wide">
                        QTY: {item.quantity} <span className="line-through text-[#856d6d] mr-1">{item.price}</span> <span className="text-[#a06464]">{item.discountPrice}</span>
                      </p>
                    ) : (
                      <p className="text-[11px] text-[#340c0c] font-bold uppercase tracking-wide">
                        QTY: {item.quantity} {item.price}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-[#eae6e6]">
            <Link to="/basket" className="w-full bg-[#220B13] hover:bg-[#340c0c] text-white py-3 uppercase text-[13px] tracking-widest font-bold transition-colors text-center block">
              VIEW BAG & CHECKOUT
            </Link>
          </div>
        </>
      )}
    </div>
  );

  return (
    <header className={`text-[#340c0c] ${location.pathname === '/search' ? 'sticky top-0 z-[120] bg-white w-full' : 'relative'}`} >
      <div className="bg-[#fde8e0] p-2">
        <div className="container max-w-[1470px] mx-auto">
          <div className="flex items-center justify-center text-center h-12 md:h-fit text-xs md:text-sm ">
            <Link to='/home' className={`transition-opacity duration-400 ease-in-out ${fade ? 'opacity-100' : 'opacity-0'} `}>{message[index]} </Link>
          </div>
        </div>


      </div>
      <div ref={normalHeaderRef} className={`relative bg-white/90 backdrop-blur-xl px-4 z-[100] transition-all duration-500 ${isScrolled && location.pathname !== '/search' ? 'shadow-[0_2px_20px_rgba(52,12,12,0.06)]' : ''}`}>
        <div className="container max-w-[1470px]  py-1 md:pt-4 md:pb-2 mx-auto">
          <div className="hidden md:flex h-[10vh] justify-between items-center ">
            <div className="text-[12px] gap-4 z-[160]">
              <div className="relative group">
                <p
                  className="cursor-pointer hover:text-[#a06464] transition-colors flex items-center gap-1"
                  onClick={() => {
                    setTempRegion(activeRegion); // reset tempRegion to current when opening
                    setIsCurrencyOpen(!isCurrencyOpen);
                  }}
                >
                  {activeRegion}
                </p>

                {isCurrencyOpen && (
                  <div className="absolute top-[100%] left-0 mt-4 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] border border-[#eae6e6] w-[260px] p-5 text-left before:content-[''] before:absolute before:-top-2 before:left-8 before:w-4 before:h-4 before:bg-white before:border-t before:border-l before:border-[#eae6e6] before:transform before:rotate-45">
                    <label className="block text-[11px] font-sans font-bold text-[#340c0c] mb-2 tracking-wide">Shipping to*</label>
                    <div className="relative">
                      <select
                        value={tempRegion}
                        onChange={(e) => setTempRegion(e.target.value)}
                        className="w-full border border-[#d6cece] p-2.5 text-[13px] font-sans text-[#340c0c] bg-white appearance-none outline-none cursor-pointer focus:border-[#340c0c] transition-colors rounded-none"
                      >
                        <option value="Please Select">Please Select</option>
                        <option value="Australia | EN | AUD $">Australia (AUD $)</option>
                        <option value="Austria | EN | EUR €">Austria (EUR €)</option>
                        <option value="Canada | EN | CAD $">Canada - English (CAD $)</option>
                        <option value="France | EN | EUR €">France - English (EUR €)</option>
                        <option value="Germany | EN | EUR €">Germany - English (EUR €)</option>
                        <option value="United Kingdom | EN | GBP £">United Kingdom (GBP £)</option>
                        <option value="United States | EN | USD $">United States - English (USD $)</option>
                      </select>
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronDown size={16} color="#340c0c" />
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        if (tempRegion !== "Please Select") {
                          setActiveRegion(tempRegion);
                          setIsCurrencyOpen(false);
                        }
                      }}
                      className="w-full mt-5 bg-[#340c0c] text-white hover:bg-[#1e0505] transition-colors font-bold py-3 text-[12px] tracking-[0.15em] uppercase"
                    >
                      CONTINUE
                    </button>
                  </div>
                )}
              </div>
            </div>
            <Link to='/home'>
              <img src="/assets/img/logo.svg" className='w-[230px] m-auto' alt="" />
            </Link>
            <div className="flex gap-4 items-center  ">
              <User size={25} strokeWidth={1} color='#340c0c' />
              <Link to='/wishlist' className="relative">
                <Heart size={25} strokeWidth={1} color='#340c0c' />
              </Link>
              <button onClick={handleSearchClick} aria-label="Open search" className="hover:opacity-70 transition-opacity cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center">
                <PiMagnifyingGlass size={25} />
              </button>
              <div 
                className='relative font-helveticaN flex items-center gap-2 cursor-pointer'
                onMouseEnter={handleCartEnter}
                onMouseLeave={handleCartLeave}
              >
                <div className=" flex items-center gap-2">
                  <Link to="/basket">
                    <img src="/assets/img/BasketIcon.svg " className='w-[35px] relative hover:scale-105 transition-transform' alt="" />
                  </Link>

                  <div className={`bg-[#340c0c] text-white h-fit  -mt-1.5 -ml-5 ${totalItems >= 10 ? 'px-1.5 py-0.5' : 'px-2'}  rounded-full border`}>{totalItems} </div>
                </div>
              </div>

            </div>

          </div>
          <div className="flex relative md:hidden py-3 justify-between items-center ">
            {/* Left: Hamburger + Heart */}
            <div className="flex items-center gap-4 flex-1">
              <Menu size={26} strokeWidth={1.5} onClick={ToggleMenu} color='#340c0c' className="cursor-pointer" />

              <div
                className={`fixed inset-0 bg-[#340c0c]/40 backdrop-blur-[2px] z-[290] transition-opacity duration-400 md:hidden ${open ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                onClick={ToggleMenu}
              />
              <div className={`fixed bg-white left-0 transform transition-transform duration-400 ease-in-out z-[300] top-0 bottom-0 h-[100dvh] w-[90%] md:w-[400px] shadow-2xl ${open ? 'translate-x-0 ' : '-translate-x-full'} overflow-hidden flex flex-col`}>

                <div className="flex-1 overflow-hidden relative">
                  <div
                    className="flex h-full transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${(menuStack.length - 1) * 100}%)`, width: '100%' }}
                  >
                    {menuStack.map((screen, level) => (
                      <div key={level} className="w-full h-full shrink-0 overflow-y-auto overflow-x-hidden pb-8 bg-white flex flex-col custom-scrollbar">

                        {/* Header for ROOT level */}
                        {level === 0 && (
                          <div className="flex justify-end items-center px-4 py-4 bg-white z-10 shrink-0">
                            <X onClick={ToggleMenu} className='cursor-pointer text-[#340c0c]' size={28} strokeWidth={1} />
                          </div>
                        )}

                        {/* Top Bar (Login / English) - Root Only */}
                        {level === 0 && (
                          <div className="bg-[#6e1e2d] px-6 py-4 flex justify-between items-center text-white shrink-0">
                            <div className="text-[14px] font-sans">
                              <Link to="/login" onClick={ToggleMenu} className="font-bold hover:underline">Log in</Link> <span className="mx-2">|</span> <Link to="/register" onClick={ToggleMenu} className="hover:underline">Create account</Link>
                            </div>
                            <div className="text-[14px] flex items-center gap-1 cursor-pointer">
                              English <ChevronDown size={16} />
                            </div>
                          </div>
                        )}

                        {/* Header for nested menus */}
                        {level > 0 && (
                          <div className="flex items-center justify-between px-4 py-4 border-b border-[#eae6e6] bg-white z-10 shrink-0">
                            <div className="flex items-center gap-2 cursor-pointer" onClick={goBack}>
                              <ChevronLeft size={20} className="text-[#340c0c]" strokeWidth={1.5} />
                              <span className="font-sans font-medium text-[16px] text-[#340c0c]">{screen.title}</span>
                            </div>
                            <X onClick={ToggleMenu} className='cursor-pointer text-[#340c0c]' size={28} strokeWidth={1} />
                          </div>
                        )}

                        {/* Banner for specific categories */}
                        {screen.imageBanner && level > 0 && (
                          <div className="px-6 py-4">
                            <img src={screen.imageBanner} alt={screen.title} className="w-full h-auto object-cover rounded-sm shadow-sm" />
                          </div>
                        )}

                        {/* Menu Items */}
                        <div className="flex-1">
                          {screen.items && screen.items.map((item, idx) => {
                            const hasChildren = item.children && item.children.length > 0;
                            return (
                              <div key={idx} className={`${level > 0 ? 'border-b border-[#eae6e6] mx-4' : 'border-b border-[#eae6e6]'}`}>
                                <div
                                  className={`flex justify-between items-center py-4 cursor-pointer bg-white transition-colors ${level === 0 ? 'px-4 hover:bg-[#fafafa]' : 'hover:opacity-70'}`}
                                  onClick={() => hasChildren ? handleItemClick(item) : ToggleMenu()}
                                >
                                  <div className="flex items-center gap-4">
                                    {level === 0 && item.image && (
                                      <img src={item.image} className="w-14 h-14 object-cover" alt="" />
                                    )}
                                    {item.link && !hasChildren ? (
                                      <Link to={item.link} className={`${level === 0 ? 'uppercase font-helveticaN text-[14px]' : 'font-sans text-[14px]'} tracking-wide ${item.highlight ? (level === 0 ? 'text-[#6e1e2d] font-bold' : 'text-[#6e1e2d] underline') : 'text-[#340c0c]'} ${level > 0 && !item.highlight ? 'text-[#555]' : ''}`}>
                                        {item.title || item.name}
                                      </Link>
                                    ) : (
                                      <span className={`${level === 0 ? 'uppercase font-helveticaN text-[14px]' : 'font-sans text-[14px]'} tracking-wide ${item.highlight ? (level === 0 ? 'text-[#6e1e2d] font-bold' : 'text-[#6e1e2d] underline') : 'text-[#340c0c]'} ${level > 0 && !item.highlight ? 'text-[#555]' : ''}`}>
                                        {item.title || item.name}
                                      </span>
                                    )}
                                  </div>
                                  {hasChildren && <ChevronRight size={18} className="text-[#340c0c]" strokeWidth={1.5} />}
                                </div>
                              </div>
                            );
                          })}
                        </div>

                        {/* Extra bottom items (only on root level) */}
                        {level === 0 && (
                          <>
                            {/* PERFECT MATCHES */}
                            <div className="bg-[#fcf5f5] px-4 py-5 mt-2">
                              <div className="flex items-center gap-4 mb-4">
                                <img src="/assets/CT_FAIRY_frame_1_6.png" className="w-14 h-14 rounded-full object-cover shrink-0" alt="Fairy" />
                                <p className="uppercase font-helveticaN font-bold text-[13px] text-[#340c0c] leading-tight">DARLING, UNLOCK YOUR PERFECT MAKEUP MATCHES WITH ME!</p>
                              </div>
                              <button className="w-full bg-[#2a0e12] text-white py-3 uppercase text-[12px] font-bold tracking-widest hover:bg-[#1a080a] transition-colors">
                                FIND YOUR PERFECT MATCHES
                              </button>
                            </div>

                            {/* SHIPPING */}
                            <div className="px-4 py-6 border-t border-[#eae6e6] mt-4">
                              <p className="uppercase font-helveticaN font-bold text-[13px] text-[#340c0c] mb-4">SHIPPING TO:</p>
                              <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleItemClick({ title: 'REGION & CURRENCY', isShipping: true })}>
                                <Globe size={22} className="text-[#340c0c]" strokeWidth={1.5} />
                                <span className="font-sans text-[14px] text-[#555]">United States (USD $)</span>
                              </div>
                            </div>
                          </>
                        )}

                        {/* Special Shipping Menu Content */}
                        {screen.isShipping && (
                          <div className="px-6 py-5">
                            <h4 className="font-bold text-[13px] mb-4 uppercase text-[#340c0c]">Select Region</h4>
                            <ul className="flex flex-col gap-4">
                              <li className="text-[14px] font-sans text-[#340c0c] cursor-pointer hover:underline">Australia (AUD $)</li>
                              <li className="text-[14px] font-sans text-[#340c0c] cursor-pointer hover:underline">Austria (EUR €)</li>
                              <li className="text-[14px] font-sans text-[#340c0c] cursor-pointer hover:underline">Canada - English (CAD $)</li>
                              <li className="text-[14px] font-sans text-[#340c0c] cursor-pointer hover:underline">France - English (EUR €)</li>
                              <li className="text-[14px] font-sans text-[#340c0c] cursor-pointer hover:underline">Germany - English (EUR €)</li>
                              <li className="text-[14px] font-sans text-[#340c0c] cursor-pointer hover:underline">United Kingdom (GBP £)</li>
                              <li className="text-[14px] font-sans text-[#340c0c] font-bold underline cursor-pointer">United States - English (USD $)</li>
                            </ul>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Link to='/wishlist' className="relative">
                <Heart size={24} strokeWidth={1.5} color='#340c0c' />
              </Link>
            </div>

            {/* Center: Logo */}
            <div className="flex justify-center flex-1">
              <Link to='/home'>
                <img src="/assets/img/logo.svg" className='w-[140px] m-auto' alt="CT Logo" />
              </Link>
            </div>

            {/* Right: User + Bag */}
            <div className="flex items-center justify-end gap-4 flex-1">
              <User size={24} strokeWidth={1.5} color='#340c0c' />

              <Link to="/basket" className="flex items-center relative cursor-pointer">
                <img src="/assets/img/BasketIcon.svg " className='w-[24px]' alt="" />
                <div className={`absolute -top-1 -right-2 bg-[#340c0c] text-white h-fit text-[10px] font-bold ${totalItems >= 10 ? 'px-1' : 'px-[5px]'} py-[1px] rounded-full leading-none flex items-center justify-center min-w-[16px] min-h-[16px]`}>
                  {totalItems}
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className="container max-w-[1300px] mx-auto">
          <div className="hidden md:flex justify-center items-center ">
            <ul className='font-helveticaN flex flex-wrap  font-black justify-center  gap-4  lg:gap-7 uppercase'>
              <li className='text-[#a06464] border-b border-transparent pb-2 hover:border-b-[#a06464]' ><Link to='/home' >Up to a magical 20% off</Link></li>
              {["NEW IN", "MAKEUP", "SKINCARE", "BEST SELLERS", "GIFTS", "FRAGRANCE", "SHADE MATCH TOOLS", "SERVICES"].map(cat => (
                <li 
                  key={cat}
                  className={`border-b pb-2 cursor-pointer transition-colors ${activeCategory === cat ? 'border-[#340c0c]' : 'border-transparent hover:border-[#340c0c]'}`}
                  onMouseEnter={() => handleMenuEnter(cat)}
                  onMouseLeave={handleMenuLeave}
                >
                  <Link to='/home' className={activeCategory === cat ? 'text-[#a06464]' : ''}>{cat.charAt(0) + cat.slice(1).toLowerCase()}</Link>
                </li>
              ))}
            </ul>
          </div>
          {location.pathname !== '/search' && (
            <div className="md:hidden flex justify-center pb-4 pt-1 items-center px-2">
              <button
                onClick={handleSearchClick}
                className='border border-[#a08a8a] flex items-center rounded-full w-full p-2 h-[44px] bg-white cursor-pointer hover:border-[#856d6d] transition-colors'
                aria-label="Open search"
              >
                <PiMagnifyingGlass className='mx-2 text-[#856d6d]' size={20} />
                <span className='font-sans text-[14px] text-[#856d6d] text-left'>Search product, shade, colour</span>
              </button>
            </div>
          )}

        </div>




      </div>
      {/* STICKY SLIDE-DOWN HEADER */}
      <div className={`fixed top-0 left-0 w-full bg-white/95 backdrop-blur-2xl z-[110] shadow-[0_2px_20px_rgba(52,12,12,0.08)] transition-transform duration-500 ease-in-out ${isScrolled && !isCartOpen && location.pathname !== '/search' ? 'translate-y-0' : '-translate-y-full'}`}>
        {/* Desktop Sticky View */}
        <div className="hidden md:block h-[60px]">
          <div className="container max-w-[1470px] mx-auto h-full px-4 md:px-8">
            <div className="grid grid-cols-[1fr_auto_1fr] h-full items-center relative">

              {/* Left Links */}
              <div className="flex items-center gap-5 xl:gap-8 justify-end font-helveticaN font-bold uppercase text-[11px] xl:text-[12px] h-full pr-5 xl:pr-8">
                <Link to='/home' className="text-[#a06464] hover:text-[#340c0c] whitespace-nowrap transition-colors flex items-center h-full">PILLOW TALK COLLECTION ✦</Link>
                {["NEW IN", "MAKEUP", "SKINCARE"].map(cat => (
                  <div key={cat} className="h-full flex items-center cursor-pointer" onMouseEnter={() => handleMenuEnter(cat)} onMouseLeave={handleMenuLeave}>
                    <Link to='/home' className={`whitespace-nowrap transition-colors ${activeCategory === cat ? 'text-[#a06464]' : 'text-[#340c0c] hover:text-[#a06464]'}`}>{cat}</Link>
                  </div>
                ))}
              </div>

              {/* Center CT Logo */}
              <div className="flex justify-center items-center h-full py-1 z-10">
                <Link to='/home' className="flex items-center justify-center h-full">
                  <img src="/assets/img/logo.png" className="h-[42px] object-contain" alt="CT Logo" />
                </Link>
              </div>

              {/* Right Links & Icons */}
              <div className="flex items-center justify-between font-helveticaN font-bold uppercase text-[11px] xl:text-[12px] h-full pl-5 xl:pl-8">
                <div className="flex items-center gap-5 xl:gap-8 h-full">
                  {["BEST SELLERS", "GIFTS"].map(cat => (
                    <div key={cat} className="h-full flex items-center cursor-pointer" onMouseEnter={() => handleMenuEnter(cat)} onMouseLeave={handleMenuLeave}>
                      <Link to='/home' className={`whitespace-nowrap transition-colors ${activeCategory === cat ? 'text-[#a06464]' : 'text-[#340c0c] hover:text-[#a06464]'}`}>{cat}</Link>
                    </div>
                  ))}
                  <div className="h-full items-center hidden lg:flex cursor-pointer" onMouseEnter={() => handleMenuEnter("FRAGRANCE")} onMouseLeave={handleMenuLeave}>
                    <Link to='/home' className={`whitespace-nowrap transition-colors ${activeCategory === "FRAGRANCE" ? 'text-[#a06464]' : 'text-[#340c0c] hover:text-[#a06464]'}`}>FRAGRANCE</Link>
                  </div>
                  {["SHADE MATCH TOOLS", "SERVICES"].map(cat => (
                    <div key={cat} className="h-full items-center hidden xl:flex cursor-pointer" onMouseEnter={() => handleMenuEnter(cat)} onMouseLeave={handleMenuLeave}>
                      <Link to='/home' className={`whitespace-nowrap transition-colors ${activeCategory === cat ? 'text-[#a06464]' : 'text-[#340c0c] hover:text-[#a06464]'}`}>{cat}</Link>
                    </div>
                  ))}
                </div>

                {/* Utilities - ONLY Cart in sticky view */}
                <div className="flex items-center ml-auto pl-4">
                  <div 
                    className="relative font-helveticaN flex items-center cursor-pointer"
                    onMouseEnter={handleCartEnter}
                    onMouseLeave={handleCartLeave}
                  >
                    <Link to="/basket" className="relative flex items-center">
                      <img src="/assets/img/BasketIcon.svg" className='w-[22px] hover:scale-105 transition-transform' alt="Bag" />
                      <div className={`absolute -top-1 -right-2 bg-[#340c0c] text-white h-fit text-[10px] font-bold ${totalItems >= 10 ? 'px-1' : 'px-[5px]'} py-[1px] rounded-full leading-none flex items-center justify-center min-w-[16px] min-h-[16px]`}>
                        {totalItems}
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Global Persistent Mega Menu Container */}
      <div 
        className={`fixed left-0 w-full bg-white shadow-[0_15px_30px_rgba(0,0,0,0.08)] border-t border-[#eae6e6] transition-all duration-400 ease-out z-[105] ${isOpen ? 'opacity-100 visible translate-y-0 pointer-events-auto' : 'opacity-0 invisible -translate-y-2 pointer-events-none'}`}
        style={{ top: menuTop + 'px' }}
        onMouseEnter={() => {
          if (activeCategory) handleMenuEnter(activeCategory);
        }}
        onMouseLeave={handleMenuLeave}
      >
        {activeCategory && renderMegaMenuContent(activeCategory)}
      </div>

      {/* Global Persistent Cart Dropdown Container */}
      <div 
        className={`fixed left-0 w-full transition-all duration-400 ease-out z-[105] pointer-events-none ${isCartDropdownOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'}`}
        style={{ top: menuTop + 'px' }}
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

      {/* Cart Drawer — New Humanist Component */}
      <CartDrawer />
    </header>
  )
}

export default function Header() {
  return (
    <NavProvider>
      <HeaderInner />
    </NavProvider>
  );
}
