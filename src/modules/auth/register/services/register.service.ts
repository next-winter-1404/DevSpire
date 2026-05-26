import httpClient from "@/core/interceptor/axios";
import type {
    RegisterStep1Payload, RegisterStep1Response,
    RegisterStep2Payload, RegisterStep2Response,
    RegisterStep3Payload, RegisterStep3Response,
} from "../types/register.types";

export const registerStep1 = (payload: RegisterStep1Payload) =>
    httpClient.post<RegisterStep1Response>("/auth/register", payload);

export const verifyEmail = (payload: RegisterStep2Payload) =>
    httpClient.post<RegisterStep2Response>("/auth/verify-email", payload);

export const completeRegistration = (payload: RegisterStep3Payload) =>
    httpClient.post<RegisterStep3Response>("/auth/complete-registration", payload);
export const registerPhone = (payload: { phoneNumber: string }) =>
    httpClient.post<{ message: string; tempUserId: number }>("/auth/register-phone", payload);

export const verifyPhone = (payload: { tempUserId: number; verificationCode: string }) =>
    httpClient.post<{ message: string; tempUserId: number }>("/auth/verify-phone", payload);
