import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../Navigations/ElectionComNav";
import { WinnerFetchAsync, selectWinners } from "./electionOfficerSlice";

const ConstituencyS = [
  {
    id: 1,
    Constituency: "Pali",
  },
  {
    id: 2,
    Constituency: "Lanja",
  },
  {
    id: 3,
    Constituency: "Ratnagiri",
  },
  {
    id: 4,
    Constituency: "Rajapur",
  },
  {
    id: 5,
    Constituency: "Chiplun",
  },
];

export default function WinnerCounting() {
  let winners = useSelector(selectWinners);
  let dispatch = useDispatch();
  console.log("Winner Counting", winners);
  useEffect(() => {}, [dispatch, winners]);
  return (
    <NavBar>
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <main className="border-t mt-44 lg:mt-44 border-gray-200 px-4 py-6 sm:px-6">
            <section className="relative h-500-px">
              {/* Background and styling */}
            </section>
            <section className="relative py-16 bg-blueGray-200">
              <div className="container mx-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                  <ul
                    role="list"
                    className="divide-y divide-gray-100 ml-4 mr-4"
                  >
                    {ConstituencyS.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between gap-x-8 py-5"
                      >
                        <div className="flex mr-52 min-w-0 gap-x-4">
                          <div className="min-w-0 flex-auto">
                            <p className="text-xl font-semibold leading-6 text-gray-900">
                              Constituency
                            </p>
                            <p className="mt-1 truncate text-xl leading-10 text-gray-500">
                              {item.Constituency}
                            </p>
                          </div>
                          {/* Display winner's party and candidate name */}
                          {winners &&
                          winners.some(
                            (ele) => ele.Constituency === item.Constituency
                          ) ? (
                            winners
                              .filter(
                                (ele) => ele.Constituency === item.Constituency
                              )
                              .map((winner) => (
                                <div key={winner.id}>
                                  <p className="text-xl font-semibold leading-6 text-gray-900">
                                    Winner
                                  </p>
                                  <p className="mt-1 truncate text-xl leading-10 text-gray-500">
                                    Party: {winner.Party}, Candidate:{" "}
                                    {winner.name}
                                  </p>
                                </div>
                              ))
                          ) : (
                            <div>
                              <p className="text-xl font-semibold leading-6 text-gray-900">
                                Winner
                              </p>
                              <p className="mt-1 truncate text-xl leading-10 text-gray-500">
                                No winner declared yet
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                          {/* Button or action for checking */}
                          <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            onClick={() => {
                              dispatch(
                                WinnerFetchAsync({
                                  constituency: item.Constituency,
                                })
                              );
                            }}
                          >
                            Check
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </NavBar>
  );
}
