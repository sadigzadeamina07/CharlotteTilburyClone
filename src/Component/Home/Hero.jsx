import React from "react"
import { Link } from "react-router"
import HeroDesktopBanner from "/assets/img/Hero.png"
import HeroMobileBanner from "/assets/img/HeroMobile.gif"

function Hero() {
  return (
    <Link to="/home">
      <img
        src={HeroDesktopBanner}
        className="hidden md:block w-full"
        alt="Hero Desktop Banner"
      />
      <img
        src={HeroMobileBanner}
        className="md:hidden w-full block"
        alt="Hero Mobile Banner"
      />
    </Link>
  )
}

export default Hero
