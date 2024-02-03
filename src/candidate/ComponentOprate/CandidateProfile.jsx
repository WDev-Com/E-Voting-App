import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCandidateByIdAsync, selectCandidateData } from "./CandidateSlice";
import {
  selectLoggedInCandidateToken,
  signOutCandidateArsync,
} from "../ComponentAuth/CandidateAuthSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const CandidateProfilePage = () => {
  const dispatch = useDispatch();
  const currentLoggedCandidate = useSelector(selectLoggedInCandidateToken);
  const currentCandidate = useSelector(selectCandidateData);
  console.log("currentCandidate", currentCandidate);
  useEffect(() => {
    dispatch(getCandidateByIdAsync({ id: currentLoggedCandidate }));
  }, []);

  return (
    <>
      Hello Candidate
      {currentCandidate ? (
        <div>
          <h2>Candidate Profile Page</h2>

          <div className="card">
            <div>
              <h3>Name: {currentCandidate.name}</h3>
              <p>Username: {currentCandidate.username}</p>
              <p>Email: {currentCandidate.email}</p>
              <p>Role: {currentCandidate.role}</p>
              <p>Candidate ID: {currentCandidate.CadidateID}</p>
              <p>Constituency: {currentCandidate.Constituency}</p>
              <p>Party: {currentCandidate.Party}</p>
              <p>addresses: {currentCandidate.addresses}</p>
            </div>
            <div></div>
          </div>
        </div>
      ) : (
        "Re-Check"
      )}
      <button
        onClick={() => {
          dispatch(signOutCandidateArsync());
        }}
      >
        Logout
      </button>
      <Link to="/ElectionCommissionPage">
        <button
          onClick={() => {
            dispatch(signOutCandidateArsync());
          }}
        >
          Home
        </button>
      </Link>
    </>
  );
};

export default CandidateProfilePage;
