import { useState } from "react";
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
/* Import of Components */
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage></HomePage>,
  },
  {
    path: "/ViewCandidate",
    element: <ViewCandidate></ViewCandidate>,
  },
  {
    path: "/ViewVoter",
    element: <ViewVoter></ViewVoter>,
  },
  {
    path: "/ViewMinner",
    element: <ViewMinner></ViewMinner>,
  },
  {
    path: "/ElectionCommissionPage",
    element: <ElectionCommissionPage></ElectionCommissionPage>,
  },
]);

function App() {
  return (
    <>
      <div className="App">{<RouterProvider router={router} />}</div>
    </>
  );
}

export default App;
