import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllMinnersAsync,
  selectMiners,
  selectTotalMiners,
  updateMinnerRoleAsync,
  deleteMinnerAsync,
} from "./electionOfficerSlice";
import { Link } from "react-router-dom";
import NavBar from "../Navigations/ElectionComNav";
import { FaEdit, FaTrash } from "react-icons/fa";

const MinnerPage = () => {
  const dispatch = useDispatch();
  let pagination = { page: 1, pageSize: 10 };
  let filter = { role: "" }; //minner
  const minner = useSelector(selectMiners);
  const MinnerTotalCount = useSelector(selectTotalMiners);

  useEffect(() => {
    // dispatch(deleteMinnerAsync(DataRole));
    // dispatch(updateMinnerRoleAsync(DataRole));
    dispatch(getAllMinnersAsync({ pagination, filter }));
  }, []);

  return (
    <>
      <NavBar>
        <div className="container mx-auto p-4">
          <h3 className="text-2xl font-bold mb-4">All Miner</h3>
          <div className="mb-4 font-bold">
            Total Miner Count : {MinnerTotalCount}
          </div>
          <div>
            {Array.isArray(minner) && minner.length > 0 ? (
              minner.map((miner) => (
                <div
                  key={miner.id}
                  className="mb-8 p-4 border border-gray-300 rounded"
                >
                  <p>Name: {miner.name}</p>
                  <p>Username: {miner.username}</p>
                  <p>Email: {miner.email}</p>
                  <p>Role: {miner.role}</p>
                  <p>Minner ID: {miner.MinnerID}</p>
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
              <p>No Minner data available</p>
            )}
          </div>
        </div>
      </NavBar>
    </>
  );
};

export default MinnerPage;
/*
 <div>Hello Minner</div>
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
*/
