import { RegistrationInitialState } from 'store/registration';

import { ResetPasswordInitialState } from './resetPassword';
import { UpdatePasswordInitialState } from './updatePassword';

export type RootState = {
  registration: RegistrationInitialState;
  resetPassword: ResetPasswordInitialState;
  updatePassword: UpdatePasswordInitialState;
};
