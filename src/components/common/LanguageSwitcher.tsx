"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { ChangeEvent, useTransition } from "react";

export default function LanguageSwitcher() {
  const [isPending, startTransition] = useTransition();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const nextLocale = e.target.value;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="w-full h-full">
      <select
        defaultValue={locale}
        disabled={isPending}
        onChange={onSelectChange}
        className={`w-full  border border-[#0D3B66]
          appearance-none cursor-pointer outline-none
          text-[#0D3B66] bg-transparent
          hover:bg-[#0D3B66] hover:text-white transition-colors duration-300
          rounded-full px-5  h-full text-[16px] font-semibold
          disabled:opacity-50 disabled:cursor-not-allowed
          dark:text-[#E4E4E4] dark:border-[#E4E4E4]
        `}
      >
        <option value="fa" className="text-[#0D3B66] bg-white">
          FA
        </option>
        <option value="en" className="text-[#0D3B66] bg-white">
          EN
        </option>
      </select>
    </div>
  );
}
