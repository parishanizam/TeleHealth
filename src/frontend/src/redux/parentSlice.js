/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 15, 2025
 * Purpose: Contains Parent slice for storing and setting Parent information states
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parentInfo: null, 
};

const parentSlice = createSlice({
  name: 'parent',
  initialState,
  reducers: {
    setParentInfo(state, action) {
      state.parentInfo = action.payload;
    },
    clearParentInfo(state) {
      state.parentInfo = null;
    },
  },
});

export const { setParentInfo, clearParentInfo } = parentSlice.actions;
export default parentSlice.reducer;
