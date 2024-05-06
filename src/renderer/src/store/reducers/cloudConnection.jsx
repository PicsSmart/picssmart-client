// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    connected : false
}

// ==============================|| SLICE - MEDIA ||============================== //

const connection = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    changeConnection(state, action) {
        state.connected = action.payload;
    }
  }
});

export default connection.reducer;

export const { changeConnection } = connection.actions;
