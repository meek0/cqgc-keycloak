import { useSelector } from 'react-redux';

import { registrationSelector } from './selector';

export type { initialState as RegistrationInitialState } from './types';
export { default, RegistrationState } from './slice';
export const useRegistration = () => useSelector(registrationSelector);
