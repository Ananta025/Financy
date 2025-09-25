import React from 'react'
import {BrowserRouter as Router, Routes, Route, Outlet, Navigate} from 'react-router-dom'
import HomePage from '../pages/HomePage'
import OrdersPage from '../pages/OrdersPage'
import Navbar from '../components/Navbar'
import HoldingPage from '../pages/HoldingPage'
import PositionPage from '../pages/PositionPage'
import AccountPage from '../pages/AccountPage'
import NotFoundPage from '../pages/NotFoundPage'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import LoginRedirect from '../components/auth/LoginRedirect'

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
        {/* Public route that handles redirects with login tokens */}
        <Route path="/login-redirect" element={<LoginRedirect />} />
        
        {/* Protected routes with navbar */}
        <Route element={<ProtectedRoute />}>
          <Route element={<NavbarLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/holdings" element={<HoldingPage />} />
            <Route path="/position" element={<PositionPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Route>
        </Route>
        
        {/* 404 route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  )
}
