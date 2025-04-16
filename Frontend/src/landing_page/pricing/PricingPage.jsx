import React from 'react'
import Navbar  from '../home/Navbar'
import Hero from './Hero'
import Brokerage from './Brokerage'
import Footer from '../Footer'
import { ChatbotWidget } from '../common'

export default function PricingPage() {
  return (
    <div>
        <Hero />
        <Brokerage />
        <ChatbotWidget />
    </div>
  )
}
