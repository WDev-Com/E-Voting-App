import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateElectionCommissionerAsync,
  getEleCommissionAsync,
  selectElectionCommissner,
} from "./electionOfficerSlice";
import {
  selectLoggedInUserToken,
  signOutAsync,
} from "../ComponentAuth/electionOfficerAuthSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
const ElectionCommissionPage = () => {
  const dispatch = useDispatch();
  const currentElectionCommissioner = useSelector(selectElectionCommissner);
  const currentUserID = useSelector(selectLoggedInUserToken);
  // console.log("currentUser :======== ", currentUserID);
  const electionCommisionNew = {
    id: currentUserID,
    OffierID: "DDRR",
  };
  /*
   name: "TS_Seshan",
    username: "seshan",
    email: "seshan@gmailcom",
    role: "officer",
  
    addresses: [],
    profileimages: "",
  */
  // electionCommisionNew["addresses"].push("Pali");
  useEffect(() => {
    // dispatch(signOutAsync());
    dispatch(getEleCommissionAsync({ id: currentUserID }));
    // dispatch(updateElectionCommissionerAsync(electionCommisionNew));
  }, []);

  return (
    <>
      {currentElectionCommissioner ? (
        <div>
          <h2>Election Commission Page</h2>

          <div className="card">
            <div>
              <h3>Name: {currentElectionCommissioner.name}</h3>
              <p>Username: {currentElectionCommissioner.username}</p>
              <p>Email: {currentElectionCommissioner.email}</p>
              <p>Role: {currentElectionCommissioner.role}</p>
              <p>Officer ID: {currentElectionCommissioner.OffierID}</p>
              <p>Address: {currentElectionCommissioner.addresses}</p>
              {/* Add more fields as needed */}
            </div>
            <div>
              {/* Display profile image here */}
              {/* You can use eleCommission.profileimages to display the image */}
            </div>
          </div>
        </div>
      ) : (
        "Fuck"
      )}
      <button
        onClick={() => {
          dispatch(signOutAsync());
        }}
      >
        Logout
      </button>
      <Link to="/ViewVoter">
        <button>View Voter</button>
      </Link>
      <Link to="/ViewCandidate">
        <button>View Candidate</button>
      </Link>
      <Link to="/ViewMinner">
        <button>View Minner</button>
      </Link>
      <Link to="/CreateMinner">
        <button>Create Minner</button>
      </Link>
    </>
  );
};

export default ElectionCommissionPage;
