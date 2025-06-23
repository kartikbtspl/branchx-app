import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCampaignByIdAPI } from "../../api/campaign-api/campaignService";
export const fetchCampaignById = createAsyncThunk(
  'campaign/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await getCampaignByIdAPI(id)
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Something went wrong');
    }
  }
);

const campaignDetailSlice = createSlice({
  name: 'campaign',
  initialState: {
    campaign: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCampaign(state) {
      state.campaign = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampaignById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaignById.fulfilled, (state, action) => {
        state.loading = false;
        state.campaign = action.payload;
      })
      .addCase(fetchCampaignById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearCampaign } = campaignDetailSlice.actions;

export default campaignDetailSlice.reducer;