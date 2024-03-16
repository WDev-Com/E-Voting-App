import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createCandidate,
  loginCandidate,
  checkCandidate,
  signOutCandidate,
} from "./CandidateAuthAPI";
const initialState = {
  value: 0,
  loggedInCandidateToken: null, // this should only contain user identity => 'id'/'role'
  status: "idle",
  Candidate: [],
  error: null,
  usercandidateChecked: false,
  passwordReset: false,
};

//////////////*************AUTH*******************/////////////////////

export const createCandidateAsync = createAsyncThunk(
  "CandidateAuth/createCandidate",
  async (userData) => {
    console.log("From Slice : ", userData);
    const response = await createCandidate(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginCandidateAsync = createAsyncThunk(
  "CandidateAuth/loginCandidate",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginCandidate(loginInfo);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const checkCandidateAsync = createAsyncThunk(
  "CandidateAuth/checkCandidate",
  async () => {
    try {
      const response = await checkCandidate();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signOutCandidateArsync = createAsyncThunk(
  "CandidateAuth/signOutCandidate",
  async () => {
    const response = await signOutCandidate();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const CandidateAuthSlice = createSlice({
  //When we use state in createSlice it only define for this mwthod
  name: "CandidateAuth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //////////////*************AUTH*******************/////////////////////
      .addCase(createCandidateAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createCandidateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInCandidateToken = action.payload;
      })
      .addCase(loginCandidateAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginCandidateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Candidate = action.payload;
        state.loggedInCandidateToken = action.payload.id; // Update the user token
      })

      .addCase(loginCandidateAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutCandidateArsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutCandidateArsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.usercandidateChecked = false;
        state.loggedInCandidateToken = null;
      })
      .addCase(checkCandidateAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkCandidateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInCandidateToken = action.payload; // Check the correct property
        // console.log(
        //   "Minner Auth Slice: ",
        //   state.loggedInMinnerToken
        // );
        state.usercandidateChecked = true;
      })
      .addCase(checkCandidateAsync.rejected, (state, action) => {
        state.status = "idle";
        state.usercandidateChecked = true;
      });
  },
});

export const selectLoggedInCandidateToken = (state) =>
  state.CandidateAuth.loggedInCandidateToken;
export const selectCandidateChecked = (state) =>
  state.CandidateAuth.usercandidateChecked;
export const selectCandidate = (state) => state.CandidateAuth.Candidate;
export const selectError = (state) => state.CandidateAuth.error;
export default CandidateAuthSlice.reducer;
