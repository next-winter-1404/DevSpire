"use server";
import {
  forgotPasswordRequest,
  forgotPasswordVerify,
  forgotPasswordReset,
} from "../services/forgot-password.service";
import type {
  ForgotPasswordRequestPayload,
  ForgotPasswordVerifyPayload,
  ForgotPasswordResetPayload,
} from "../types/forgot-password.types";
export async function sendOtpAction(data: ForgotPasswordRequestPayload) {
  try {
    const response = await forgotPasswordRequest(data);
    const responseData = response?.data || response;

    console.log("Forgot Password Response Data:", responseData);
    const isSuccess = responseData.success === true || responseData.isSuccess === true || response.status === 200;

    return {
      success: isSuccess,
      message: responseData.message || "کد تایید ارسال شد",
      debugCode: process.env.NODE_ENV === 'development'
        ? (responseData.verificationCode || responseData.code || responseData.otp || responseData.resetCode || responseData.data?.code)
        : null
    };
  } catch (error: any) {
    console.error("OTP Action Error:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "خطا در ارسال کد تایید. لطفا از وجود حساب کاربری مطمئن شوید.",
    };
  }
}
export async function verifyOtpAction(data: ForgotPasswordVerifyPayload) {
  try {
    const response = await forgotPasswordVerify(data);

    return {
      success: true,
      message: response?.data?.message || "کد تایید شد",
      data: response?.data || response,
    };
  } catch (error: any) {
    console.error("Verify OTP Error:", error.response?.data || error.message);

    return {
      success: false,
      message: error.response?.data?.message || "کد تایید نادرست است",
    };
  }
}

export async function resetPasswordAction(data: ForgotPasswordResetPayload) {
  try {
    const response = await forgotPasswordReset(data);
    return {
      success: true,
      message: "رمز عبور با موفقیت تغییر کرد",
      data: response.data
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.response?.data?.message || "خطا در تغییر رمز عبور",
    };
  }
}
