import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCandidatessAsync,
  selectCandidates,
  deleteCandidateAsync,
  selectTotalCandidates,
  updateCandidateRoleAsync,
} from "./electionOfficerSlice";

const CandidatePage = () => {
  const dispatch = useDispatch();
  let pagination = { page: 1, pageSize: 2 };
  let filter = { role: "user" };
  // constituency: "Lanja"; party: "BJP"
  const candidates = useSelector(selectCandidates);
  const candidatestotalcount = useSelector(selectTotalCandidates);
  // console.log(candidates);
  const DataRole = {
    id: "65b0b60fe414f2ec4b5f426b",
    roleD: "candidate",
  };
  useEffect(() => {
    // dispatch(deleteCandidateAsync(DataRole));
    // dispatch(updateCandidateRoleAsync(DataRole));
    // dispatch(getAllCandidatessAsync({ pagination, filter }));
  }, []);

  return (
    <>
      Hello Candidate
      {/*<div>{candidatestotalcount}</div>
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
        </div>*/}
    </>
  );
};

export default CandidatePage;
