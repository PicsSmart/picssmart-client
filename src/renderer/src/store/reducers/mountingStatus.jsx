// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    mounting : false
}

// ==============================|| SLICE - MEDIA ||============================== //

const mountingStatus = createSlice({
  name: 'mountingStatus',
  initialState,
  reducers: {
    changeMountingStatus(state, action) {
        state.mounting = action.payload;
    }
  }
});

export default mountingStatus.reducer;

export const { changeMountingStatus } = mountingStatus.actions;
