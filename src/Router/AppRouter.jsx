import React from 'react'
import { Routes, Route } from 'react-router'
import Home from '../Pages/Home'
import Detail from '../Pages/Detail'
import Fave from '../Pages/Fave'
import BasketDetail from '../Pages/BasketDetail'
function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
   <Route path='/product' element={ <Detail />} />
   <Route path='/wishlist' element={ <Fave />} />
      <Route path='/basket' element={ <BasketDetail />} />
    </Routes>
  )
}

export default AppRouter