import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllVotersAsync,
  selectVoters,
  updateVoterRoleAsync,
  deleteVoterAsync,
  selectTotalVoters,
} from "./electionOfficerSlice";
import NavBar from "../Navigations/ElectionComNav";
import { Link, Navigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";

const VoterPage = () => {
  const dispatch = useDispatch();

  let pagination = { _page: 1, _limit: 2 };
  let filter = {};
  //role: "voter", constituency: "Lanja"
  const voters = useSelector(selectVoters);
  const voterTotalCount = useSelector(selectTotalVoters);
  const DataRole = {
    id: "65b0b46443af5537c7499196",
    roleD: "voter",
  };
  useEffect(() => {
    // dispatch(deleteVoterAsync(DataRole));
    // dispatch(updateVoterRoleAsync(DataRole));
    dispatch(getAllVotersAsync({ pagination, filter }));
  }, []);

  return (
    <>
      <NavBar>
        <div className="container mx-auto p-4">
          <h3 className="text-2xl font-bold mb-4">All Voter</h3>
          <div className="mb-4 font-bold">
            Total Voter Count : {voterTotalCount}
          </div>
          <div>
            {Array.isArray(voters) && voters.length > 0 ? (
              voters.map((voter) => (
                <div
                  key={voter.id}
                  className="mb-8 p-4 border border-gray-300 rounded"
                >
                  <p>Name: {voter.name}</p>
                  <p>Username: {voter.username}</p>
                  <p>Email: {voter.email}</p>
                  <p>Role: {voter.role}</p>
                  <p>Voter ID: {voter.VoterID}</p>
                  <p>Constituency: {voter.Constituency}</p>
                  <div className="flex justify-end mt-4">
                    <button
                      className="mr-2"
                      onClick={() => handleUpdate(ele.id)}
                    >
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(ele.id)}>
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No voters data available</p>
            )}
          </div>
        </div>
      </NavBar>
    </>
  );
};

export default VoterPage;
