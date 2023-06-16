export type initialState = {
  registerForm: TRegisterForm | null;
  hasError: boolean;
  errorMessage: string;
};

export type TRegisterForm = {
  'user.attributes.title'?: string;
  firstName?: string;
  lastName?: string;
  'user.attributes.license'?: string;
  'user.attributes.license_confirm'?: string;
  'user.attributes.institutions'?: string[];
  'user.attributes.is_resident_doctor'?: boolean;
  email?: string;
  password?: string;
  'password-confirm'?: string;
};
