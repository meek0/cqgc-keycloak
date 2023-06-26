import { createSlice } from '@reduxjs/toolkit';

import { initialState } from 'store/updatePassword/types';

import { updatePassword } from './thunks';

export const UpdatePasswordState: initialState = {
  hasError: false,
  errorMessage: '',
  pending: false,
};

const updatePasswordFlowSlice = createSlice({
  name: 'updatePassword',
  initialState: UpdatePasswordState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.hasError = true;
      state.pending = false;
      state.errorMessage = action.error.message || '';
    });
    builder.addCase(updatePassword.pending, (state) => {
      state.hasError = false;
      state.pending = true;
    });
    builder.addCase(updatePassword.fulfilled, (state) => {
      state.hasError = false;
      state.pending = false;
    });
  },
});

export const updatePasswordFlowActions = updatePasswordFlowSlice.actions;
export default updatePasswordFlowSlice.reducer;
