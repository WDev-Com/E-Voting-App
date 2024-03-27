import React, { useEffect, useState } from "react";
import MinnerNav from "../Navigations/MinnerNavigation";
import { useDispatch, useSelector } from "react-redux";
import {
  AddBlockAsync,
  MineVotesAsync,
  fetchMinerDataAsync,
  selectBlockadded,
  selectError,
  selectMinnerData,
  selectPendingVotes,
} from "./minnerSlice";
import { toast } from "react-toastify";

const MinerVoteMining = () => {
  const dispatch = useDispatch();
  const pendingVotes = useSelector(selectPendingVotes);
  const blockAdded = useSelector(selectBlockadded);
  const currminner = useSelector(selectMinnerData);
  const Error = useSelector(selectError);
  console.log("Error", Error);

  useEffect(() => {
    dispatch(fetchMinerDataAsync(currminner.MinnerID));
  }, [dispatch, pendingVotes, blockAdded]);
  return (
    <MinnerNav>
      <div>
        <div className="mx-auto mt-1 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <main className=" mt-5 lg:mt-5 border-gray-200 px-4 py-6 sm:px-6">
            {/* Section for pending votes mining */}
            <section className="relative py-16 bg-blueGray-200">
              <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-4">
                  PENDING VOTE MININIG
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded shadow">
                    {/* Display pending vote details */}
                    <p className="font-bold">
                      Total Votes Mined : {pendingVotes}
                    </p>
                    <p>{/* Display relevant details of the pending vote */}</p>
                  </div>
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => {
                      if (Error) {
                        toast.error(Error);
                      }
                      dispatch(MineVotesAsync({ id: currminner.MinnerID }));
                    }}
                  >
                    START MINING
                  </button>
                </div>
              </div>
            </section>

            {/* Section for adding a vote to blockchain */}
            <section className="relative py-16 bg-blueGray-200">
              <div className="container mx-auto">
                <h2 className="text-2xl font-bold mb-4">
                  ADD VOTES TO BLOCKCHAIN
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded shadow">
                    {/* Display pending vote details */}
                    <p className="font-bold">
                      Total Block To Be Added : {blockAdded}
                    </p>
                    <p>{/* Display relevant details of the pending vote */}</p>
                  </div>
                  <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={() => {
                      if (Error) {
                        toast.error(Error);
                      }
                      dispatch(AddBlockAsync({ id: currminner.MinnerID }));
                    }}
                  >
                    ADD BLOCK
                  </button>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </MinnerNav>
  );
};

export default MinerVoteMining;
