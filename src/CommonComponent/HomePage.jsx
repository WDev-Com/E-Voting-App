import React from "react";
import { Link } from "react-router-dom";
import HomeNavBar from "../CommonComponent/Navigations/HomePageMenu";
import secureIcon from "/src/assets/secure-icon.jpg";
import convenientIcon from "/src/assets/convenient-icon.png";
import transparentIcon from "/src/assets/transparent-icon.png";
import authenticationIcon from "/src/assets/auth.png";
import monitoringIcon from "/src/assets/mon.png";
import "./HomePageCSS.css";
const HomePage = () => {
  return (
    <div>
      <HomeNavBar />
      <div className="image-container">
        <img src="/src/assets/img.jpeg" alt="Your Image" />
      </div>
      <div className="overlay-content">
        <h1 className="fancy-heading">Secure Online Voting with Blockchain</h1>
        <ul className="fancy-list">
          <li>
            Revolutionize democracy with our secure online voting platform,
          </li>
          <li>Powered by blockchain technology.</li>
          <li>Vote from anywhere in the world with confidence!</li>
        </ul>
      </div>

      <section className="cta">
        <div className="cta-content">
          <h2>
            Join thousands of others in shaping the future. Exercise your right
            to vote securely.
          </h2>
          {/* <button aria-label="View Current Figures">Current Figures</button> */}
        </div>
      </section>

      <div className="container">
        <div className="featureLabel">Features</div>
        <section className="features">
          <div className="feature">
            <img src={authenticationIcon} alt="Authentication Icon" />
            <h3>Authentication</h3>
            <p>Identitiy and eligibility of every user is verified. </p>
          </div>
          <div className="feature">
            <img src={secureIcon} alt="Secure Icon" />
            <h3>Security</h3>
            <p>
              Your vote is encrypted and securely stored on the blockchain,
              ensuring its integrity.
            </p>
          </div>
          <div className="feature">
            <img src={convenientIcon} alt="Convenient Icon" />
            <h3>Convenience</h3>
            <p>
              Vote from the comfort of your home, anytime during the voting
              period.
            </p>
          </div>
          <div className="feature">
            <img src={transparentIcon} alt="Transparent Icon" />
            <h3>Transparency</h3>
            <p>
              Blockchain technology ensures transparency and auditability of the
              voting process.
            </p>
          </div>
          <div className="feature">
            <img src={monitoringIcon} alt="Monitoring Icon" />
            <h3>Monitoring</h3>
            <p>
              Continuous monitoring to detect and mitigate potential security
              threats or vulnerabilitie.{" "}
            </p>
          </div>
        </section>
      </div>
      <footer>
        <p1>&copy; 2024 Secure Voting App. All rights reserved.</p1>
      </footer>
    </div>
  );
};

export default HomePage;
