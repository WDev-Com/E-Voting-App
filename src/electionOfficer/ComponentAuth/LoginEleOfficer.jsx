import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginEleCommissionAsync,
  selectLoggedInUserToken,
  selectUserChecked,
} from "./electionOfficerAuthSlice";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const ElectionCommissionPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserToken);
  const credentials = {
    username: "seshan",
    password: "Dada2003",
  };
  console.log("user", user);
  useEffect(() => {
    // Dispatch the login action only if the userChecked is false
    // dispatch(loginEleCommissionAsync(credentials));
  }, []);
  // Render the content when the login operation has completed
  return (
    <>
      {/* {user ? (
        <Navigate to={"/ViewVoter"}></Navigate>
      ) : (
        <Navigate to={"/ElectionCommissionLoginPage"}></Navigate>
      )} */}
      <div>Hello Officer Login Please {user}</div>
    </>
  );
};

export default ElectionCommissionPage;
