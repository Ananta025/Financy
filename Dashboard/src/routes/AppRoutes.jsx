import React from 'react'
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import HomePage from '../components/HomePage'
import OrdersPage from '../components/OrdersPage'
import Navbar from '../components/Navbar'
import HoldingPage from '../components/HoldingPage'
import PositionPage from '../components/PositionPage'
import AccountPage from '../components/AccountPage'
import NotFoundPage from '../components/NotFoundPage'

const NavbarLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
)

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route element={<NavbarLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/orders" element={<OrdersPage />} />
          <Route path="/holding" element={<HoldingPage />} />
          <Route path="/position" element={<PositionPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}
