import { configureStore, createReducer } from "@reduxjs/toolkit";
import electionCommisionReducer from "../src/electionOfficer/ComponentOprate/electionOfficerSlice";
import electionCommisionAuthReducer from "../src/electionOfficer/ComponentAuth/electionOfficerAuthSlice";
const store = configureStore({
  reducer: {
    electionCommision: electionCommisionReducer,
    electionCommisionAuth: electionCommisionAuthReducer,
  },
});

export default store;
