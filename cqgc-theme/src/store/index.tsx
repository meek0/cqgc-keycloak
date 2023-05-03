import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { RootState } from 'store/types';
// Reducers
// import RegistrationFlowReducer from "store/registrationFlow";

const rootReducer = combineReducers<RootState>({
  //   registrationFlow: RegistrationFlowReducer,
});

const store: any = configureStore({
  reducer: rootReducer,
  devTools: false,
});

export const getStore = () => store;
