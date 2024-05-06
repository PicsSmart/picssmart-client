// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
    toast : {
        open: false,
        message: '',
        severity: 'success'
    }
}

// ==============================|| SLICE - TOAST ||============================== //

const toast = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast(state, action) {
        state.toast = action.payload.toast;
    },
    clearToast(state) {
      state.toast = {
          ...state.toast,
          open: false,
          severity: state.toast.severity
      };
    }
  }
});

export default toast.reducer;

export const { setToast, clearToast } = toast.actions;
