import React, { useContext } from "react";

import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../context/auth/context";
import { Spinner } from "../layout/spinner";

import "./users.css";

const ChangePasswordSchema = Yup.object().shape({
  current_password: Yup.string().required("Current password field is required"),
  password: Yup.string()
    .min(2, "Password field too short")
    .max(50, "Password field too long")
    .required("Password field is required"),
  confirm_password: Yup.string()
    .required("Confirm password field is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export const ChangePassword = () => {
  const { changePassword, loading } = useContext(AuthContext);

  return (
    <div className="flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center">
      <div className="flex overflow-hidden bg-white rounded-md shadow-lg md:flex-row md:flex-1 lg:max-w-screen-lg py-20">
        <div className="px-12 bg-white md:flex-2 m-auto max-w-50">
          <h3 className="my-4 text-3xl font-500 text-gray-700 pb-8 text-center">
            Change your password!
          </h3>

          <h6 className="description p-2">
            Your new password must be different to previously used passwords.
          </h6>
          <Formik
            initialValues={{
              current_password: "",
              password: "",
              confirm_password: "",
            }}
            validationSchema={ChangePasswordSchema}
            onSubmit={async (values) => {
              await changePassword(values);
            }}
          >
            {({ errors, touched }) => (
              <Form className="flex flex-col space-y-5">
                <div className="flex flex-col relative z-0">
                  <Field
                    type="password"
                    name="current_password"
                    id="current_password"
                    className="px-2 py-2 transition duration-300 border border-gray-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200
                                  bg-transparent focus:border-blue-600 peer rounded-lg p-5"
                    placeholder=" "
                    aria-describedby="Type your current password"
                  />
                  <label
                    htmlFor="current_password"
                    className="absolute text-sm text-gray-600 font-500 dark:text-green-500 duration-300 transform 
                                -translate-y-4 scale-75 top-3 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Current password
                  </label>
                  {errors.current_password && touched.current_password ? (
                    <span className="error-tag">{errors.current_password}</span>
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
                    New password
                  </label>
                  {errors.password && touched.password ? (
                    <span className="error-tag">{errors.password}</span>
                  ) : null}
                </div>

                <div className="flex flex-col relative z-0">
                  <Field
                    type="password"
                    name="confirm_password"
                    id="confirm_password"
                    className="px-2 py-2 transition duration-300 border border-gray-300 focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200
                                  bg-transparent focus:border-blue-600 peer rounded-lg p-5"
                    placeholder=" "
                    aria-describedby="Type your confirm password"
                  />
                  <label
                    htmlFor="confirm_password"
                    className="absolute text-sm text-gray-600 font-500 dark:text-green-500 duration-300 transform 
                                -translate-y-4 scale-75 top-3 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                                peer-focus:scale-75 peer-focus:-translate-y-4"
                  >
                    Confirm password
                  </label>
                  {errors.confirm_password && touched.confirm_password ? (
                    <span className="error-tag">{errors.confirm_password}</span>
                  ) : null}
                </div>
                <div>
                  <button
                    disabled={loading}
                    type="submit"
                    className="w-full px-4 py-2 text-md font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
                  >
                    {loading && <Spinner />}
                    Change Password
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
