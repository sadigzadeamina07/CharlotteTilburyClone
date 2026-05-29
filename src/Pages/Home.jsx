import React from "react"
import Hero from "../Component/Home/Hero"
import ShopByCategory from "../Component/Home/ShopByCategory"
import ShopBestSellers from "../Component/Home/ShopBestSellers"
import AppPromotion from "../Component/Home/AppPromotion"
import Exclusives from "../Component/Home/Exclusives"
import TrendingNow from "../Component/Home/TrendingNow"
import PerfectMatches from "../Component/Home/PerfectMatches"
import BrandStory from "../Component/Home/BrandStory"

function Home() {
  return (
    <div className="text-[#3a080a]">
      <Hero />
      <ShopByCategory />
      <ShopBestSellers />
      <AppPromotion />
      <Exclusives />
      <TrendingNow />
      <PerfectMatches />
      <BrandStory />
    </div>
  )
}

export default Home
