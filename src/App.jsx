import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

/* Import of Components */
import HomePage from "./electionOfficer/ComponentAuth/DemoPage";
import ViewCandidate from "./electionOfficer/ComponentOprate/ViewCandidate";
import ViewVoter from "./electionOfficer/ComponentOprate/ViewVoter";
import ViewMinner from "./electionOfficer/ComponentOprate/ViewMinner";
import ElectionCommissionPage from "./electionOfficer/ComponentOprate/ElectionCommisionProfile";
import ElectionCommissionLoginPage from "./electionOfficer/ComponentAuth/LoginEleOfficer";
import {
  checkEleCommissionAsync,
  selectUserChecked,
  selectLoggedInUserToken,
} from "./electionOfficer/ComponentAuth/electionOfficerAuthSlice";
import ProtectedEleCom from "./electionOfficer/ComponentAuth/ProtectedEleCom";
import ElectionCommissionSignUpForm from "./electionOfficer/ComponentAuth/SignUpOfficer";
import CreateMinnerPage from "./electionOfficer/ComponentAuth/CreateMinner";
/* Import of Components */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedEleCom>
        <HomePage></HomePage>
      </ProtectedEleCom>
    ),
  },
  {
    path: "/ViewCandidate",
    element: (
      <ProtectedEleCom>
        <ViewCandidate></ViewCandidate>
      </ProtectedEleCom>
    ),
  },
  {
    path: "/ViewVoter",
    element: (
      <ProtectedEleCom>
        <ViewVoter></ViewVoter>
      </ProtectedEleCom>
    ),
  },
  {
    path: "/ViewMinner",
    element: (
      <ProtectedEleCom>
        <ViewMinner></ViewMinner>
      </ProtectedEleCom>
    ),
  },
  {
    path: "/ElectionCommissionPage",
    element: (
      <ProtectedEleCom>
        <ElectionCommissionPage></ElectionCommissionPage>{" "}
      </ProtectedEleCom>
    ),
  },
  {
    path: "/ElectionCommissionLoginPage",
    element: <ElectionCommissionLoginPage></ElectionCommissionLoginPage>,
  },
  {
    path: "/ElectionCommissionSignUpForm",
    element: <ElectionCommissionSignUpForm></ElectionCommissionSignUpForm>,
  },
  {
    path: "/CreateMinner",
    element: <CreateMinnerPage></CreateMinnerPage>,
  },
  ,
]);

function App() {
  const dispatch = useDispatch();
  const loggedInUserToken = useSelector(selectLoggedInUserToken);
  const user = useSelector(selectUserChecked);
  useEffect(() => {
    dispatch(checkEleCommissionAsync());
  }, [dispatch, user]);
  console.log("CheckEleCommission User : " + user);
  console.log("Logged In User Token : " + loggedInUserToken);

  return (
    <>
      <div className="App">{user && <RouterProvider router={router} />}</div>
    </>
  );
}

export default App;
