import React from "react";
import { Link } from "react-router-dom";
import HomeNavBar from "../../CommonComponent/Navigations/HomePageMenu";

const HomePage = () => {
  return (
    <HomeNavBar>
      <div>
        <p color="black">DemoPage</p>
        <Link to="/ElectionCommissionLoginPage"></Link>
      </div>
    </HomeNavBar>
  );
};

export default HomePage;
