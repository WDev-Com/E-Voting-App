import { toast } from "react-toastify";

////////****************AUTH ***************//////////////////////////////////////////////////////////////////////////

export function createEleCommission(userData) {
  console.log("From API ", userData);
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8081/EleCommissonAuth/signup-EleCommission`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      }
    );
    if (response.ok) {
      toast.success("SignUp Successful");
    } else {
      toast.error("Signup Failed");
    }
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve(data);
  });
}

export function createMinner(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      `http://localhost:8081/EleCommissonAuth/Create-minner`,
      {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "content-type": "application/json" },
      }
    );
    if (response.ok) {
      toast.success("SignUp Successful");
    } else {
      toast.error("Signup Failed");
    }
    const data = await response.json();
    // TODO: on server it will only return some info of user (not password)
    resolve(data);
  });
}

export function loginEleCommission({ username, password }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch(
        `http://localhost:8081/EleCommissonAuth/login-EleCommission`,
        {
          method: "POST",
          body: JSON.stringify({ username: username, password: password }),
          headers: { "content-type": "application/json" },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log({ data });
        toast.success("Login successful");
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
        `http://localhost:8081/EleCommissonAuth/check-EleCommission`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Check Auth data : ", data);
        resolve({ data });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function signOut() {
  return new Promise(async (resolve) => {
    // TODO: on server we will remove user session info
    resolve({ data: "success" });
    return new Promise(async (resolve, reject) => {
      try {
        const response = await fetch(
          `http://localhost:8081/EleCommissonAuth/logoutEleCommission`
        );
        if (response.ok) {
          resolve({ data: "success" });
          toast.success("Sign out Successfully");
        } else {
          const error = await response.text();
          toast.error("Sign out Failed");
          reject(error);
        }
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  });
}
