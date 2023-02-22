import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { AuthContext } from "../../context/auth/context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { Spinner } from "../layout/spinner";

const UpdateProfileSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email field is required"),
  full_name: Yup.string()
    .min(2, "Full Name field too short")
    .max(50, "Full Name field too long")
    .required("Full Name field is required"),
  phone: Yup.string()
    .min(6, "Phone field too short")
    .max(35, "Phone field too long")
    .required("Phone field is required"),
  address: Yup.string()
    .min(2, "Address field too short")
    .max(255, "Address field too long")
    .required("Address field is required"),
});

export const Profile = () => {
  const { userData, updateUser, loading } = useContext(AuthContext);
  const { user } = userData;

  return (
    <div className="font-sans leading-tight min-h-screen bg-grey-lighter p-4 md:p-4 lg:p-8">
      <div className="mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div
          className="bg-cover h-20 md:h-20 lg:h-40"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/profile_bg.png)`,
          }}
        ></div>
        <div className="px-4 pb-6">
          <div className="text-center sm:text-left sm:flex mb-4">
            <FontAwesomeIcon
              icon={faUserCircle}
              className="h-20 md:h-20 lg:h-32 w-20 md:w-20 lg:w-32 rounded-full border-4 border-white -mt-10 md:-mt-10 lg:-mt-16 mr-4"
              style={{ color: "#ccc" }}
            />
          </div>
        </div>
        <Formik
          initialValues={{
            user_id: user?.user_id,
            email: user?.email,
            full_name: user?.full_name,
            phone: user?.phone,
            address: user?.address,
          }}
          validationSchema={UpdateProfileSchema}
          onSubmit={async (values) => {
            await updateUser(values);
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col">
              <div className="bg-white space-y-6">
                <div className="profile-input-div md:inline-flex space-y-4 md:space-y-0 w-full px-4 md:px-4 lg:px-20 text-gray-500 items-center">
                  <h2 className="md:w-1/3 mx-auto text-sm font-medium mb-1">
                    Email
                  </h2>
                  <div className="md:w-2/3 mx-auto">
                    <Field
                      name="email"
                      id="email"
                      type="email"
                      className="w-11/12 border rounded focus:outline-none focus:text-gray-600 p-2"
                      placeholder="Email"
                    />
                    {errors.email && touched.email ? (
                      <span className="error-tag">{errors.email}</span>
                    ) : null}
                  </div>
                </div>
                <hr />
                <div className="profile-input-div md:inline-flex  space-y-4 md:space-y-0  w-full px-4 md:px-4 lg:px-20 text-gray-500 items-center">
                  <h2 className="md:w-1/3 mx-auto text-sm font-medium mb-1">
                    Full name
                  </h2>
                  <div className="md:w-2/3 mx-auto space-y-5">
                    <Field
                      name="full_name"
                      type="text"
                      className="w-11/12 border rounded focus:outline-none focus:text-gray-600 p-2"
                      placeholder="Full name"
                    />
                    {errors.full_name && touched.full_name ? (
                      <span className="error-tag">{errors.full_name}</span>
                    ) : null}
                  </div>
                </div>
                <hr />
                <div className="profile-input-div md:inline-flex  space-y-4 md:space-y-0  w-full px-4 md:px-4 lg:px-20 text-gray-500 items-center">
                  <h2 className="md:w-1/3 mx-auto text-sm font-medium mb-1">
                    Phone
                  </h2>
                  <div className="md:w-2/3 mx-auto space-y-5">
                    <Field
                      name="phone"
                      type="text"
                      className="w-11/12 border rounded focus:outline-none focus:text-gray-600 p-2"
                      placeholder="Phone"
                    />
                    {errors.phone && touched.phone ? (
                      <span className="error-tag">{errors.phone}</span>
                    ) : null}
                  </div>
                </div>
                <hr />
                <div className="profile-input-div md:inline-flex space-y-4 md:space-y-0  w-full px-4 md:px-4 lg:px-20 text-gray-500 items-center">
                  <h2 className="md:w-1/3 mx-auto text-sm font-medium mb-1">
                    Address
                  </h2>
                  <div className="md:w-2/3 mx-auto space-y-5">
                    <Field
                      name="address"
                      type="text"
                      component="textarea"
                      className="w-full border rounded border-slate-300 focus:outline-none focus:text-gray-600 p-2"
                      placeholder="Address"
                    ></Field>
                    {errors.address && touched.address ? (
                      <span className="error-tag">{errors.address}</span>
                    ) : null}
                  </div>
                </div>

                <div className="px-4 pb-2 text-right text-gray-500 ">
                  <div className="mt-10 mr-[100] ">
                    <button
                      type="submit"
                      className="bg-indigo-500 text-gray-100 px-4 w-48 h-12 rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg"
                      disabled={loading}
                    >
                      {loading && <Spinner />}
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
