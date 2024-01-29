import { configureStore, createReducer } from "@reduxjs/toolkit";
import electionCommisionReducer from "../src/electionOfficer/ComponentOprate/electionOfficerSlice";

const store = configureStore({
  reducer: {
    electionCommision: electionCommisionReducer,
  },
});

export default store;
