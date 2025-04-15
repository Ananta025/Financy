import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll events to add shadow when scrolled
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Check if a link is active
    const isActive = (path) => {
        return location.pathname === path;
    };

    // Get active link class
    const getActiveLinkClass = (path) => {
        return isActive(path) 
            ? "text-blue-600 bg-blue-50 font-semibold" 
            : "text-gray-700 hover:bg-gray-200 hover:text-blue-500";
    };

    return (
        <div className={`sticky top-0 z-40 bg-white w-full border-b-2 border-gray-200 ${scrolled ? 'shadow-md' : ''}`}>
            <div className='flex justify-between items-center gap-4 py-3 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-32 relative'>
                {/* Logo */}
                <div className="flex items-center gap-2 cursor-pointer">
                    <img className='w-8' src="/images/Logo.svg" alt="Logo" />
                    <img className='hidden sm:block w-26' src="/images/Logotype.svg" alt="Logotype" />
                </div>
                
                {/* Desktop Menu */}
                <div className="hidden md:flex justify-center gap-2 lg:gap-4 font-medium items-center">
                    <Link 
                        to="/" 
                        className={`text-decoration-none transition-all duration-200 py-2 rounded-lg px-3 ${getActiveLinkClass("/")}`}
                    >
                        Overview
                    </Link>
                    <Link 
                        to="/orders" 
                        className={`text-decoration-none transition-all duration-200 py-2 rounded-lg px-3 ${getActiveLinkClass("/orders")}`}
                    >
                        Orders
                    </Link>
                    <Link 
                        to="/holding" 
                        className={`text-decoration-none transition-all duration-200 py-2 rounded-lg px-3 ${getActiveLinkClass("/holding")}`}
                    >
                        Holdings
                    </Link>
                    <Link 
                        to="/position" 
                        className={`text-decoration-none transition-all duration-200 py-2 rounded-lg px-3 ${getActiveLinkClass("/position")}`}
                    >
                        Position
                    </Link>
                    <Link 
                        to="/account" 
                        className={`text-decoration-none transition-all duration-200 py-2 rounded-lg px-3 ${getActiveLinkClass("/account")}`}
                    >
                        Accounts
                    </Link>
                </div>
                
                {/* Right Icons */}
                <div className="flex justify-between items-center gap-3">
                    <div className="hidden sm:flex gap-3">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                            <img className='w-5' src="/images/Frame.svg" alt="Notification" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                            <img className='w-5' src="/images/Frame (1).svg" alt="Settings" />
                        </button>
                    </div>
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                        <img className='w-full h-full object-cover' src="/images/Avatar.png" alt="Avatar" />
                    </div>
                    
                    {/* Hamburger Menu Button */}
                    <button 
                        className="md:hidden ml-2 p-2 rounded-full focus:outline-none hover:bg-gray-100 transition-all duration-200" 
                        onClick={toggleMenu}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            {isMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>
            </div>
            
            {/* Mobile Menu Dropdown with animation */}
            <div 
                className={`md:hidden absolute w-full bg-white shadow-lg z-50 transition-all duration-300 transform origin-top ${
                    isMenuOpen ? 'opacity-100 scale-y-100' : 'opacity-0 scale-y-0 h-0'
                }`}
            >
                <div className="flex flex-col px-4 pt-2 pb-4">
                    <Link 
                        to="/" 
                        onClick={toggleMenu} 
                        className={`py-3 px-3 rounded-lg mb-1 transition-all duration-200 ${getActiveLinkClass("/")}`}
                    >
                        Overview
                    </Link>
                    <Link 
                        to="/orders" 
                        onClick={toggleMenu} 
                        className={`py-3 px-3 rounded-lg mb-1 transition-all duration-200 ${getActiveLinkClass("/orders")}`}
                    >
                        Orders
                    </Link>
                    <Link 
                        to="/holding" 
                        onClick={toggleMenu} 
                        className={`py-3 px-3 rounded-lg mb-1 transition-all duration-200 ${getActiveLinkClass("/holding")}`}
                    >
                        Holdings
                    </Link>
                    <Link 
                        to="/position" 
                        onClick={toggleMenu} 
                        className={`py-3 px-3 rounded-lg mb-1 transition-all duration-200 ${getActiveLinkClass("/position")}`}
                    >
                        Position
                    </Link>
                    <Link 
                        to="/account" 
                        onClick={toggleMenu} 
                        className={`py-3 px-3 rounded-lg mb-1 transition-all duration-200 ${getActiveLinkClass("/account")}`}
                    >
                        Accounts
                    </Link>
                    <div className="flex gap-4 py-3 px-3 sm:hidden">
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                            <img className='w-5' src="/images/Frame.svg" alt="Notification" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100">
                            <img className='w-5' src="/images/Frame (1).svg" alt="Settings" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
