import React from 'react'
import Navbar from '../home/Navbar'
import Hero from './Hero'
import Team from './Team'
import Footer from '../Footer'
import { ChatbotWidget } from '../common'

export default function AboutPage() {
  return (
    <div>
        <Hero />
        <Team />
        <ChatbotWidget />
    </div>
  )
}
