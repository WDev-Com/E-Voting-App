import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginMinnerAsync,
  selectError,
  selectLoggedInMinnerToken,
} from "./minnerAuthSlice";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import HomeNavBar from "../../CommonComponent/Navigations/HomePageMenu";
import { useForm } from "react-hook-form";
const LoginMinnerPage = () => {
  const dispatch = useDispatch();
  const userMinner = useSelector(selectLoggedInMinnerToken);
  const error = useSelector(selectError);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <>
      <HomeNavBar>
        {!userMinner ? (
          <Navigate to={"/MinnerLogin"}></Navigate>
        ) : (
          <Navigate to={"/MinnerProfile"}></Navigate>
        )}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-28 w-auto rounded-full"
              src="/minner.png"
              alt="Minner Img"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Candidate Login into your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  loginMinnerAsync({
                    username: data.username,
                    password: data.password,
                  })
                );
              })}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  UserName
                </label>
                <div className="mt-2">
                  <input
                    id="username"
                    {...register("username", {
                      required: "username is required",
                    })}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error && error.message && (
                    <p className="text-red-500">{error.message}</p>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "password is required",
                    })}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {error && error.message && (
                    <p className="text-red-500">{error.message}</p>
                  )}
                </div>
                {error && (
                  <p className="text-red-500">{error || error.message}</p>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </HomeNavBar>
    </>
  );
};

export default LoginMinnerPage;
