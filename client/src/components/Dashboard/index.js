import { actions } from '@Redux/LoginRedux';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
const { actions: action } = require("@Redux/VehicleRedux")

export default function Dashboard() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    //logout function
    const handleLogout = async () => {
        actions.logoutAction(dispatch)
        localStorage.clear()
        navigate("/");

    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await action.fetchVehicle(dispatch);
            } catch (error) {
                toast.error("Error occurred while fetching data.");
            }
        };

        fetchData();
    }, []);
    const data = useSelector((state) => state.vehicle.vehicle.vehicles)
    const filteredData = data?.filter((vehicle) => vehicle?.category_name === 'car');






    return (
        <>
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
                    <div className='text-right'><button onClick={handleLogout}
                        className="disabled:opacity-30 bg-[#2F42ED] text-white py-3 px-4 rounded-[7px] text-[16px] leading-4">Logout</button></div>
                    <h1>Welcome to dashboard</h1>

                    <div className='grid grid-cols-2 gap-5'>
                        <div>
                            {filteredData?.map(vehicle => (
                                <div key={vehicle.id} className="p-6 shadow-xl rounded-md">
                                    <h4 className="text-black">Category name : {vehicle?.category_name}</h4>
                                    <h4 className="text-black">Car Color : {vehicle?.color}</h4>
                                    <h4 className="text-black">Car Make : {vehicle?.make}</h4>
                                    <h4 className="text-black">Car model : {vehicle?.model}</h4>
                                    <h4 className="text-black">Car registeration : {vehicle?.registration_num}</h4>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
