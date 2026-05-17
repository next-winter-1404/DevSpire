"use server";
import { ILoginAction } from "../components/LoginForm";
import { z } from "zod";

interface IPayload {
  email: string | null;
  password: string | null;
}

const loginValidation = (data: IPayload) => {
  const loginSchema = z.object({
    email: z.string().min(1, "ایمیل الزامی است").email("ایمیل نامعتبر است"),
    password: z
      .string()
      .min(6, { message: "رمز عبور باید حداقل ۶ کاراکتر باشد." })
      .min(1, { message: "رمز عبور الزامی است." }),
  });
  const result = loginSchema.safeParse(data);
  if (!result.success) {
    const errors: Record<string, string> = {};
    result.error.issues.forEach((err) => {
      errors[err.path[0] as string] = err.message;
    });
    return errors;
  }
  return null;
};

export const upsertLogin = async (
  prevData: { data: ILoginAction | null; error: Record<string, string> | null },
  formData: FormData,
) => {
  const payload = {
    email: formData.get("email")?.toString() ?? "",
    password: formData.get("password")?.toString() ?? "",
  } as IPayload;
  const error = loginValidation(payload);
  if (error) {
    return {
      data: {
        email: prevData?.data?.email ?? "",
        password: prevData?.data?.password ?? "",
        accessToken: null,
        refreshToken: null,
      },
      error,
    };
  }
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    console.log("LOGIN RESPONSE:", res);
    if (!res.ok) {
      return {
        data: prevData.data,
        error: { general: "ایمیل یا رمز عبور اشتباه است" },
      };
    }
    const data = await res.json();
    if (data.accessToken) {
      return {
        data: {
          email: payload.email ?? "",
          password: payload.password ?? "",
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        },
        error: null,
      };
    }
    return {
      data: prevData.data,
      error: { general: "خطا در دریافت اطلاعات کاربری" },
    };
  } catch (err) {
    return {
      data: prevData.data,
      error: { general: "خطا در ارتباط با سرور" },
    };
  }
};
