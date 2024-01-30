import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMinnersAsync,
  selectMiners,
  selectTotalMiners,
  updateMinnerRoleAsync,
  deleteMinnerAsync,
} from "./electionOfficerSlice";

const MinnerPage = () => {
  const dispatch = useDispatch();
  let pagination = { page: 1, pageSize: 1 };
  let filter = { role: "" }; //minner
  const minner = useSelector(selectMiners);
  const MinnerTotalCount = useSelector(selectTotalMiners);
  const DataRole = {
    id: "65b3757bf2bf8e0e0148836c",
    roleD: "minner",
  };
  useEffect(() => {
    // dispatch(deleteMinnerAsync(DataRole));
    // dispatch(updateMinnerRoleAsync(DataRole));
    // dispatch(getAllMinnersAsync({ pagination, filter }));
  }, []);

  return (
    <>
      <div>Hello Minner</div>
      {/*
      <div>Total Minner: {MinnerTotalCount}</div>
    <div>
        {Array.isArray(minner) && minner.length > 0 ? (
          minner.map((miner) => (
            <div key={miner.id}>
              <p>Name: {miner.name}</p>
              <p>Username: {miner.username}</p>
              <p>Email: {miner.email}</p>
              <p>Role: {miner.role}</p>
              <p>Minner ID: {miner.MinnerID}</p>
              <br></br>
              <br></br>
              <br></br>
            </div>
          ))
        ) : (
          <p>No Minner data available</p>
        )}
      </div>
        */}
    </>
  );
};

export default MinnerPage;
