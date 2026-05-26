export interface ForgotPasswordRequestPayload {
  email: string;
}

export interface ForgotPasswordVerifyPayload {
  email: string;
  code: string;
}

export interface ForgotPasswordResetPayload {
  email: string;
  userId?: string | null;
  code: string;
  newPassword: string;
}

export interface ForgotPasswordVerifyResponse {
  userId?: string;
  message?: string;
}
