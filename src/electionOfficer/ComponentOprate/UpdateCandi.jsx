import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

import {
  getCandidateByIdAsync,
  selectCandidateData,
} from "../../candidate/ComponentOprate/CandidateSlice";
import { selectLoggedInCandidateToken } from "../../candidate/ComponentAuth/CandidateAuthSlice";
import { toast } from "react-toastify";
import { BiImageAdd } from "react-icons/bi";
import { Link, Navigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import NavBar from "../Navigations/ElectionComNav";
import { updateCandidateIdentityAsync } from "./electionOfficerSlice";

const Roles = [
  {
    id: 1,
    role: "candidate",
  },
  {
    id: 2,
    role: "user",
  },
];
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function UpdateCandiate() {
  const dispatch = useDispatch();
  const params = useParams();
  const currentCandidate = useSelector(selectCandidateData);
  const currentCandidateID = useSelector(selectLoggedInCandidateToken);
  // console.log(currentCandidate);
  useEffect(() => {
    dispatch(getCandidateByIdAsync({ id: params.ID }));
  }, [dispatch, params, params.ID]);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const [selected, setSelected] = useState(
    currentCandidate.role === Roles[0]["role"] ? Roles[0] : Roles[1]
  );

  const handleEditProfile = (profileUpdate) => {
    const newUser = { ...currentCandidate }; // for shallow copy issue
    delete newUser.name;
    delete newUser.email;
    delete newUser.profileimages;
    delete newUser.username;
    delete newUser.VoteCount;
    delete newUser.addresses;
    // console.log("selected.role", selected.role);
    newUser.CandidateID = profileUpdate.CandidateID;
    newUser.Party = profileUpdate.Party;
    newUser.role = selected.role;
    newUser.Constituency = profileUpdate.Constituency;
    // console.log(newUser);
    dispatch(updateCandidateIdentityAsync({ ...newUser }));
  };

  const [editStatus, setEditstatus] = useState(false);
  function handleedit() {
    setEditstatus(editStatus ? false : true);
  }

  return (
    <NavBar>
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <main className="border-t mt-44 lg:mt-44 border-gray-200 px-4 py-6 sm:px-6">
            <section className="relative h-500-px">
              <div
                className="absolute top-0 w-full h-full bg-center bg-cover"
                style={{
                  backgroundImage:
                    'url("https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80")',
                }}
              >
                <span
                  id="blackOverlay"
                  className="w-full h-full absolute opacity-50 bg-black"
                />
              </div>
              <div
                className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                style={{ transform: "translateZ(0px)" }}
              >
                <svg
                  className="absolute bottom-0 overflow-hidden"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                  version="1.1"
                  viewBox="0 0 2560 100"
                  x={0}
                  y={0}
                >
                  <polygon
                    className="text-blueGray-200 fill-current"
                    points="2560 0 2560 100 0 100"
                  />
                </svg>
              </div>
            </section>
            <section className="relative py-16 bg-blueGray-200">
              <div className="container mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                  <form
                    className="px-6 mx-auto w-full max-w-lg"
                    onSubmit={handleSubmit((data, e) => {
                      e.preventDefault();
                      handleEditProfile(data);

                      reset();
                    })}
                  >
                    <div className="text-center">
                      <p className="text-2xl font-extrabold">
                        {" "}
                        CANDIDATE IDENTITY{" "}
                      </p>
                    </div>
                    <div className="text-left">
                      {/* -------------- Name ------------------ */}
                      <h3 className="text-xl font-semibold leading-normal text-gray-700 mb-2">
                        Name :{" "}
                        {currentCandidate.name
                          ? currentCandidate.name
                          : "New User"}
                      </h3>
                      {/* -------------- Username ------------------ */}
                      <h3 className="text-xl font-semibold leading-normal text-gray-700 mb-2">
                        Username :{" "}
                        {currentCandidate.username
                          ? currentCandidate.username
                          : "New User"}
                      </h3>
                    </div>
                    <div className="text-center">
                      {/* --------- Candidate ID ----------------------------- */}
                      <label className="block mb-2">Candidate ID :</label>
                      <input
                        type="text"
                        name="CandidateID"
                        id="CandidateID"
                        {...register("CandidateID", {
                          required: "Voter ID is required",
                        })}
                        className="block w-full px-4 py-2 leading-normal text-gray-700 rounded-md mb-4"
                        placeholder={
                          currentCandidate.CandidateID
                            ? currentCandidate.CandidateID
                            : "Candidate ID Not Assign"
                        }
                      />
                      {/*------- Party----------- */}
                      <label className="block mb-2">Party :</label>
                      <input
                        type="text"
                        name="Party"
                        id="Party"
                        {...register("Party", {
                          required: "Party ID is required",
                        })}
                        className="block w-full px-4 py-2 leading-normal text-gray-700 rounded-md mb-4"
                        placeholder={
                          currentCandidate.Party
                            ? currentCandidate.Party
                            : "Party Not Assign"
                        }
                      />
                      {/*------- Role----------- */}
                      <label className="block mb-2">Role :</label>
                      <div className="w-full mb-4">
                        <DropDown
                          Roles={Roles}
                          selected={selected}
                          setSelected={setSelected}
                        />
                      </div>
                      {/*------- Constituency ----------- */}
                      <label className="block mb-2">Constituency :</label>
                      <input
                        type="text"
                        name="Constituency"
                        id="Constituency"
                        {...register("Constituency", {
                          required: "Constituency is required",
                        })}
                        className="block w-full px-4 py-2 leading-normal text-gray-700 rounded-md mb-4"
                        placeholder={
                          currentCandidate.Constituency
                            ? currentCandidate.Constituency
                            : "Your Constituency"
                        }
                      />
                    </div>
                    <div className="flex justify-center mt-6">
                      <button
                        className="bg-blue-400 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                        type="submit"
                      >
                        SUBMIT
                      </button>
                      <Link to="/ViewCandidate">
                        <button
                          className="bg-blue-400 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                          type="button"
                        >
                          Cancel
                        </button>
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </NavBar>
  );
}

function DropDown({ Roles, selected, setSelected }) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className="relative mt-2 w-full">
            <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
              <span className="flex items-center">
                <span className="ml-3 block truncate">{selected.role}</span>
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full max-h-56 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {Roles.map((roles) => (
                  <Listbox.Option
                    key={roles.id}
                    className={({ active }) =>
                      classNames(
                        active ? "bg-indigo-600 text-white" : "text-gray-900",
                        "relative cursor-default select-none py-2 pl-3 pr-9"
                      )
                    }
                    value={roles}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            {roles.role}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? "text-white" : "text-indigo-600",
                              "absolute inset-y-0 right-0 flex items-center pr-4"
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}

export default UpdateCandiate;
