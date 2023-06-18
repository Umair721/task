import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import AddVehicle from "./addVehicle";


const AddVehicleModel = props => {
    const { isOpen, setIsOpen, isUpdate, setIsUpdate, vehicleData } = props;

    const closeModal = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={closeModal}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-full p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-screen max-w-[431px]  transform overflow-hidden rounded-[10px] bg-[#F6F2E9] px-6 text-left align-middle shadow-xl transition-all">
                                    <div
                                        onClick={closeModal}
                                        className="mt-[32px] flex justify-end"
                                    >
                                        <svg
                                            width="25"
                                            height="25"
                                            viewBox="0 0 25 25"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12.4996 14.6211L17.8026 19.9251C18.084 20.2065 18.4657 20.3646 18.8636 20.3646C19.2616 20.3646 19.6432 20.2065 19.9246 19.9251C20.206 19.6437 20.3641 19.2621 20.3641 18.8641C20.3641 18.4662 20.206 18.0845 19.9246 17.8031L14.6196 12.5001L19.9236 7.19711C20.0629 7.05778 20.1733 6.89238 20.2487 6.71036C20.324 6.52834 20.3628 6.33326 20.3627 6.13626C20.3627 5.93926 20.3238 5.7442 20.2484 5.56221C20.173 5.38022 20.0624 5.21488 19.9231 5.07561C19.7838 4.93634 19.6184 4.82588 19.4364 4.75054C19.2543 4.67519 19.0592 4.63644 18.8623 4.63648C18.6653 4.63653 18.4702 4.67538 18.2882 4.75081C18.1062 4.82624 17.9409 4.93678 17.8016 5.07611L12.4996 10.3791L7.1966 5.07611C7.0583 4.93278 6.89284 4.81843 6.70987 4.73973C6.5269 4.66103 6.33009 4.61956 6.13092 4.61774C5.93176 4.61591 5.73422 4.65377 5.54984 4.72911C5.36546 4.80444 5.19793 4.91574 5.05703 5.05652C4.91612 5.19729 4.80466 5.36471 4.72916 5.54902C4.65365 5.73333 4.6156 5.93083 4.61724 6.13C4.61887 6.32917 4.66016 6.52602 4.73869 6.70906C4.81721 6.8921 4.93141 7.05767 5.0746 7.19611L10.3796 12.5001L5.0756 17.8031C4.79421 18.0845 4.63612 18.4662 4.63612 18.8641C4.63612 19.2621 4.79421 19.6437 5.0756 19.9251C5.357 20.2065 5.73865 20.3646 6.1366 20.3646C6.53456 20.3646 6.91621 20.2065 7.1976 19.9251L12.4996 14.6201V14.6211Z"
                                                fill="#313131"
                                            />
                                        </svg>
                                    </div>
                                    <AddVehicle
                                        isUpdate={isUpdate}
                                        setIsUpdate={setIsUpdate}
                                        setIsOpen={setIsOpen}
                                        vehicleData={vehicleData} />


                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );
};
export default AddVehicleModel;
