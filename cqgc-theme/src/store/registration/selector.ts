import { initialState } from 'store/registration/types';
import { RootState } from 'store/types';

export type UserProps = initialState;

export const registrationSelector = (state: RootState) => state.registration;
