import { SET_LOADING, SET_USER_DATA, LOGOUT, USER_REGISTRATION, CHANGE_PASSWORD, FORGOT_PASSWORD, RESET_PASSWORD, SET_ERROR, SET_MESSAGE } from "./types";

export const Reducer = (state, { type, payload }) => {

    switch (type) {

        case SET_LOADING:
            return {
                ...state,
                loading: true
            };

        case SET_USER_DATA:
            return {
                ...state,
                userData: payload,
                isAuthenticated: true,
                loading: false
            };
        case LOGOUT:
            return {
                ...state,
                userData: null,
                isAuthenticated: false,
                loading: false
            };
        case USER_REGISTRATION:
            return {
                ...state,
                userData: payload,
                isAuthenticated: true,
                loading: false
            };
        case CHANGE_PASSWORD:
            return {
                ...state,
                data: payload,
                loading: false
            };
        case FORGOT_PASSWORD:
            return {
                ...state,
                loading: false
            };
        case RESET_PASSWORD:
            return {
                ...state,
                loading: false
            };
        case SET_ERROR:
            return {
                ...state,
                loading: false,
                error: payload,
                alertState: {
                    type: 'error',
                    message: payload
                }
            };
        case SET_MESSAGE:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                alertState: {
                    type: 'success',
                    message: payload
                }
            };

        default:
            return state;
    }
};

