"use client";
import { Link, useRouter } from "@/i18n/routing";
import { Eye, EyeOff, Loader2, Mail } from "lucide-react";
import { useActionState, useEffect, useState } from "react";
import { upsertLogin } from "../action/upsertLogin";
import toast from "react-hot-toast";
import { setCookie } from "cookies-next";

export interface ILoginAction {
  email: string | null;
  password: string | null;
  accessToken: string | null;
  refreshToken: string | null;
}
const LoginForm = () => {
  const router = useRouter();

  const [submitted, setSubmitted] = useState<boolean>(false);

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [state, action, isPending] = useActionState<
    {
      data: ILoginAction | null;
      error: Record<string, string> | null;
    },
    FormData
  >(upsertLogin, {
    data: {
      email: null,
      password: null,
      accessToken: null,
      refreshToken: null,
    },
    error: null,
  });
  const { data, error } = state;
  const handleSubmit = (formData: FormData) => {
    setSubmitted(true);
    action(formData);
  };

  useEffect(() => {
    if (!submitted) return;
    if (data?.accessToken) {
      setCookie("accessToken", data.accessToken);
      setCookie("refreshToken", data.refreshToken);
      toast.success("با موفقیت وارد شدید");
      router.push("/");
    }

    if (error?.general) {
      toast.error(error.general);
    }
  }, [submitted, data, error]);

  return (
    <form className="space-y-6" action={handleSubmit}>
      <div className="flex flex-col gap-1.5">
        <div
          className={`flex items-center bg-[#F5F5F5] rounded-[40px] px-6 transition-all duration-200 border-2 
            ${error?.email ? "border-red-400" : "border-transparent focus-within:border-[#0f3c69]/30"}`}
        >
          <input
            type="email"
            name="email"
            disabled={isPending}
            defaultValue={data?.email || ""}
            placeholder="ایمیل خود را وارد کنید"
            className="w-full bg-transparent py-4 outline-none text-gray-800 placeholder:text-gray-400
             text-[16px] disabled:opacity-50 autofill:shadow-[inset_0_0_0px_1000px_#F5F5F5] 
             autofill:[-webkit-text-fill-color:#1f2937]"
          />
          <Mail
            size={22}
            className={`${error?.email ? "text-red-400" : "text-gray-500"} mr-3`}
          />
        </div>

        <div className="min-h-[20px] px-4">
          {error?.email && (
            <span className="text-red-500 text-sm animate-in fade-in slide-in-from-top-1">
              {error.email}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <div
          className={`flex items-center bg-[#F5F5F5] rounded-[40px] px-6 transition-all duration-200 border-2 
            ${error?.password ? "border-red-400" : "border-transparent focus-within:border-[#0f3c69]/30"}`}
        >
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            disabled={isPending}
            defaultValue={data?.password || ""}
            placeholder="رمز عبور خود را وارد کنید"
            className="w-full bg-transparent py-4 outline-none text-gray-800 placeholder:text-gray-400 
            text-[16px] disabled:opacity-50
            autofill:shadow-[inset_0_0_0px_1000px_#F5F5F5] autofill:[-webkit-text-fill-color:#1f2937]"
          />

          <button
            type="button"
            disabled={isPending}
            aria-label={showPassword ? "مخفی کردن رمز عبور" : "نمایش رمز عبور"}
            onClick={() => setShowPassword(!showPassword)}
            className="text-gray-500 mr-3 cursor-pointer hover:text-gray-700 transition-colors disabled:opacity-50"
          >
            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
          </button>
        </div>

        <div className="min-h-[20px] px-4 flex justify-between items-start">
          <div className="flex-1">
            {error?.password && (
              <span className="text-red-500 text-sm animate-in fade-in slide-in-from-top-1">
                {error.password}
              </span>
            )}
          </div>

          <Link
            href="/auth/forgot-password"
            className="text-[14px] text-[#0f3c69] hover:text-[#0a2a4a] hover:underline
             transition-colors whitespace-nowrap mr-2 mt-1"
          >
            رمز عبور خود را فراموش کرده‌اید؟
          </Link>
        </div>
      </div>

      <button
        disabled={isPending}
        type="submit"
        className="w-full flex justify-center items-center gap-2 bg-[#0f3c69] hover:bg-[#0a2a4a] disabled:bg-[#0f3c69]/70 text-white py-4 
        rounded-[40px] text-[16px] font-medium transition-all duration-200 mt-2 cursor-pointer disabled:cursor-not-allowed"
      >
        {isPending ? (
          <>
            <Loader2 size={20} className="animate-spin" />
            <span>در حال ورود...</span>
          </>
        ) : (
          "ورود به حساب کاربری"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
