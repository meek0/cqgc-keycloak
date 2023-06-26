import { RootState } from 'store/types';
import { initialState } from 'store/updatePassword/types';

export type UserProps = initialState;

export const updatePasswordSelector = (state: RootState) => state.updatePassword;
