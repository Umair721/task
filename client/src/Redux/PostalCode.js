
const types = {

    FETCH_PENDING: "FETCH_PENDING",
    FETCH_SUCCESS: "FETCH_SUCCESS",
    FETCH_FAILURE: "FETCH_FAILURE",

};
export const actions = {



    fetchPostalCode: async (dispatch) => {
        dispatch({ type: types.FETCH_PENDING });
        const response = await fetch("https://restcountries.com/v2/all");
        console.log(response);
        if (response !== undefined) {
            if (200 === response.status) {
                const data = await response.json();
                const uniqueCallingCodes = [];
                data.forEach((option) => {
                    const callingCode = option?.callingCodes[0];
                    if (callingCode && !uniqueCallingCodes.includes(callingCode)) {
                        uniqueCallingCodes.push(callingCode);
                    }
                });
                dispatch({
                    type: types.FETCH_SUCCESS,
                    data: {
                        postalCode: data,
                        uniqueCallingCodes: uniqueCallingCodes,
                    },
                });
            } else {
                dispatch({
                    type: types.FETCH_FAILURE,
                    data: "Failed to fetch postal codes.",
                });
            }
        }
        return response;
    },


};
const initialState = {
    uniqueCallingCodes: [],
    error: null,
    isFetching: false,
};

export const reducer = (state = initialState, action) => {
    const { type, data } = action;
    switch (type) {
        case types.FETCH_PENDING:
            return {
                ...state,
                error: null,
                isFetching: true,
            };
        case types.FETCH_SUCCESS:
            return {
                ...state,
                isFetching: false,
                uniqueCallingCodes: data.uniqueCallingCodes,
            };
        case types.FETCH_FAILURE:
            return {
                ...state,
                isFetching: false,
                error: data,
            };
        default:
            return state;
    }
};

