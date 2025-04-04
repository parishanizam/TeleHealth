/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 15, 2025
 * Purpose: Contains Test Selection slice for storing assessment type and language information and states
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: null,
  testType: null
};

const testSelectionSlice = createSlice({
  name: "testSelection",
  initialState,
  reducers: {
    setTestSelection: (state, action) => {
      state.language = action.payload.language;
      state.testType = action.payload.testType;
    },
    resetTestSelection: (state) => {
      state.language = null;
      state.testType = null;
    }
  }
});

export const { setTestSelection, resetTestSelection } = testSelectionSlice.actions;
export default testSelectionSlice.reducer;
