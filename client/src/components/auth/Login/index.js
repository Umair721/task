import React, { useState, memo, useCallback } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Api from "@services/api";
import { useDispatch } from "react-redux";
import { actions } from "@Redux/LoginRedux";
import { Link, useNavigate } from "react-router-dom";


const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()



    const validate = values => {
        const errors = {};
        if (!values.email) {
            errors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email format";
        }
        if (!values.password) {
            errors.password = "Password is required";
        }
        return errors;
    };
    const submitForm = useCallback(async data => {
        const formData = {
            email: data.email,
            password: data.password,
        };

        const result = await actions.submitLogin(dispatch, formData);
        if (result?.status === 200) {
            const response = result?.data;
            if (response?.code === 200) {
                toast.success("User Login Successfully");
                Api.setClientToken(response?.token);

                window.location.assign("/dashboard")
            } else {
                toast.error(response ? response?.message : "");
            }
        } else {
            toast.error("Something went wrong");
        }
    }, []);

    return (
        <>

            <div className="w-6/12 mx-auto">
                <Formik
                    initialValues={{ email: "", password: "" }}
                    validate={validate}
                    onSubmit={values => {
                        console.log(values, "vllllll")
                        submitForm(values);
                    }}
                >
                    {({ values, handleSubmit }) => (
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
                                />
                                <br />
                                <ErrorMessage
                                    style={{ color: "red" }}
                                    name="email"
                                    component="div"
                                />
                            </div>
                            <div className="mt-[25px] w-full">
                                <label
                                    htmlFor="password"
                                    className="text-start text-[14px] leading-[16px] font-medium darkGray"
                                >
                                    Password
                                </label>
                                <br />
                                <Field
                                    type="password"
                                    name="password"
                                    className="border border-[#E3E5E6] px-3 rounded-[8px] bg-[#FFFFFF] py-2 w-full mt-[12px] placeholder:text-[14px] placeholder:leading-4"
                                    value={values.password || ""}
                                    placeholder="Enter password"
                                />
                                <br />
                                <ErrorMessage
                                    style={{ color: "red" }}
                                    name="password"
                                    component="div"
                                />
                            </div>
                            <br />
                            <div className="my-[25px] w-full">
                                <button
                                    type="submit"
                                    disabled={values.email && values.password ? false : true}
                                    className="disabled:opacity-30 bg-[#2F42ED] text-white py-3 px-4 rounded-[7px] w-full text-[16px] leading-4"
                                >
                                    Login
                                </button>
                            </div>

                            <div className="text-center">
                                <p className="text-[16px] leading-10 tracking-[-0.5px] darkGray">
                                    Or <Link className="underline" to="/signup">Register</Link>
                                </p>
                            </div>

                        </Form>
                    )}
                </Formik>
            </div>
        </>
    );
}
export default memo(Login);
