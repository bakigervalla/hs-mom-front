import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../context/auth/context";
import { Spinner } from "../layout/spinner";
import { Alert } from "../layout/alert";

import "./users.css";

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email field is required"),
});

export const ForgotPassword = () => {
  const { loading, forgotPassword, isAuthenticated, alertsState } =
    useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/home`);
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex overflow-hidden bg-white rounded-md shadow-lg md:flex-row md:flex-1 lg:max-w-screen-lg py-20">
        {<Alert props={alertsState} />}
        <div className="px-12 bg-white md:flex-2 m-auto max-w-50 text-center">
          <img
            style={{ height: 40 }}
            alt="..."
            src={process.env.PUBLIC_URL + "/assets/images/tl-logo.png"}
          />
          <h3 className="my-8 text-3xl font-500 text-gray-700 pt-12">
            Trouble with logging in?
          </h3>
          <h6 className="text-justify description p-2">
            Enter your email address, phone number or username, and we'll send
            you a link to get back into your account.
          </h6>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={ForgotPasswordSchema}
            onSubmit={async (values) => {
              await forgotPassword(values);
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
                    // value={email}
                    // onChange={onFormInput}
                  />
                  <label
                    htmlFor="email"
                    className="absolute text-sm text-gray-600 font-500 dark:text-green-500 duration-300 transform 
                                -translate-y-4 scale-75 top-3 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Email address
                  </label>
                  {errors.email && touched.email ? (
                    <span className="error-tag">{errors.email}</span>
                  ) : null}
                </div>
                <div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full px-4 py-2 text-md font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                  >
                    {loading && <Spinner />}
                    Send link
                  </button>
                </div>
                <p className="mt-6 text-sm text-center">
                  <button
                    type="button"
                    className="text-black font-medium text-blue-500 background-transparent outline-none focus:outline-none ease-linear transition-all duration-150"
                    onClick={() => navigate("/login")}
                  >
                    Back to login
                  </button>
                </p>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
