export type initialState = {
  registerForm: TRegisterForm | null;
  hasError: boolean;
};

export type TRegisterForm = {
  'user.attributes.title'?: string;
  firstName?: string;
  lastName?: string;
  'user.attributes.institutions'?: string[];
  'user.attributes.is_resident_doctor'?: boolean;
  email?: string;
  password?: string;
  'password-confirm'?: string;
};
