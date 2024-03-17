///////// It can use for fetching the user using return token

import { toast } from "react-toastify";

// To find the user after a successful login attempt you
export function getVoterById({ id }) {
  // console.log("id", id);
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch(
      `http://localhost:8081/VoterOperation/GetVoterByID/` + id,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
      }
    );
    const dataA = await response.json();
    console.log(dataA);
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({ data: { voterDatas: dataA } });
  });
}

export function getAllCandidateOFConstituency({ consti }) {
  // console.log("id", id);
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch(
      `http://localhost:8081/VoterOperation/GetAllCandidateOFConstituency/` +
        consti,
      {
        method: "GET",
        headers: { "content-type": "application/json" },
      }
    );
    const dataA = await response.json();
    console.log(dataA);
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({ data: { CandidateOFConstituencyDatas: dataA } });
  });
}

export function createVote(VoteData, ID) {
  console.log("From API ", VoteData);
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8081/VoterOperation/CreatingVote` + ID,
      {
        method: "POST",
        body: JSON.stringify(VoteData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    if (response.ok) {
      toast.success("Voted successfully");
    } else {
      toast.error("Voted Failed");
      console.log("Error : ", data);
    }
    // TODO: on server it will only return some info of user (not password)
    resolve(data);
  });
}

export function updateVoter(data) {
  console.log("updateVoter", data);
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/VoterOperation/UpdateVoter/${data.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },
        }
      );
      const updatedData = await response.json();
      console.log("Response from server:", updatedData); // Add this line to log the response
      if (response.ok) {
        toast.success("Update Successful");
      }
      resolve(updatedData);
    } catch (error) {
      console.error(error);
      toast.error("Update Fail");
    }
  });
}
