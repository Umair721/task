import Api from "../services/api";
const types = {
    SUBMIT_VEHICLE_PENDING: "SUBMIT_VEHICLE_PENDING",
    SUBMIT_VEHICLE_SUCCESS: "SUBMIT_VEHICLE_SUCCESS",
    SUBMIT_VEHICLE_FAILURE: "SUBMIT_VEHICLE_FAILURE",

    FETCH_VEHICLE_PENDING: "FETCH_VEHICLE_PENDING",
    FETCH_VEHICLE_SUCCESS: "FETCH_VEHICLE_SUCCESS",
    FETCH_VEHICLE_FAILURE: "FETCH_VEHICLE_FAILURE",


    UPDATE_VEHICLE_PENDING: "UPDATE_VEHICLE_PENDING",
    UPDATE_VEHICLE_SUCCESS: "UPDATE_VEHICLE_SUCCESS",
    UPDATE_VEHICLE_FAILURE: "UPDATE_VEHICLE_FAILURE",

    DELETE_VEHICLE_PENDING: "DELETE_VEHICLE_PENDING",
    DELETE_VEHICLE_SUCCESS: "DELETE_VEHICLE_SUCCESS",
    DELETE_VEHICLE_FAILURE: "DELETE_VEHICLE_FAILURE",




};
export const actions = {

    submitVehicle: async (dispatch, data) => {

        dispatch({ type: types.SUBMIT_VEHICLE_PENDING });
        const json = await Api.addVehicle(data);

        if (json !== undefined) {
            if (200 === json.status) {
                dispatch({
                    type: types.SUBMIT_VEHICLE_SUCCESS,
                    data: json.data,
                });
            } else {
                dispatch({ type: types.SUBMIT_VEHICLE_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.SUBMIT_VEHICLE_FAILURE, data: "" });
        }
        return json;
    },



    fetchVehicle: async (dispatch) => {
        dispatch({ type: types.FETCH_VEHICLE_PENDING });
        const json = await Api.getVehicle();
        if (json !== undefined) {
            if (200 === json.status) {
                dispatch({
                    type: types.FETCH_VEHICLE_SUCCESS,
                    data: json.data,
                });
            } else {
                dispatch({
                    type: types.FETCH_VEHICLE_FAILURE,
                    data: json.data?.error?.message,
                });
            }
        }
        return json;
    },



    updateVehicle: async (dispatch, id, data) => {


        dispatch({ type: types.UPDATE_VEHICLE_PENDING });
        const json = await Api.updateVehicle(id, data);

        if (json !== undefined) {
            if (200 === json.status) {
                dispatch({
                    type: types.UPDATE_VEHICLE_SUCCESS,
                    data: json.data,
                });
            } else {
                dispatch({ type: types.UPDATE_VEHICLE_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.UPDATE_VEHICLE_FAILURE, data: "" });
        }
        return json;
    },

    deleteVehicle: async (dispatch, id) => {
        dispatch({ type: types.DELETE_VEHICLE_PENDING });
        const json = await Api.deleteVehicle(id);

        if (json !== undefined) {
            if (200 === json.status) {
                dispatch({
                    type: types.DELETE_VEHICLE_SUCCESS,
                    data: json.data,
                });
            } else {
                dispatch({ type: types.DELETE_VEHICLE_FAILURE, data: "" });
            }
        } else {
            dispatch({ type: types.DELETE_VEHICLE_FAILURE, data: "" });
        }
        return json;
    },


};
const initialState = {
    data: {},
    vehicle: [],
    error: {},
    isSubmitting: false,
};
export const reducer = (state = initialState, action) => {
    const { type, data } = action;

    switch (type) {

        case types.SUBMIT_VEHICLE_PENDING: {
            return {
                ...state,
                error: {},
                isSubmitting: true,
            };
        }
        case types.SUBMIT_VEHICLE_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                data: data,
            };
        }
        case types.SUBMIT_VEHICLE_FAILURE: {
            return {
                ...state,
                isSubmitting: true,
                error: data,
            };
        }

        case types.FETCH_VEHICLE_PENDING: {
            return {
                ...state,
                isSubmitting: true,

            };
        }
        case types.FETCH_VEHICLE_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                vehicle: data

            };
        }
        case types.FETCH_VEHICLE_FAILURE: {
            return {
                ...state,
                isSubmitting: true,
                error: data

            };
        }

        case types.UPDATE_VEHICLE_PENDING: {
            return {
                ...state,
                error: {},
                isSubmitting: true,
            };
        }
        case types.UPDATE_VEHICLE_SUCCESS: {
            return {
                ...state,
                isSubmitting: false,
                data: data,
            };
        }
        case types.UPDATE_VEHICLE_FAILURE: {
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
