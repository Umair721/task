import Api from "../services/api";
const types = {
    SUBMIT_CATEGORY_PENDING: "SUBMIT_CATEGORY_PENDING",
    SUBMIT_CATEGORY_SUCCESS: "SUBMIT_CATEGORY_SUCCESS",
    SUBMIT_CATEGORY_FAILURE: "SUBMIT_CATEGORY_FAILURE",

    FETCH_CATEGORY_PENDING: "FETCH_CATEGORY_PENDING",
    FETCH_CATEGORY_SUCCESS: "FETCH_CATEGORY_SUCCESS",
    FETCH_CATEGORY_FAILURE: "FETCH_CATEGORY_FAILURE",


    UPDATE_CATEGORY_PENDING: "UPDATE_CATEGORY_PENDING",
    UPDATE_CATEGORY_SUCCESS: "UPDATE_CATEGORY_SUCCESS",
    UPDATE_CATEGORY_FAILURE: "UPDATE_CATEGORY_FAILURE",

    DELETE_CATEGORY_PENDING: "DELETE_CATEGORY_PENDING",
    DELETE_CATEGORY_SUCCESS: "DELETE_CATEGORY_SUCCESS",
    DELETE_CATEGORY_FAILURE: "DELETE_CATEGORY_FAILURE",




};
export const actions = {

    submitCategory: async (dispatch, data) => {


        dispatch({ type: types.SUBMIT_CATEGORY_PENDING });
        const json = await Api.addCategory(data);

        if (json !== undefined) {
            if (200 === json.status) {
                dispatch({
                    type: types.SUBMIT_CATEGORY_SUCCESS,
                    data: json.data,
                });
            } else {
                dispatch({ type: types.SUBMIT_CATEGORY_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.SUBMIT_CATEGORY_FAILURE, data: "" });
        }
        return json;
    },



    fetchCategory: async (dispatch) => {
        dispatch({ type: types.FETCH_CATEGORY_PENDING });
        const json = await Api.getCategory();
        if (json !== undefined) {
            if (200 === json.status) {
                dispatch({
                    type: types.FETCH_CATEGORY_SUCCESS,
                    data: json.data,
                });
            } else {
                dispatch({
                    type: types.FETCH_CATEGORY_FAILURE,
                    data: json.data?.error?.message,
                });
            }
        }
        return json;
    },



    updateCategory: async (dispatch, id, data) => {


        dispatch({ type: types.UPDATE_CATEGORY_PENDING });
        const json = await Api.updateCategory(id, data);

        if (json !== undefined) {
            if (200 === json.status) {
                dispatch({
                    type: types.UPDATE_CATEGORY_SUCCESS,
                    data: json.data,
                });
            } else {
                dispatch({ type: types.UPDATE_CATEGORY_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.UPDATE_CATEGORY_FAILURE, data: "" });
        }
        return json;
    },

    deleteCategory: async (dispatch, id) => {
        dispatch({ type: types.DELETE_CATEGORY_PENDING });
        const json = await Api.deleteCategory(id);

        if (json !== undefined) {
            if (200 === json.status) {
                dispatch({
                    type: types.DELETE_CATEGORY_SUCCESS,
                    data: json.data,
                });
            } else {
                dispatch({ type: types.DELETE_CATEGORY_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.DELETE_CATEGORY_FAILURE, data: "" });
        }
        return json;
    },


};
const initialState = {
    data: {},
    category: [],
    error: {},
    isSubmitting: false,
};
export const reducer = (state = initialState, action) => {
    const { type, data } = action;

    switch (type) {

        case types.SUBMIT_CATEGORY_PENDING: {
            return {
                ...state,
                error: {},
                isSubmitting: true,
            };
        }
        case types.SUBMIT_CATEGORY_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                data: data,
            };
        }
        case types.SUBMIT_CATEGORY_FAILURE: {
            return {
                ...state,
                isSubmitting: true,
                error: data,
            };
        }

        case types.FETCH_CATEGORY_PENDING: {
            return {
                ...state,
                isSubmitting: true,

            };
        }
        case types.FETCH_CATEGORY_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                category: data.categories

            };
        }
        case types.FETCH_CATEGORY_FAILURE: {
            return {
                ...state,
                isSubmitting: true,
                error: data

            };
        }

        case types.UPDATE_CATEGORY_PENDING: {
            return {
                ...state,
                error: {},
                isSubmitting: true,
            };
        }
        case types.UPDATE_CATEGORY_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                data: data,
            };
        }
        case types.UPDATE_CATEGORY_FAILURE: {
            return {
                ...state,
                isSubmitting: true,
                error: data,
            };
        }




        default:
            return state;
    }
};
