import React, { useState } from 'react';
import { Link } from 'react-router';
import { Heart, ChevronDown, Ruler } from 'lucide-react';
import ProductGallery from '../Component/ProductGallery';

// DUMMY DATA: Charlotte Tilbury üslubunda məhsul datası
const productData = {
  title: "AIRBRUSH FLAWLESS FINISH",
  price: "$50.00",
  category: "MAKEUP",
  description: "AIRbrush-effect makeup finishing powder for tan skin tones. Minimizes shine with a soft-focus finish.",
  shades: [
    {
      name: "1 Fair",
      swatchImage: "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_50/catalog/products/p/o/powder-swatch-1-fair.jpg",
      galleryImages: [
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-1-fair-open.jpg",
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-1-fair-model.jpg",
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-1-fair-closed.jpg"
      ]
    },
    {
      name: "2 Medium",
      swatchImage: "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_50/catalog/products/p/o/powder-swatch-2-medium.jpg",
      galleryImages: [
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-2-medium-open.jpg",
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-2-medium-model.jpg",
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-2-medium-closed.jpg"
      ]
    },
    {
      name: "3 Tan",
      swatchImage: "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_50/catalog/products/p/o/powder-swatch-3-tan.jpg",
      galleryImages: [
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-3-tan-open.jpg",
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-3-tan-model.jpg",
        "https://media.charlottetilbury.com/image/upload/f_auto,q_auto,w_800/catalog/products/p/o/powder-3-tan-closed.jpg"
      ]
    }
  ]
};

// ==========================================
// COMPONENT 1: Image Gallery (Sol Sütun)
// ==========================================
const ImageGallery = ({ selectedShade }) => {
  const images = selectedShade?.galleryImages || [];
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="flex flex-col-reverse md:flex-row gap-4 h-full">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto custom-scrollbar w-full md:w-[15%] flex-shrink-0">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(img)}
            className={`w-[80px] h-[80px] border shrink-0 transition-all ${mainImage === img ? 'border-[#340c0c]' : 'border-transparent hover:border-[#eae6e6]'}`}
          >
            {/* Saytdan real image url götürməsə placeholder göstərir */}
            <img
              src={img}
              onError={(e) => { e.target.src = `https://via.placeholder.com/800x800/f5f5f5/340c0c?text=CT+Image+${idx + 1}` }}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-[#f5f5f5] relative aspect-square md:aspect-auto">
        <img
          src={mainImage}
          onError={(e) => { e.target.src = `https://via.placeholder.com/800x800/f5f5f5/340c0c?text=Main+CT+Image` }}
          alt="Main Product"
          className="w-full h-full object-cover animate-[fadeIn_0.3s_ease-in-out]"
          key={mainImage} // Key dəyişdikcə şəklin yenidən mount olması və fade-in işləməsi üçün
        />
      </div>
    </div>
  );
};

// ==========================================
// COMPONENT 2: Product Info (Sağ Sütun)
// ==========================================
const ProductInfo = ({ product, selectedShade, setSelectedShade }) => {
  const [purchaseType, setPurchaseType] = useState('one-time');

  return (
    <div className="flex flex-col h-full text-[#340c0c]">
      {/* Header: Title and Wishlist */}
      <div className="flex justify-between items-start mb-2">
        <h1 className="text-[28px] font-sans font-normal uppercase leading-tight pr-4">{product.title}</h1>
        <button className="p-2 hover:bg-[#f5f5f5] rounded-full transition-colors shrink-0">
          <Heart size={24} strokeWidth={1} color="#340c0c" />
        </button>
      </div>

      {/* Selected Shade Name Display */}
      <p className="text-[14px] uppercase text-[#856d6d] tracking-wide mb-4">
        {selectedShade.name}
      </p>

      {/* Price */}
      <p className="text-[20px] font-bold mb-6">{product.price}</p>

      {/* Shade Selection Area */}
      <div className="mb-6">
        {/* Active Shade Selector Box */}
        <div className="flex gap-2 border border-[#eae6e6] p-3 mb-4 cursor-pointer hover:border-[#340c0c] transition-colors">
          <div className="w-[30px] h-[30px] shrink-0 overflow-hidden bg-[#f5f5f5]">
            <img
              src={selectedShade.swatchImage}
              onError={(e) => { e.target.src = `https://via.placeholder.com/50x50/eccbb5/340c0c?text=S` }}
              alt={selectedShade.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex justify-between items-center text-[13px] font-bold">
            <span>{selectedShade.name}</span>
            <ChevronDown size={18} />
          </div>
        </div>

        {/* Swatches List */}
        <div className="flex gap-2 flex-wrap">
          {product.shades.map((shade, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedShade(shade)}
              className={`w-[45px] h-[45px] overflow-hidden border-2 transition-all outline-none ${selectedShade.name === shade.name ? 'border-[#340c0c] scale-110' : 'border-transparent hover:border-[#eae6e6]'}`}
              title={shade.name}
            >
              <img
                src={shade.swatchImage}
                onError={(e) => { e.target.src = `https://via.placeholder.com/50x50/eccbb5/340c0c?text=${idx + 1}` }}
                alt={shade.name}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Buttons & Actions */}
      <div className="flex flex-col gap-4 mb-8">
        <button className="w-full border border-[#340c0c] py-3 uppercase text-[12px] font-bold tracking-widest flex items-center justify-center gap-2 hover:bg-[#f5f5f5] transition-colors">
          <Ruler size={16} />
          HOW TO APPLY
        </button>

        {/* Purchase Options (Radio Buttons) */}
        <div className="border border-[#eae6e6]">
          {/* One-time purchase */}
          <label className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${purchaseType === 'one-time' ? 'bg-[#fcfcfc]' : ''}`}>
            <input
              type="radio"
              name="purchaseType"
              value="one-time"
              checked={purchaseType === 'one-time'}
              onChange={() => setPurchaseType('one-time')}
              className="accent-[#340c0c] w-4 h-4 cursor-pointer"
            />
            <div className="flex-1 flex justify-between items-center text-[14px]">
              <span>One-time purchase</span>
              <span>{product.price}</span>
            </div>
          </label>

          <div className="h-[1px] bg-[#eae6e6] w-full"></div>

          {/* Subscribe + Save */}
          <label className={`flex items-start gap-4 p-4 cursor-pointer transition-colors ${purchaseType === 'subscribe' ? 'bg-[#fcfcfc]' : ''}`}>
            <input
              type="radio"
              name="purchaseType"
              value="subscribe"
              checked={purchaseType === 'subscribe'}
              onChange={() => setPurchaseType('subscribe')}
              className="accent-[#340c0c] w-4 h-4 mt-1 cursor-pointer"
            />
            <div className="flex-1 text-[14px]">
              <div className="flex justify-between items-center mb-1">
                <span>Subscribe + save 15%</span>
                <span>$42.50</span>
              </div>
              <p className="text-[#856d6d] text-[12px] leading-relaxed mb-2">
                Save a magical 15% and enjoy free standard delivery on every scheduled order!
              </p>
              {purchaseType === 'subscribe' && (
                <div className="mt-3">
                  <select className="w-full border border-[#eae6e6] p-2 text-[13px] outline-none focus:border-[#340c0c]">
                    <option>every 3 months</option>
                    <option>every 4 months</option>
                  </select>
                </div>
              )}
            </div>
          </label>
        </div>

        {/* Primary CTA (Add to bag) */}
        <button className="w-full bg-[#340c0c] text-white py-4 uppercase text-[14px] font-bold tracking-widest hover:bg-[#1e0505] transition-colors shadow-lg mt-2">
          {purchaseType === 'subscribe' ? 'SET UP SUBSCRIPTION' : 'ADD TO BAG'}
        </button>
      </div>

      <p className="text-[13px] text-[#340c0c] mb-6 leading-relaxed">
        {product.description}
      </p>

      {/* Accordions (Məlumat Seksiyaları) */}
      <div className="border-t border-[#eae6e6]">
        {['THE MAGIC & SCIENCE', 'MAGIC INGREDIENTS', 'ABOUT THE PRODUCT', 'SHIPPING & DELIVERY INFORMATION'].map((tab) => (
          <div key={tab} className="border-b border-[#eae6e6] py-4 flex justify-between items-center cursor-pointer hover:bg-[#fcfcfc] transition-colors px-2">
            <span className="uppercase text-[12px] font-bold tracking-wider">{tab}</span>
            <ChevronDown size={16} />
          </div>
        ))}
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT: Product Detail Page
// ==========================================
export default function ProductDetail() {
  // Səhifə açılanda default olaraq ilk rəng seçili olur
  const [selectedShade, setSelectedShade] = useState(productData.shades[0]);

  return (
    <div className="min-h-screen bg-white pt-6 pb-20 font-sans">
      <div className="container max-w-[1470px] mx-auto px-4 md:px-8 overflow-visible">

        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-[11px] font-bold text-[#856d6d] uppercase tracking-widest mb-8">
          <Link to="/" className="hover:text-[#340c0c] transition-colors">HOME</Link>
          <span className="text-[#eae6e6]">/</span>
          <Link to="/makeup" className="hover:text-[#340c0c] transition-colors">{productData.category}</Link>
          <span className="text-[#eae6e6]">/</span>
          <span className="text-[#340c0c] line-clamp-1">{productData.title}</span>
        </div>

        {/* Məhsul Layout Grid-i (2 Sütun) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">

          {/* Sol Sütun: Qalereya */}
          <div className="lg:col-span-7 h-auto w-full">
            <ProductGallery galleryImages={selectedShade?.galleryImages || []} productName={productData.title} />
          </div>

          {/* Sağ Sütun: Məlumatlar və Düymələr */}
          <div className="lg:col-span-5 flex flex-col pt-2 lg:pt-0 lg:sticky lg:top-[100px]">
            <ProductInfo
              product={productData}
              selectedShade={selectedShade}
              setSelectedShade={setSelectedShade}
            />
          </div>

        </div>
      </div>
    </div>
  );
}
