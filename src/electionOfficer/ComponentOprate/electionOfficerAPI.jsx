import { combineSlices } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
export function genrateVoterConfirmationNoREQ(datas) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/EleCommisson/GenrateVoterConfirmationNo/` +
          datas.id,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      // console.log("Response from server:", data); // Add this line to log the response
      if (response.ok) {
        toast.success("Genrated Successfully");
      }
      console.log({ data });
      resolve({ data });
    } catch (error) {
      console.log(error);
      toast.error("Generation Fail ");
    }
  });
}

export function getVoterConfirmationNoREQ(datas) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/EleCommisson/GetVoterConfirmationNo/` + datas.id,
        {
          method: "POST",
        }
      );
      const data = await response.json();
      // console.log("Response from server:", data); // Add this line to log the response
      if (response.ok) {
        alert("Voter Confirmation No : " + data.VoterConfirmNo);
        // toast.success("NO : " + data.VoterConfirmNo);
      } else {
        toast.error("Fetching Fail");
      }

      resolve({ data });
    } catch (error) {
      console.log(error);
    }
  });
}

export function updateElectionCommissioner(data) {
  // console.log("updateElectionCommissioner", data);
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/EleCommisson/UpdateElectionCommissioner/` +
          data.id,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },
        }
      );
      const data2 = await response.json();
      // console.log("Response from server:", data2); // Add this line to log the response
      if (response.ok) {
        toast.success("Update Successful");
      }
      resolve({ data });
    } catch (error) {
      console.error(error);
      toast.error("Update Fail ");
    }
  });
}

export function countVote(id) {
  // console.log("id", id);
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch(
      `http://localhost:8081/EleCommisson/CountVoteOfCandidate/` + id,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
      }
    );
    const dataA = await response.json();
    if (!response.ok) {
      toast.error("No Vote Found");
      return;
    } else {
      toast.success("Vote Updated Successfully");
    }
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({
      data: { voteCount: dataA.data.count, cadidate: dataA.candidate },
    });
  });
}

///////// It can use for fetching the user using return token
// To find the user after a successful login attempt you
export function getEleCommission({ id }) {
  // console.log("id", id);
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch(
      `http://localhost:8081/EleCommisson/getEleCommission/` + id,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
      }
    );
    const dataA = await response.json();
    // console.log(dataA);
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({ data: { ElectionComission: dataA } });
  });
}

export function getAllEleCommission(pagination, filters) {
  // Extract pagination parameters
  const page = pagination._page || 1;
  const pageSize = pagination._limit || 10;

  return new Promise(async (resolve) => {
    try {
      // Construct the query string
      let queryString = `?_page=${page}&_limit=${pageSize}`;

      for (let key in filters) {
        if (key === "role") {
          queryString += `&${key}=${filters[key]}`;
        }
      }
      // console.log("queryString := ", queryString);
      // Fetch election commissions with pagination and filters
      const response = await fetch(
        `http://localhost:8081/EleCommisson/GetAllelectionCommissions${queryString}`,
        {
          method: "POST",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      const totalElectionCommissions = response.headers.get(
        "X-Total-Election-Commissions-Count"
      );
      resolve({
        data: {
          ElectionCommission: data,
          totalElectionCommissions: +totalElectionCommissions,
        },
      });
    } catch (error) {
      console.error("Error fetching ElectionCommissions:", error);
      resolve({
        data: { ElectionCommission: [], totalElectionCommissions: 0 },
      });
    }
  });
}

export const getAllCandidates = (pagination, filters) => {
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
        `http://localhost:8081/EleCommisson/getAllCandidate?${queryString}`
      );
      const data = await response.json();
      const totalCandidatesCOUNT = response.headers.get(
        "X-TotalCandidates-Count"
      );
      console.log(
        "http://localhost:8081/EleCommisson/getAllCandidate?" + queryString
      );
      resolve({
        data: { candidates: data, totalCandidates: +totalCandidatesCOUNT },
      });
    } catch (error) {
      console.error("Error fetching candidates:", error);
      resolve({ data: { candidates: [], totalCandidates: 0 } });
    }
  });
};

export const getAllMinners = (pagination, filters) => {
  // Extract pagination parameters
  // console.log("Filter", filters);
  const page = pagination._page || 1;
  const pageSize = pagination._limit || 10;

  return new Promise(async (resolve) => {
    try {
      // Construct the query string
      let queryString = `?page=${page}&pageSize=${pageSize}`;

      for (let key in filters) {
        if (key === "Role" || key === "region") {
          queryString += `&${key}=${filters[key]}`;
        }
      }
      // console.log(queryString);
      // Fetch minners with pagination and filters
      const response = await fetch(
        `http://localhost:8081/EleCommisson/getAllMinner${queryString}`
      );
      const data = await response.json();
      const totalItems = response.headers.get("X-TotalMinner-Count");

      resolve({ data: { minners: data, totalItems: +totalItems } });
    } catch (error) {
      console.error("Error fetching minners:", error);
      resolve({ data: { minners: [], totalMinners: 0 } });
    }
  });
};

export const getAllVoters = (pagination, filter) => {
  // Extract pagination parameters
  const page = pagination._page || 1;
  const pageSize = pagination._limit || 10;
  let queryString = `?_page=${page}&_limit=${pageSize}`;
  // console.log(queryString);
  // Filter by Constituency
  if (filter.Constituency) {
    queryString += `&constituency=${filter.Constituency}`;
  }

  // Filter by Role
  if (filter.Role) {
    queryString += `&role=${filter.Role}`;
  }
  // console.log(queryString);
  // console.log(queryString);
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/EleCommisson/getAllVoter${queryString}`
      );
      const data = await response.json();
      const totalVoterS = response.headers.get("X-TotalVoter-Count");
      // console.log("data=========>", data);
      // console.log("totalItems=========>", totalVoterS);
      resolve({
        data: { voters: data, totalvoters: +totalVoterS },
      });
    } catch (error) {
      console.error("Error fetching voters:", error);
      resolve({ data: { voters: [], totalVoters: 0 } });
    }
  });
};

export function updateVoterIdentity(datas) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/EleCommisson/UpdateVoterIdentity/` + datas.id,
        {
          method: "PATCH",
          body: JSON.stringify(datas),
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      // console.log("Response from server:", data); // Add this line to log the response
      if (response.ok) {
        toast.success("Update Successfull");
      }
      console.log({ data });
      resolve({ data });
    } catch (error) {
      console.log(error);
      toast.error("Update Fail ");
    }
  });
}

export function updateCandidateIdentity(datas) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/EleCommisson/UpdateCandidateIdentity/` +
          datas.id,
        {
          method: "PATCH",
          body: JSON.stringify(datas),
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      // console.log("Response from server:", data); // Add this line to log the response
      if (response.ok) {
        toast.success("Update Successfull");
      }
      resolve({ data });
    } catch (error) {
      console.error(error);
      toast.error("Update Fail ");
    }
  });
}

export function updateMinnerIdentity(data) {
  // console.log("Update Minner : " + data.id);
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/EleCommisson/updateMinnerIdentity/` + data.id,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },
        }
      );
      const resdata = await response.json();
      // console.log("Response from server:", data); // Add this line to log the response
      if (response.ok) {
        toast.success("Update Successfull");
      }

      resolve({ resdata });
    } catch (error) {
      console.log(error);
      toast.error("Update Fail ");
    }
  });
}

export function deleteMinner(id) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/EleCommisson/RemoveMinner/` + id,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        }
      );
      if (!response.ok) {
        toast.error("Already deleted");
      }
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      if (response.ok) {
        toast.success("Delete Successfull");
      } else {
        toast.error("Already deleted");
      }

      resolve({ data });
    } catch (error) {
      toast.error("Delete Fail");
      console.log(error);
      // Handle error, show an error toast, etc.
    }
  });
}

export function deleteCandidate(id) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/EleCommisson/RemoveCandidate/` + id,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)
      if (response.ok) {
        toast.success("Delete Successfull");
      } else {
        toast.error("Already deleted");
      }
      resolve({ data });
    } catch (error) {
      toast.error("Delete Fail");
      // console.log("Delete Fail");
      // Handle error, show an error toast, etc.
    }
  });
}

export function deleteVoter(id) {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/EleCommisson/RemoveVoter/` + id,
        {
          method: "DELETE",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      // TODO: on server it will only return some info of user (not password)

      if (response.ok) {
        toast.success("Delete Successfull");
      } else {
        toast.error("Already deleted");
      }
      resolve({ data });
    } catch (error) {
      toast.error("Delete Fail@");
      console.log(error);
      // Handle error, show an error toast, etc.
    }
  });
}
