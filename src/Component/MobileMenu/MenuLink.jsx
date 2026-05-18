import React from "react";
import { ChevronRight } from "lucide-react";
import { useNav } from "../../Context/NavContext";

function MenuLink({ item }) {
  const { navigateTo, handleMenuState } = useNav();

  const openItem = () => {
    if (item.hasSubMenu && item.targetId) {
      navigateTo(item.targetId);
      return;
    }

    handleMenuState(false);
  };

  return (
    <button
      onClick={openItem}
      className="w-full flex items-center justify-between py-4 px-6 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200 text-left bg-white"
    >
      <span className="text-[15px] tracking-wide text-gray-800 flex items-center gap-2">
        {item.label}

        {item.icon === "star" && (
          <span className="text-yellow-500 text-lg">★</span>
        )}
      </span>

      {item.hasSubMenu && (
        <ChevronRight size={18} className="text-gray-400" strokeWidth={1.5} />
      )}
    </button>
  );
}

export default MenuLink;