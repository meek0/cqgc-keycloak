import { createSlice } from '@reduxjs/toolkit';

import { initialState } from 'store/resetPassword/types';

import { resetPassword } from './thunks';

export const ResetPasswordState: initialState = {
  hasError: false,
  errorMessage: '',
  pending: false,
  showConfirmationScreen: false,
};

const resetPasswordFlowSlice = createSlice({
  name: 'resetPassword',
  initialState: ResetPasswordState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.hasError = true;
      state.pending = false;
      state.showConfirmationScreen = false;
      state.errorMessage = action.error.message || '';
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.hasError = false;
      state.pending = true;
      state.showConfirmationScreen = false;
    });
    builder.addCase(resetPassword.fulfilled, (state) => {
      state.hasError = false;
      state.pending = false;
      state.showConfirmationScreen = true;
    });
  },
});

export const resetPasswordFlowActions = resetPasswordFlowSlice.actions;
export default resetPasswordFlowSlice.reducer;
