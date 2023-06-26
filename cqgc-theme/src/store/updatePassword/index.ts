import { useSelector } from 'react-redux';

import { updatePasswordSelector } from './selector';

export type { initialState as UpdatePasswordInitialState } from './types';
export { default, UpdatePasswordState } from './slice';
export const useUpdatePassword = () => useSelector(updatePasswordSelector);
