import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  updateElectionCommissioner,
  getEleCommission,
  getAllCandidates,
  getAllMinners,
  getAllVoters,
  updateVoterRole,
  updateCandidateRole,
  updateMinnerRole,
  deleteMinner,
  deleteCandidate,
  deleteVoter,
} from "./electionOfficerAPI";
const initialState = {
  value: 0,
  status: "idle",
  electioncommissner: [],
  Voters: [],
  totalvoters: 0,
  miners: [],
  totalminers: 0,
  candidates: [],
  totalcandidates: 0,
  error: null,
};

export const getEleCommissionAsync = createAsyncThunk(
  "electionCommision/getEleCommission",
  async (obj) => {
    const response = await getEleCommission(obj);
    console.log("ID Object In Slice", obj);
    // console.log(filter);
    return response.data;
  }
);

export const getAllMinnersAsync = createAsyncThunk(
  "electionCommision/getAllMinner",
  async ({ pagination, filter }) => {
    const response = await getAllMinners(pagination, filter);

    return response.data;
  }
);

export const getAllCandidatessAsync = createAsyncThunk(
  "electionCommision/getAllCandidates",
  async ({ pagination, filter }) => {
    console.log("Slice==========>", pagination, filter);
    const response = await getAllCandidates(pagination, filter);
    console.log("response========>", response);
    return response.data;
  }
);

export const getAllVotersAsync = createAsyncThunk(
  "electionCommision/getAllVoters",
  async ({ pagination, filter }) => {
    const response = await getAllVoters(pagination, filter);
    console.log("pagination, filter", pagination, filter);
    return response.data;
  }
);

export const updateElectionCommissionerAsync = createAsyncThunk(
  "electionCommision/updateElectionCommissioner",
  async (data) => {
    console.log(data);
    const response = await updateElectionCommissioner(data);
    return response.data;
  }
);

export const updateMinnerRoleAsync = createAsyncThunk(
  "electionCommision/updateMinnerRole",
  async (data) => {
    const response = await updateMinnerRole(data);
    return response.data;
  }
);

export const updateCandidateRoleAsync = createAsyncThunk(
  "electionCommision/updateCandidateRole",
  async (data) => {
    const response = await updateCandidateRole(data);
    return response.data;
  }
);

export const updateVoterRoleAsync = createAsyncThunk(
  "electionCommision/updateVoterRole",
  async (data) => {
    const response = await updateVoterRole(data);
    return response.data;
  }
);

export const deleteMinnerAsync = createAsyncThunk(
  "electionCommision/deleteMinner",
  async (id) => {
    const response = await deleteMinner(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteCandidateAsync = createAsyncThunk(
  "electionCommision/deleteCandidate",
  async (id) => {
    const response = await deleteCandidate(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteVoterAsync = createAsyncThunk(
  "electionCommision/deleteVoter",
  async (id) => {
    const response = await deleteVoter(id);
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
      //////////////////// Check all payloads correctly before running
      //
      .addCase(getEleCommissionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEleCommissionAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.electioncommissner = action.payload.ElectionComission;
      })
      .addCase(getAllMinnersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllMinnersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.miners = action.payload.minners;
        state.totalminers = action.payload.totalMinners;
      })
      //
      .addCase(getAllCandidatessAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCandidatessAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.candidates = action.payload.candidates;
        state.totalcandidates = action.payload.totalCandidates;
      })
      //
      .addCase(getAllVotersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllVotersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Voters = action.payload.voters;
        state.totalvoters = action.payload.totalvoters;
      })
      ////////////////// Update Operation

      .addCase(updateElectionCommissionerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateElectionCommissionerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.electioncommissner.findIndex(
          (officer) => officer.id === action.payload.id
        );
        state.electioncommissner[index] = action.payload;
      })

      .addCase(updateMinnerRoleAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMinnerRoleAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.miners.findIndex(
          (miner) => miner.id === miner.payload.id
        );
        state.miners[index] = action.payload;
      })

      .addCase(updateCandidateRoleAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCandidateRoleAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.candidates.findIndex(
          (candi) => candi.id === action.payload.id
        );
        state.candidates[index] = action.payload;
      })

      .addCase(updateVoterRoleAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateVoterRoleAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.Voters.findIndex(
          (item) => item.id === action.payload.id
        );
        state.Voters[index] = action.payload;
      })
      ////////////////////////////// Delete Operation
      .addCase(deleteVoterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteVoterAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.voters.findIndex(
          (item) => item.id === action.payload.id
        );
        state.Voters.splice(index, 1);
      })
      //
      .addCase(deleteMinnerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMinnerAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.miners.findIndex(
          (item) => item.id === action.payload.id
        );
        state.miners.splice(index, 1);
      })
      //
      .addCase(deleteCandidateAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteCandidateAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.candidates.findIndex(
          (item) => item.id === action.payload.id
        );
        state.candidates.splice(index, 1);
      });
  },
});

export const selectElectionCommissner = (state) =>
  state.electionCommision.electioncommissner;
export const selectVoters = (state) => state.electionCommision.Voters;
export const selectTotalVoters = (state) => state.electionCommision.totalvoters;
export const selectMiners = (state) => state.electionCommision.miners;
export const selectTotalMiners = (state) => state.electionCommision.totalminers;
export const selectCandidates = (state) => state.electionCommision.candidates;
export const selectTotalCandidates = (state) =>
  state.electionCommision.totalcandidates;

export default electionCommisionSlice.reducer;
