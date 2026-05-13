import React from "react";
import { useNav } from "../../Context/NavContext";

export default function MenuLink({ item }) {
  const { navigateTo } = useNav();

  const handleClick = () => {
    if (item.hasSubMenu && item.targetId) {
      navigateTo(item.targetId);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex items-center justify-between py-4 px-6 border-b-[0.5px] border-gray-200 hover:bg-gray-50 transition-colors duration-200 text-left bg-white"
    >
      <span className="text-[15px] font-sans tracking-wide text-gray-800 flex items-center gap-2">
        {item.label}
        {item.icon === "star" && (
          <span className="text-yellow-500 text-lg">★</span>
        )}
      </span>
      {item.hasSubMenu && (
        <svg
          className="w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  );
}
