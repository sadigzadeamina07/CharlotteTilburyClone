import React, { createContext, useContext, useReducer } from "react";

const initialState = {
  history: ["MAIN"],
  isOpen: false, // Overall drawer state
};

function navReducer(state, action) {
  switch (action.type) {
    case "SET_MENU_STATE":
      return { ...state, isOpen: action.payload, history: ["MAIN"] };
    case "NAVIGATE_TO":
      if (state.history[state.history.length - 1] === action.payload) return state;
      return {
        ...state,
        history: [...state.history, action.payload],
      };
    case "NAVIGATE_BACK":
      if (state.history.length <= 1) return state;
      return {
        ...state,
        history: state.history.slice(0, -1),
      };
    default:
      return state;
  }
}

const NavContext = createContext();

export function NavProvider({ children }) {
  const [state, dispatch] = useReducer(navReducer, initialState);

  const handleMenuState = (isOpen) => dispatch({ type: "SET_MENU_STATE", payload: isOpen });
  const navigateTo = (viewId) => dispatch({ type: "NAVIGATE_TO", payload: viewId });
  const navigateBack = () => dispatch({ type: "NAVIGATE_BACK" });

  const activeView = state.history[state.history.length - 1];

  return (
    <NavContext.Provider
      value={{
        state,
        activeView,
        handleMenuState,
        navigateTo,
        navigateBack,
      }}
    >
      {children}
    </NavContext.Provider>
  );
}

export function useNav() {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
}
