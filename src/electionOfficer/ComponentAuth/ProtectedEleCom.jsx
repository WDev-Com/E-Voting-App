import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInUserToken } from "./electionOfficerAuthSlice";

const Protected = ({ children }) => {
  const user = useSelector(selectLoggedInUserToken);
  // console.log("user Protected Side : ------- : ", user);
  if (!user) {
    return (
      <Navigate to="/ElectionCommissionLoginPage" replace={true}></Navigate>
    );
  }
  return children;
};

export default Protected;
