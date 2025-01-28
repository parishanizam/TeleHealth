import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  parentInfo: null, // Will hold the parent’s data once logged in
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
