"use client";

import { FormatDate } from "@/utils/helper/FormatDate";
import { TNotification } from "@/components/common/types";

export default function AllNotificationsTable({
  data,
}: {
  data: TNotification[];
}) {
  return (
    <table className="w-full text-sm text-right">
      <thead className="text-gray-600 font-medium">
        <tr className="border-b border-[#DDDDDD]">
          <th className="py-4 px-4">عنوان</th>
          <th className="py-4 px-4">متن پیام</th>
          <th className="py-4 px-4 text-center">نوع</th>
          <th className="py-4 px-4 text-center">تاریخ ثبت</th>
          <th className="py-4 px-4 text-center">وضعیت</th>
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
  let label = type;
  let colorClasses = "bg-gray-100 text-gray-700";

  switch (type.toLowerCase()) {
    case "alert":
    case "warning":
      label = "هشدار";
      colorClasses = "bg-amber-100 text-amber-600";
      break;
    case "info":
      label = "اطلاع‌رسانی";
      colorClasses = "bg-blue-100 text-blue-600";
      break;
    case "success":
      label = "موفقیت";
      colorClasses = "bg-teal-100 text-teal-700";
      break;
    case "error":
      label = "خطا";
      colorClasses = "bg-red-100 text-red-500";
      break;
    default:
      label = "نامشخص";
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
  const label = isRead ? "خوانده شده" : "جدید";
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
