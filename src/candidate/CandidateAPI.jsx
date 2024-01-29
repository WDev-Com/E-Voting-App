import { toast } from "react-toastify";

export function fetchTopSearch() {
  return new Promise(async (resolve) => {
    // console.log();
    const response = await fetch(
      "http://localhost:8080/MemberGovtOperation/Getcandidate"
    );
    const data = await response.json();
    // console.log("Fetched Top Produts:", data); // Add this line
    resolve({ data });
  });
}

////////****************AUTH ***************//////////////////////////////////////////////////////////////////////////
export function createCandidate(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/MemberGovtAuth/signup-candidate",
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve({ data });
  });
}

export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8080/MemberGovtAuth/login-candidate",
        {
          method: "POST",
          body: JSON.stringify(loginInfo),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
    // TODO: on server it will only return some info of user (not password)
  });
}

export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8080/MemberGovtAuth/check-candidate"
      );
      if (response.ok) {
        const data = await response.json();
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }

    // TODO: on server it will only return some info of user (not password)
  });
}

export function signOut() {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: "success" });
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          "http://localhost:8080/MemberGovtAuth/logoutCandidate"
        );
        if (response.ok) {
          resolve({ data: "success" });
        } else {
          const error = await response.text();
          reject(error);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  });
}
