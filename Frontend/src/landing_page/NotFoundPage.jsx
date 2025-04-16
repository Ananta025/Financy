import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFoundPage() {
return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 md:p-8">
        <div className="text-center max-w-lg">
            <img 
                src="/media/images/notfound.svg"
                alt="404" 
                className="w-64 sm:w-72 md:w-80 lg:w-96 mx-auto mb-4 sm:mb-6"
            />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3">
                <span className="text-indigo-600">Oops!</span> Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
                Looks like you've ventured into uncharted territory. The page you're looking for has vanished into the digital abyss.
            </p>
            <Link to="/" className="inline-flex items-center px-4 py-2 border border-indigo-500 text-indigo-600 bg-transparent font-normal rounded text-sm transition-colors duration-200 hover:bg-indigo-50 gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Return to Home
            </Link>
        </div>
    </div>
)
}
