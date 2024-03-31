import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  getAllWinnerCandidates,
  getAllpartyWithMajorityWins,
} from "./CommonAPI";
const initialState = {
  value: 0,
  status: "idle",
  winnerscandidates: [],
  totalwinnerscandidates: 0,
  error: null,
  majorParty: [],
  otherWinner: [],
  winnercandidatespage: 1,
};

export const getAllWinnerCandidatesAsync = createAsyncThunk(
  "commonResource/getAllWinnerCandidates",
  async ({ pagination, filter }) => {
    // console.log("Slice==========>", filter);
    const response = await getAllWinnerCandidates(pagination, filter);
    // console.log("response========>", response);
    return response.data;
  }
);

export const getAllpartyWithMajorityWinsAsync = createAsyncThunk(
  "commonResource/getAllpartyWithMajorityWins",
  async () => {
    const response = await getAllpartyWithMajorityWins();
    return response.data;
  }
);

const commonSlice = createSlice({
  //When we use state in createSlice it only define for this mwthod
  name: "commonResource",
  initialState,
  reducers: {
    handleWinnerCandiPages: (state, action) => {
      state.winnercandidatespage = action.payload;
    },
  },
  extraReducers(builder) {
    builder

      //
      .addCase(getAllWinnerCandidatesAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllWinnerCandidatesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log(action.payload);
        state.winnerscandidates = action.payload.winnercandidates;
        // console.log(state.winnerscandidates);
        state.totalwinnerscandidates = action.payload.totalwinnerCandidates;
      })
      //
      .addCase(getAllpartyWithMajorityWinsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllpartyWithMajorityWinsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.otherWinner = [];

        action.payload.partyWins.map((ele) => state.otherWinner.push(ele));

        state.majorParty = action.payload.partyWithMajority;
      });
  },
});

export const selectWinnerCandidates = (state) =>
  state.commonResource.winnerscandidates;
export const selectTotalWinnerCandidates = (state) =>
  state.commonResource.totalwinnerscandidates;
export const { handleWinnerCandiPages } = commonSlice.actions;
export const selectWinnerCandiPage = (state) =>
  state.commonResource.winnercandidatespage;
export const selectmajorParty = (state) => state.commonResource.majorParty;
export const selectotherWinner = (state) => state.commonResource.otherWinner;

export default commonSlice.reducer;
