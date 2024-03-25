import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong } from "@fortawesome/free-solid-svg-icons";
import NavBarVoter from "../Navigations/VoterNavigation";
import { useDispatch, useSelector } from "react-redux";
import {
  getVoterByIdAsync,
  selectVoterData,
  updateVoterAsync,
} from "./voterSlice";
import {
  selectLoggedInVoterToken,
  signOutVoterAsync,
} from "../ComponentAuth/voterAuthSlice";
import {
  createVoteAsync,
  getAllCandidateOFConstituencyAsync,
  selectCandidateOFConstituency,
} from "./voterSlice";
import { createVote } from "./voterAPI";

function Evm() {
  const dispatch = useDispatch();
  const currentVoter = useSelector(selectVoterData);
  const currentVoterID = useSelector(selectLoggedInVoterToken);
  useEffect(() => {
    dispatch(getVoterByIdAsync({ id: currentVoterID }));
    // dispatch(updateElectionCommissionerAsync(electionCommisionNew));
  }, [dispatch]);
  let allCandidate = useSelector(selectCandidateOFConstituency);
  useEffect(() => {
    dispatch(getAllCandidateOFConstituencyAsync({ consti: "Pali" }));
  }, [dispatch]);
  /*
  "voterID": { "type": "string" },
    "candidateID": { "type": "string" },
    "authority": { "type": "string" } */
  const handleVote = (candidateID) => {
    //candidateID
    // console.log({
    //   voterID: currentVoter.VoterID,
    //   candidateID: candidateID,
    //   authority: currentVoter.authority,
    // });
    dispatch(
      createVoteAsync({
        voterID: currentVoter.VoterID,
        candidateID: candidateID,
        authority: currentVoter.authority,
      })
    );
    dispatch(updateVoterAsync({ id: currentVoter.id, voteStatus: true }));
    dispatch(signOutVoterAsync());
  };

  return (
    <NavBarVoter>
      <div className="p-4">
        {" "}
        <div className="container mx-auto border border-gray-200 max-w-screen-md bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex rounded-t-xl  bg-indigo-600 justify-between items-center p-6 border-b border-gray-300">
            {/* Logo and name container */}

            <div className="flex items-center gap-3">
              <img
                className="w-14 h-14 rounded-full"
                src="https://www.eci.gov.in/newimg/eci-logo-white.svg"
                alt="Election Commission of India Logo"
              />
              <h2 className="text-lg md:text-xl font-medium text-gray-50">
                Election Commission of INDIA
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-gray-300">Status</span>
              <span className="bg-green-500 rounded-full px-2 py-1">
                Active
              </span>
            </div>
          </div>

          {/* Party Names and Vote button */}
          <div className="bg-white flex flex-col h-full">
            {allCandidate &&
              allCandidate.map((candidate, index) => (
                <div
                  key={index}
                  className="p-6 flex  items-center justify-between gap-3 border-b border-gray-300 shadow-none h-full"
                >
                  <h2 className="text-lg md:text-xl">{index + 1}</h2>
                  <img
                    src={candidate.profileimages}
                    alt="party logo"
                    className="w-12 h-12 rounded-full md:w-16 md:h-16"
                  />
                  <div className="flex gap-2 flex-col items-center">
                    <h3 className="text-lg md:text-xl">{candidate.name}</h3>
                    <h3 className="text-xl font-bold text-gray-400">
                      ({candidate.Party})
                    </h3>
                  </div>
                  <img
                    src={candidate.PartySymbol}
                    alt="party logo"
                    className="w-12 h-12 md:w-16 md:h-16 rounded-full"
                  />
                  <div className="flex items-center gap-2 md:gap-5 bg-white p-3 border-none">
                    <FontAwesomeIcon
                      icon={faArrowLeftLong}
                      className="w-6 h-6 md:w-8 md:h-8 font-bold"
                    />
                    <button
                      onClick={() => handleVote(candidate.CandidateID)}
                      className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 md:px-6 rounded-full py-2"
                    >
                      Vote
                    </button>
                  </div>
                </div>
              ))}
          </div>

          <div className="bg-indigo-600 text-gray-300 text-lg">
            <p className="text-lg p-2">Electronic Voting Machine</p>
          </div>
        </div>
      </div>
    </NavBarVoter>
  );
}

export default Evm;
