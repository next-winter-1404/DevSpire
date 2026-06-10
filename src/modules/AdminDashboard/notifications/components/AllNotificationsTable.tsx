"use client";

import { FormatDate } from "@/utils/helper/FormatDate";
import { TNotification } from "@/components/common/types";
import { useTranslations, useLocale } from "next-intl";

export default function AllNotificationsTable({
  data,
}: {
  data: TNotification[];
}) {
  const t = useTranslations("adminDashboard.notifications");
  const locale = useLocale();

  return (
    <table className="w-full text-sm text-right">
      <thead className="text-gray-600 font-medium">
        <tr className="border-b border-[#DDDDDD]">
          <th className="py-4 px-4">{t("title")}</th>
          <th className="py-4 px-4">{t("message")}</th>
          <th className="py-4 px-4 text-center">{t("type")}</th>
          <th className="py-4 px-4 text-center">{t("createdDate")}</th>
          <th className="py-4 px-4 text-center">{t("status")}</th>

        </tr>
      </thead>

      <tbody>
        {data.map((row) => (
          <tr
            key={row.id}
            className="border-b border-[#DDDDDD] hover:bg-slate-50
             dark:hover:bg-slate-800/40 transition-colors"
          >
            <td className="py-4 px-4 text-gray-700 align-middle font-medium">
              {row.title}
            </td>

            <td
              className="py-4 px-4 text-gray-500 align-middle max-w-xs truncate"
              title={row.message}
            >
              {row.message}
            </td>

            <td className="py-4 px-4 text-center align-middle whitespace-nowrap">
              <TypeBadge type={row.type} />
            </td>

            <td className="py-4 px-4 text-gray-500 text-center align-middle whitespace-nowrap">
              {FormatDate(row.createdAt ?? "", "fa")}
            </td>

            <td className="py-4 px-3 whitespace-nowrap text-center align-middle">
              <ReadStatusBadge isRead={row.isRead} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function TypeBadge({ type }: { type: string }) {
  const t = useTranslations("adminDashboard.notifications");
  let label = type;
  let colorClasses = "bg-gray-100 text-gray-700";

  switch (type.toLowerCase()) {
    case "alert":
    case "warning":
      label = t("typeWarning");
      colorClasses = "bg-amber-100 text-amber-600";
      break;
    case "info":
      label = t("typeInfo");
      colorClasses = "bg-blue-100 text-blue-600";
      break;
    case "success":
      label = t("typeSuccess");
      colorClasses = "bg-teal-100 text-teal-700";
      break;
    case "error":
      label = t("typeError");
      colorClasses = "bg-red-100 text-red-500";
      break;
    default:
      label = t("typeUnknown");
      colorClasses = "bg-orange-100 text-orange-500";
  }

  return (
    <span
      className={`px-3 py-1 rounded-md text-xs font-medium inline-block ${colorClasses}`}
    >
      {label}
    </span>
  );
}

function ReadStatusBadge({ isRead }: { isRead: boolean }) {
  const t = useTranslations("adminDashboard.notifications");
const label = isRead ? t("read") : t("new");
  const colorClasses = isRead
    ? "bg-gray-100 text-gray-500"
    : "bg-indigo-100 text-indigo-700";

  return (
    <span
      className={`px-3 py-1 rounded-md text-xs font-medium inline-block ${colorClasses}`}
    >
      {label}
    </span>
  );
}
