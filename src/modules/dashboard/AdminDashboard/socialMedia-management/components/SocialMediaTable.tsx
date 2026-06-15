"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Globe,
  MoreVertical,
  Copy,
  ExternalLink,
  MessageCircle,
  Send,
} from "lucide-react";
import { InstagramLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { TSocialLink } from "../types";
import SocialMediaActionModal from "./SocialMediaActionModal";

export default function SocialMediaTable({ data }: { data: TSocialLink[] }) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const rows = useMemo(() => data ?? [], [data]);

  const getPlatformMeta = (platform: string) => {
    const p = platform?.toLowerCase();

    switch (p) {
      case "instagram":
        return {
          title: "Instagram",
          faTitle: "اینستاگرام",
          icon: <InstagramLogoIcon className="w-4 h-4" />,
          badge:
            "bg-fuchsia-50 text-fuchsia-700 border-fuchsia-100 dark:bg-fuchsia-500/10 dark:text-fuchsia-300 dark:border-fuchsia-500/20",
        };
      case "telegram":
        return {
          title: "Telegram",
          faTitle: "تلگرام",
          icon: <Send className="w-4 h-4" />,
          badge:
            "bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-500/10 dark:text-sky-300 dark:border-sky-500/20",
        };
      case "whatsapp":
        return {
          title: "WhatsApp",
          faTitle: "واتساپ",
          icon: <MessageCircle className="w-4 h-4" />,
          badge:
            "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-300 dark:border-emerald-500/20",
        };
      case "linkedin":
        return {
          title: "LinkedIn",
          faTitle: "لینکدین",
          icon: <LinkedInLogoIcon className="w-4 h-4" />,
          badge:
            "bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:border-indigo-500/20",
        };
      case "website":
        return {
          title: "Website",
          faTitle: "وبسایت",
          icon: <Globe className="w-4 h-4" />,
          badge:
            "bg-gray-50 text-gray-700 border-gray-100 dark:bg-white/5 dark:text-gray-200 dark:border-white/10",
        };
      default:
        return {
          title: platform,
          faTitle: platform,
          icon: <Globe className="w-4 h-4" />,
          badge:
            "bg-gray-50 text-gray-700 border-gray-100 dark:bg-white/5 dark:text-gray-200 dark:border-white/10",
        };
    }
  };

  const safeHost = (url: string) => {
    try {
      const u = new URL(url);
      return u.host.replace("www.", "");
    } catch {
      return url;
    }
  };

  return (
    <section className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4"></div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm text-right">
          <thead className="text-gray-600 dark:text-gray-400 font-medium">
            <tr className="border-b border-[#DDDDDD] dark:border-gray-700">
              <th className="py-4 px-4 whitespace-nowrap">پلتفرم</th>
              <th className="py-4 px-4 whitespace-nowrap">لینک</th>
              <th className="py-4 px-4 whitespace-nowrap">دامنه</th>
              <th className="py-4 px-4 text-center whitespace-nowrap">
                عملیات
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#DDDDDD] dark:divide-gray-700">
            {rows.map((row) => {
              const meta = getPlatformMeta(row.platform);
              return (
                <tr
                  key={row.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center gap-2 px-2 py-1 rounded-lg border text-xs ${meta.badge}`}
                      >
                        {meta.icon}
                        {meta.faTitle}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 align-middle">
                    <a
                      href={row.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-foreground hover:underline line-clamp-1"
                    >
                      {row.url}
                    </a>
                  </td>

                  <td className="py-4 px-4 text-gray-500 dark:text-gray-400 align-middle whitespace-nowrap">
                    {safeHost(row.url)}
                  </td>

                  <td className="py-4 px-4 text-center relative align-middle">
                    <SocialMediaActionModal id={row.id} url={row.url} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            لینکی ثبت نشده است.
          </div>
        )}
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {rows.map((row) => {
          const meta = getPlatformMeta(row.platform);

          return (
            <div
              key={row.id}
              className="relative rounded-2xl border border-[#DDDDDD] bg-[#ffff] p-4 
              shadow-sm dark:bg-[#1F2937] dark:border-white/10"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <span
                    className={`inline-flex items-center gap-2 px-2 py-1 rounded-lg border text-xs ${meta.badge}`}
                  >
                    {meta.icon}
                    {meta.faTitle}
                  </span>

                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    لینک
                  </p>
                  <a
                    href={row.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 block text-sm font-medium text-foreground hover:underline break-all"
                  >
                    {row.url}
                  </a>

                  <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                    دامنه
                  </p>
                  <p className="mt-1 text-sm text-foreground">
                    {safeHost(row.url)}
                  </p>
                </div>

                <div className="relative shrink-0">
                  <SocialMediaActionModal id={row.id} url={row.url} />
                </div>
              </div>
            </div>
          );
        })}

        {rows.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            لینکی ثبت نشده است.
          </div>
        )}
      </div>
    </section>
  );
}
