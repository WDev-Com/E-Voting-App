import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginMinner, checkMinner, signOutMinner } from "./minnerAuthAPI";
const initialState = {
  value: 0,
  loggedInMinnerToken: null, // this should only contain user identity => 'id'/'role'
  status: "idle",
  Minner: [],
  error: null,
  userminnerChecked: false,
  passwordReset: false,
};

//////////////*************AUTH*******************/////////////////////
export const loginMinnerAsync = createAsyncThunk(
  "MinnernAuth/loginMinner",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginMinner(loginInfo);
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const checkMinnerAsync = createAsyncThunk(
  "MinnernAuth/checkMinner",
  async () => {
    try {
      const response = await checkMinner();
      // console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const signOutMinnersync = createAsyncThunk(
  "MinnernAuth/signOutMinner",
  async () => {
    const response = await signOutMinner();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const MinnerAuthSlice = createSlice({
  //When we use state in createSlice it only define for this mwthod
  name: "MinnernAuth",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //////////////*************AUTH*******************/////////////////////
      .addCase(loginMinnerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginMinnerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Minner = action.payload;
        state.loggedInMinnerToken = action.payload.id; // Update the user token
      })

      .addCase(loginMinnerAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(signOutMinnersync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutMinnersync.fulfilled, (state, action) => {
        state.status = "idle";
        state.userminnerChecked = false;
        state.loggedInMinnerToken = null;
      })
      .addCase(checkMinnerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkMinnerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInMinnerToken = action.payload.id; // Check the correct property
        // console.log(
        //   "Minner Auth Slice: ",
        //   state.loggedInMinnerToken
        // );
        state.userminnerChecked = true;
      })
      .addCase(checkMinnerAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userminnerChecked = true;
      });
  },
});

export const selectLoggedInMinnerToken = (state) =>
  state.MinnernAuth.loggedInMinnerToken;
export const selectMinnerChecked = (state) =>
  state.MinnernAuth.userminnerChecked;
export const selectMinner = (state) => state.MinnernAuth.Minner;
export const selectError = (state) => state.MinnernAuth.error;
export default MinnerAuthSlice.reducer;
