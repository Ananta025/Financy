import React from 'react'
import Header from './dashboard/Header'
import BalanceCards from './dashboard/BalanceCards'
import ActionButtons from './dashboard/ActionButtons'
import ExpensesByCategory from './dashboard/ExpensesByCategory'
import TransactionHistory from './dashboard/TransactionHistory'

export default function Dashboard() {
  return (
    <div className="container mx-auto">
      <Header />
      <BalanceCards />
      <ActionButtons />
      <div className='flex flex-col lg:flex-row px-4 md:px-8 lg:px-16 gap-4 py-5'>
        <ExpensesByCategory />
        <TransactionHistory />
      </div>
    </div>
  )
}
