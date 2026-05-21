import { useState } from 'react'
import './App.css'
import Header from './Component/Header'
import AppRouter from './Router/AppRouter'
import Footer from './Component/Footer'
import { BasketProvider } from './Context/BasketContext'
import { DataProvider } from './Context/DataContext'
import { WishlistProvider } from './Context/WishlistContext'
import { UIProvider } from './Context/UIContext'
import { NavProvider } from './Context/NavContext'

function App() {
  return (
    <>
      <DataProvider>
        <UIProvider>
          <BasketProvider>
            <WishlistProvider>
              <NavProvider>
                <Header />
              </NavProvider>

              <AppRouter />
              <Footer />
            </WishlistProvider>
          </BasketProvider>
        </UIProvider>

      </DataProvider>


    </>
  )
}

export default App

