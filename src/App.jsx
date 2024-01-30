import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

/* Import of Components */
import HomePage from "./DemoPage";
import ViewCandidate from "./electionOfficer/ComponentOprate/ViewCandidate";
import ViewVoter from "./electionOfficer/ComponentOprate/ViewVoter";
import ViewMinner from "./electionOfficer/ComponentOprate/ViewMinner";
import ElectionCommissionPage from "./electionOfficer/ComponentOprate/ElectionCommisionProfile";
import ElectionCommissionLoginPage from "./electionOfficer/ComponentAuth/LoginEleOfficer";
import {
  checkEleCommissionAsync,
  selectUserChecked,
} from "./electionOfficer/ComponentAuth/electionOfficerAuthSlice";
import ProtectedEleCom from "./electionOfficer/ComponentAuth/ProtectedEleCom";
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
        <ElectionCommissionPage></ElectionCommissionPage>
      </ProtectedEleCom>
    ),
  },
  {
    path: "/ElectionCommissionLoginPage",
    element: <ElectionCommissionLoginPage></ElectionCommissionLoginPage>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const checkEleCommissioner = useSelector(selectUserChecked);
  useEffect(() => {
    dispatch(checkEleCommissionAsync());
  }, [dispatch]);
  console.log("checkEleCommissionUser : " + checkEleCommissioner);
  return (
    <>
      <div className="App">
        {checkEleCommissioner && <RouterProvider router={router} />}
      </div>
    </>
  );
}

export default App;
