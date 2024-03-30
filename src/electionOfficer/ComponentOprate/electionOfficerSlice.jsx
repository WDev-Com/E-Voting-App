import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  updateElectionCommissioner,
  getEleCommission,
  getAllCandidates,
  getAllMinners,
  getAllVoters,
  updateVoterIdentity,
  updateCandidateIdentity,
  updateMinnerIdentity,
  deleteMinner,
  deleteCandidate,
  deleteVoter,
  genrateVoterConfirmationNoREQ,
  getVoterConfirmationNoREQ,
  getAllEleCommission,
  countVote,
} from "./electionOfficerAPI";
const initialState = {
  value: 0,
  status: "idle",
  electioncommissner: [],
  Allelectioncommissner: [],
  totalElectionCommissions: 0,
  Voters: [],
  totalvoters: 0,
  miners: [],
  totalminers: 0,
  candidates: [],

  totalcandidates: 0,
  error: null,
  voterpage: 1,
  candidatespage: 1,
  minnerpage: 1,
  electioncommissnerpage: 1,
};

export const getEleCommissionAsync = createAsyncThunk(
  "electionCommision/getEleCommission",
  async (obj) => {
    const response = await getEleCommission(obj);

    // console.log(filter);
    // console.log(response.data);
    return response.data;
  }
);

export const getAllMinnersAsync = createAsyncThunk(
  "electionCommision/getAllMinner",
  async ({ pagination, filter }) => {
    // console.log("getAllMinnersAsync==========>", pagination, filter);
    const response = await getAllMinners(pagination, filter);

    return response.data;
  }
);

export const getAllCandidatessAsync = createAsyncThunk(
  "electionCommision/getAllCandidates",
  async ({ pagination, filter }) => {
    // console.log("Slice==========>", filter);
    const response = await getAllCandidates(pagination, filter);
    // console.log("response========>", response);
    return response.data;
  }
);

export const countVoteAsync = createAsyncThunk(
  "electionCommision/countVote",
  async ({ ID }) => {
    const response = await countVote(ID);
    return response.data;
  }
);

export const getAllVotersAsync = createAsyncThunk(
  "electionCommision/getAllVoters",
  async ({ pagination, filter }) => {
    // console.log("Slice==========>", pagination, filter);
    const response = await getAllVoters(pagination, filter);
    // console.log("pagination, filter", pagination, filter);
    return response.data;
  }
);

export const getAllEleCommissionAsync = createAsyncThunk(
  "electionCommision/getAllEleCommission",
  async ({ pagination, filter }) => {
    // console.log("Slice==========>", pagination, filter);
    const response = await getAllEleCommission(pagination, filter);
    // console.log("pagination, filter", pagination, filter);
    return response.data;
  }
);
/////////////////////////%%%%%WORK%%%%%%%%%%%%%%%%
export const updateElectionCommissionerAsync = createAsyncThunk(
  "electionCommision/updateElectionCommissioner",
  async (data) => {
    // console.log(data);
    const response = await updateElectionCommissioner(data);
    return response.resdata;
  }
);
/////////////////////////%%%%%%%%%%%%%%%%%%%%%

export const updateCandidateIdentityAsync = createAsyncThunk(
  "electionCommision/updateCandidateIdentity",
  async (data) => {
    // console.log(data);
    const response = await updateCandidateIdentity(data);
    return response.data;
  }
);

export const updateMinnerIdentityAsync = createAsyncThunk(
  "electionCommision/updateMinnerIdentity",
  async (data) => {
    const response = await updateMinnerIdentity(data);
    return response.resdata;
  }
);

export const updateVoterIdentityAsync = createAsyncThunk(
  "electionCommision/updateVoterIdentity",
  async (data) => {
    const response = await updateVoterIdentity(data);
    return response.data;
  }
);

export const deleteMinnerAsync = createAsyncThunk(
  "electionCommision/deleteMinner",
  async (data) => {
    const response = await deleteMinner(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteCandidateAsync = createAsyncThunk(
  "electionCommision/deleteCandidate",
  async (data) => {
    const response = await deleteCandidate(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const deleteVoterAsync = createAsyncThunk(
  "electionCommision/deleteVoter",
  async (data) => {
    // console.log("ID ", data);
    const response = await deleteVoter(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const genrateVoterConfirmationNoREQAsync = createAsyncThunk(
  "electionCommision/genrateVoterConfirmationNoREQ",
  async (data) => {
    // console.log("ID ", data);
    const response = await genrateVoterConfirmationNoREQ(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const getVoterConfirmationNoREQREQAsync = createAsyncThunk(
  "electionCommision/getVoterConfirmationNoREQ",
  async (data) => {
    // console.log("ID ", data);
    const response = await getVoterConfirmationNoREQ(data);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
const electionCommisionSlice = createSlice({
  //When we use state in createSlice it only define for this mwthod
  name: "electionCommision",
  initialState,
  reducers: {
    handlePages: (state, action) => {
      state.voterpage = action.payload;
    },
    handleCandiPages: (state, action) => {
      state.candidatespage = action.payload;
    },
    handleMinerPages: (state, action) => {
      state.minnerpage = action.payload;
    },
    handleECPages: (state, action) => {
      state.electioncommissnerpage = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(genrateVoterConfirmationNoREQAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        genrateVoterConfirmationNoREQAsync.fulfilled,
        (state, action) => {
          state.status = "idle";
        }
      )
      .addCase(getVoterConfirmationNoREQREQAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getVoterConfirmationNoREQREQAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })
      //////////////////// Check all payloads correctly before running
      //
      .addCase(getEleCommissionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEleCommissionAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log(
        //   "action.payload.ElectionComission",
        //   action.payload.ElectionComission
        // ); //OK
        state.electioncommissner = action.payload.ElectionComission;
        // console.log(state.electioncommissner); //OK
      })

      .addCase(getAllEleCommissionAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllEleCommissionAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.Allelectioncommissner = action.payload.ElectionCommission;
        state.totalElectionCommissions =
          action.payload.totalElectionCommissions;
      })
      //
      .addCase(getAllMinnersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllMinnersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.miners = action.payload.minners;
        state.totalminers = action.payload.totalItems;
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
      //
      .addCase(countVoteAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(countVoteAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.candidates.findIndex(
          (candi) => candi.id === action.payload.id
        );
        state.candidates[index] = action.payload.cadidate;
        console.log(state.candidates[index]);
      })
      ////////////////// Update Operation

      .addCase(updateElectionCommissionerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateElectionCommissionerAsync.fulfilled, (state, action) => {
        state.status = "idle";
      })

      .addCase(updateMinnerIdentityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateMinnerIdentityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.miners.findIndex(
          (miner) => miner.id === action.payload.id
        );
        state.miners[index] = action.payload;
      })

      .addCase(updateCandidateIdentityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCandidateIdentityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.candidates.findIndex(
          (candi) => candi.id === action.payload.id
        );
        state.candidates[index] = action.payload;
      })

      .addCase(updateVoterIdentityAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateVoterIdentityAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // console.log(action.payload);
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
        const index = state.Voters.findIndex(
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
export const selectVoterPage = (state) => state.electionCommision.voterpage;
export const { handlePages } = electionCommisionSlice.actions;
export const { handleCandiPages } = electionCommisionSlice.actions;
export const selectCandiPage = (state) =>
  state.electionCommision.candidatespage;
export const { handleMinerPages } = electionCommisionSlice.actions;
export const selectECPage = (state) =>
  state.electionCommision.electioncommissnerpage;
export const { handleECPages } = electionCommisionSlice.actions;
export const selectMinerPage = (state) => state.electionCommision.minnerpage;
export const selectVoters = (state) => state.electionCommision.Voters;
export const selectAllElectionOfficer = (state) =>
  state.electionCommision.Allelectioncommissner;
export const selectTotalElectionCommissions = (state) =>
  state.electionCommision.totalElectionCommissions;
export const selectTotalVoters = (state) => state.electionCommision.totalvoters;
export const selectMiners = (state) => state.electionCommision.miners;
export const selectTotalMiners = (state) => state.electionCommision.totalminers;
export const selectCandidates = (state) => state.electionCommision.candidates;
export const selectTotalCandidates = (state) =>
  state.electionCommision.totalcandidates;

export default electionCommisionSlice.reducer;
