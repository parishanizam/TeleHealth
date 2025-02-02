import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch parent's assessment history
export const fetchAssessmentHistory = createAsyncThunk(
  "assessment/fetchHistory",
  async (username, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:3000/resultstorage/assessment-history/${username}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Error fetching assessment history");
    }
  }
);

const initialState = {
  history: null,
  loading: false,
  error: null,
};

const assessmentSlice = createSlice({
  name: "assessment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssessmentHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAssessmentHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.history = action.payload;
      })
      .addCase(fetchAssessmentHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.history = null;
      });
  },
});

export default assessmentSlice.reducer;
