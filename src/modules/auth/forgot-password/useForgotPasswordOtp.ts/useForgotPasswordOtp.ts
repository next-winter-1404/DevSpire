import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { sendOtpAction, verifyOtpAction } from "../actions/forgot-password.actions";

export const useForgotPasswordOtp = (next: () => void, t: any) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  useEffect(() => {
    if (timeLeft === 0) {
      setCanResend(true);
      return;
    }
    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);
  useEffect(() => {
    const bypassCode = localStorage.getItem("bypass_otp_forget");
    if (bypassCode) {
      const newCode = bypassCode.split("").slice(0, 6);
      setCode((prev) => newCode.concat(prev.slice(newCode.length)));
      localStorage.removeItem("bypass_otp_forget");
      setTimeout(() => document.getElementById(`code-input-5`)?.focus(), 100);
    }
  }, []);

  const convertToEnglishDigits = (value: string) => 
    value.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString())
         .replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());

  const handleResend = async () => {
    const email = localStorage.getItem("resetEmail")?.trim() || "";
    if (!email) return toast.error(t("emailNotFound"));

    setLoading(true);
    const result = await sendOtpAction({ email });
    if (result.success) {
      setTimeLeft(60);
      setCanResend(false);
      setCode(["", "", "", "", "", ""]);
      toast.success(result.message || "کد جدید ارسال شد");
    } else {
      toast.error(result.message);
    }
    setLoading(false);
  };

  const handleCodeChange = (value: string, index: number) => {
    value = convertToEnglishDigits(value);
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    if (value.length > 1) { 
      const pasted = value.slice(0, 6).split("");
      pasted.forEach((d, i) => { if (i < 6) newCode[i] = d; });
      setCode(newCode);
      document.getElementById(`code-input-${Math.min(pasted.length, 6) - 1}`)?.focus();
    } else {
      newCode[index] = value;
      setCode(newCode);
      if (value && index < 5) document.getElementById(`code-input-${index + 1}`)?.focus();
    }
  };

  const handleSubmit = async () => {
    const email = localStorage.getItem("resetEmail")?.trim() || "";
    const finalCode = code.join("");
    if (finalCode.length !== 6) return toast.error(t("invalidCodeLength"));

    setLoading(true);
    const result = await verifyOtpAction({ email, code: finalCode });
    if (result.success) {
      localStorage.setItem("resetCode", finalCode);
      next();
    } else {
      toast.error(result.message || t("invalidOrExpiredCode"));
    }
    setLoading(false);
  };

  return { 
    code, timeLeft, canResend, loading, 
    handleCodeChange, handleResend, handleSubmit,
    minutes: Math.floor(timeLeft / 60),
    seconds: timeLeft % 60
  };
};
