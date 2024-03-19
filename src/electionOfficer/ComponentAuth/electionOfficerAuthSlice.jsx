import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createEleCommission,
  createMinner,
  loginEleCommission,
  checkEleCommission,
  signOut,
} from "./electionOfficerAuthAPI";
import { toast } from "react-toastify";
const initialState = {
  value: 0,
  loggedInUserToken: null, // this should only contain user identity => 'id'/'role'
  status: "idle",
  electioncommissner: [],
  error: null,
  userChecked: false,
  passwordReset: false,
};

//////////////*************AUTH*******************/////////////////////
export const createEleCommissionAsync = createAsyncThunk(
  "electionCommisionAuth/createEleCommission",
  async (userData) => {
    // console.log("From Slice : ", userData);
    const response = await createEleCommission(userData);
    // The value we return becomes the `fulfilled` action payload

    return response.data;
  }
);

export const createMinnerAsync = createAsyncThunk(
  "electionCommisionAuth/createMinner",
  async (userData) => {
    const response = await createMinner(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginEleCommissionAsync = createAsyncThunk(
  "electionCommisionAuth/loginEleCommission",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginEleCommission(loginInfo);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const checkEleCommissionAsync = createAsyncThunk(
  "electionCommisionAuth/checkEleCommission",
  async () => {
    try {
      const response = await checkEleCommission();
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "electionCommisionAuth/signOut",
  async () => {
    const response = await signOut();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const electionCommisionAuthSlice = createSlice({
  //When we use state in createSlice it only define for this mwthod
  name: "electionCommisionAuth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //////////////*************AUTH*******************/////////////////////
      .addCase(createEleCommissionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createEleCommissionAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(createMinnerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createMinnerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginEleCommissionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginEleCommissionAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.electioncommissner = action.payload;
        state.loggedInUserToken = action.payload.id; // Update the user token
      })

      .addCase(loginEleCommissionAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userChecked = false;
        state.loggedInUserToken = null;
      })
      .addCase(checkEleCommissionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkEleCommissionAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload; // Check the correct property
        // console.log(
        //   "EleCom Auth Slice: ",
        //   state.loggedInUserToken
        // );
        state.userChecked = true;
      })
      .addCase(checkEleCommissionAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      });
  },
});

export const selectLoggedInUserToken = (state) =>
  state.electionCommisionAuth.loggedInUserToken;

export const selectElectionCommissner = (state) =>
  state.electionCommisionAuth.electioncommissner;
export const selectError = (state) => state.electionCommisionAuth.error;
export const selectUserChecked = (state) =>
  state.electionCommisionAuth.userChecked;

export default electionCommisionAuthSlice.reducer;
