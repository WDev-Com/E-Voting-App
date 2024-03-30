///////// It can use for fetching the user using return token

import { toast } from "react-toastify";

// To find the user after a successful login attempt you
export function getMinnerById({ id }) {
  // console.log("id", id);
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch(
      `http://localhost:8081/Minning/GetMinnerByID/` + id,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
      }
    );
    const dataA = await response.json();
    // console.log(dataA);
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({ data: { MinnerData: dataA } });
  });
}

export function updateMinner(data) {
  // console.log("updateVoter", data);
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/Minning/UpdateMinnerByID/${data.id}`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: { "content-type": "application/json" },
        }
      );
      const updatedData = await response.json();
      // console.log("Response from server:", updatedData); // Add this line to log the response
      if (response.ok) {
        toast.success("Update Successful");
      }
      // console.log("updatedData", { updatedData });
      resolve({ updatedData });
    } catch (error) {
      console.error(error);
      toast.error("Update Fail");
    }
  });
}

export function fetchMinerData(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8081/Minning/fetchMinerData/${id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        // console.log({ data });
        resolve({ data }); // Return data directly, without wrapping it in an object
      } else {
        const errorMessage = await response.text();
        reject(new Error(`Error response from server: ${errorMessage}`));
      }
    } catch (error) {
      reject(new Error(`Error in fetching miner data: ${error.message}`));
    }
  });
}

export function MineVotes(id) {
  console.log("id", id);
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch(
      `http://localhost:8081/Minning/MineVotes/` + id,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
      }
    );
    const dataA = await response.json();
    // console.log(dataA);
    toast.success(dataA.success);
    if (!response.ok) {
      toast.error(dataA.ErrorMinning);
    }
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({ data: { error: dataA.ErrorMinning } });
  });
}

export function AddBlock(id) {
  // console.log("id", id);
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch(
      `http://localhost:8081/Minning/AddNewBlock/` + id,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
      }
    );
    const dataA = await response.json();
    console.log(dataA);
    toast.success(dataA.success);
    if (!response.ok) {
      toast.error(dataA.error);
    }
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({ data: { error: dataA.error } });
  });
}
