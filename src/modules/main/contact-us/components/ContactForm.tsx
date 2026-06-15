/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import Image from "next/image";
import { sendContactMessage } from "../services/contact.service";
import toast, { Toaster } from "react-hot-toast";
import { useTranslations, useLocale } from "next-intl";
export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("contact");
  const locale = useLocale();
  const isRTL = locale === "fa";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !message) {
      toast.error(t("fillFields"));
      return;
    }

    setIsLoading(true);
    try {
      await sendContactMessage({
        title: email,
        message: message,
      });

      toast.success(t("successMessage"));
      setEmail("");
      setMessage("");
    } catch (error: any) {
      console.error(error);
      toast.error(t("errorMessage"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      dir={isRTL ? "rtl" : "ltr"}
      onSubmit={handleSubmit}
      className="w-full h-full flex flex-col px-10 py-8 gap-6"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <p className="text-[18px] font-normal leading-[120%] text-start text-[#194C7B] dark:text-blue-200">
        {t("description")}
      </p>

      <div className="flex flex-col gap-2 w-full">
        <label className="font-medium text-[16px] text-[#826CF4] dark:text-indigo-300 text-start">
          {t("email")}
        </label>
        <div className="flex items-center w-full h-[48px] border border-gray-300 dark:border-zinc-600 rounded-xl px-4 gap-[10px] bg-white dark:!bg-[#3F3F46] transition focus-within:border-[#826CF4]">
          <input
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 outline-none text-sm text-gray-700 dark:text-gray-100 bg-transparent text-start"
            dir="ltr"
          />
          <Image src="/icons/email.svg" alt="email" width={20} height={20} />
        </div>

        <div className="flex flex-col gap-2 w-full mt-4">
          <label className="font-medium text-[16px] text-[#826CF4] dark:text-indigo-300 text-start">
            {t("message")}
          </label>
          <div className="flex w-full border border-gray-300 dark:border-zinc-600 rounded-md px-4 py-3 gap-[10px] bg-white  dark:!bg-[#3F3F46] transition focus-within:border-[#826CF4]">
            <textarea
              placeholder={t("messagePlaceholder")}
              value={message}
              rows={8}
              onChange={(e) => setMessage(e.target.value)}
              className=" w-full resize-none outline-none text-sm text-gray-700 dark:text-gray-100 
              bg-transparent text-start placeholder-gray-400 dark:placeholder-gray-500"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={`w-full h-[52px] text-white rounded-xl py-[12px] px-6 flex items-center justify-center whitespace-nowrap transition 
${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-[#1C5387] hover:opacity-90"}`}
      >
        {isLoading ? t("sending") : t("send")}
      </button>
    </form>
  );
}
