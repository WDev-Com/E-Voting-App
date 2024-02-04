import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoggedInVoterToken,
  selectVoterChecked,
  loginVoterAsync,
} from "./voterAuthSlice";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import HomeNavBar from "../../CommonComponent/Navigations/HomePageMenu";

const LoginVoterPage = () => {
  const dispatch = useDispatch();
  const userVoter = useSelector(selectLoggedInVoterToken);
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
    dispatch(loginVoterAsync(credentials));
  };

  return (
    <>
      <HomeNavBar>
        {!userVoter ? (
          <Navigate to={"/VoterLogin"}></Navigate>
        ) : (
          <Navigate to={"/VoterProfile"}></Navigate>
        )}
        <div className="login-container">
          <h2>Login Voter</h2>
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
        <Link to="/ElectionCommissionLoginPage">
          <button>Home</button>
        </Link>
        <Link to="/VoterSignup">
          <button>Sign Up Voter</button>
        </Link>
      </HomeNavBar>
    </>
  );
};

export default LoginVoterPage;
