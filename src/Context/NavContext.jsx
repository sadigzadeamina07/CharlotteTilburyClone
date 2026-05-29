import React, { createContext, useContext, useState } from "react"

const NavContext = createContext()

export function NavProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const [history, setHistory] = useState(["MAIN"])
  const activeMenu = history[history.length - 1]
  const openMenu = () => setIsOpen(true)
  const closeMenu = () => {
    setIsOpen(false)
    setHistory(["MAIN"])
  }
  const goTo = (menu) => setHistory([...history, menu])
  const goBack = () => setHistory(history.slice(0, -1))
  return (
    <NavContext.Provider
      value={{ isOpen, history, activeMenu, openMenu, closeMenu, goTo, goBack }}
    >
      {children}
    </NavContext.Provider>
  )
}

export function useNav() {
  return useContext(NavContext)
}
