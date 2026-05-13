import React from "react";
import { useNav } from "../../Context/NavContext";

export default function MenuHeader({ title }) {
  const { state, navigateBack, handleMenuState } = useNav();
  const isMain = state.history.length === 1;

  return (
    <div className="flex items-center justify-between h-14 px-4 border-b border-gray-200 bg-white sticky top-0 z-10">
      <div className="flex-1">
        {!isMain && (
          <button
            onClick={navigateBack}
            className="flex items-center text-sm font-sans tracking-wider text-gray-600 hover:text-black transition-colors"
          >
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        )}
      </div>

      <div className="flex-1 text-center">
        <h2 className="text-[13px] uppercase font-serif tracking-widest text-black">
          {isMain ? "Login | Create Account" : title}
        </h2>
      </div>

      <div className="flex-1 flex justify-end">
        <button
          onClick={() => handleMenuState(false)}
          className="p-2 text-gray-500 hover:text-black transition-colors"
          aria-label="Close menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}
