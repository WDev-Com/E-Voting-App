export const getAllWinnerCandidates = (pagination, filters) => {
  // Extract pagination parameters

  // console.log("===============>", pagination, filters);
  const page = pagination._page || 1;
  const pageSize = pagination._limit || 10;

  return new Promise(async (resolve) => {
    try {
      // Construct the query string
      let queryString = `page=${page}&pageSize=${pageSize}`;

      for (let key in filters) {
        if (key === "Role" || key === "Constituency" || key === "Party") {
          queryString += `&${key}=${filters[key]}`;
        }
      }
      // console.log("For Candidate queryString " + queryString);
      // Fetch candidates with pagination and filters
      const response = await fetch(
        `http://localhost:8081/EleCommisson/AllWinner?${queryString}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
        }
      );
      // console.log(
      //   `http://localhost:8081/EleCommisson/AllWinner?${queryString}`
      // );
      const data = await response.json();
      //   console.log(data);
      const totalCandidatesCOUNT = response.headers.get("X-TotalWinners-Count");
      // console.log(
      //   "http://localhost:8081/EleCommisson/getAllCandidate?" + queryString
      // );
      resolve({
        data: {
          winnercandidates: data,
          totalwinnerCandidates: +totalCandidatesCOUNT,
        },
      });
    } catch (error) {
      console.error("Error fetching candidates:", error);
      resolve({ data: { winnercandidates: [], totalwinnerCandidates: 0 } });
    }
  });
};

export const getAllpartyWithMajorityWins = (pagination, filters) => {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/EleCommisson/PartyWiseWins`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
        }
      );

      const data = await response.json();
      // console.log(data);
      resolve({
        data: {
          partyWithMajority: data.partyWithMajority,
          partyWins: data.partyWins,
        },
      });
    } catch (error) {
      console.error("Error fetching candidates:", error);
      resolve({ data: { partyWithMajority: {}, partyWins: [] } });
    }
  });
};
