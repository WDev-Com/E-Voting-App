///////// It can use for fetching the user using return token
// To find the user after a successful login attempt you
export function getVoterById({ id }) {
  // console.log("id", id);
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch(
      `http://localhost:8080/VoterOperation/GetVoterByID/` + id,
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
      `http://localhost:8080/VoterOperation/GetAllCandidateOFConstituency/` +
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
      `http://localhost:8080/VoterOperation/CreatingVote` + ID,
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
