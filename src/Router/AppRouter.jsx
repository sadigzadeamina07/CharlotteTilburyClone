import React from 'react'
import { Routes, Route } from 'react-router'
import Home from '../Pages/Home'

function AppRouter() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  )
}

export default AppRouter