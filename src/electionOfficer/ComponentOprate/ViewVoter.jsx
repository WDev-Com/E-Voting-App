import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVotersAsync,
  selectVoters,
  selectTotalVoters,
} from "./electionOfficerSlice";

const VoterPage = () => {
  const dispatch = useDispatch();
  let pagination = { _page: 1, _limit: 2 };
  let filter = { role: "voter", constituency: "Lanja" };
  const voters = useSelector(selectVoters);
  const voterTotalCount = useSelector(selectTotalVoters);

  useEffect(() => {
    dispatch(getAllVotersAsync({ pagination, filter }));
  }, []);

  return (
    <>
      <div>Total Voters: {voterTotalCount}</div>
      <div>
        {Array.isArray(voters) && voters.length > 0 ? (
          voters.map((voter) => (
            <div key={voter.id}>
              <p>Name: {voter.name}</p>
              <p>Username: {voter.username}</p>
              <p>Email: {voter.email}</p>
              <p>Role: {voter.role}</p>
              <p>Voter ID: {voter.VoterID}</p>
              <p>Constituency: {voter.Constituency}</p>
              {/* Add more fields as needed */}
            </div>
          ))
        ) : (
          <p>No voters data available</p>
        )}
      </div>
    </>
  );
};

export default VoterPage;
