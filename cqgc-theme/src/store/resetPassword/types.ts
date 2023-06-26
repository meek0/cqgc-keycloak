export type initialState = {
  hasError: boolean;
  errorMessage: string;
  pending: boolean;
  showConfirmationScreen: boolean;
};

export type TResetPasswordForm = {
  username?: string;
};
