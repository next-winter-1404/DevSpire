"use client";
import { useState, useRef, useEffect } from "react";
import { MoreVertical, MessageSquare, Star } from "lucide-react";
import { FormatDate } from "@/utils/helper/FormatDate";
import CommentsActionModal from "./CommentsActionModal";
import { IComment } from "@/modules/SellerDashboard/payments/types";
import { useLocale, useTranslations } from "next-intl";


export default function CommentsTable({
  comments,
  role,
}: {
  comments: IComment[];
  role: "seller" | "admin";
}) {
  const t = useTranslations("commentsTable");
  const locale = useLocale();
  return (
    <div className="w-full h-full">
      <div className="hidden md:block overflow-x-auto h-full">
        <table className="w-full min-w-[950px] text-sm text-right">
          <thead className="text-gray-600 dark:text-gray-400 font-medium dark:bg-gray-800/50">
            <tr className="border-b border-[#DDDDDD] dark:border-gray-700">
              <th className="py-4 px-4 whitespace-nowrap">{t("house")}
              </th>
              <th className="py-4 px-4 whitespace-nowrap">{t("user")}
              </th>
              <th className="py-4 px-4">{t("titleAndComment")}
              </th>
              <th className="py-4 px-4 text-center whitespace-nowrap">
                {t("rating")}

              </th>
              <th className="py-4 px-4 whitespace-nowrap">{t("createdDate")}
              </th>

              <th className="py-4 px-4 text-center whitespace-nowrap">
                {t("actions")}

              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[#DDDDDD] dark:divide-gray-700 h-full">
            {comments.map((comment) => (
              <tr
                key={comment.id}
                className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
              >
                <td className="py-4 px-4 font-medium text-gray-800 dark:text-gray-200 align-middle">
                  <span className="line-clamp-1">{comment.house.title}</span>
                </td>

                <td className="py-4 px-4 text-gray-600 dark:text-gray-300 align-middle whitespace-nowrap">
                  {comment.user.firstName} {comment.user.lastName}
                </td>

                <td className="py-4 px-4 max-w-[320px] align-middle">
                  <div className="font-bold text-gray-800 dark:text-gray-100 truncate">
                    {comment.title}
                  </div>
                  <div className="text-gray-500 dark:text-gray-400 truncate text-xs mt-1">
                    {comment.caption}
                  </div>

                  {comment.parent_comment && (
                    <div className="mt-2 flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded w-fit">
                      <MessageSquare size={10} />
                      <span className="truncate max-w-[220px]">
                        {t("replyTo")}: {comment.parent_comment.title}
                      </span>
                    </div>
                  )}
                </td>

                <td className="py-4 px-4 text-center align-middle">
                  <div className="flex justify-center items-center gap-1 text-amber-500">
                    <Star size={14} fill="currentColor" />
                    <span className="font-bold text-gray-700 dark:text-gray-200">
                      {comment.rating}
                    </span>
                  </div>
                </td>

                <td className="py-4 px-4 text-gray-500 dark:text-gray-400 whitespace-nowrap align-middle">
                  {FormatDate(comment.created_at, locale)}
                </td>

                <td className="relative py-4 px-4 text-center align-middle">
                  <CommentsActionModal role={role} id={comment.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {comments.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            {t("empty")}
          </div>
        )}
      </div>

      <div className="md:hidden flex flex-col gap-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="relative rounded-2xl border border-[#DDDDDD] bg-white p-4 shadow-sm dark:bg-[#1F2937] dark:border-white/10"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="text-xs text-gray-500 dark:text-gray-400">{t("house")}
                </p>
                <h3 className="mt-1 text-[15px] font-bold text-foreground line-clamp-2">
                  {comment.house.title}
                </h3>

                <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {t("user")}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground">
                  {comment.user.firstName} {comment.user.lastName}
                </p>
              </div>

              <div className="relative shrink-0">
                <CommentsActionModal role={role} id={comment.id} />
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-gray-50 p-3 dark:bg-white/5">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {t("titleAndComment")}
              </p>
              <p className="mt-1 font-bold text-foreground line-clamp-1">
                {comment.title}
              </p>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">
                {comment.caption}
              </p>

              {comment.parent_comment && (
                <div className="mt-2 flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2 py-1 rounded w-fit">
                  <MessageSquare size={10} />
                  <span className="truncate max-w-[240px]">
                    {t("replyTo")}: {comment.parent_comment.title}
                  </span>
                </div>
              )}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("rating")}
                </p>
                <div className="mt-1 flex items-center gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span className="font-bold text-foreground">
                    {comment.rating}
                  </span>
                </div>
              </div>

              <div className="text-left">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t("createdDate")}
                </p>
                <p className="mt-1 text-sm font-medium text-foreground whitespace-nowrap">
                  {FormatDate(comment.created_at, locale)}
                </p>
              </div>
            </div>
          </div>
        ))}

        {comments.length === 0 && (
          <div className="py-10 text-center text-sm text-gray-500 dark:text-gray-400">
            {t("empty")}
          </div>
        )}
      </div>
    </div>
  );
}
