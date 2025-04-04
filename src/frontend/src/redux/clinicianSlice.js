/**
 * Author: Promish Kandel, Mitchell Weingust, Jasmine Sun-Hu, Parisha Nizam
 * Date: January 15, 2025
 * Purpose: Contains Clinician slice for storing clinician info and states
 */

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clinicianInfo: null, 
};

const clinicianSlice = createSlice({
  name: "clinician",
  initialState,
  reducers: {
    setClinicianInfo(state, action) {
      state.clinicianInfo = action.payload;
    },
    clearClinicianInfo(state) {
      state.clinicianInfo = null;
    },
    addClient(state, action) {
      if (state.clinicianInfo) {
        state.clinicianInfo.client.push(action.payload); 
      }
    },
  },
});

export const { setClinicianInfo, clearClinicianInfo, addClient } = clinicianSlice.actions;
export default clinicianSlice.reducer;
