import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RegisterVehicleInitialValue, RegisterVehicleSchema } from "@common/Schema/helper";
import { actions } from "@Redux/VehicleRedux";
const { actions: action } = require("@Redux/CategoryRedux")

const AddVehicle = (props) => {
    const { isUpdate, setIsUpdate, vehicleData, setIsOpen } = props;
    console.log(vehicleData, "99999")
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(false);
    const [vehicle, setVehicle] = useState()





    //send data to backend

    const submitForm = useCallback(async (data, handles) => {

        const vehicleDataForm = {
            category_id: data.category_id
            ,
            color: data.color,
            make: data.make,
            model: data.model,
            registration_num: data.registration_num
        };

        let result;
        // Submit category backend
        if (!isUpdate) {
            result = await actions.submitVehicle(dispatch, vehicleDataForm);
        }
        else {
            // update call
            result = await actions.updateVehicle(dispatch, vehicleData.id, vehicleDataForm);
        }

        if (result?.status === 200) {
            const response = result?.data;
            if (response?.code === 200) {
                handles.resetForm();
                setUpdate(false); // Clear update state
                setVehicle(null); // Clear 
                toast.success(response?.message);
                setIsOpen(false)
                setIsUpdate(false)
                await actions.fetchVehicle(dispatch);
            } else {
                toast.error(response ? response?.message : "");
            }
        } else {
            toast.error("Something went wrong");
        }
    }, [dispatch]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await action.fetchCategory(dispatch);
            } catch (error) {
                toast.error("Error occurred while fetching data.");
            }
        };

        fetchData();
    }, []);
    //get categories from redux
    const categories = useSelector(state => state.category?.category);



    return (
        <>
            <div>
                <Formik
                    initialValues={RegisterVehicleInitialValue(isUpdate, vehicleData)}
                    validationSchema={RegisterVehicleSchema}
                    onSubmit={(values, handles) => {

                        submitForm(values, handles);
                    }}
                >
                    {({ values,
                        handleSubmit,
                        errors,
                        touched,
                        handleChange,
                        setFieldValue }) => (
                        <Form
                            onSubmit={handleSubmit}
                            className="flex justify-center flex-col items-center"
                        >
                            <Field
                                name="category_id"
                                as="select"
                                onChange={handleChange}
                                value={values.category_id || ""}
                                className="border border-[#E3E5E6] px-3 rounded-[8px] bg-[#FFFFFF] py-2  mt-[12px] placeholder:text-[14px] placeholder:leading-4"
                            >
                                <option value="">Select Category</option>
                                {categories?.map((category) => (
                                    <option key={category.id} value={category?.id}>
                                        {category?.category_name}
                                    </option>
                                ))}
                            </Field>
                            <div className="mt-[25px] w-full">
                                <label
                                    htmlFor="color"
                                    className="text-start text-[14px] leading-[16px] font-medium darkGray"
                                >
                                    color
                                </label>
                                <br />
                                <Field
                                    type="text"
                                    name="color"
                                    className="border border-[#E3E5E6] px-3 rounded-[8px] bg-[#FFFFFF] py-2 w-full mt-[12px] placeholder:text-[14px] placeholder:leading-4"
                                    value={values.color || ""}
                                    placeholder="Enter color "
                                    autoComplete="off"
                                />
                                <br />
                                <p className="text-red-500 text-[14px]">
                                    {errors.color && touched.color && errors.color}
                                </p>
                            </div>
                            <div className="mt-[25px] w-full">
                                <label
                                    htmlFor="make"
                                    className="text-start text-[14px] leading-[16px] font-medium darkGray"
                                >
                                    make
                                </label>
                                <br />
                                <Field
                                    type="text"
                                    name="make"
                                    className="border border-[#E3E5E6] px-3 rounded-[8px] bg-[#FFFFFF] py-2 w-full mt-[12px] placeholder:text-[14px] placeholder:leading-4"
                                    value={values.make || ""}
                                    placeholder="Enter make "
                                    autoComplete="off"
                                />
                                <br />
                                <p className="text-red-500 text-[14px]">
                                    {errors.make && touched.make && errors.make}
                                </p>
                            </div>
                            <div className="mt-[25px] w-full">
                                <label
                                    htmlFor="model"
                                    className="text-start text-[14px] leading-[16px] font-medium darkGray"
                                >
                                    model
                                </label>
                                <br />
                                <Field
                                    type="text"
                                    name="model"
                                    className="border border-[#E3E5E6] px-3 rounded-[8px] bg-[#FFFFFF] py-2 w-full mt-[12px] placeholder:text-[14px] placeholder:leading-4"
                                    value={values.model || ""}
                                    placeholder="Enter model "
                                    autoComplete="off"
                                />
                                <br />
                                <p className="text-red-500 text-[14px]">
                                    {errors.model && touched.model && errors.model}
                                </p>
                            </div>
                            <div className="mt-[25px] w-full">
                                <label
                                    htmlFor="registration_num"
                                    className="text-start text-[14px] leading-[16px] font-medium darkGray"
                                >
                                    registration_num
                                </label>
                                <br />
                                <Field
                                    type="text"
                                    name="registration_num"
                                    className="border border-[#E3E5E6] px-3 rounded-[8px] bg-[#FFFFFF] py-2 w-full mt-[12px] placeholder:text-[14px] placeholder:leading-4"
                                    value={values.registration_num || ""}
                                    placeholder="Enter registration_num address"
                                    autoComplete="off"
                                />
                                <br />
                                <p className="text-red-500 text-[14px]">
                                    {errors.registration_num && touched.registration_num && errors.registration_num}
                                </p>
                            </div>


                            <div className="my-[25px] w-full">
                                <button
                                    type="submit"
                                    className="disabled:opacity-30 bg-[#2F42ED] white py-3 px-4 rounded-[7px] w-full text-[16px] leading-4"
                                >
                                    {isUpdate ? "Update Vehicle" : "Add Vehicle"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </>
    );
};

export default AddVehicle;
