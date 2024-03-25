import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getVoterById,
  getAllCandidateOFConstituency,
  updateVoter,
} from "./voterAPI";
const initialState = {
  value: 0,
  status: "idle",
  VoterData: [],
  Vote: [],
  CandidateOFConstituency: [],
  error: null,
};

export const getVoterByIdAsync = createAsyncThunk(
  "voter/getVoterById",
  async (obj) => {
    const response = await getVoterById(obj);
    // console.log(filter);
    return response.data;
  }
);

export const updateVoterAsync = createAsyncThunk(
  "voter/updateVoter",
  async (data) => {
    // console.log(data);
    const response = await updateVoter(data);
    return response.data;
  }
);

export const getAllCandidateOFConstituencyAsync = createAsyncThunk(
  "voter/getAllCandidateOFConstituency",
  async (obj) => {
    const response = await getAllCandidateOFConstituency(obj);
    // console.log(filter);
    return response.data;
  }
);

export const createVoteAsync = createAsyncThunk(
  "voter/createVote",
  async (userData, ID) => {
    // console.log("From Slice : ", userData, ID);
    const response = await createVote(userData, ID);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const voterSlice = createSlice({
  //When we use state in createSlice it only define for this mwthod
  name: "voter",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      //////////////////// Check all payloads correctly before running
      //
      .addCase(createVoteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createVoteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Vote = action.payload;
      })
      .addCase(getVoterByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVoterByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.VoterData = action.payload.voterDatas;
        // console.log(state.voterData);
      })
      .addCase(getAllCandidateOFConstituencyAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        getAllCandidateOFConstituencyAsync.fulfilled,
        (state, action) => {
          state.status = "idle";
          state.CandidateOFConstituency =
            action.payload.CandidateOFConstituencyDatas;
          // console.log(state.voterData);
        }
      )
      ////////////////// Update Operation

      .addCase(updateVoterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateVoterAsync.fulfilled, (state, action) => {
        state.status = "idle";
      });
  },
});

export const selectVoterData = (state) => state.voter.VoterData;
export const selectCandidateOFConstituency = (state) =>
  state.voter.CandidateOFConstituency;

export default voterSlice.reducer;
