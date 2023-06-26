import { initialState } from 'store/resetPassword/types';
import { RootState } from 'store/types';

export type UserProps = initialState;

export const resetPasswordSelector = (state: RootState) => state.resetPassword;
