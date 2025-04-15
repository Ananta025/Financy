import React from 'react'
import ProfileCard from '../components/account/ProfileCard'
import KycStatus from '../components/account/KycStatus'
import BankAccountInfo from '../components/account/BankAccountInfo'
import SecuritySettings from '../components/account/SecuritySettings'
import PreferencesSection from '../components/account/PreferencesSection'
import DocumentsSection from '../components/account/DocumentsSection'
import SupportSection from '../components/account/SupportSection'

export default function AccountPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-10 py-6 max-w-7xl">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        {/* Left Column */}
        <div className="space-y-6 md:space-y-8">
          <ProfileCard />
          <KycStatus />
          <BankAccountInfo />
        </div>
        
        {/* Right Column */}
        <div className="space-y-6 md:space-y-8">
          <SecuritySettings />
          <PreferencesSection />
        </div>
      </div>
      
      {/* Full Width Sections */}
      <div className="mt-8 md:mt-10 space-y-6 md:space-y-8">
        <DocumentsSection />
        <SupportSection />
      </div>
    </div>
  )
}
