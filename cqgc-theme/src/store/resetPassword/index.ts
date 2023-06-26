import { useSelector } from 'react-redux';

import { resetPasswordSelector } from './selector';

export type { initialState as ResetPasswordInitialState } from './types';
export { default, ResetPasswordState } from './slice';
export const useResetPassword = () => useSelector(resetPasswordSelector);
