import './App.css'
import Header from './Component/Header'
import AppRouter from './Router/AppRouter'
import Footer from './Component/Footer'
import { BasketProvider } from './Context/BasketContext'
import { DataProvider } from './Context/DataContext'
import { WishlistProvider } from './Context/WishlistContext'
import { NavProvider } from './Context/NavContext'

function App() {
  return (
    <>
      <DataProvider>
          <BasketProvider>
            <WishlistProvider>
              <NavProvider>
                <Header />
              </NavProvider>

              <AppRouter />
              <Footer />
            </WishlistProvider>
          </BasketProvider>

      </DataProvider>


    </>
  )
}

export default App

