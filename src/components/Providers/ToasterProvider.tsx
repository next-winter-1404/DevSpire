"use client";

import { useLocale } from "next-intl";
import React, { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

export const ToasterProvider = ({ children }: { children: ReactNode }) => {
  const locale = useLocale();
  return (
    <div>
      {children}
      <Toaster
        toastOptions={{ style: { direction: locale == "fa" ? "rtl" : "ltr" } }}
        position="top-center"
      />
    </div>
  );
};
