import React, { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "@Redux/CategoryRedux";
import { Link } from "react-router-dom";

const Category = () => {
    const dispatch = useDispatch();
    const [update, setUpdate] = useState(false);
    const [category, setCategory] = useState(null);

    const validate = values => {
        const errors = {};
        if (!values.category_name) {
            errors.category_name = "Category is required";
        }
        return errors;
    };


    //send data to backend

    const submitForm = useCallback(async (data, handles) => {
        const categoryData = {
            category_name: data.category_name,
        };

        let result;
        // Submit category backend
        if (!update) {
            result = await actions.submitCategory(dispatch, categoryData);
        } else {
            // update call
            result = await actions.updateCategory(dispatch, category?.id, categoryData);
        }

        if (result?.status === 200) {
            const response = result?.data;
            if (response?.code === 200) {
                handles.resetForm();
                setUpdate(false); // Clear update state
                setCategory(null); // Clear category state
                toast.success(response?.message);
                await actions.fetchCategory(dispatch);
            } else {
                toast.error(response ? response?.message : "");
            }
        } else {
            toast.error("Something went wrong");
        }
    }, [dispatch, category?.id, update]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await actions.fetchCategory(dispatch);
            } catch (error) {
                toast.error("Error occurred while fetching data.");
            }
        };

        fetchData();
    }, []);
    //get categories from redux
    const categories = useSelector(state => state.category?.category);
    //delete function 
    const onDelete = async (id) => {
        try {
            const data = await actions.deleteCategory(dispatch, id);
            if (data?.data?.code === 200) {
                toast.success(data?.data?.message)
                await actions.fetchCategory(dispatch);
            }
            else {
                toast.error(data?.data?.message)

            }
        } catch (error) {
            console.error(error);
        }
    };

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
            <div className="w-10/12 px-6">
                <Formik
                    initialValues={{
                        category_name: update ? category?.category_name || "" : ""
                    }}
                    enableReinitialize
                    validate={validate}
                    onSubmit={(values, handles) => {
                        submitForm(values, handles);
                    }}
                >
                    {({ values, handleSubmit }) => (
                        <Form
                            onSubmit={handleSubmit}
                            className="flex justify-center flex-col items-center"
                        >
                            <div className="mt-[25px] w-full">
                                <label
                                    htmlFor="category"
                                    className="text-start text-[14px] leading-[16px] font-medium darkGray"
                                >
                                    Category Name
                                </label>
                                <br />
                                <Field
                                    type="text"
                                    name="category_name"
                                    className="border border-[#E3E5E6] px-3 rounded-[8px] bg-[#FFFFFF] py-2 w-full mt-[12px] placeholder:text-[14px] placeholder:leading-4"
                                    value={values.category_name || ""}
                                    placeholder="Enter category_name"
                                />
                                <br />
                                <ErrorMessage
                                    style={{ color: "red" }}
                                    name="category_name"
                                    component="div"
                                />
                            </div>

                            <div className="my-[25px] w-full">
                                <button
                                    type="submit"
                                    disabled={!values.category_name}
                                    className="disabled:opacity-30 bg-[#2F42ED] text-white py-3 px-4 rounded-[7px] w-full text-[16px] leading-4"
                                >
                                    {update ? "Update Category" : "Add Category"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <h2 className="text-2xl mb-4">Categories</h2>
                <div className="grid grid-cols-2 gap-5">
                    {categories.map(category => (
                        <div key={category.id} className="p-6 shadow-xl rounded-md">
                            <h4 className="text-black">{category?.category_name}</h4>
                            <div className="flex gap-2 items-center justify-end">
                                <button
                                    className="disabled:opacity-30 bg-[#2F42ED] text-white py-3 px-4 rounded-[7px] text-[16px] leading-4"
                                    onClick={() => {
                                        setCategory(category);
                                        setUpdate(true);
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className="disabled:opacity-30 bg-red-500 text-white py-3 px-4 rounded-[7px] text-[16px] leading-4" onClick={() => onDelete(category.id)}>Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Category;
