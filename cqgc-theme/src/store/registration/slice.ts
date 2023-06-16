import { createSlice } from '@reduxjs/toolkit';

import { initialState } from 'store/registration/types';

import { register } from './thunks';

export const RegistrationState: initialState = {
  registerForm: null,
  hasError: false,
  errorMessage: '',
};

const registrationFlowSlice = createSlice({
  name: 'registration',
  initialState: RegistrationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.rejected, (state, action) => {
      state.hasError = true;
      state.errorMessage = action.error.message || '';
    });
    builder.addCase(register.pending, (state) => {
      state.hasError = false;
    });
  },
});

export const registrationFlowActions = registrationFlowSlice.actions;
export default registrationFlowSlice.reducer;
