import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createEleCommission,
  createMinner,
  loginEleCommission,
  checkEleCommission,
  signOut,
} from "./electionOfficerAuthAPI";
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
  "electionCommision/createEleCommission",
  async (userData) => {
    const response = await createEleCommission(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const createMinnerAsync = createAsyncThunk(
  "electionCommision/createMinner",
  async (userData) => {
    const response = await createMinner(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const loginEleCommissionAsync = createAsyncThunk(
  "electionCommision/loginEleCommission",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginEleCommission(loginInfo);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const checkEleCommissionAsync = createAsyncThunk(
  "electionCommision/checkEleCommission",
  async () => {
    try {
      const response = await checkEleCommission();
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signOutAsync = createAsyncThunk(
  "electionCommision/signOut",
  async () => {
    const response = await signOut();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const electionCommisionSlice = createSlice({
  //When we use state in createSlice it only define for this mwthod
  name: "electionCommision",
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
        state.loggedInUserToken = action.payload;
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
        state.loggedInUserToken = null;
      })
      .addCase(checkEleCommissionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkEleCommissionAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true;
      })
      .addCase(checkEleCommissionAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked = true;
      });
  },
});

export const selectLoggedInUserToken = (state) =>
  state.electionCommision.loggedInUserToken;
export const selectElectionCommissner = (state) =>
  state.electionCommision.electioncommissner;
export const selectError = (state) => state.electionCommision.error;
export const selectUserChecked = (state) => state.electionCommision.userChecked;

export default electionCommisionSlice.reducer;
