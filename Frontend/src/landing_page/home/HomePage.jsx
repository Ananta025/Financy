import React from 'react'
import Navbar from './Navbar'
import Education from './Education'
import Awards from './Awards'
import Footer from '../Footer'
import OpenAccount from '../OpenAccount'
import HeroSection from './HeroSection'
import Pricing from './Pricing'
import Stats from './Stats'

export default function HomePage() {
  return (
    <div>
        <HeroSection />
        <Education />
        <Awards />
        <Pricing />
        <Stats />
        <OpenAccount />
    </div>
  )
}
