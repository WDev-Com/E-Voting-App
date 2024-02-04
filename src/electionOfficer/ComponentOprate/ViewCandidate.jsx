import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCandidatessAsync,
  selectCandidates,
  deleteCandidateAsync,
  selectTotalCandidates,
  updateCandidateRoleAsync,
} from "./electionOfficerSlice";
import { Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import NavBar from "../Navigations/ElectionComNav";

const CandidatePage = () => {
  const dispatch = useDispatch();
  let pagination = { page: 1, pageSize: 2 };
  let filter = { role: "" };
  // constituency: "Lanja"; party: "BJP" user
  const candidates = useSelector(selectCandidates);
  const candidatestotalcount = useSelector(selectTotalCandidates);
  // console.log(candidates);
  // const DataRole = {
  //   id: "65b0b60fe414f2ec4b5f426b",
  //   roleD: "candidate",
  // };
  const handleDelete = (id) => {
    // Add logic to dispatch deleteCandidateAsync with the candidate id
    // dispatch(deleteCandidateAsync(id));
  };

  const handleUpdate = (id) => {
    // Add logic to navigate to the update candidate page
    // You may use react-router or any other navigation method
    // history.push(`/update-candidate/${id}`);
  };

  useEffect(() => {
    // dispatch(deleteCandidateAsync(DataRole));
    // dispatch(updateCandidateRoleAsync(DataRole));
    dispatch(getAllCandidatessAsync({ pagination, filter }));
  }, []);

  return (
    <>
      <NavBar>
        <div className="container mx-auto p-4">
          <h1 className="text-4xl font-bold mb-4">Hello Candidate</h1>
          <div className="mb-4">{candidatestotalcount}</div>
          <div>
            {candidates.map((ele) => (
              <div
                key={ele.id}
                className="mb-8 p-4 border border-gray-300 rounded"
              >
                <p className="text-lg font-bold">
                  Candidate ID: {ele.CandidateID}
                </p>
                <p>Name: {ele.name}</p>
                <p>Constituency: {ele.Constituency}</p>
                <p>Party: {ele.Party}</p>
                <p>Email: {ele.email}</p>
                <div className="flex justify-end mt-4">
                  <button className="mr-2" onClick={() => handleUpdate(ele.id)}>
                    <FaEdit />
                  </button>
                  <button onClick={() => handleDelete(ele.id)}>
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Link to="/ElectionCommissionPage">
          <button>Home</button>
        </Link>
      </NavBar>
    </>
  );
};

export default CandidatePage;
/*
   Hello Candidate
      <div>{candidatestotalcount}</div>
      <div>
        {candidates.map((ele) => (
          <div key={ele.id}>
            <div>
              <p>Candidate ID: {ele.CandidateID}</p>
              <p>Name: {ele.name}</p>
              <p>Constituency: {ele.Constituency}</p>
              <p>Party: {ele.Party}</p>
              <p>Email: {ele.email}</p>
            </div>
            <br></br>
            <br></br>
            <br></br>
          </div>
        ))}
      </div>
*/
