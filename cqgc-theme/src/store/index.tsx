import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import RegistrationReducer from 'store/registration';
import ResetPasswordReducer from 'store/resetPassword';
import { RootState } from 'store/types';

import UpdatePasswordReducer from './updatePassword';

const rootReducer = combineReducers<RootState>({
  registration: RegistrationReducer,
  resetPassword: ResetPasswordReducer,
  updatePassword: UpdatePasswordReducer,
});

const store: any = configureStore({
  reducer: rootReducer,
  devTools: false,
});

export const getStore = () => store;
