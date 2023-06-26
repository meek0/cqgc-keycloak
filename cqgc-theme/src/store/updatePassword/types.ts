export type initialState = {
  hasError: boolean;
  errorMessage: string;
  pending: boolean;
};

export type TUpdatePasswordForm = {
  password?: string;
  'password-confirm'?: string;
};
