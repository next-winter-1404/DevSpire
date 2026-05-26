"use server";
import { z } from "zod";
import { cookies } from "next/headers";
import { completeRegistration } from "../services/register.service";

const schema = z.object({
  userId: z.number(),
  phoneNumber: z.string().min(10, "شماره تلفن نامعتبر است"),
  password: z.string().min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "رمز عبور و تکرار آن یکسان نیستند",
  path: ["confirmPassword"],
});

export async function completeRegistrationAction(prevState: any, formData: FormData) {
  const userId = Number(formData.get("userId"));
  const phoneNumber = formData.get("phoneNumber") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const validation = schema.safeParse({ userId, phoneNumber, password, confirmPassword });
  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0].message,
    };
  }

  try {
    const { data } = await completeRegistration({ userId, phoneNumber, password });

    const cookieStore = await cookies();
    if (data.accessToken) {
      cookieStore.set("accessToken", data.accessToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }
    if (data.refreshToken) {
      cookieStore.set("refreshToken", data.refreshToken, {
        path: "/",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    return {
      success: true,
      message: "ثبت‌نام با موفقیت انجام شد",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "خطایی رخ داد",
    };
  }
}
