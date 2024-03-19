import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllCandidateOFConstituencyAsync,
  getVoterByIdAsync,
  selectCandidateOFConstituency,
  selectVoterData,
} from "./voterSlice";
import {
  selectLoggedInVoterToken,
  signOutVoterAsync,
} from "../ComponentAuth/voterAuthSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./CSS/EVM.css";
import NavBarVoter from "../Navigations/VoterNavigation";
const VoterEVMPage = () => {
  const dispatch = useDispatch();
  const currentLoggedVoter = useSelector(selectLoggedInVoterToken);
  const currentVoter = useSelector(selectVoterData);
  const CandidateOFConstituency = useSelector(selectCandidateOFConstituency);
  // console.log("currentCandidate", currentVoter);
  // console.log("currentLoggedVoter", currentLoggedVoter);
  useEffect(() => {
    dispatch(
      getAllCandidateOFConstituencyAsync({ consti: currentVoter.Constituency })
    );
    dispatch(getVoterByIdAsync({ id: currentLoggedVoter }));
  }, []);
  const [selectedCandidate, setSelectedCandidate] = useState("");
  const handleCandidateChange = (event) => {
    // console.log(event.target.value);
    setSelectedCandidate(event.target.value);
  };
  const vote = {
    voterID: currentVoter.VoterID,
    candidateID: selectedCandidate,
    authority: currentVoter.authority,
  };
  const handleVoteSubmit = () => {
    // Implement your vote submission logic here
    //http://localhost:8081/Vote/CreatingVote
    // console.log("Vote Format:", vote);
    // You can dispatch an action to submit the vote to the server if needed
  };

  return (
    <>
      <NavBarVoter>
        Hello Voter
        {currentVoter ? (
          <div>
            <h2>Candidate OF Constituency Page</h2>
            {currentVoter ? (
              <div>
                {CandidateOFConstituency.map((candidate) => (
                  <div key={candidate.id} className="candidate-card">
                    <input
                      type="radio"
                      id={`candidate-${candidate.CandidateID}`}
                      name="selectedCandidate"
                      value={candidate.CandidateID}
                      checked={selectedCandidate === candidate.CandidateID}
                      onChange={handleCandidateChange}
                    />
                    <label htmlFor={`candidate-${candidate.CandidateID}`}>
                      <h3>Name : {candidate.name}</h3>
                      <p>Party : {candidate.Party}</p>
                      {/* Add more details as needed */}
                    </label>
                  </div>
                ))}
                <button type="button" onClick={handleVoteSubmit}>
                  Submit Vote
                </button>
              </div>
            ) : (
              <p>Loading...</p>
            )}
          </div>
        ) : (
          "Re-Check"
        )}
      </NavBarVoter>
    </>
  );
};

export default VoterEVMPage;
