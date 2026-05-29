import React, { createContext, useState, useContext, useEffect } from "react"

const BasketContext = createContext()

export function BasketProvider({ children }) {
  const [basket, setBasket] = useState([])
  const [basketOpen, setBasketOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = basketOpen ? "hidden" : "auto"
  }, [basketOpen])

  const isSameProduct = (item1, item2) => {
    const shade1 = item1.selectedShade?.name || ""
    const shade2 = item2.selectedShade?.name || ""
    return item1.title === item2.title && shade1 === shade2
  }
  const updateQuantity = (product, newQty) => {
    if (newQty <= 0) return removeFromBasket(product)
    setBasket(
      basket.map((item) =>
        isSameProduct(item, product) ? { ...item, quantity: newQty } : item,
      ),
    )
  }

  // 3. Səbətə əlavə etmə (Fərqli shadeni tam fərqli məhsul kimi yeni sətirdə əlavə edir)
  const addToBasket = (product) => {
    const exists = basket.find((item) => isSameProduct(item, product))

    if (exists) {
      updateQuantity(product, exists.quantity + 1)
    } else {
      setBasket([...basket, { ...product, quantity: 1 }])
    }
    setBasketOpen(true)
  }
  const removeFromBasket = (product) => {
    setBasket(basket.filter((item) => !isSameProduct(item, product)))
  }

  const totalPrice = basket.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  )
  const totalItems = basket.reduce((sum, item) => sum + item.quantity, 0)
  const FREE_SHIPPING_THRESHOLD_GBP = 50
  return (
    <BasketContext.Provider
      value={{
        basket,
        basketOpen,
        setBasketOpen,
        addToBasket,
        removeFromBasket,
        updateQuantity,
        totalPrice,
        totalItems,
        FREE_SHIPPING_THRESHOLD_GBP,
      }}
    >
      {children}
    </BasketContext.Provider>
  )
}

export function useBasket() {
  return useContext(BasketContext)
}
