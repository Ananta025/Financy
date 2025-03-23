import React from 'react'
import { Link } from 'react-router-dom'


export default function Navbar() {
return (
    <div className='mx-auto flex justify-between items-center gap-4 py-3 px-32 border-b-2 border-gray-200'>
            <div className="flex justify-content-start gap-2 cursor-pointer">
                <img className='w-8' src="/images/Logo.svg" alt="" />
                <img className='w-26' src="/images/Logotype.svg" alt="" />
            </div>
            <div className="flex justify-center gap-4 font-medium items-center">
                    <Link to="/"  className="text-decoration-none hover:bg-gray-200 py-1 rounded-lg px-2 hover:text-blue-500">Overview</Link>
                    <Link to="/orders" className="text-decoration-none hover:bg-gray-200 py-1 rounded-lg px-2 hover:text-blue-500">Orders</Link>
                    <Link to="/holding" className="text-decoration-none hover:bg-gray-200 py-1 rounded-lg px-2 hover:text-blue-500">Holdings</Link>
                    <Link to="/position" className="text-decoration-none hover:bg-gray-200 py-1 rounded-lg px-2 hover:text-blue-500">Position</Link>
                    <Link to="/account" className="text-decoration-none hover:bg-gray-200 py-1 rounded-lg px-2 hover:text-blue-500">Accounts</Link>
            </div>
            <div className="flex justify-between gap-3">
                <img className='w-6' src="/images/Frame.svg" alt=""/>
                <img className='w-6' src="/images/Frame (1).svg" alt="" />
                <img className='w-8' src="/images/Avatar.png" alt="" />
            </div>
    </div>
)
}
