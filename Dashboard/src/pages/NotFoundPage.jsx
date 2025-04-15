import React from 'react'

export default function NotFoundPage() {
return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 ">
        <div className="text-center">
            <img 
                src="/images/notfound.svg" 
                alt="404" 
                className="w-80 md:w-80 mx-auto mb-6"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                <span className="text-indigo-600">Oops!</span> Page Not Found
            </h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Looks like you've ventured into uncharted territory. The page you're looking for has vanished into the digital abyss.
            </p>
        </div>
    </div>
)
}
