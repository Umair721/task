import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import { Link } from "react-router-dom";
import { RegisterSchema, RegisterUserInitialValue } from "@common/Schema/helper";
import { useDispatch, useSelector } from "react-redux";
const { actions } = require("@Redux/PostalCode")
const { actions: action } = require("@Redux/SignupRedux")


const AuthRegister = () => {
    const dispatch = useDispatch()

    const fetchData = useCallback(async () => {
        await actions.fetchPostalCode(dispatch);

    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    // get Postal Code data from PostalCode Redux
    const data = useSelector((state) => state.postalCode.uniqueCallingCodes)


    const submitForm = async (data, handles) => {
        const singUpData = {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name,
            calling_code: data.calling_code,
            contact_number: data.contact_number,
        };

        const result = await action.submitSignupForm(dispatch, singUpData);
        if (result?.status === 200) {
            if (result?.data?.code === 200) {
                toast.success("User Created Successfully");
                handles.resetForm();
            } else {
                toast.error(result?.data ? result?.data?.message : "");
            }
        } else {
            toast.error("Something went wrong");
        }
    };


    return (
        <div className="w-6/12 mx-auto">
            <Formik
                initialValues={RegisterUserInitialValue}
                validationSchema={RegisterSchema}
                onSubmit={(values, handles) => {
                    submitForm(values, handles);
                }}
            >
                {({
                    values,
                    handleSubmit,
                    errors,
                    touched,
                    handleChange,
                    setFieldValue,
                }) => (
                    <Form
                        onSubmit={handleSubmit}
                        className="flex justify-center flex-col items-center"
                    >
                        <div className="mt-[25px] w-full">
                            <label
                                htmlFor="email"
                                className="text-start text-[14px] leading-[16px] font-medium darkGray"
                            >
                                Email
                            </label>
                            <br />
                            <Field
                                type="email"
                                name="email"
                                className="border border-[#E3E5E6] px-3 rounded-[8px] bg-[#FFFFFF] py-2 w-full mt-[12px] placeholder:text-[14px] placeholder:leading-4"
                                value={values.email || ""}
                                placeholder="Enter email address"
                                autoComplete="off"
                            />
                            <br />
                            <p className="text-red-500 text-[14px]">
                                {errors.email && touched.email && errors.email}
                            </p>
                        </div>

                        <div className="mt-[25px] w-full">
                            <label
                                htmlFor="first_name"
                                className="text-start text-[14px] leading-[16px] font-medium darkGray"
                            >
                                First Name
                            </label>
                            <br />
                            <Field
                                type="test"
                                className="border border-[#E3E5E6] px-3 rounded-[8px] bg-[#FFFFFF] py-2 w-full mt-[12px] placeholder:text-[14px] placeholder:leading-4"
                                name="first_name"
                                value={values.first_name || ""}
                                placeholder="First name"
                            />
                            <br />
                            <p className="text-[14px] text-red-500">
                                {errors.first_name &&
                                    touched.first_name &&
                                    errors.first_name}
                            </p>
                        </div>
                        <div className="mt-[25px] w-full">
                            <label
                                htmlFor="last_name"
                                className="text-start text-[14px] leading-[16px] font-medium darkGray"
                            >
                                Last Name
                            </label>
                            <br />
                            <Field
                                type="text"
                                className="border border-[#E3E5E6] px-3 rounded-[8px] bg-[#FFFFFF] py-2 w-full mt-[12px] placeholder:text-[14px] placeholder:leading-4"
                                name="last_name"
                                value={values.last_name || ""}
                                placeholder="Last name"
                            />
                            <br />
                            <p className="text-[14px] text-red-500">
                                {errors.last_name &&
                                    touched.last_name &&
                                    errors.last_name}
                            </p>
                        </div>



                        <div className="mt-[25px] w-full">
                            <label
                                htmlFor="contact_number"
                                className="text-start text-[14px] leading-[16px] font-medium darkGray"
                            >
                                Phone number
                            </label>
                            <br />
                            <div className="flex gap-3">
                                <Field
                                    name="calling_code"
                                    as="select"
                                    onChange={handleChange}
                                    value={values.calling_code || ""}
                                    className="border border-[#E3E5E6] px-3 rounded-[8px] bg-[#FFFFFF] py-2  mt-[12px] placeholder:text-[14px] placeholder:leading-4"
                                >
                                    <option value="">Select Postal Code</option>
                                    {data?.map((callingCode) => (
                                        <option key={callingCode} value={`+${callingCode}`}>
                                            {`+${callingCode}`}
                                        </option>
                                    ))}
                                </Field>
                                <Field
                                    type="text"
                                    className="border border-[#E3E5E6] px-3 rounded-[8px] bg-[#FFFFFF] py-2 w-full mt-[12px] placeholder:text-[14px] placeholder:leading-4"
                                    name="contact_number"
                                    value={values.contact_number || ""}
                                    placeholder="Mobile number"
                                />
                            </div>
                            <br />
                            <p className="text-[14px] text-red-500">
                                {errors.contact_number &&
                                    touched.contact_number &&
                                    errors.contact_number}
                            </p>
                        </div>
                        <br />
                        <div className="my-[25px] w-full">
                            <button
                                type="submit"
                                disabled={
                                    values.email &&

                                        values.first_name &&
                                        values.last_name &&

                                        values.contact_number
                                        ? false
                                        : true
                                }
                                className="disabled:opacity-30 bg-[#2F42ED] white py-3 px-4 rounded-[7px] w-full"
                            >
                                Continue
                            </button>
                            <p className="text-[12px] leading-10 tracking-[-0.5px] darkGray text-center">
                                By submitting, I accept E-Tracka{" "}
                                <Link className="text-[#2F42ED] underline">
                                    Terms of Use.
                                </Link>
                            </p>
                        </div>


                    </Form>
                )}
            </Formik>

        </div>
    );
};
export default AuthRegister;
