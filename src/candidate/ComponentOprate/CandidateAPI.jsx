///////// It can use for fetching the user using return token

import { toast } from "react-toastify";

// To find the user after a successful login attempt you
export function getCandidateById({ id }) {
  // console.log("id", id);
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch(
      `http://localhost:8081/MemberGovtOperation/GetcandidateById/` + id,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
      }
    );
    const dataA = await response.json();
    // console.log(dataA);
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({ data: { CandidateData: dataA } });
  });
}

export function updateCandidate(data) {
  // console.log("updateVoter", data);
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `http://localhost:8081/MemberGovtOperation/UpdatecandidateById/${data.id}`,
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
      resolve(updatedData);
    } catch (error) {
      console.error(error);
      toast.error("Update Fail");
    }
  });
}
