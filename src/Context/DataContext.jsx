import React, { useState, createContext, useContext } from 'react';
import trendingData from '../Data/CharlotteTilbury_TrendingNow_Full.json';
import bestSellersData from '../Data/CharlotteTilbury_BestSellers_Full.json';

export const ProductContext = createContext();

export const countriesList = {
  EUROPE: [
    { name: 'Austria', currency: 'EUR €' },
    { name: 'Belgium', currency: 'EUR €' },
    { name: 'France - English', currency: 'EUR €' },
    { name: 'Germany - English', currency: 'EUR €' },
    { name: 'United Kingdom', currency: 'GBP £' },
  ],
  AMERICAS: [
    { name: 'United States', currency: 'USD $' },
    { name: 'Canada', currency: 'CAD $' },
  ],
  'MIDDLE EAST': [
    { name: 'UAE', currency: 'AED د.إ' },
    { name: 'Saudi Arabia', currency: 'SAR ﷼' },
  ],
  'ASIA PACIFIC': [
    { name: 'Australia', currency: 'AUD $' },
    { name: 'Japan', currency: 'JPY ¥' },
    { name: 'South Korea', currency: 'KRW ₩' },
  ],
};

const exchangeRates = {
  'EUR €': 1.17,
  'GBP £': 1.00,
  'USD $': 1.25,
  'CAD $': 1.70,
  'AED د.إ': 4.60,
  'SAR ﷼': 4.70,
  'AUD $': 1.90,
  'JPY ¥': 190.00,
  'KRW ₩': 1700.00,
};

export const formatPrice = (basePrice, selectedCountry) => {
  if (basePrice === undefined || basePrice === null) return '';
  if (typeof basePrice === 'string' && basePrice.toUpperCase() === 'FREE') return 'FREE';
  
  const numPrice = Number(basePrice) || 0;
  const currencySymbol = selectedCountry?.currency?.split(' ')[1] || '£';
  const currencyCode = selectedCountry?.currency || 'GBP £';
  const rate = exchangeRates[currencyCode] || 1.00;
  
  const convertedPrice = numPrice * rate;
  return `${currencySymbol}${convertedPrice.toFixed(2)}`;
};

export const staticProductDetail = {
  title: "AIRBRUSH FLAWLESS FINISH",
  price: "$50.00",
  category: "MAKEUP",
  description:
    "AIRbrush-effect makeup finishing powder for tan skin tones. Minimizes shine with a soft-focus finish.",
  shades: [
    {
      name: "1 Fair",
      swatchImage: "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_50/catalog/products/p/o/powder-swatch-1-fair.jpg",
      galleryImages: [
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-1-fair-open.jpg",
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-1-fair-model.jpg",
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-1-fair-closed.jpg",
      ],
    },
    {
      name: "2 Medium",
      swatchImage: "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_50/catalog/products/p/o/powder-swatch-2-medium.jpg",
      galleryImages: [
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-2-medium-open.jpg",
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-2-medium-model.jpg",
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-2-medium-closed.jpg",
      ],
    },
    {
      name: "3 Tan",
      swatchImage: "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_50/catalog/products/p/o/powder-swatch-3-tan.jpg",
      galleryImages: [
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-3-tan-open.jpg",
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-3-tan-model.jpg",
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-3-tan-closed.jpg",
      ],
    },
  ],
};

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
    title: "IT'S BACK! AIRBRUSH FLAWLESS \nBLUR CONCEALER",
    image: "https://images.ctfassets.net/wlke2cbybljx/5Uons9BGIEEp6woKgm54fT/635e65c4fb143768379445a279b6a541/B9_-_Concealer___Complexion_Brush.png?w=660&h=660&fit=fill&q=80&fm=webp",
    highlight: true,
    sparkles: true,
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
const footerLinks = {
    About: [
      'Store Locator',
      'About Charlotte',
      'Careers',
      'Privacy Policy',
      'Cookies Policy',
    ],
    Support: [
      'Customer Care',
      'Shipping',
      'Returns',
      'FAQ',
      'My Account',
    ],
    'More from Charlotte': [
      'Refer a Friend',
      'Subscribe and Save',
      'Promotions and Savings',
      "Charlotte's Magic Change",
      'Accessibility Statement',
    ],
  };

  const topCards = [
    {
      img: '/assets/img/Footer/Bus.png',
      title: 'Free Delivery',
      text: 'on all orders over £49',
      width: 'w-20',
    },
    {
      img: '/assets/img/Footer/Cards.png',
      title: 'Get 2 free samples',
      text: 'with all orders',
      width: 'w-24',
    },
    {
      img: '/assets/img/Footer/Lips.png',
      title: 'Unlock rewards and benefits',
      text: "with Charlotte's Darlings Loyalty Club",
      width: 'w-16',
    },
    {
      img: '/assets/img/Footer/Miror.png',
      title: 'Complete your Beauty Profile',
      text: 'to get personalised recommendations',
      width: 'w-14',
    },
    {
      img: '/assets/img/Footer/Logo.png',
      title: 'Download the App',
      text: 'Easy beauty for you',
      width: 'w-16',
    },
    {
      img: '/assets/img/Footer/Phone.png',
      title: 'Book a 1:1 Online Beauty Consultation',
      text: "With Charlotte's pro makeup artists.",
      width: 'w-16',
    },
  ];

export const DataProvider = ({ children }) => {
    const defaultTrending = Array.isArray(trendingData) ? trendingData : (trendingData?.default || []);
    const defaultBestSellers = Array.isArray(bestSellersData) ? bestSellersData : (bestSellersData?.default || []);
    
    const [trending, setTrending] = useState(defaultTrending);
    const [bestSellers, setBestSellers] = useState(defaultBestSellers);
    const [selectedCountry, setSelectedCountry] = useState(countriesList['AMERICAS'][0]);

    return (
        <ProductContext.Provider value={{ 
            trending, 
            bestSellers, 
            setTrending, 
            setBestSellers,
            selectedCountry,
            setSelectedCountry,
            footerLinks,
            topCards,
            countries: countriesList,
            mobileMenuData,
            menuData,
            formatPrice,
            staticProductDetail
        }}>
            {children}
        </ProductContext.Provider>
    );
};

export const useProduct = () => {
    return useContext(ProductContext);
};
