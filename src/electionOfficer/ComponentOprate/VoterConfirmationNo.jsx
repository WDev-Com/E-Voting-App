import React from "react";
import { RiRefreshLine } from "react-icons/ri";

import NavBar from "../Navigations/ElectionComNav";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import {
  genrateVoterConfirmationNoREQAsync,
  getVoterConfirmationNoREQREQAsync,
} from "./electionOfficerSlice";
const VoterConfirmationNo = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  return (
    <>
      <NavBar>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Generate Voter Confirmation No
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit((data) => {
                dispatch(
                  genrateVoterConfirmationNoREQAsync({
                    id: data.VoterID,
                  })
                );
                reset();
              })}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Voter ID
                </label>
                <div className="mt-2">
                  <input
                    id="VoterID"
                    {...register("VoterID", {
                      required: "VoterID is required",
                    })}
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {/* For Error Display */}
                </div>
              </div>

              <div className="flex justify-between">
                {" "}
                {/* Added flex container */}
                <button
                  type="submit"
                  className="w-5/12 rounded-md bg-orange-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-950 shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Generate No
                </button>
                <button
                  type="button"
                  className="w-5/12 flex justify-center rounded-md bg-orange-300 px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-300"
                  onClick={handleSubmit((data) => {
                    dispatch(
                      getVoterConfirmationNoREQREQAsync({
                        id: data.VoterID,
                      })
                    );
                    reset();
                  })}
                >
                  Get VCN
                </button>
              </div>
            </form>
          </div>
        </div>
      </NavBar>
    </>
  );
};

export default VoterConfirmationNo;
