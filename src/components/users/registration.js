import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../context/auth/context";
import { Spinner } from "../layout/spinner";

import { Sidebar } from "./sidebar";
import "./users.css";

const RegistrationSchema = Yup.object().shape({
  full_name: Yup.string()
    .min(6, "Full Name field too short")
    .max(50, "Full Name field too long")
    .required("Full Name field is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email field is required"),
  password: Yup.string()
    .min(2, "Password field too short")
    .max(50, "Password field too long")
    .required("Password field is required"),
});

export const Registration = (props) => {
  const [subscriptionId, setSubscriptionId] = useState([]);
  
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, register } = useContext(AuthContext);

  useEffect(() => {
    const { subscription_id } = location.state;
    if (!subscription_id) if (!subscriptionId) navigate("/subscription");
    setSubscriptionId(subscription_id);
    // eslint-disable-next-line
  }, []);

  const createUser = async (values) => {
    Object.assign(values, { subscription_id: subscriptionId });
    var result = await register(values);
    if (result) return //error message is shown at the registration context;
    navigate("/dashboard");
  };

  return (
    <div className="flex items-center min-h-screen bg-gray-100 lg:justify-center">
      <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max flex-row flex-1 h-1/5">
        <div className="ml-auto pt-4 pl-16 hidden md:hidden lg:flex login-sidebar">
          <Sidebar />
        </div>
        <div className="login w-[50%] h-screen bg-white text-center">
          <div className="px-12 bg-white md:flex-4 m-auto min-w-[50%]">
            <h3 className="my-4 text-2xl font-semibold text-gray-700">
              Sign up
            </h3>
            <Formik
              initialValues={{
                full_name: "",
                email: "",
                password: "",
              }}
              validationSchema={RegistrationSchema}
              onSubmit={createUser}
            >
              {({ errors, touched }) => (
                <Form className="flex flex-col space-y-5">
                  <div className="flex flex-col relative z-0">
                    <Field
                      type="text"
                      name="full_name"
                      id="full_name"
                      className="px-2 py-2 transition duration-300 border border-gray-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200
                                  bg-transparent focus:border-blue-600 peer rounded-lg p-5"
                      placeholder=" "
                      aria-describedby="Type your name"
                    />
                    <label
                      htmlFor="full_name"
                      className="absolute text-sm text-gray-600 font-500 dark:text-green-500 duration-300 transform 
                                -translate-y-4 scale-75 top-3 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                peer-focus:scale-75 peer-focus:-translate-y-4"
                    >
                      Full name
                    </label>
                    {errors.full_name && touched.full_name ? (
                      <span className="error-tag">{errors.full_name}</span>
                    ) : null}
                  </div>

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
                  <div>
                    <button
                      disabled={loading}
                      type="submit"
                      className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                    >
                      {loading && <Spinner />}
                      Sign up
                    </button>
                  </div>
                  <p className="mt-6 text-sm text-center">
                    Have an account?{" "}
                    <button
                      type="button"
                      className="underline text-blue-500 background-transparent outline-none focus:outline-none ease-linear transition-all duration-150"
                      onClick={() => navigate("/login")}
                    >
                      Sign in now
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
