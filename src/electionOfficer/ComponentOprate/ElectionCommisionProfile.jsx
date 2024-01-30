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
const ElectionCommissionPage = () => {
  const dispatch = useDispatch();
  const currentElectionCommissioner = useSelector(selectElectionCommissner);
  const currentUser = useSelector(selectLoggedInUserToken);
  console.log("currentUser :======== ", currentUser);
  const electionCommisionNew = {
    id: "65aa65209d556186191e6ecd",
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
    dispatch(signOutAsync());
    // dispatch(getEleCommissionAsync({ id: electionCommisionNew.id }));
    // dispatch(updateElectionCommissionerAsync(electionCommisionNew));
  }, []);

  return (
    <>
      {currentUser ? (
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
    </>
  );
};

export default ElectionCommissionPage;
