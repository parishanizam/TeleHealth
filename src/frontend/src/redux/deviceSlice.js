/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 15, 2025
 * Purpose: Contains Device slice for storing device and hardware states
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedCameraId: '',
  selectedMicId: '',
  selectedAudioOutputId: '',
};

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setCameraId(state, action) {
      state.selectedCameraId = action.payload;
    },
    setMicId(state, action) {
      state.selectedMicId = action.payload;
    },
    setAudioOutputId(state, action) {
      state.selectedAudioOutputId = action.payload;
    },
  },
});

export const {
  setCameraId,
  setMicId,
  setAudioOutputId,
} = deviceSlice.actions;

export default deviceSlice.reducer;
