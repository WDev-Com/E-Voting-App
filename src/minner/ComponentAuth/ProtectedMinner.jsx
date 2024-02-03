import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectLoggedInMinnerToken } from "./minnerAuthSlice";

const ProtectedMinner = ({ children }) => {
  const user = useSelector(selectLoggedInMinnerToken);
  // console.log("user Protected Side : ------- : ", user);
  if (!user) {
    return <Navigate to="/MinnerLogin" replace={true}></Navigate>;
  }
  return children;
};

export default ProtectedMinner;
