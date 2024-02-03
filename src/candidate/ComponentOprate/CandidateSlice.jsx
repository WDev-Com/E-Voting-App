import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCandidateById } from "./CandidateAPI";
const initialState = {
  value: 0,
  status: "idle",
  candidateData: [],
  error: null,
};

export const getCandidateByIdAsync = createAsyncThunk(
  "candidate/getCandidateById",
  async (obj) => {
    const response = await getCandidateById(obj);
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

const candidateSlice = createSlice({
  //When we use state in createSlice it only define for this mwthod
  name: "candidate",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //////////////////// Check all payloads correctly before running
      //
      .addCase(getCandidateByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCandidateByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.candidateData = action.payload.CandidateData;
        // console.log(state.minner);
      });
  },
});

export const selectCandidateData = (state) => state.candidate.candidateData;

export default candidateSlice.reducer;
