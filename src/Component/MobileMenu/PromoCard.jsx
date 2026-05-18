import React from "react";

function PromoCard({ promo }) {
  return (
    <div className="p-4 cursor-pointer group">
      <div className="relative overflow-hidden">
        <img
          src={promo.image}
          alt={promo.alt || promo.title}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
      </div>

      <h3 className="mt-3 text-sm font-serif tracking-wide text-gray-900 group-hover:text-gray-600 transition-colors duration-300">
        {promo.title}
      </h3>
    </div>
  );
}

export default PromoCard;