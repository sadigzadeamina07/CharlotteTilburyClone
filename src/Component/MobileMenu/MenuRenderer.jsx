import React from "react";
import { useNav } from "../../Context/NavContext";
import { MENU_DATA } from "../../Data/MenuData";
import MenuHeader from "./MenuHeader";
import MenuLink from "./MenuLink";
import PromoCard from "./PromoCard";

export default function MenuRenderer() {
  const { state } = useNav();

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      {Object.values(MENU_DATA).map((view) => {
        const indexInHistory = state.history.indexOf(view.id);
        const isActive = indexInHistory === state.history.length - 1;
        const isPast = indexInHistory !== -1 && indexInHistory < state.history.length - 1;
        
 
        let transformClass = "translate-x-full";
        if (isActive) transformClass = "translate-x-0";
        else if (isPast) transformClass = "-translate-x-full";

        return (
          <div
            key={view.id}
            className={`absolute inset-0 w-full h-full bg-white flex flex-col transition-transform duration-300 ease-in-out ${transformClass}`}
            style={{ zIndex: indexInHistory !== -1 ? indexInHistory * 10 : 0 }}
          >
            <MenuHeader title={view.title} />
            
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col">
                {view.items.map((item) => (
                  <MenuLink key={item.id} item={item} />
                ))}
              </div>
              
              {view.promos && view.promos.length > 0 && (
                <div className="p-4 grid grid-cols-1 gap-4 border-t-[0.5px] border-gray-200 mt-4">
                  {view.promos.map((promo) => (
                    <PromoCard key={promo.id} promo={promo} />
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
