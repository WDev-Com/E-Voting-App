export const selectError = (state) => state.MinnernAuth.error;
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { BiImageAdd } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { selectLoggedInMinnerToken } from "../ComponentAuth/minnerAuthSlice";
import {
  getMinnerByIdsync,
  selectMinnerData,
  updateMinnerAsync,
} from "./minnerSlice";
import MinnerNav from "../Navigations/MinnerNavigation";
const MinerProfile = () => {
  const dispatch = useDispatch();
  const currentMinner = useSelector(selectMinnerData);
  const loginUserToken = useSelector(selectLoggedInMinnerToken);
  // console.log("currentMinner.MinnerID : ", currentMinner.MinnerID);
  useEffect(() => {
    dispatch(getMinnerByIdsync({ id: loginUserToken }));
  }, []);
  //TODO: We will add payment section when we work on backend.
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [imgselected, setImgselected] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  // @@@@@@@@@@@@ Image Processing @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
    // console.log(previewUrl);
  }, [file]);
  // console.log(previewUrl);
  let imageSizeInKB;
  if (previewUrl !== null) {
    // Calculate the size of the binary data
    const imageSizeInBytes = previewUrl.length;
    imageSizeInKB = imageSizeInBytes / 1024;
    const imageSizeInMB = imageSizeInKB / 1024;
  }
  // console.log("imageSizeInKB : ", imageSizeInKB);
  if (imageSizeInKB > 80) {
    setPreviewUrl(null);
    toast.error("Please Select Image Below the Size of 80 Kb");
  }
  // @@@@@@@@@@@@ Image Processing @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@//
  const handleEditProfile = (profileUpdate) => {
    const newUser = { ...currentMinner }; // for shallow copy issue
    newUser.name = profileUpdate.name;
    newUser.username = profileUpdate.username;
    newUser.email = profileUpdate.email;
    newUser.profileimages = previewUrl;
    // console.log(newUser);
    dispatch(updateMinnerAsync({ ...newUser }));
  };

  const [editStatus, setEditstatus] = useState(false);
  function handleedit() {
    setEditstatus(editStatus ? false : true);
  }
  return (
    <MinnerNav>
      <div>
        {" "}
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
                    className="px-6"
                    onSubmit={handleSubmit((data, e) => {
                      e.preventDefault();
                      handleEditProfile(data);
                      setEditstatus(false);
                      setPreviewUrl(null);
                      reset();
                    })}
                  >
                    <div className="w-full lg:w-4/12 px-36 lg:order-3 lg:text-right lg:self-center">
                      <div className="py-6 px-3 mt-3 sm:mt-0">
                        {editStatus === false ? (
                          <button
                            className="bg-blue-400 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            id="edit"
                            onClick={(e) => {
                              e.preventDefault();
                              handleedit();
                            }}
                          >
                            Edit
                          </button>
                        ) : (
                          <>
                            <button
                              className="bg-blue-400 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                              type="submit"
                              id="submit"
                            >
                              SUBMIT
                            </button>
                            <button
                              className="bg-blue-400 active:bg-blue-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                              type="submit"
                              id="submit"
                              onClick={(e) => {
                                e.preventDefault();
                                handleedit();
                              }}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-center">
                      <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                        <div className="relative">
                          {editStatus === false ? (
                            <img
                              alt="..."
                              src={currentMinner.profileimages}
                              //-m-16 -ml-20 lg:-ml-16
                              className="relative shadow-xl h-40 w-40 sm:h-30 sm:w-30 rounded-full align-middle border-none"
                            />
                          ) : null}
                          {imgselected === true && editStatus === true ? (
                            <img
                              alt="..."
                              src={previewUrl}
                              //-m-16 -ml-20 lg:-ml-16
                              className="relative shadow-xl h-40 w-40 sm:h-30 sm:w-30 rounded-full align-middle border-none"
                            />
                          ) : null}
                          {editStatus === true && imgselected === false ? (
                            <button
                              className="relative "
                              type="button"
                              id="selectedimg"
                              onClick={(e) => {
                                e.preventDefault();
                                fileInputRef.current.click();
                                setImgselected(true);
                              }}
                            >
                              <BiImageAdd className="relative shadow-xl h-32 w-32 sm:h-30 sm:w-30 rounded-full align-middle border-none"></BiImageAdd>
                            </button>
                          ) : null}
                          <input
                            type="file"
                            id="imgsrc"
                            name="imgsrc"
                            autoComplete="off"
                            accept="image/*"
                            hidden
                            className="relative"
                            ref={fileInputRef}
                            onChange={async (e) => {
                              e.preventDefault();
                              setFile(e.target.files[0]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="text-center mt-12">
                      {/* -------------- Name ------------------ */}
                      {editStatus === true ? (
                        <>
                          <label>Name : </label>
                          <br></br>
                          <input
                            type="text"
                            name="Name"
                            id="Name"
                            {...register("name", {
                              required: "name is required",
                            })}
                            className=" leading-normal text-gray-700  rounded-md mb-2"
                            placeholder={
                              currentMinner.name
                                ? currentMinner.name
                                : "New User"
                            }
                          ></input>
                          <br></br>
                          <br></br>
                        </>
                      ) : (
                        <h3 className="text-2xl font-semibold leading-normal text-gray-700 mb-2">
                          Name :{" "}
                          {currentMinner.name ? currentMinner.name : "New User"}
                        </h3>
                      )}
                      {/* -------------- Username ------------------ */}
                      {editStatus === true ? (
                        <>
                          <label>Username : </label>
                          <br></br>
                          <input
                            type="text"
                            name="username "
                            id="username "
                            {...register("username ", {
                              required: "username  is required",
                            })}
                            className=" leading-normal text-gray-700  rounded-md mb-2"
                            placeholder={
                              currentMinner.username
                                ? currentMinner.username
                                : "username"
                            }
                          ></input>
                          <br></br>
                          <br></br>
                        </>
                      ) : (
                        <h3 className="text-xl font-semibold leading-normal text-gray-700 mb-2">
                          Username :{" "}
                          {currentMinner.username
                            ? currentMinner.username
                            : "New User"}
                        </h3>
                      )}
                      {/* --------- MinnerID ----------------------------- */}
                      {
                        <h3 className="text-xl font-semibold leading-normal text-gray-700 mb-2">
                          Minner ID :{" "}
                          {currentMinner.MinnerID
                            ? currentMinner.MinnerID
                            : "Haven't Assigned....."}
                        </h3>
                      }
                      {/*------- Role----------- */}{" "}
                      {currentMinner.role === "minner" && (
                        <h3 className="text-xl my-5 font-bold tracking-tight text-red-900">
                          Role : {currentMinner.role}
                        </h3>
                      )}
                      {/* --------- Email ----------------------------- */}
                      {editStatus === true ? (
                        <>
                          <label>Email : </label>
                          <br></br>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            {...register("email", {
                              required: "email is required",
                            })}
                            className=" leading-normal text-gray-700  rounded-md mb-2"
                            placeholder={
                              currentMinner.email
                                ? currentMinner.email
                                : "your email"
                            }
                          ></input>
                          <br></br>
                          <br></br>
                        </>
                      ) : (
                        <h3 className="text-xl my-5 font-bold tracking-tight text-orange-400">
                          Email : {currentMinner.email}
                        </h3>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </MinnerNav>
  );
};

export default MinerProfile;
