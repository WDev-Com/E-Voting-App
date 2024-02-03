import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

/* Importing The Components */
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
import MinnerPage from "./minner/ComponentOprate/MinnerProfile";
import LoginMinnerPage from "./minner/ComponentAuth/LoginMiner";
import ProtectedMinner from "./minner/ComponentAuth/ProtectedMinner";
import { selectMinnerChecked } from "./minner/ComponentAuth/minnerAuthSlice";
import CandidateProfilePage from "./candidate/ComponentOprate/CandidateProfile";
import LoginCandidatePage from "./candidate/ComponentAuth/LoginCandidate";
import { selectCandidateChecked } from "./candidate/ComponentAuth/CandidateAuthSlice";
import ProtectedCandiate from "./candidate/ComponentAuth/ProtectedMinner";
import CandidateSignUpForm from "./candidate/ComponentAuth/SignUpCandidate";
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
  {
    path: "/MinnerProfile",
    element: (
      <ProtectedMinner>
        <MinnerPage></MinnerPage>
      </ProtectedMinner>
    ),
  },
  {
    path: "/MinnerLogin",
    element: <LoginMinnerPage></LoginMinnerPage>,
  },
  {
    path: "/CandidateProfile",
    element: (
      <ProtectedCandiate>
        <CandidateProfilePage></CandidateProfilePage>
      </ProtectedCandiate>
    ),
  },
  {
    path: "/CandidateLogin",
    element: <LoginCandidatePage></LoginCandidatePage>,
  },
  {
    path: "/CandidateSignup",
    element: <CandidateSignUpForm></CandidateSignUpForm>,
  },
]);

function App() {
  const dispatch = useDispatch();
  const loggedInUserToken = useSelector(selectLoggedInUserToken);
  const user = useSelector(selectUserChecked);
  const userMinner = useSelector(selectMinnerChecked);
  const userCadidate = useSelector(selectCandidateChecked);
  useEffect(() => {
    dispatch(checkEleCommissionAsync());
  }, [dispatch, user]);
  console.log("CheckEleCommission User : " + user);
  console.log("Logged In User Token : " + loggedInUserToken);

  return (
    <>
      {/*  &&  */}
      <div className="App">
        {(user || userMinner || userCadidate) && (
          <RouterProvider router={router} />
        )}
      </div>
    </>
  );
}

export default App;
