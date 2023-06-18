import React, { useState, useEffect, useCallback } from "react";
import AddVehicle from "./vehicleModel";
import { actions } from "@Redux/VehicleRedux";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ReactDataTables from "./ReactDataTables";
import { Link } from "react-router-dom";


const Vehicle = () => {
    const dispatch = useDispatch()
    const [isOpen, setIsOpen] = useState(false)
    const [isUpdate, setIsUpdate] = useState(false)
    const [vehicleData, setVehicleData] = useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                await actions.fetchVehicle(dispatch);
            } catch (error) {
                toast.error("Error occurred while fetching data.");
            }
        };

        fetchData();
    }, []);


    const data = useSelector((state) => state.vehicle.vehicle.vehicles)


    const handleDelete = async (id) => {

        try {
            const data = await actions.deleteVehicle(dispatch, id);
            if (data?.data?.code === 200) {
                toast.success(data?.data?.message)
                await actions.fetchVehicle(dispatch);
            }
            else {
                toast.error(data?.data?.message)

            }
        } catch (error) {
            console.error(error);
        }

    }



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
                {isOpen && <AddVehicle
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    isUpdate={isUpdate}
                    setIsUpdate={setIsUpdate}
                    vehicleData={vehicleData} />}
                <div className=" text-right">
                    <button
                        className="disabled:opacity-30 bg-[#2F42ED] text-white mb-6 py-3 px-4 rounded-[7px] text-[16px] leading-4" onClick={() => setIsOpen(true)}>Add</button>
                    <ReactDataTables data={data} handleDelete={handleDelete} setVehicleData={setVehicleData} setIsOpen={setIsOpen} setIsUpdate={setIsUpdate} />
                </div>

            </div>
        </div>
    );
};

export default Vehicle;
