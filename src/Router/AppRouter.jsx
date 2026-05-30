import React from "react"
import { Routes, Route, Navigate } from "react-router"
import Home from "../Pages/Home"
import Detail from "../Pages/Detail"
import Fave from "../Pages/Fave"
import BasketDetail from "../Pages/BasketDetail"
import SearchPage from "../Pages/SearchPage"
import Error from "../Component/Error"
function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/product/:title/:shade" element={<Detail />} />
      <Route path="/wishlist" element={<Fave />} />
      <Route path="/basket" element={<BasketDetail />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="*" element={<Error />} />
    </Routes>
  )
}

export default AppRouter
