import React from 'react'
import {BrowserRouter as Router, Routes, Route, Outlet} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import OrdersPage from '../pages/OrdersPage'
import Navbar from '../components/Navbar'
import HoldingPage from '../pages/HoldingPage'
import PositionPage from '../pages/PositionPage'
import AccountPage from '../pages/AccountPage'
import NotFoundPage from '../pages/NotFoundPage'

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
