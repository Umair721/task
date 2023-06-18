import * as Yup from "yup";
export const RegisterSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required!"),
    last_name: Yup.string().required("Last Name is required!"),
    email: Yup.string()
        .required("Email is required!")
        .email("Invalid email address"),

    calling_code: Yup.string().required("Calling Code is required"),
    contact_number: Yup.string()
        .required("Contact is required")
        .min(11, "Contact number must be 11 characters"),
    // .max(11, "Contact number must be 11 characters"),
});
export const RegisterVehicleSchema = Yup.object().shape({
    category_id: Yup.number().required("Category Id is required!"),
    color: Yup.string().required("Color is required!"),
    make: Yup.string()
        .required("Make is required!"),


    model: Yup.string().required("Model is required"),
    registration_num: Yup.string()
        .required("registration is required")
});



export const RegisterUserInitialValue = () => {
    let SerValue = {
        first_name: "",
        last_name: "",
        email: "",
        calling_code: "",
        contact_number: "",
    };

    return SerValue;
};

export const RegisterVehicleInitialValue = (isUpdate, vehicleData) => {
    let SerValue = {
        category_id: isUpdate ? vehicleData?.category_id : "",
        color: isUpdate ? vehicleData?.color : "",
        make: isUpdate ? vehicleData?.make : "",
        model: isUpdate ? vehicleData?.model : "",
        registration_num: isUpdate ? vehicleData?.registration_num : "",
    };

    return SerValue;
};
