import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMinnerById } from "./minnerAPI";
const initialState = {
  value: 0,
  status: "idle",
  minner: [],
  error: null,
};

export const getMinnerByIdsync = createAsyncThunk(
  "minner/getMinnerById",
  async (obj) => {
    const response = await getMinnerById(obj);
    // console.log(filter);
    return response.data;
  }
);

// export const updateMinnerRoleAsync = createAsyncThunk(
//   "electionCommision/updateMinnerRole",
//   async (data) => {
//     // console.log(data);
//     const response = await updateMinnerRole(data);
//     return response.data;
//   }
// );

const minnerSlice = createSlice({
  //When we use state in createSlice it only define for this mwthod
  name: "minner",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //////////////////// Check all payloads correctly before running
      //
      .addCase(getMinnerByIdsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMinnerByIdsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.minner = action.payload.MinnerData;
        // console.log(state.minner);
      });
  },
});

export const selectMinnerData = (state) => state.minner.minner;

export default minnerSlice.reducer;
