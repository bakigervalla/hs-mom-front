import React, { useEffect, useReducer, createContext } from "react";
import { Reducer } from "./reducer";
import { toast } from "react-toastify";
import { client } from "../api";
import {
    SET_LOADING,
    SET_USER_DATA,
    LOGOUT,
    USER_REGISTRATION,
    CHANGE_PASSWORD,
    FORGOT_PASSWORD,
    RESET_PASSWORD,
    SET_ERROR,
} from "./types";

/*
import axios from 'axios';
 import { config } from "../../config/axios";
const { , AUTH_URL, authAxios } = config;
*/

const InitialState = {
    loading: false,
    userData: {},
    isAuthenticated: false
};

export const AuthContext = createContext(InitialState);

export const AuthState = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, InitialState);

    const setLoading = () => dispatch({ type: SET_LOADING });

    const checkAuthStatus = async () => {
        // checks is there's a token - returns true or false as data
        const { data } = await client.post("/users/auth");
        if (data) return dispatch({ type: SET_USER_DATA, payload: data });
    };

    const login = async (userCredentials, remember) => {
        setLoading();
        try {
            const response = await client.post("/users/login", userCredentials);

            if (response.status !== 200)
                return dispatch({ type: SET_ERROR, payload: response.data.message });

            const { data } = response;
            const { token, user } = data;

            if (remember) {
                localStorage.setItem("hs-auth-token", token);
                window.dispatchEvent(new Event("storage"));
            }

            return dispatch({ type: SET_USER_DATA, payload: user });
        } catch (err) {
            if (err.response.status === 401)
                return dispatch({ type: SET_ERROR, payload: err.response.data.error });
            else
                return dispatch({ type: SET_ERROR, payload: err.message });
        }
    };

    const logout = async () => {
        setLoading();
        try {
            localStorage.removeItem("hs-auth-token");
            window.dispatchEvent(new Event("storage"));
            return dispatch({ type: LOGOUT });
        } catch (err) {
            return dispatch({ type: SET_ERROR, payload: err.response.data.error });
        }
    };

    const register = async (new_user) => {
        setLoading();
        try {
            const { data, status } = await client.post("/users", new_user);

            if (status === 200) {
                const { user, token } = data;

                localStorage.setItem("hs-auth-token", token);

                dispatch({ type: USER_REGISTRATION, payload: user });
                return true;
            } else {
                toast.success("Your registration was successful.");
            }
        } catch (err) {
            toast.error(err.response.data.error ?? "Unable to register.");
            return dispatch({
                type: SET_ERROR,
                payload: err.response.data.error ?? "Unable to register.",
            });
        }
    };

    const updateUser = async (profile) => {
        setLoading();
        try {
            const { data } = await client.put("/users", profile);
            const { user } = data;

            toast.success("Saved sucessfull.");

            return dispatch({ type: SET_USER_DATA, payload: user });
        } catch (err) {
            toast.error(err.response.data.error ?? "Unable to save changes.");
            return dispatch({
                type: SET_ERROR,
                payload: err.response.data.error ?? "Unable to save changes.",
            });
        }
    };

    const forgotPassword = async (email) => {
        setLoading();
        try {
            await client.post("/users/request-reset-password", {
                ...email,
                redirectUrl: process.env.REACT_APP_BASE_URL,
            });
            toast.success("A reset password link was sent to your email");
            return dispatch({ type: FORGOT_PASSWORD });
        } catch (err) {
            console.log(err.response);
            toast.error(err.response.data.error ?? "Forgot password request failed.");
            return dispatch({
                type: SET_ERROR,
                payload: err.response.data.error ?? "Forgot password request failed.",
            });
        }
    };

    const resetPassword = async (resetPass) => {
        setLoading();
        try {
            await client.post("/users/reset-password", resetPass);
            toast.success("Password reset was successful.");
            return dispatch({ type: RESET_PASSWORD });
        } catch (err) {
            console.log(err.response);
            toast.error(err.response.data.error ?? "Password reset failed.");
            return dispatch({
                type: SET_ERROR,
                payload: err.response.data.error ?? "Password reset failed.",
            });
        }
    };

    const changePassword = async (userPass) => {
        setLoading();
        try {
            const { data } = await client.put("/users/change-password", userPass);
            toast.success("Password changed sucessfully");
            return dispatch({ type: CHANGE_PASSWORD, payload: data });
        } catch (err) {
            toast.error(err.response.data.error ?? "Change password failed.");
            return dispatch({
                type: SET_ERROR,
                payload: err.response.data.error ?? "Unable to change password.",
            });
        }
    };
    const refreshUserSubscriptions = async (userData) => {
        return dispatch({ type: SET_USER_DATA, payload: userData });
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    const setUserData = (data) =>
        dispatch({ type: SET_USER_DATA, payload: data });

    return (
        <AuthContext.Provider
            value={{
                state: state,
                loading: state.loading,
                isAuthenticated: state.isAuthenticated,
                userData: state.userData,
                alertState: state.alertState,
                setLoading,
                login,
                logout,
                register,
                forgotPassword,
                resetPassword,
                changePassword,
                refreshUserSubscriptions,
                updateUser,
                checkAuthStatus,
                setUserData,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
