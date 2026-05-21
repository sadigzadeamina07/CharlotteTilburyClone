import React, { useEffect } from "react";
import { ChevronLeft, X, ChevronRight } from "lucide-react";
import { useNav } from "../Context/NavContext";
import { MENU_DATA } from "../Data/MenuData";

// ==========================================
// 1. PromoCard Komponenti
// ==========================================
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

// ==========================================
// 2. MenuLink Komponenti
// ==========================================
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

// ==========================================
// 3. MenuHeader Komponenti
// ==========================================
function MenuHeader({ title }) {
  const { state, navigateBack, handleMenuState } = useNav();
  const isMainMenu = state.history.length === 1;

  return (
    <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex-1">
        {!isMainMenu && (
          <button
            onClick={navigateBack}
            className="flex items-center text-sm tracking-wider text-gray-600 hover:text-black transition-colors"
          >
            <ChevronLeft size={17} className="mr-1" strokeWidth={1.5} />
            Back
          </button>
        )}
      </div>

      <div className="flex-1 text-center">
        <h2 className="text-[13px] uppercase font-serif tracking-widest text-black">
          {isMainMenu ? "Login | Create Account" : title}
        </h2>
      </div>

      <div className="flex-1 flex justify-end">
        <button
          onClick={() => handleMenuState(false)}
          className="p-2 text-gray-500 hover:text-black transition-colors"
          aria-label="Close menu"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

// ==========================================
// 4. MenuRenderer Komponenti
// ==========================================
function MenuRenderer() {
  const { state } = useNav();

  return (
    <div className="relative w-full h-full overflow-hidden bg-white">
      {Object.values(MENU_DATA).map((view) => {
        // Dövrün düzgün işləməsi üçün bu dəyişənlər map daxilində olmalıdır
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
            {/* Burada daxili başlıq üçün MenuHeader çağırılır */}
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

// ==========================================
// Əsas Eksport Olunan Komponent (MobileMenu)
// ==========================================
function MobileMenu() {
  const { state, handleMenuState } = useNav();

  // Menyu açıq olanda arxa tərəfin scroll olmasının qarşısını alır
  useEffect(() => {
    if (state.isOpen) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [state.isOpen]);

  return (
    <>
      {/* Arxa qaranlıq fon (Backdrop) */}
      <div
        onClick={() => handleMenuState(false)}
        className={
          state.isOpen
            ? "fixed inset-0 bg-black/40 z-40 opacity-100 visible transition-opacity duration-300"
            : "fixed inset-0 bg-black/40 z-40 opacity-0 invisible transition-opacity duration-300"
        }
      />

      {/* Sürüşərək açılan əsas menyu paneli */}
      <div
        className={
          state.isOpen
            ? "fixed top-0 left-0 bottom-0 w-full sm:w-[400px] bg-white z-50 translate-x-0 transition-transform duration-300 ease-in-out shadow-2xl"
            : "fixed top-0 left-0 bottom-0 w-full sm:w-[400px] bg-white z-50 -translate-x-full transition-transform duration-300 ease-in-out shadow-2xl"
        }
      >
        <MenuRenderer />
      </div>
    </>
  );
}

export default MobileMenu;