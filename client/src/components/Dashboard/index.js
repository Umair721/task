import React from 'react'
import { Link } from 'react-router-dom'

export default function Dashboard() {
    return (
        <div className="flex h-screen">
            <div className="w-2/12 h-full">
                <div className="border-r pt-3 h-full">
                    <Link to="/category" className="px-6 py-2 hover:bg-gray-500 w-full block">
                        Category
                    </Link>
                    <Link to="/vehicles" className="px-6 py-2 hover:bg-gray-500 w-full block">
                        Vehicles
                    </Link>
                </div>
            </div>
            <div className="w-10/12 px-6 pt-6">
                <div className='text-right'><button
                    className="disabled:opacity-30 bg-[#2F42ED] text-white py-3 px-4 rounded-[7px] text-[16px] leading-4">Logout</button></div>
                <h1>Welcome to dashboard</h1>
            </div>
        </div>
    )
}
