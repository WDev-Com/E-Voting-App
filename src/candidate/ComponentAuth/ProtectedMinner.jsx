import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInCandidateToken } from "./CandidateAuthSlice";

const ProtectedCandiate = ({ children }) => {
  const userCandidate = useSelector(selectLoggedInCandidateToken);
  // console.log("user Protected Side : ------- : ", user);
  if (!userCandidate) {
    return <Navigate to="/CandidateLogin" replace={true}></Navigate>;
  }
  return children;
};

export default ProtectedCandiate;
