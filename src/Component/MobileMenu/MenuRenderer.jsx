import React from "react";
import { useNav } from "../../Context/NavContext";
import { MENU_DATA } from "../../Data/MenuData";
import MenuHeader from "./MenuHeader";
import MenuLink from "./MenuLink";
import PromoCard from "./PromoCard";

function MenuRenderer() {
  const { state } = useNav();

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      {Object.values(MENU_DATA).map((view) => {
        const index = state.history.indexOf(view.id);
        const active = index === state.history.length - 1;
        const past = index !== -1 && index < state.history.length - 1;

        let position = "translate-x-full";

        if (active) {
          position = "translate-x-0";
        }

        if (past) {
          position = "-translate-x-full";
        }

        return (
          <div
            key={view.id}
            className={`absolute inset-0 w-full h-full bg-white flex flex-col transition-transform duration-300 ease-in-out ${position}`}
            style={{ zIndex: index === -1 ? 0 : index + 1 }}
          >
            <MenuHeader title={view.title} />

            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col">
                {view.items.map((item) => (
                  <MenuLink key={item.id} item={item} />
                ))}
              </div>

              {view.promos?.length > 0 && (
                <div className="p-4 grid grid-cols-1 gap-4 border-t border-gray-200 mt-4">
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

export default MenuRenderer;