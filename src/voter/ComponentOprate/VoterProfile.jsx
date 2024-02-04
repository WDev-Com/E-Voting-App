import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVoterByIdAsync, selectVoterData } from "./voterSlice";
import {
  selectLoggedInVoterToken,
  signOutVoterAsync,
} from "../ComponentAuth/voterAuthSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const VoterProfilePage = () => {
  const dispatch = useDispatch();
  const currentLoggedVoter = useSelector(selectLoggedInVoterToken);
  const currentVoter = useSelector(selectVoterData);
  console.log("currentCandidate", currentVoter);
  console.log("currentLoggedVoter", currentLoggedVoter);
  useEffect(() => {
    dispatch(getVoterByIdAsync({ id: currentLoggedVoter }));
  }, []);

  return (
    <>
      Hello Voter
      {currentVoter ? (
        <div>
          <h2>Candidate Profile Page</h2>

          <div className="card">
            <div>
              <h3>Name: {currentVoter.name}</h3>
              <p>Username: {currentVoter.username}</p>
              <p>Email: {currentVoter.email}</p>
              <p>Role: {currentVoter.role}</p>
              <p>Voter ID: {currentVoter.VoterID}</p>
              <p>Constituency: {currentVoter.Constituency}</p>
              <p>addresses: {currentVoter.addresses}</p>
            </div>
            <div></div>
          </div>
        </div>
      ) : (
        "Re-Check"
      )}
      <button
        onClick={() => {
          dispatch(signOutVoterAsync());
        }}
      >
        Logout
      </button>
      <Link to="/ElectionCommissionPage">
        <button
          onClick={() => {
            dispatch(signOutVoterAsync());
          }}
        >
          Home
        </button>
      </Link>
      <Link to="/VoteOnEVM">
        <button>Vote Here</button>
      </Link>
    </>
  );
};

export default VoterProfilePage;
