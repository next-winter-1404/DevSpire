"use server";
import { z } from "zod";
import { registerStep1 } from "../services/register.service";

const schema = z.object({
  email: z.string().email("ایمیل نامعتبر است"),
});

export async function registerStep1Action(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;

  const validation = schema.safeParse({ email });
  if (!validation.success) {
    return {
      success: false,
      message: validation.error.issues[0].message,
    };
  }

  try {
    const { data } = await registerStep1({ email });
    const responseData = data as any;
    console.log("Full Backend Response:", responseData);

    return {
      success: true,
      tempUserId: responseData.tempUserId,
      email,
      debugCode: responseData.verificationCode || responseData.code || responseData.otp || null,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error?.response?.data?.message || "خطایی در برقراری ارتباط رخ داد",
    };
  }
}
