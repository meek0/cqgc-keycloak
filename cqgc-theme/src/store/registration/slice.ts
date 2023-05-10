import { createSlice } from '@reduxjs/toolkit';

import { initialState } from 'store/registration/types';

import { register } from './thunks';

export const RegistrationState: initialState = {
  registerForm: null,
  hasError: false,
};

const registrationFlowSlice = createSlice({
  name: 'registration',
  initialState: RegistrationState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(register.rejected, (state) => {
      state.hasError = true;
    });
    builder.addCase(register.pending, (state) => {
      state.hasError = false;
    });
  },
});

export const registrationFlowActions = registrationFlowSlice.actions;
export default registrationFlowSlice.reducer;
