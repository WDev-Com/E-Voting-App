import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInVoterToken } from "./voterAuthSlice";

const ProtectedVoter = ({ children }) => {
  const userVoter = useSelector(selectLoggedInVoterToken);
  // console.log("user Protected Side : ------- : ", user);
  if (!userVoter) {
    return <Navigate to="/Voterlogin" replace={true}></Navigate>;
  }
  return children;
};

export default ProtectedVoter;
