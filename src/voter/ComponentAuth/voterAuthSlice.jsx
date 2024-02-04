import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createVoter,
  loginVoter,
  checkVoter,
  signOutVoter,
} from "./voterAuthAPI";
const initialState = {
  value: 0,
  loggedInVoterToken: null, // this should only contain user identity => 'id'/'role'
  status: "idle",
  Voter: [],
  error: null,
  uservoterChecked: false,
  passwordReset: false,
};

//////////////*************AUTH*******************/////////////////////

export const createVoterAsync = createAsyncThunk(
  "VoterAuth/createVoter",
  async (userData) => {
    console.log("From Slice : ", userData);
    const response = await createVoter(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginVoterAsync = createAsyncThunk(
  "VoterAuth/loginVoter",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginVoter(loginInfo);
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const checkVoterAsync = createAsyncThunk(
  "VoterAuth/checkVoter",
  async () => {
    try {
      const response = await checkVoter();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signOutVoterAsync = createAsyncThunk(
  "VoterAuth/signOutVoter",
  async () => {
    const response = await signOutVoter();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const VoterAuthSlice = createSlice({
  //When we use state in createSlice it only define for this mwthod
  name: "VoterAuth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //////////////*************AUTH*******************/////////////////////
      .addCase(createVoterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createVoterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInVoterToken = action.payload;
      })
      .addCase(loginVoterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginVoterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Voter = action.payload;
        state.loggedInVoterToken = action.payload.id; // Update the user token
      })

      .addCase(loginVoterAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutVoterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutVoterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.uservoterChecked = false;
        state.loggedInVoterToken = null;
      })
      .addCase(checkVoterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkVoterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInVoterToken = action.payload; // Check the correct property
        // console.log(
        //   "Minner Auth Slice: ",
        //   state.loggedInMinnerToken
        // );
        state.uservoterChecked = true;
      })
      .addCase(checkVoterAsync.rejected, (state, action) => {
        state.status = "idle";
        state.uservoterChecked = true;
      });
  },
});

export const selectLoggedInVoterToken = (state) =>
  state.VoterAuth.loggedInVoterToken;
export const selectVoterChecked = (state) => state.VoterAuth.uservoterChecked;
export const selectVoter = (state) => state.VoterAuth.Voter;

export default VoterAuthSlice.reducer;
