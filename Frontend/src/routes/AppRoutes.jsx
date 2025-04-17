import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import HomePage from '../landing_page/home/HomePage'
import AboutPage from '../landing_page/about/AboutPage'
import PricingPage from '../landing_page/pricing/PricingPage'
import Signup from '../landing_page/signup/Signup'
import ProductPage from '../landing_page/products/ProductPage'
import SupportPage from '../landing_page/support/SupportPage'
import Navbar from '../landing_page/home/Navbar'
import Footer from '../landing_page/Footer'
import NotFoundPage  from '../landing_page/NotFoundPage'



export default function AppRoutes() {
  return (
    <div>
        <Router>
            <Navbar />
            <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Signup />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
        </Router>
    </div>
  )
}
