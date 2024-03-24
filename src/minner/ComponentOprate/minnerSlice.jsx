import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getMinnerById, updateMinner } from "./minnerAPI";
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

export const updateMinnerAsync = createAsyncThunk(
  "voter/updateMinner",
  async (data) => {
    // console.log(data);
    const response = await updateMinner(data);
    return response.updatedData;
  }
);

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
      })
      ////////////////// Update Operation

      .addCase(updateMinnerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMinnerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        console.log("state.minner >>>> ", state.minner);
        console.log(
          "action.payload===== updateMinnerAsync ====",
          action.payload
        );
        const updatedMinner = action.payload; // Assuming action.payload is the updated minner object
        const index = state.minner.findIndex(
          (miner) => miner.id === updatedMinner.id
        );
        if (index !== -1) {
          // If the miner with the same ID exists, update it
          state.minner[index] = updatedMinner;
        } else {
          // If the miner with the same ID doesn't exist, add it
          state.minner.push(updatedMinner);
        }
      });
  },
});

export const selectMinnerData = (state) => state.minner.minner;

export default minnerSlice.reducer;
