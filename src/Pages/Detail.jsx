import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router';
import { FaHeart, FaRegHeart, FaPlayCircle } from "react-icons/fa";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Tag, Truck, Gift, Coins, X, Check, ScanFace, Camera } from 'lucide-react';
import { TbDiamondsFilled, TbDroplet, TbClock, TbFlower } from "react-icons/tb";
import { useProduct } from '../Context/DataContext';
import { useBasket } from '../Context/BasketContext';
import { useWishlist } from '../Context/WishlistContext';
import ProductGallery from '../Component/ProductGallery';

const CustomArrow = ({ direction, onClick }) => {
    const isLeft = direction === 'left';
    return (
        <button
            onClick={(e) => {
                e.preventDefault();
                onClick();
            }}
            className={`absolute top-1/2 -translate-y-1/2 ${isLeft ? 'left-4' : 'right-4'} w-10 h-10 rounded-full bg-white/85 hover:bg-white flex items-center justify-center z-[20] shadow-sm transition-colors border-none cursor-pointer`}
            aria-label={isLeft ? "Previous image" : "Next image"}
        >
            <ChevronLeft size={24} className={`text-[#340c0c] ${!isLeft && 'hidden'}`} strokeWidth={1.5} />
            <ChevronRight size={24} className={`text-[#340c0c] ${isLeft && 'hidden'}`} strokeWidth={1.5} />
        </button>
    );
};

const Accordion = ({ title, items }) => {
    const [isOpen, setIsOpen] = useState(false);

    if (!items || items.length === 0) return null;

    const renderIcon = (iconName) => {
        switch (iconName) {
            case 'Sparkle': return <TbDiamondsFilled size={18} className="text-[#340c0c] flex-shrink-0 mt-0.5" />;
            case 'Heart': return <FaRegHeart size={16} className="text-[#340c0c] flex-shrink-0 mt-0.5" />;
            case 'Drop': return <TbDroplet size={18} className="text-[#340c0c] flex-shrink-0 mt-0.5" />;
            case 'Leaf': return <TbFlower size={18} className="text-[#340c0c] flex-shrink-0 mt-0.5" />;
            case 'Clock': return <TbClock size={18} className="text-[#340c0c] flex-shrink-0 mt-0.5" />;
            default: return <TbDiamondsFilled size={18} className="text-[#340c0c] flex-shrink-0 mt-0.5" />;
        }
    };

    return (
        <article className="border-b border-[#eae6e6] py-5 cursor-pointer group" onClick={() => setIsOpen(!isOpen)}>
            <div className="flex justify-between items-center">
                <h3 className="font-optima uppercase text-[17px] font-medium text-[#340c0c] tracking-wide group-hover:text-[#856d6d] transition-colors">
                    {title}
                </h3>
                {isOpen ? <ChevronUp size={20} className="text-[#340c0c]" /> : <ChevronDown size={20} className="text-[#340c0c]" />}
            </div>
            <div className={`mt-5 space-y-4 overflow-hidden transition-all duration-300 ${isOpen ? 'block' : 'hidden'}`}>
                {items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                        {renderIcon(item.icon)}
                        <p className="text-[14px] text-[#340c0c] font-helveticaN leading-relaxed">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>
        </article>
    );
};

const ShadePicker = ({ shades, selectedShade, onSelectShade }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    if (!shades || shades.length === 0) return null;

    return (
        <section className="mt-6 mb-6">
            {/* The Grid of Square Swatches */}
            <div className="grid grid-cols-6 md:grid-cols-7 gap-1 mb-5">
                {shades.map((shade, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelectShade(shade)}
                        className={`aspect-square w-full transition-all relative ${selectedShade?.name === shade.name ? 'border-[1.5px] border-[#340c0c] p-[2px]' : 'border border-transparent hover:border-[#eae6e6] p-0'}`}
                        aria-label={`Select shade ${shade.name}`}
                        title={shade.name}
                    >
                        <img src={shade.swatchImage} alt={shade.name} className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>

            {/* The Selected Shade Button (Dropdown trigger) */}
            <button
                onClick={() => setIsSidebarOpen(true)}
                className="w-full flex items-center justify-between border border-[#eae6e6] p-4 hover:border-[#340c0c] transition-colors bg-white group"
            >
                <div className="flex items-center gap-4">
                    <img src={selectedShade?.swatchImage} alt={selectedShade?.name} className="w-8 h-8 object-cover" />
                    <span className="text-[#340c0c] font-helveticaN text-[15px]">{selectedShade?.name}</span>
                </div>
                <ChevronRight size={20} strokeWidth={1} className="text-[#856d6d] group-hover:text-[#340c0c]" />
            </button>

            {/* Additional buttons below it like in screenshot */}
            <div className="grid grid-cols-2 gap-3 mt-4">
                <button className="flex items-center justify-center gap-2 border border-[#eae6e6] py-3.5 hover:border-[#340c0c] transition-colors">
                    <ScanFace size={16} strokeWidth={1.5} className="text-[#340c0c]" />
                    <span className="font-helveticaN uppercase text-[12px] font-bold tracking-widest text-[#340c0c]">HOW TO APPLY</span>
                </button>
                <button className="flex items-center justify-center gap-2 border border-[#eae6e6] py-3.5 hover:border-[#340c0c] transition-colors">
                    <Camera size={16} strokeWidth={1.5} className="text-[#340c0c]" />
                    <span className="font-helveticaN uppercase text-[12px] font-bold tracking-widest text-[#340c0c]">TRY ON</span>
                </button>
            </div>

            {/* Sidebar (Drawer) */}
            {isSidebarOpen && createPortal(
                <div className="fixed inset-0 z-[9999] flex justify-end">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50 transition-all duration-300"
                        onClick={() => setIsSidebarOpen(false)}
                    ></div>

                    {/* Drawer Content */}
                    <div className="relative w-full md:w-[420px] h-full bg-white flex flex-col shadow-2xl animate-in slide-in-from-right duration-300 z-[10000]">
                        <div className="flex items-center justify-between p-6 border-b border-[#eae6e6]">
                            <h2 className="font-helveticaN font-bold text-[16px] tracking-widest text-[#340c0c] uppercase">
                                {shades.length} SHADES
                            </h2>
                            <button onClick={() => setIsSidebarOpen(false)} className="text-[#856d6d] hover:text-[#340c0c] transition-colors">
                                <X size={28} strokeWidth={1} />
                            </button>
                        </div>
                        <div className="flex-1 overflow-y-auto p-2">
                            {shades.map((shade, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        onSelectShade(shade);
                                        setIsSidebarOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between p-4 hover:bg-[#f9f8f6] transition-colors ${selectedShade?.name === shade.name ? 'bg-[#f9f8f6]' : ''}`}
                                >
                                    <div className="flex items-center gap-5">
                                        <img src={shade.swatchImage} alt={shade.name} className="w-10 h-10 object-cover" />
                                        <span className="text-[#340c0c] font-helveticaN text-[15px]">{shade.name}</span>
                                    </div>
                                    {selectedShade?.name === shade.name && <Check size={24} strokeWidth={1} className="text-[#340c0c]" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </section>
    );
};

const CrossSellCard = ({ relatedItem, handleAddtoBasket, toggleWishlist, isInWishlist }) => {
    const isLiked = isInWishlist(relatedItem);
    return (
        <article className="group flex flex-col relative h-full">
            <Link to="/product" state={{ product: relatedItem }} className="relative mb-4 bg-[#f9f8f6] aspect-square flex justify-center items-center p-6 overflow-hidden">
                {relatedItem?.badge && (
                    <div className="absolute top-3 left-3 bg-[#fdf3f0] text-[#340c0c] text-[10px] font-helveticaN uppercase tracking-widest px-2 py-1 z-10 shadow-sm">
                        {relatedItem.badge}
                    </div>
                )}
                <button
                    className="absolute top-3 right-3 text-[#340c0c] opacity-0 group-hover:opacity-100 transition-transform hover:scale-110 z-10"
                    aria-label="Add to wishlist"
                    onClick={(e) => { e.preventDefault(); toggleWishlist(relatedItem); }}
                >
                    {isLiked ? <FaHeart size={20} color="#3a080a" /> : <FaRegHeart size={20} color="#3a080a" />}
                </button>
                <img src={relatedItem.cardImages?.main || relatedItem.images?.main || relatedItem.image} alt={relatedItem.title} className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105" />
            </Link>

            <div className="flex flex-col flex-grow text-center">
                <Link to="/product" state={{ product: relatedItem }} className="group-hover:text-[#856d6d] transition-colors">
                    <h3 className="font-optima uppercase text-[14px] font-bold text-[#340c0c] tracking-wide line-clamp-1">
                        {relatedItem.title}
                    </h3>
                    <p className="text-[#856d6d] uppercase text-[11px] tracking-wider mb-3 mt-1 line-clamp-1 font-helveticaN">
                        {relatedItem.subtitle || relatedItem.subTitle}
                    </p>
                </Link>

                <div className="mt-auto">
                    <span className="text-[#340c0c] font-medium text-[15px] font-helveticaN">{relatedItem.price}</span>
                    <button
                        onClick={() => handleAddtoBasket(relatedItem)}
                        className="w-full mt-4 border border-[#340c0c] py-2.5 text-[#340c0c] hover:bg-[#340c0c] hover:text-white font-helveticaN uppercase tracking-wider text-[12px] transition-colors duration-300"
                    >
                        Add to Bag
                    </button>
                </div>
            </div>
        </article>
    );
};

function Detail() {
    const { trending, selectedCountry } = useProduct();
    const { handleAddtoBasket } = useBasket();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const location = useLocation();

    const [activeImage, setActiveImage] = useState(0);
    const [selectedShade, setSelectedShade] = useState(null);

    const rawProduct = location.state?.product || trending?.[0];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveImage(0);
        if (rawProduct?.shades?.length > 0) {
            setSelectedShade(rawProduct.shades[0]);
        } else if (rawProduct?.detailPageData?.shades?.length > 0) {
            setSelectedShade(rawProduct.detailPageData.shades[0]);
        } else {
            setSelectedShade(null);
        }
    }, [location.state, rawProduct]);

    if (!trending || trending.length === 0 || !rawProduct) {
        return (
            <main className="h-screen flex justify-center items-center text-[#340c0c] font-optima text-2xl">
                Loading Magic...
            </main>
        );
    }

    const mainTitle = rawProduct.title || "PRODUCT TITLE";
    const baseSubTitle = rawProduct.subtitle || rawProduct.subTitle || "";

    // Extract currency symbol from selectedCountry (e.g. 'USD $' → '$', 'GBP £' → '£')
    const currencySymbol = selectedCountry?.currency?.split(' ')?.pop() || '$';

    // Support advanced shade structure: if shade has its own gallery/price
    const currentGallery = selectedShade?.media?.length > 0 ? selectedShade.media : (rawProduct?.media?.length > 0 ? rawProduct.media : (selectedShade?.gallery?.length > 0 ? selectedShade.gallery : (selectedShade?.galleryImages?.length > 0 ? selectedShade.galleryImages : (rawProduct.detailPageData?.gallery || rawProduct.galleryImages || [rawProduct.cardImages?.main, rawProduct.cardImages?.hover, rawProduct.images?.main, rawProduct.images?.hover].filter(Boolean)))));
    const mainDisplayImage = currentGallery[activeImage] || currentGallery[0];

    const currentPrice = selectedShade?.price || rawProduct.price;
    const currentSubTitle = selectedShade?.name || baseSubTitle;

    const crossSells = trending.filter(item => item.title !== rawProduct.title).slice(0, 4);

    const accordions = rawProduct.detailPageData?.accordions || [];
    const magicAndScienceItems = accordions.find(a => a.title === "WHAT MAKES IT MAGIC")?.content.split('\n').map((text, i) => ({ icon: i % 2 === 0 ? "Sparkle" : "Drop", text })) || [{ icon: "Sparkle", text: "Smoothing, pore-blurring effect" }];
    const ingredientsItems = [{ icon: "Leaf", text: accordions.find(a => a.title === "INGREDIENTS")?.content || "Nourishing ingredients" }];
    const applyItems = [{ icon: "Sparkle", text: accordions.find(a => a.title === "HOW TO APPLY")?.content || "Apply precisely for maximum magical effect!" }];

    return (
        <main className="bg-white min-h-screen font-helveticaN pb-[90px]">

            <div className="container max-w-[1250px] mx-auto px-4 md:px-8">

                <nav className="py-4" aria-label="Breadcrumb">
                    <p className="text-xs text-[#856d6d] uppercase font-helveticaN tracking-wide line-clamp-1">
                        Home / Makeup / <span className="text-[#340c0c] font-semibold">{mainTitle}</span>
                    </p>
                </nav>

                <section className="py-4 md:py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

                        {/* ===== MOBILE: Title + Price (shown above gallery on small screens) ===== */}
                        <aside className="lg:col-span-7 flex flex-col gap-6 lg:contents">

                            <div className="lg:hidden">
                                <h1 className="text-3xl font-optima uppercase text-[#340c0c] tracking-wider leading-[1.1]">
                                    {mainTitle}
                                </h1>
                                {currentSubTitle && (
                                    <p className="text-[#856d6d] uppercase font-helveticaN text-sm mt-1 tracking-wide">
                                        {currentSubTitle}
                                    </p>
                                )}
                                <div className="flex items-end gap-2 mt-4">
                                    <span className="text-xl font-helveticaN font-medium text-[#340c0c]">{currentPrice}</span>
                                    {rawProduct.originalPrice && (
                                        <span className="text-[#856d6d] text-[15px] line-through mb-0.5 font-helveticaN">{rawProduct.originalPrice}</span>
                                    )}
                                </div>
                            </div>

                            {/* ===== DESKTOP: Gallery ===== */}
                            <div className="hidden lg:block lg:col-span-7 w-full">
                                <div className="flex flex-row gap-4 w-full">
                                    {/* Thumbnails */}
                                    <div className="flex flex-col gap-3 w-[150px] flex-shrink-0 max-h-[calc(100vh-120px)] overflow-y-auto no-scrollbar">
                                        {currentGallery.map((img, idx) => (
                                            <button
                                                key={idx}
                                                onClick={() => setActiveImage(idx)}
                                                className={`relative w-full h-[150px] flex-shrink-0 border transition-all duration-200 ${activeImage === idx ? 'border-[#340c0c] shadow-sm' : 'border-transparent hover:border-[#eae6e6]'}`}
                                                aria-label={`View product image ${idx + 1}`}
                                            >
                                                {img?.type === 'video' || img?.placeholder || (typeof img === 'string' && img.startsWith('data:image/svg')) ? (
                                                    <div className="w-full h-full bg-[#ede8e3] flex items-center justify-center">
                                                        <FaPlayCircle size={20} className="text-white/80" />
                                                    </div>
                                                ) : (
                                                    <img src={img?.url || img} alt={`${mainTitle} Thumbnail ${idx + 1}`} className="w-full h-full object-cover bg-[#f5f0ee]" />
                                                )}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Main Image / Video */}
                                    <div className="flex-1 bg-[#f5f0ee] flex items-center justify-center p-0 relative overflow-hidden group">
                                        {rawProduct.badge && (
                                            <div className="absolute top-4 left-4 bg-[#340c0c] text-white text-[11px] font-helveticaN uppercase tracking-widest px-3 py-1 z-10 shadow-sm">
                                                {rawProduct.badge}
                                            </div>
                                        )}


                                        {/* Custom Slider Buttons */}
                                        {currentGallery.length > 1 && (
                                            <>
                                                <CustomArrow direction="left" onClick={() => setActiveImage(prev => prev === 0 ? currentGallery.length - 1 : prev - 1)} />
                                                <CustomArrow direction="right" onClick={() => setActiveImage(prev => prev === currentGallery.length - 1 ? 0 : prev + 1)} />
                                            </>
                                        )}

                                        {/* Main Display */}
                                        {mainDisplayImage?.type === 'video' && !mainDisplayImage.placeholder ? (
                                            <video src={mainDisplayImage.url} autoPlay muted loop playsInline className="w-full h-auto object-contain" />
                                        ) : mainDisplayImage?.placeholder || (typeof mainDisplayImage === 'string' && mainDisplayImage.startsWith('data:image/svg')) ? (
                                            <div className="flex flex-col items-center justify-center text-[#9c8a82] font-optima uppercase tracking-wider w-full min-h-[500px]">
                                                <FaPlayCircle size={48} className="mb-4 text-[#340c0c]/50" />
                                                <span>Video coming soon</span>
                                            </div>
                                        ) : (
                                            <img
                                                src={mainDisplayImage?.url || mainDisplayImage}
                                                alt={mainTitle}
                                                className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* ===== MOBILE: ProductGallery Component ===== */}
                            <div className="block lg:hidden w-full">
                                <ProductGallery galleryImages={currentGallery} productName={mainTitle} />
                            </div>

                            <div className="lg:hidden mt-2">
                                <ShadePicker
                                    shades={rawProduct.shades || rawProduct.detailPageData?.shades}
                                    selectedShade={selectedShade}
                                    onSelectShade={setSelectedShade}
                                />
                            </div>
                        </aside>

                        {/* ===== RIGHT COLUMN: Product Info ===== */}
                        <article className="lg:col-span-5 w-full lg:sticky lg:top-28 pb-12">
                            <div className="flex flex-col gap-0 w-full h-fit">

                                <header className="hidden lg:block">
                                    <div className="flex items-start justify-between gap-4">
                                        <h1 className="text-[28px] font-optima uppercase text-[#340c0c] tracking-wider leading-[1.15]">
                                            {mainTitle}
                                        </h1>
                                        <button
                                            onClick={() => toggleWishlist(selectedShade ? { ...rawProduct, selectedShade } : rawProduct)}
                                            className="mt-1 flex-shrink-0 hover:scale-110 transition-transform"
                                            aria-label="Add to wishlist"
                                        >
                                            {isInWishlist(selectedShade ? { ...rawProduct, selectedShade } : rawProduct) ? <FaHeart size={22} color="#3a080a" /> : <FaRegHeart size={22} color="#3a080a" />}
                                        </button>
                                    </div>
                                    {currentSubTitle && (
                                        <p className="text-[#856d6d] uppercase font-helveticaN text-[14px] mt-1 tracking-wide">
                                            {currentSubTitle}
                                        </p>
                                    )}

                                    <div className="flex items-baseline gap-2 mt-5">
                                        <span className="text-[22px] font-helveticaN font-medium text-[#340c0c]">{currentPrice}</span>
                                        {rawProduct.unitPrice && (
                                            <span className="text-[#856d6d] text-[13px] font-helveticaN">({rawProduct.unitPrice})</span>
                                        )}
                                        {rawProduct.originalPrice && (
                                            <span className="text-[#856d6d] text-[15px] line-through font-helveticaN">{rawProduct.originalPrice}</span>
                                        )}
                                    </div>

                                </header>

                                <p className="text-[#340c0c] font-helveticaN text-[15px] leading-relaxed mb-6">
                                    {rawProduct.detailPageData?.description || "Experience the flawless Charlotte Tilbury magic! Perfectly formulated for an elegant finish."}
                                </p>

                                <div className="hidden lg:block">
                                    <ShadePicker
                                        shades={rawProduct.shades || rawProduct.detailPageData?.shades}
                                        selectedShade={selectedShade}
                                        onSelectShade={setSelectedShade}
                                    />
                                </div>

                                <div className="flex flex-col mb-8 border-t border-[#eae6e6]">
                                    <Accordion title="What Makes It Magic?" items={magicAndScienceItems} />
                                    <Accordion title="Ingredients" items={ingredientsItems} />
                                    <Accordion title="How To Apply" items={applyItems} />
                                </div>

                                <section className="flex flex-col gap-4 mb-8">
                                    <div className="bg-[#fdf3f0] p-4 flex items-center gap-3">
                                        <Gift size={24} className="text-[#340c0c] flex-shrink-0" />
                                        <p className="text-sm text-[#340c0c] font-helveticaN">
                                            <span className="font-bold">FREE MAGIC MOTHER'S DAY GIFTS!</span> Choose a complimentary mini kit at checkout.
                                        </p>
                                    </div>

                                    <div className="bg-[#f9f8f6] p-4 flex flex-col gap-3">
                                        <h4 className="font-optima uppercase text-[#340c0c] text-sm tracking-wide font-bold">Charlotte Tilbury Exclusives</h4>
                                        <div className="flex items-center gap-3">
                                            <Coins size={18} className="text-[#340c0c] flex-shrink-0" />
                                            <p className="text-xs text-[#340c0c] font-helveticaN">Earn Loyalty Coins every time you shop!</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <Truck size={18} className="text-[#340c0c] flex-shrink-0" />
                                            <p className="text-xs text-[#340c0c] font-helveticaN">Free standard delivery on orders over {currencySymbol}49</p>
                                        </div>
                                    </div>
                                </section>

                            </div>
                        </article>
                    </div>
                </section>

                {crossSells.length > 0 && (
                    <section className="mt-16 mb-24 border-t border-[#eae6e6] pt-16">
                        <h2 className="text-2xl md:text-[32px] font-optima text-center text-[#340c0c] uppercase tracking-widest mb-10">
                            You May Also Love
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                            {crossSells.map((relatedItem, idx) => (
                                <CrossSellCard key={idx} relatedItem={relatedItem} handleAddtoBasket={handleAddtoBasket} toggleWishlist={toggleWishlist} isInWishlist={isInWishlist} />
                            ))}
                        </div>
                    </section>
                )}

            </div> {/* end container */}

            {/* Mobile Sticky Bottom Bar */}
            <aside className="md:hidden fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.15)] z-[60] flex flex-col border-t border-[#eae6e6]">
                <div className="px-4 py-3 w-full flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {selectedShade?.swatchImage ? (
                            <img src={selectedShade.swatchImage} alt={currentSubTitle} className="w-5 h-5 object-cover" />
                        ) : (
                            <div className="w-5 h-5 bg-[#f5f0ee]"></div>
                        )}
                        <span className="text-[#856d6d] uppercase text-[12px] font-helveticaN tracking-wide mt-0.5">
                            {currentSubTitle}
                        </span>
                    </div>
                    <span className="font-medium text-[#340c0c] text-[14px] font-helveticaN">
                        {currentPrice}
                    </span>
                </div>
                <div className="px-4 pb-4">
                    <button
                        onClick={() => handleAddtoBasket(selectedShade ? { ...rawProduct, selectedShade } : rawProduct)}
                        className="w-full bg-[#3a080a] hover:bg-[#2d0a0a] text-white py-3.5 font-helveticaN uppercase tracking-widest text-[13px] transition-colors font-bold shadow-sm"
                    >
                        ADD TO BAG
                    </button>
                </div>
            </aside>

            {/* Desktop Sticky Bottom Bar */}
            <aside className="hidden md:flex fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-[60] items-stretch h-[80px]">
                <div className="flex-1 max-w-[1470px] mx-auto w-full flex justify-between items-center px-8">

                    <div className="flex items-center gap-4">
                        <img
                            src={currentGallery[0]?.url || currentGallery[0]}
                            alt={`${mainTitle} Thumbnail`}
                            className="h-[60px] w-[60px] object-cover border border-[#eae6e6] bg-[#f9f8f6]"
                        />
                        <div className="flex flex-col justify-center">
                            <span className="font-optima uppercase text-[#340c0c] font-bold text-[15px] tracking-widest line-clamp-1">
                                {mainTitle}
                            </span>
                            <span className="text-[#856d6d] uppercase text-[11px] font-helveticaN tracking-wide mt-0.5 line-clamp-1">
                                {currentSubTitle}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-8">
                        <span className="font-medium text-[#340c0c] text-xl font-helveticaN">{currentPrice}</span>
                        <button
                            onClick={() => handleAddtoBasket(selectedShade ? { ...rawProduct, selectedShade } : rawProduct)}
                            className="bg-[#3a080a] hover:bg-[#2d0a0a] text-white px-12 py-3.5 font-helveticaN uppercase tracking-widest text-[13px] transition-colors font-bold shadow-sm whitespace-nowrap"
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