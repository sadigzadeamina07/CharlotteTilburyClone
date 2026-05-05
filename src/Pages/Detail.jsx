import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { FaHeart, FaRegHeart, FaPlayCircle } from "react-icons/fa";
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Tag, Truck, Gift, Coins } from 'lucide-react';
import { TbDiamondsFilled, TbDroplet, TbClock, TbFlower } from "react-icons/tb";
import { useProduct } from '../Context/DataContext';
import { useBasket } from '../Context/BasketContext';
import { useWishlist } from '../Context/WishlistContext';

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
    if (!shades || shades.length === 0) return null;

    return (
        <section className="mt-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
                <p className="text-[12px] font-bold text-[#340c0c] font-helveticaN uppercase tracking-widest">SHADE:</p>
                <span className="text-[#856d6d] text-[13px] font-helveticaN">{selectedShade?.name || 'Select a shade'}</span>
            </div>
            <div className="flex flex-wrap gap-2">
                {shades.map((shade, idx) => (
                    <button
                        key={idx}
                        onClick={() => onSelectShade(shade)}
                        className={`w-9 h-9 md:w-10 md:h-10 transition-all ${selectedShade?.name === shade.name ? 'border-[2px] border-[#340c0c] scale-105 shadow-sm p-0.5' : 'border border-[#eae6e6] hover:border-[#856d6d] p-0'}`}
                        aria-label={`Select shade ${shade.name}`}
                        title={shade.name}
                    >
                        <div className="w-full h-full" style={{ backgroundColor: shade.hexColor || shade.color }}></div>
                    </button>
                ))}
            </div>
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
                <img src={relatedItem.cardImages?.main || relatedItem.image} alt={relatedItem.title} className="max-w-full max-h-full object-contain transition-transform duration-700 group-hover:scale-105" />
            </Link>

            <div className="flex flex-col flex-grow text-center">
                <Link to="/product" state={{ product: relatedItem }} className="group-hover:text-[#856d6d] transition-colors">
                    <h3 className="font-optima uppercase text-[14px] font-bold text-[#340c0c] tracking-wide line-clamp-1 group-hover:underline">
                        {relatedItem.title}
                    </h3>
                    <p className="text-[#856d6d] uppercase text-[11px] tracking-wider mb-3 mt-1 line-clamp-1 font-helveticaN">
                        {relatedItem.subTitle}
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
    const { trending } = useProduct();
    const { handleAddtoBasket } = useBasket();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const location = useLocation();

    const [activeImage, setActiveImage] = useState(0);
    const [selectedShade, setSelectedShade] = useState(null);

    const rawProduct = location.state?.product || trending?.[0];

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setActiveImage(0);
        if (rawProduct?.detailPageData?.shades?.length > 0) {
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
    const baseSubTitle = rawProduct.subTitle || "";
    
    // Support advanced shade structure: if shade has its own gallery/price
    const currentGallery = selectedShade?.gallery?.length > 0 ? selectedShade.gallery : (rawProduct.detailPageData?.gallery || [rawProduct.cardImages?.main, rawProduct.cardImages?.hover].filter(Boolean));
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
            
            <nav className="container max-w-[1470px] mx-auto px-4 md:px-8 py-4" aria-label="Breadcrumb">
               <p className="text-xs text-[#856d6d] uppercase font-helveticaN tracking-wide line-clamp-1">
                   Home / Makeup / <span className="text-[#340c0c] font-semibold">{mainTitle}</span>
               </p>
            </nav>

            <section className="container max-w-[1470px] mx-auto px-4 md:px-8 py-4 md:py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                    
                    <aside className="lg:col-span-7 flex flex-col gap-6">
                        
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

                        <div className="flex flex-col-reverse md:flex-row gap-4 lg:sticky lg:top-4 h-fit">
                            
                            <div className="flex md:flex-col gap-3 overflow-x-auto md:w-[90px] md:overflow-visible flex-shrink-0 no-scrollbar">
                                {currentGallery.map((img, idx) => (
                                    <button 
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`relative w-16 h-16 md:w-full md:h-[90px] flex-shrink-0 border transition-all duration-200 ${activeImage === idx ? 'border-[#340c0c] shadow-sm' : 'border-transparent hover:border-[#eae6e6]'}`}
                                        aria-label={`View product image ${idx + 1}`}
                                    >
                                        <img src={img} alt={`${mainTitle} Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                            
                            <div className="flex-1 bg-white flex items-center justify-center p-8 md:p-16 relative aspect-square md:aspect-auto md:min-h-[600px] overflow-hidden group">
                                {rawProduct.badge && (
                                    <div className="absolute top-4 left-4 bg-[#340c0c] text-white text-[11px] font-helveticaN uppercase tracking-widest px-3 py-1 z-10 shadow-sm">
                                        {rawProduct.badge}
                                    </div>
                                )}
                                <button 
                                    onClick={() => toggleWishlist(rawProduct)}
                                    className="absolute top-4 right-4 text-[#340c0c] hover:scale-110 transition-transform z-10" 
                                    aria-label="Add to wishlist"
                                >
                                    {isInWishlist(rawProduct) ? <FaHeart size={24} color="#3a080a" /> : <FaRegHeart size={24} color="#3a080a" />}
                                </button>
                                <img 
                                    src={mainDisplayImage} 
                                    alt={mainTitle} 
                                    className="w-full max-w-[450px] object-contain drop-shadow-md transition-transform duration-500 group-hover:scale-105" 
                                />
                            </div>
                        </div>

                        <div className="lg:hidden mt-2">
                            <button 
                                onClick={() => handleAddtoBasket(rawProduct)}
                                className="w-full bg-[#3a080a] text-white py-4 font-helveticaN uppercase tracking-widest text-[13px] hover:bg-[#2d0a0a] transition-colors font-bold shadow-md"
                            >
                                Add To Bag - {currentPrice}
                            </button>
                        </div>
                    </aside>

                    <article className="lg:col-span-5 flex flex-col">
                        
                        <header className="hidden lg:block">
                            <h1 className="text-[36px] font-optima uppercase text-[#340c0c] tracking-wider leading-[1.1]">
                                {mainTitle}
                            </h1>
                            {currentSubTitle && (
                                <p className="text-[#856d6d] uppercase font-helveticaN text-base mt-2 tracking-wide">
                                    {currentSubTitle}
                                </p>
                            )}
                            
                            <div className="flex items-end gap-3 mt-6">
                                <span className="text-2xl font-helveticaN font-medium text-[#340c0c]">{currentPrice}</span>
                                {rawProduct.originalPrice && (
                                    <span className="text-[#856d6d] text-lg line-through mb-0.5 font-helveticaN">{rawProduct.originalPrice}</span>
                                )}
                            </div>

                            <ShadePicker 
                                shades={rawProduct.detailPageData?.shades} 
                                selectedShade={selectedShade} 
                                onSelectShade={setSelectedShade} 
                            />

                            <button 
                                onClick={() => handleAddtoBasket(rawProduct)}
                                className="w-full bg-[#3a080a] text-white py-4 mt-2 mb-8 font-helveticaN uppercase tracking-widest text-[13px] hover:bg-[#2d0a0a] transition-colors font-bold shadow-md"
                            >
                                ADD TO BAG
                            </button>
                        </header>

                        <p className="text-[#340c0c] font-helveticaN text-[15px] leading-relaxed mb-6">
                            {rawProduct.detailPageData?.description || "Experience the flawless Charlotte Tilbury magic! Perfectly formulated for an elegant finish."}
                        </p>

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
                                    <p className="text-xs text-[#340c0c] font-helveticaN">Free standard delivery on all orders</p>
                                </div>
                            </div>
                        </section>

                    </article>
                </div>
            </section>

            {crossSells.length > 0 && (
                <section className="mt-16 mb-24 px-4 md:px-8 max-w-[1470px] mx-auto border-t border-[#eae6e6] pt-16">
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

            <aside className="fixed bottom-0 left-0 w-full bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.08)] z-[60] flex items-stretch h-[75px] md:h-[80px]">
                <div className="flex-1 max-w-[1470px] mx-auto w-full flex justify-between items-center px-4 md:px-8">
                    
                    <div className="flex items-center gap-4">
                        <img 
                            src={mainDisplayImage} 
                            alt={`${mainTitle} Thumbnail`} 
                            className="h-[50px] w-[50px] md:h-[60px] md:w-[60px] object-cover border border-[#eae6e6] bg-[#f9f8f6] hidden sm:block"
                        />
                        <div className="flex flex-col justify-center">
                            <span className="font-optima uppercase text-[#340c0c] font-bold text-[13px] md:text-[15px] tracking-widest line-clamp-1">
                                {mainTitle}
                            </span>
                            <span className="text-[#856d6d] uppercase text-[10px] md:text-[11px] font-helveticaN tracking-wide mt-0.5 line-clamp-1">
                                {currentSubTitle}
                            </span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-4 md:gap-8">
                        <div className="hidden md:flex flex-col md:flex-row md:items-center md:gap-4">
                            <span className="font-medium text-[#340c0c] text-xl font-helveticaN">{currentPrice}</span>
                        </div>
                        <button 
                            onClick={() => handleAddtoBasket(rawProduct)}
                            className="bg-[#3a080a] hover:bg-[#2d0a0a] text-white px-6 md:px-12 py-3 md:py-3.5 font-helveticaN uppercase tracking-widest text-[12px] md:text-[13px] transition-colors font-bold shadow-sm whitespace-nowrap"
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