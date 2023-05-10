import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import RegistrationReducer from 'store/registration';
import { RootState } from 'store/types';

const rootReducer = combineReducers<RootState>({
  registration: RegistrationReducer,
});

const store: any = configureStore({
  reducer: rootReducer,
  devTools: false,
});

export const getStore = () => store;
