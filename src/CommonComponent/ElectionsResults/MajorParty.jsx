import React, { useEffect, useState } from "react";
import HomeNavBar from "../Navigations/HomePageMenu";
import Glide from "@glidejs/glide";

import {
  selectotherWinner,
  selectmajorParty,
  getAllpartyWithMajorityWinsAsync,
} from "./CommonSlice";
import { useDispatch, useSelector } from "react-redux";
const MajorParty = () => {
  let dispatch = useDispatch();
  let winner = useSelector(selectmajorParty);
  let otherWinner = useSelector(selectotherWinner);
  // console.log(otherWinner.length);
  useEffect(() => {}, [dispatch, winner, otherWinner]);
  let [state, setState] = useState(true);
  if (state) {
    dispatch(getAllpartyWithMajorityWinsAsync());
    setState(false);
  }
  return (
    <>
      <HomeNavBar />
      <div className="flex flex-col items-center">
        <div className=" w-11/12 lg:flex justify-center">
          <div className="w-11/12 min-h-full rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="flex flex-col items-center">
                <div className="font-bold text-xl mb-2 ">
                  WINNING PARTY IN ELECTION 2024
                </div>
              </div>
              {/*  */}
            </div>
            <div className="flex flex-col items-center">
              <img
                className="w-96 h-96"
                src={winner.partySymbol}
                alt="No winner"
              />
            </div>
            <div className="flex flex-col items-center">
              <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-950 mr-2 mb-2">
                  Party Name : {winner._id}
                </span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-950 mr-2 mb-2">
                  Total Wining Candidates : {winner.totalWins}
                </span>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        {/* //////////// SLIDER /////////////////// */}
        <div className=" w-11/12 lg:flex justify-center">
          <div className="w-full min-h-full rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">
                OTHER PARTIES WINNING CANDIDATES
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className=" max-w-fit lg:max-w-fit flex justify-center">
            {otherWinner.length !== 0 ? (
              <SliderControlsInside
                otherWinner={otherWinner}
              ></SliderControlsInside>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

function SliderControlsInside({ otherWinner }) {
  useEffect(() => {
    const slider = new Glide(".glide-01", {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 3000,
      animationDuration: 700,
      gap: 0,
      classes: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
    }).mount();

    return () => {
      slider.destroy();
    };
  }, []);

  return (
    <>
      {/*<!-- Component: Slider with controls inside --> */}

      <div className="absolute w-11/12 h-5/6 glide-01">
        {/*    <!-- Slides --> */}

        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
            {otherWinner ? (
              otherWinner.map((ele, index) => (
                <li key={index}>
                  <br></br>
                  <div className=" w-11/12 lg:flex justify-center">
                    <div className="w-11/12 min-h-full rounded overflow-hidden shadow-lg">
                      <div className="flex flex-col items-center">
                        <img
                          className="w-96 h-96"
                          src={ele.partySymbol}
                          alt="No winner"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="px-6 pt-4 pb-2">
                          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-950 mr-2 mb-2">
                            Party Name : {ele._id}
                          </span>
                          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-950 mr-2 mb-2">
                            Total Wining Candidates : {ele.totalWins}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <li>
                <br></br>
                <div className=" w-11/12 lg:flex justify-center bg-gray-200">
                  <div className="w-11/12 min-h-full rounded bg-gray-200 overflow-hidden shadow-lg">
                    <div className="flex flex-col items-center">
                      <img className="w-96 h-96" alt="No winner" />
                    </div>
                    <div className="flex flex-col bg-gray-200 items-center">
                      <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-950 mr-2 mb-2">
                          Party Name : None
                        </span>
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-950 mr-2 mb-2">
                          Total Wining Candidates : 0
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
        {/*    <!-- Controls --> */}
        <div
          className="absolute left-0 flex items-center justify-between w-full h-0 px-4 top-1/2 "
          data-glide-el="controls"
        >
          <button
            className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir="<"
            aria-label="prev slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <title>prev slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
              />
            </svg>
          </button>
          <button
            className="inline-flex items-center justify-center w-8 h-8 transition duration-300 border rounded-full border-slate-700 bg-white/20 text-slate-700 hover:border-slate-900 hover:text-slate-900 focus-visible:outline-none lg:h-12 lg:w-12"
            data-glide-dir=">"
            aria-label="next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <title>next slide</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
        </div>
      </div>
      {/*<!-- End Slider with controls inside --> */}
    </>
  );
}

export default MajorParty;
