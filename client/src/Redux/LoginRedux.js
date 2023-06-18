
import Api from "@services/api";


const types = {
    LOGIN_PENDING: "LOGIN_PENDING",
    LOGIN_SUCCESS: "LOGIN_SUCCESS",
    LOGIN_FAILURE: "LOGIN_FAILURE",

    LOGOUT_PENDING: "LOGOUT_PENDING",
    LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
    LOGOUT_FAILURE: "LOGOUT_FAILURE",

    FACEBOOK_LOGIN_PENDING: "FACEBOOK_LOGIN_PENDING",
    FACEBOOK_LOGIN_SUCCESS: "FACEBOOK_LOGIN_SUCCESS",
    FACEBOOK_LOGIN_FAILURE: "FACEBOOK_LOGIN_FAILURE",

    GOOGLE_LOGIN_PENDING: "GOOGLE_LOGIN_PENDING",
    GOOGLE_LOGIN_SUCCESS: "GOOGLE_LOGIN_SUCCESS",
    GOOGLE_LOGIN_FAILURE: "GOOGLE_LOGIN_FAILURE",
};
export const actions = {
    submitLogin: async (dispatch, data) => {
        dispatch({ type: types.LOGIN_PENDING });
        const json = await Api.login(data);
        if (json !== undefined) {
            if (200 === json.data.code) {
                // Omit the password from the response data
                const responseData = json.data;
                delete responseData.userInfo.password;

                dispatch({
                    type: types.LOGIN_SUCCESS,
                    data: responseData,
                });
            } else {
                dispatch({ type: types.LOGIN_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.LOGIN_FAILURE, data: "" });
        }
        return json;
    },

    submitFaceBookLogin: async (dispatch, data) => {
        dispatch({ type: types.FACEBOOK_LOGIN_PENDING });
        const json = await Api.loginWithSocialAcc(data);
        console.log(json, "json")
        if (json !== undefined) {
            if (200 === json.data.code) {
                // Omit the password from the response data
                const responseData = json.data;
                delete responseData.userInfo.password;

                dispatch({
                    type: types.FACEBOOK_LOGIN_SUCCESS,
                    data: responseData,
                });
            } else {
                dispatch({ type: types.FACEBOOK_LOGIN_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.FACEBOOK_LOGIN_FAILURE, data: "" });
        }
        return json;
    },

    submitGoogleLogin: async (dispatch, data) => {
        dispatch({ type: types.GOOGLE_LOGIN_PENDING });
        const json = await Api.loginWithSocialAcc(data);
        console.log(json, "json")
        if (json !== undefined) {
            if (200 === json.data.code) {
                // Omit the password from the response data
                const responseData = json.data;
                delete responseData.userInfo.password;

                dispatch({
                    type: types.GOOGLE_LOGIN_SUCCESS,
                    data: responseData,
                });
            } else {
                dispatch({ type: types.GOOGLE_LOGIN_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.GOOGLE_LOGIN_FAILURE, data: "" });
        }
        return json;
    },



    logoutAction: (dispatch) => {
        // Reset the user state
        dispatch({
            type: types.LOGIN_SUCCESS,
            data: "",
        });
    }

};
const initialState = {
    user: {},
    error: "",
    isSubmitting: false,
};
export const reducer = (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {

        case types.LOGIN_PENDING: {
            return {
                ...state,
                error: "",
                isSubmitting: true,
            };
        }
        case types.LOGIN_SUCCESS: {

            return {
                ...state,
                error: "",
                isSubmitting: false,
                user: data,
            };
        }

        case types.LOGIN_FAILURE: {
            return {
                ...state,
                isSubmitting: false,
                error: data,
            };
        }

        case types.FACEBOOK_LOGIN_PENDING: {
            return {
                ...state,
                error: "",
                isSubmitting: true,
            };
        }
        case types.FACEBOOK_LOGIN_SUCCESS: {

            return {
                ...state,
                error: "",
                isSubmitting: false,
                user: data,
            };
        }

        case types.FACEBOOK_LOGIN_FAILURE: {
            return {
                ...state,
                isSubmitting: false,
                error: data,
            };
        }


        case types.GOOGLE_LOGIN_PENDING: {
            return {
                ...state,
                error: "",
                isSubmitting: true,
            };
        }
        case types.GOOGLE_LOGIN_SUCCESS: {

            return {
                ...state,
                error: "",
                isSubmitting: false,
                user: data,
            };
        }

        case types.GOOGLE_LOGIN_FAILURE: {
            return {
                ...state,
                isSubmitting: false,
                error: data,
            };
        }





        case types.LOGOUT_SUCCESS: {
            return {
                ...state,
                error: "",
                isSubmitting: false,
                user: data,
            };
        }



        default:
            return state;
    }
};
