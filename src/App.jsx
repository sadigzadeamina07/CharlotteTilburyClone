import { useState } from 'react'
import './App.css'
import Header from './Component/Header'
import AppRouter from './Router/AppRouter'
import Footer from './Component/Footer'
import { BasketProvider } from './Context/BasketContext'
import { DataProvider } from './Context/DataContext'
import { WishlistProvider } from './Context/WishlistContext'

function App() {
  return (
    <>
      <DataProvider>
        <BasketProvider>
          <WishlistProvider>
            <Header />
            <AppRouter />
            <Footer />
          </WishlistProvider>
        </BasketProvider>

      </DataProvider>


    </>
  )
}

export default App
