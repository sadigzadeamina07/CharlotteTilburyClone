import { useState } from 'react'
import './App.css'
import Header from './Component/Header'
import AppRouter from './Router/AppRouter'
import Footer from './Component/Footer'
import { BasketProvider } from './Context/BasketContext'

function App() {
  return (
    <>
      <BasketProvider>

        <Header />
        <AppRouter />
        <Footer />
      </BasketProvider>


    </>
  )
}

export default App
