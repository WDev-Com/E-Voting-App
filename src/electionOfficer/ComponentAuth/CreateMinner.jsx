import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {} from "./electionOfficerAuthSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { createMinnerAsync } from "./electionOfficerAuthSlice";
/* 
This Page Reloads Because of creting other jwt stratergy jwtMinner
Will Sign Up Officer There Same JWT Stratergy
*/
const CreateMinnerPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    role: "",
    MinnerID: "",
    profileimages: "",
  });
  const dispatch = useDispatch();
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    /* This logic and approach for validation 
    is wrong use validation other logic*/
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      console.log("ok");
      dispatch(createMinnerAsync(formData));
    } else {
      console.log("not ok");
      dispatch(createMinnerAsync(formData));
    }

    // Your signup logic goes here
    // You can make an API call or handle it as needed

    // Reset the form after successful submission
    setFormData({
      name: "",
      username: "",
      email: "",
      password: "",
    });

    setErrors({});
  };

  const validateForm = (data) => {
    const errors = {};

    // Example email validation
    if (!data.email || !/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Example password validation
    if (!data.password || data.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
    }

    return errors;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="text"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>
        <button type="submit">Sign Up Minner</button>
      </form>
      <Link to="/ElectionCommissionLoginPage">
        <button>Home</button>
      </Link>
    </div>
  );
};

export default CreateMinnerPage;
