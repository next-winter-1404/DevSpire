"use server";
import { z } from "zod";
import { verifyEmail, registerStep1 } from "../services/register.service";
const verifySchema = z.object({
  tempUserId: z.number(),
  verificationCode: z.string().length(6, "کد باید ۶ رقم باشد"),
});

export async function verifyEmailAction(prevState: any, formData: FormData) {
  const tempUserId = Number(formData.get("tempUserId"));
  const verificationCode = formData.get("verificationCode") as string;

  const validation = verifySchema.safeParse({ tempUserId, verificationCode });
  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0].message,
    };
  }
  try {
    const { data } = await verifyEmail({ tempUserId, verificationCode });
    return {
      success: true,
      userId: data.userId,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "کد نامعتبر است",
    };
  }
}

export async function resendCodeAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  try {
    const { data } = await registerStep1({ email });
    return {
      success: true,
      message: "کد مجدداً ارسال شد",
      tempUserId: data.tempUserId,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "خطا در ارسال مجدد",
    };
  }
}
