import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMinnerByIdsync, selectMinnerData } from "./minnerSlice";
import {
  signOutMinnersync,
  selectLoggedInMinnerToken,
} from "../ComponentAuth/minnerAuthSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const MinnerPage = () => {
  const dispatch = useDispatch();
  const currentMinner = useSelector(selectMinnerData);
  const loginUserToken = useSelector(selectLoggedInMinnerToken);
  console.log("currentMinner", currentMinner);
  useEffect(() => {
    dispatch(getMinnerByIdsync({ id: loginUserToken }));
  }, []);

  return (
    <>
      Hello Minner
      {currentMinner ? (
        <div>
          <h2>Minner Profile Page</h2>

          <div className="card">
            <div>
              <h3>Name: {currentMinner.name}</h3>
              <p>Username: {currentMinner.username}</p>
              <p>Email: {currentMinner.email}</p>
              <p>Role: {currentMinner.role}</p>
              <p>Minner ID: {currentMinner.MinnerID}</p>
            </div>
            <div></div>
          </div>
        </div>
      ) : (
        "Re-Check"
      )}
      <button
        onClick={() => {
          dispatch(signOutMinnersync());
        }}
      >
        Logout
      </button>
      <Link to="/ElectionCommissionPage">
        <button
          onClick={() => {
            dispatch(signOutMinnersync());
          }}
        >
          Home
        </button>
      </Link>
    </>
  );
};

export default MinnerPage;
