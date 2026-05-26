import httpClient from "@/core/interceptor/axios";
import {
  ForgotPasswordRequestPayload,
  ForgotPasswordVerifyPayload,
  ForgotPasswordResetPayload,
  ForgotPasswordVerifyResponse,
} from "../types/forgot-password.types";

export const forgotPasswordRequest = (data: ForgotPasswordRequestPayload) => {
  return httpClient.post("/auth/forgot-password/request", data);
};

export const forgotPasswordVerify = (
  data: ForgotPasswordVerifyPayload
) => {
  return httpClient.post<ForgotPasswordVerifyResponse>(
    "/auth/forgot-password/verify",
    data
  );
};

export const forgotPasswordReset = (data: ForgotPasswordResetPayload) => {
  return httpClient.post("/auth/forgot-password/reset", data);
};
