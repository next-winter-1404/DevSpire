"use client";

import "./[locale]/globals.css";
import {
  ExclamationTriangleIcon,
  ReloadIcon,
  ArrowLeftIcon,
} from "@radix-ui/react-icons";
import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4">
      <div className="bg-destructive/10 p-6 rounded-[2rem] mb-6 border border-destructive/20">
        <ExclamationTriangleIcon className="w-16 h-16 text-destructive animate-pulse" />
      </div>

      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
        متاسفانه مشکلی پیش آمد!
      </h2>
      <p className="text-muted-foreground max-w-md mx-auto mb-10 leading-loose">
        در برقراری ارتباط با سرور خطای غیرمنتظره‌ای رخ داده است. تیم فنی ما در
        جریان قرار گرفت. لطفا دوباره تلاش کنید.
      </p>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => reset()}
          className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full hover:opacity-90 transition-all duration-300 font-medium shadow-lg shadow-primary/20 flex items-center justify-center gap-2 hover:-translate-y-1"
        >
          <ReloadIcon className="w-5 h-5" />
          تلاش مجدد
        </button>

        <Link
          href="/"
          className="bg-background text-foreground border-2 border-border px-8 py-3.5 rounded-full hover:bg-muted transition-colors duration-300 font-medium flex items-center justify-center gap-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          صفحه اصلی
        </Link>
      </div>
    </div>
  );
}
