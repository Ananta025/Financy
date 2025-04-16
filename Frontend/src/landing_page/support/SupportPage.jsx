import React from 'react'
import CreateTicket from './CreateTicket'
import Hero from './Hero'
import Footer from '../Footer'
import { ChatbotWidget } from '../common'

export default function SupportPage() {
  return (
    <div>
      <Hero />
      <CreateTicket />
      <ChatbotWidget />
    </div>
  )
}
