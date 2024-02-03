import { configureStore, createReducer } from "@reduxjs/toolkit";
import electionCommisionReducer from "../src/electionOfficer/ComponentOprate/electionOfficerSlice";
import electionCommisionAuthReducer from "../src/electionOfficer/ComponentAuth/electionOfficerAuthSlice";
import minnerReducer from "../src/minner/ComponentOprate/minnerSlice";
import minnerAuthReducer from "../src/minner/ComponentAuth/minnerAuthSlice";
import candidateReducer from "../src/candidate/ComponentOprate/CandidateSlice";
import candidateAuthReducer from "../src/candidate/ComponentAuth/CandidateAuthSlice";
const store = configureStore({
  reducer: {
    electionCommision: electionCommisionReducer,
    electionCommisionAuth: electionCommisionAuthReducer,
    minner: minnerReducer,
    MinnernAuth: minnerAuthReducer,
    candidate: candidateReducer,
    CandidateAuth: candidateAuthReducer,
  },
});

export default store;

/*
const MinnerAuthSlice = createSlice({
  //When we use state in createSlice it only define for this mwthod
  name: "MinnernAuth",
           ^|^ This is reducer name which we declare
           We should also same name in store to declare
           reducer to configure store
  initialState,
  reducers: {},

*/
