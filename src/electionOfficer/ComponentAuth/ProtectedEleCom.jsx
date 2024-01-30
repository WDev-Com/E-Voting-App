import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "./electionOfficerAuthSlice";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUserToken);
  console.log("user : ------- : ", user);
  if (user === undefined) {
    return (
      <Navigate to="/ElectionCommissionLoginPage" replace={true}></Navigate>
    );
  }
  return children;
};

export default Protected;
