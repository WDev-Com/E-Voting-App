import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginEleCommissionAsync,
  selectLoggedInUserToken,
} from "./electionOfficerAuthSlice";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";

const ElectionCommissionPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUserToken);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    // Dispatch the login action only if needed
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginEleCommissionAsync(credentials));
  };

  return (
    <>
      {!user ? (
        <Navigate to={"/ElectionCommissionLoginPage"}></Navigate>
      ) : (
        <Navigate to={"/ElectionCommissionPage"}></Navigate>
      )}
      <div className="login-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
          />
          <br />
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
      <Link to="/ElectionCommissionSignUpForm">
        <button>Sign Up Here</button>
      </Link>
    </>
  );
};

export default ElectionCommissionPage;
