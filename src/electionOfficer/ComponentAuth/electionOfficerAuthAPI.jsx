import { toast } from "react-toastify";

////////****************AUTH ***************//////////////////////////////////////////////////////////////////////////

export function createEleCommission(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/EleCommissonAuth/signup-candidate",
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

export function createMinner(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/EleCommissonAuth/Create-minner",
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

export function loginEleCommission(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8080/EleCommissonAuth/login-EleCommission",
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

export function checkEleCommission() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        "http://localhost:8080/EleCommissonAuth/check-EleCommission"
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
          "http://localhost:8080/EleCommissonAuth/logoutEleCommission"
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
