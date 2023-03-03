import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth/context";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { Spinner } from "../layout/spinner";
import { Alert } from "../shared/alert";
import { FacebookProvider, LoginButton } from "react-facebook";
// import { GoogleLogin } from 'react-google-login';

import { Sidebar } from "./sidebar";
import "./users.css";

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address")
        .required("Email field is required"),
    password: Yup.string()
        .min(2, "Password field too short")
        .max(50, "Password field too long")
        .required("Password field is required"),
});

export const Login = (props) => {
    const navigate = useNavigate();
    const [isChecked] = useState(true);

    const { state, login, loading, isAuthenticated } = useContext(AuthContext);
    const { error } = state;

    useEffect(() => {
        if (isAuthenticated) {
            navigate(`/dashboard`);
        }
    }, [isAuthenticated, navigate]);

    const responseFacebook = (response) => {
        console.log(response.status);
    };
    
    return (
        <div className="flex items-center min-h-screen bg-gray-100 lg:justify-center">
            <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max flex-row flex-1 h-1/5">
                <div className="ml-auto pt-4 pl-16 hidden md:hidden lg:flex login-sidebar">
                    <Sidebar />
                </div>
                <div className="login w-[50%] h-screen bg-white text-center">
                    <div className="px-12 bg-white md:flex-2 m-auto min-w-[50%]">
                        <h3 className="my-4 text-2xl font-semibold text-gray-700">
                            Log in
                        </h3>
                        {error && <Alert message={error} />}
                        <Formik
                            initialValues={{
                                email: "",
                                password: "",
                                remember: false,
                            }}
                            validationSchema={LoginSchema}
                            onSubmit={async (values) => {
                                await login(values, isChecked);
                            }}
                        >
                            {({ errors, touched }) => (
                                <Form className="flex flex-col space-y-5">
                                    <div className="flex flex-col relative z-0">
                                        <Field
                                            type="email"
                                            name="email"
                                            id="email"
                                            className="px-2 py-2 transition duration-300 border border-gray-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200
                                  bg-transparent focus:border-blue-600 peer rounded-lg p-5"
                                            placeholder=" "
                                            aria-describedby="Type your email address"
                                        />
                                        <label
                                            htmlFor="email"
                                            className="absolute text-sm text-gray-600 font-500 dark:text-green-500 duration-300 transform 
                                -translate-y-4 scale-75 top-3 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                peer-focus:scale-75 peer-focus:-translate-y-4"
                                        >
                                            Email
                                        </label>
                                        {errors.email && touched.email ? (
                                            <span className="error-tag">{errors.email}</span>
                                        ) : null}
                                    </div>
                                    <div className="flex flex-col relative z-0">
                                        <Field
                                            type="password"
                                            name="password"
                                            id="password"
                                            className="px-2 py-2 transition duration-300 border border-gray-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200
                                  bg-transparent focus:border-blue-600 peer rounded-lg p-5"
                                            placeholder=" "
                                            aria-describedby="Type your password"
                                        />
                                        <label
                                            htmlFor="password"
                                            className="absolute text-sm text-gray-600 font-500 dark:text-green-500 duration-300 transform 
                                -translate-y-4 scale-75 top-3 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                peer-focus:scale-75 peer-focus:-translate-y-4"
                                        >
                                            Password
                                        </label>
                                        {errors.password && touched.password ? (
                                            <span className="error-tag">{errors.password}</span>
                                        ) : null}
                                    </div>
                                    <div className="forgot-pass-link">
                                        <button
                                            type="button"
                                            className="background-transparent outline-none focus:outline-none ease-linear transition-all duration-150"
                                            onClick={() => navigate("/forgot-password")}
                                        >
                                            Forgot Password?
                                        </button>
                                        <div className="flex items-center space-x-2">
                                            <Field
                                                type="checkbox"
                                                id="remember"
                                                name="remember"
                                                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
                                            />
                                            <label
                                                htmlFor="remember"
                                                className="text-sm font-semibold text-gray-500"
                                            >
                                                Remember me
                                            </label>
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                            disabled={loading}
                                            type="submit"
                                            className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                                        >
                                            {loading && <Spinner />}
                                            Sign in
                                        </button>
                                    </div>
                                    <div className="flex flex-col space-y-5">
                                        <span className="flex items-center justify-center space-x-2">
                                            <span className="h-px bg-gray-400 w-44"></span>
                                            <span className="font-normal text-gray-500">or</span>
                                            <span className="h-px bg-gray-400 w-44"></span>
                                        </span>
                                        <div className="flex flex-col space-y-4">
                                            <div
                                                className="background-transparent outline-none focus:outline-none ease-linear transition-all duration-150 
                        flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none">
                                                <span>
                                                    <svg
                                                        className="w-5 h-5 text-blue-800 fill-current group-hover:text-white"
                                                        viewBox="0 0 16 16"
                                                        version="1.1"
                                                        aria-hidden="true"
                                                    >
                                                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
                                                    </svg>
                                                </span>
                                                <span className="text-sm font-normal text-gray-600 group-hover:text-white">
                                                    <FacebookProvider appId="appId">
                                                        <LoginButton
                                                            scope="email"
                                                            onError={responseFacebook}
                                                            onSuccess={responseFacebook}
                                                        >
                                                            Continue with Facebook
                                                        </LoginButton>
                                                    </FacebookProvider>
                                                </span>
                                            </div>
                                            <div
                                                className="background-transparent outline-none focus:outline-none ease-linear transition-all duration-150 
                        flex items-center justify-center px-4 py-2 space-x-2 transition-colors duration-300 border border-blue-500 rounded-md group hover:bg-blue-500 focus:outline-none">
                                                <span>
                                                    <svg
                                                        className="text-blue-500 group-hover:text-white"
                                                        viewBox="0 0 48 48"
                                                        width="20"
                                                        height="20"
                                                        fill="currentColor"
                                                    >
                                                        <path
                                                            fill="#FFC107"
                                                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                                        />
                                                        <path
                                                            fill="#FF3D00"
                                                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                                        />
                                                        <path
                                                            fill="#4CAF50"
                                                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                                        />
                                                        <path
                                                            fill="#1976D2"
                                                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                                        />
                                                    </svg>
                                                </span>
                                                <span className="text-sm font-normal text-gray-800 group-hover:text-white">
                                                    {/* <GoogleLogin
                                            clientId="clientId"
                                            buttonText="Continue with Google"
                                            onSuccess={responseGoogle}
                                            onFailure={responseGoogle}
                                            cookiePolicy={'single_host_origin'}
                                            isSignedIn={true}
                                        /> */}
                                                    Continue with Google
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-sm text-center">
                                        Not a member?{" "}
                                        <button
                                            type="button"
                                            className="underline text-blue-500 background-transparent outline-none focus:outline-none ease-linear transition-all duration-150"
                                            onClick={() => navigate("/subscription")}
                                        >
                                            Sign up now
                                        </button>
                                    </p>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};
