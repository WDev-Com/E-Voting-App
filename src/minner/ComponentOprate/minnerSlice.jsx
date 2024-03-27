import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  AddBlock,
  MineVotes,
  fetchMinerData,
  getMinnerById,
  updateMinner,
} from "./minnerAPI";
const initialState = {
  value: 0,
  status: "idle",
  minner: [],
  pendingVotes: 0,
  blockadded: 0,
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

export const fetchMinerDataAsync = createAsyncThunk(
  "minner/fetchMinerData",
  async (obj) => {
    const response = await fetchMinerData(obj);
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

export const MineVotesAsync = createAsyncThunk(
  "voter/MineVotes",
  async ({ id }) => {
    // console.log(data);
    const response = await MineVotes(id);
    return response.data;
  }
);

export const AddBlockAsync = createAsyncThunk(
  "voter/AddBlock",
  async ({ id }) => {
    console.log(id);
    const response = await AddBlock(id);
    return response.data;
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
      })
      ////////////////// Mine Vote
      .addCase(MineVotesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(MineVotesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = action.payload.error;
      })

      ////////////////// Add Block To Block Chain
      .addCase(AddBlockAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(AddBlockAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.error = action.payload.error;
      })
      //////////Get Pending Votes
      .addCase(fetchMinerDataAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMinerDataAsync.fulfilled, (state, action) => {
        state.status = "idle";
        if (action.payload) {
          state.pendingVotes = action.payload.pendingVoting;
          state.blockadded = action.payload.credits;
        } else {
          console.error("Payload is undefined.");
        }
      });
  },
});

export const selectMinnerData = (state) => state.minner.minner;
export const selectPendingVotes = (state) => state.minner.pendingVotes;
export const selectBlockadded = (state) => state.minner.blockadded;
export const selectError = (state) => state.minner.error;

export default minnerSlice.reducer;
