import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { createBrowserRouter, Link, RouterProvider } from "react-router-dom";

/* Importing The Components */
import HomePage from "./electionOfficer/ComponentAuth/HomePage";
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
import ProtectedCandiate from "./candidate/ComponentAuth/ProtectedCandidate";
import CandidateSignUpForm from "./candidate/ComponentAuth/SignUpCandidate";
import ProtectedVoter from "./voter/ComponentAuth/ProtectedVoter";
import VoterProfilePage from "./voter/ComponentOprate/VoterProfile";
import VoterSignUpForm from "./voter/ComponentAuth/SignUpVoter";
import LoginVoterPage from "./voter/ComponentAuth/LoginVoter";
import { selectVoterChecked } from "./voter/ComponentAuth/voterAuthSlice";
import VoterEVMPage from "./voter/ComponentOprate/EVM";
/* Import of Components */
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
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
  {
    path: "/VoterProfile",
    element: (
      <ProtectedVoter>
        <VoterProfilePage></VoterProfilePage>
      </ProtectedVoter>
    ),
  },
  {
    path: "/VoterLogin",
    element: <LoginVoterPage></LoginVoterPage>,
  },
  {
    path: "/VoterSignup",
    element: <VoterSignUpForm></VoterSignUpForm>,
  },
  {
    path: "/VoteOnEVM",
    element: (
      <ProtectedVoter>
        <VoterEVMPage></VoterEVMPage>
      </ProtectedVoter>
    ),
  },
]);

function App() {
  const dispatch = useDispatch();
  const loggedInUserToken = useSelector(selectLoggedInUserToken);
  const user = useSelector(selectUserChecked);
  const userMinner = useSelector(selectMinnerChecked);
  const userCadidate = useSelector(selectCandidateChecked);
  const userVoter = useSelector(selectVoterChecked);
  useEffect(() => {
    dispatch(checkEleCommissionAsync());
  }, [dispatch, user]);
  console.log("CheckEleCommission User : " + user);
  console.log("Logged In User Token : " + loggedInUserToken);

  return (
    <>
      {/*  &&  */}
      <div className="App">
        {(user || userMinner || userCadidate || userVoter) && (
          <RouterProvider router={router} />
        )}
      </div>
    </>
  );
}

export default App;
