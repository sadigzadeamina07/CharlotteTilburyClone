import React, { createContext, useState, useContext, useEffect } from "react";

const BasketContext = createContext();

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([]);
  const [basketOpen, setBasketOpen] = useState(false);

useEffect(() => {
  document.body.style.overflow = basketOpen ? "hidden" : "auto";
}, [basketOpen]);

const addToBasket = (product) => {
  const exists = basket.find((item) => item.title === product.title);

  if (exists) {
    setBasket(basket.map((item) =>
      item.title === product.title
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  } else {
    setBasket([...basket, { ...product, quantity: 1 }]);
  }

  setBasketOpen(true);
};
  const removeFromBasket = (product) => {
    setBasket(basket.filter((item) => item.title !== product.title));
  };
  const updateQuantity = (product, newQty) => {
    if (newQty <= 0) {
      removeFromBasket(product);
      return;
    }
    setBasket(basket.map((item) =>
      item.title === product.title
        ? { ...item, quantity: newQty }
        : item
    ));
  };
const increaseQuantity = (product) => {
  setBasket(basket.map((item) =>
    item.title === product.title
      ? { ...item, quantity: item.quantity + 1 }
      : item
  ));
};
const decreaseQuantity = (product) => {
  const found = basket.find((item) => item.title === product.title);
  if (found && found.quantity <= 1) {
    removeFromBasket(product);
    return;
  }
  setBasket(basket.map((item) =>
    item.title === product.title
      ? { ...item, quantity: item.quantity - 1 }
      : item
  ));
};
  const totalPrice = basket.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    return sum + price * item.quantity;
  }, 0);

  const toggleBasket = () => setBasketOpen(!basketOpen);
  const closeBasket = () => setBasketOpen(false);

  return (
    <BasketContext.Provider value={{
      basket,
      addToBasket,
      handleAddtoBasket: addToBasket,
      removeFromBasket,
      updateQuantity,
      increaseQuantity,
      decreaseQuantity,
      totalPrice,
      toggleBasket,
      closeBasket,
      setBasketOpen,
      basketOpen,
      ToggleBasket: toggleBasket,
      CloseBasket: closeBasket,
      Basketopen: basketOpen,
    }}>
      {children}
    </BasketContext.Provider>
  );
}

export function useBasket() {
  return useContext(BasketContext);
}
