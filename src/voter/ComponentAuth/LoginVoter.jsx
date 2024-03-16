import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInVoterToken,
  selectVoterChecked,
  loginVoterAsync,
  selectError,
} from "./voterAuthSlice";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import HomeNavBar from "../../CommonComponent/Navigations/HomePageMenu";
import { useForm } from "react-hook-form";

const LoginVoterPage = () => {
  const dispatch = useDispatch();
  const userVoter = useSelector(selectLoggedInVoterToken);
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
        {!userVoter ? (
          <Navigate to={"/VoterLogin"}></Navigate>
        ) : (
          <Navigate to={"/VoterProfile"}></Navigate>
        )}
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-36 w-auto rounded-full"
              src="/voterlogo.png"
              alt="Voter Img"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Voter Login into your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  loginVoterAsync({
                    username: data.username,
                    password: data.password,
                  })
                );
              })}
            >
              <div>
                <label
                  htmlFor="username"
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
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <Link
                to="/VoterSignup"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign Up Voter
              </Link>
            </p>
            <p className="mt-10 text-center text-sm text-gray-500">
              <Link
                to="/ElectionCommissionLoginPage"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Home
              </Link>
            </p>
          </div>
        </div>
      </HomeNavBar>
    </>
  );
};

export default LoginVoterPage;
