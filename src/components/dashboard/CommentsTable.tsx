"use client";
import { useState, useRef, useEffect } from "react";
import { MoreVertical, MessageSquare, Star } from "lucide-react";
import { FormatDate } from "@/utils/helper/FormatDate";
import { IComment } from "@/modules/sellerDashboard/payments/types";

export default function CommentsTable({ comments }: { comments: IComment[] }) {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = (id: number) => {
    setOpenMenuId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    const handleCloseMenu = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleCloseMenu);
    return () => document.removeEventListener("mousedown", handleCloseMenu);
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-right">
        <thead className="text-gray-600 font-medium">
          <tr className="border-b border-[#DDDDDD]">
            <th className="py-4 px-4">ملک</th>
            <th className="py-4 px-4">کاربر</th>
            <th className="py-4 px-4">عنوان و نظر</th>
            <th className="py-4 px-4 text-center">امتیاز</th>
            <th className="py-4 px-4">تاریخ ثبت</th>
            <th className="py-4 px-4 text-center">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {comments.map((comment) => (
            <tr
              key={comment.id}
              className="border-b border-[#DDDDDD] hover:bg-slate-50 transition-colors"
            >
              <td className="py-4 px-4 font-medium text-gray-800">
                {comment.house.title}
              </td>
              <td className="py-4 px-4 text-gray-600">
                {comment.user.firstName} {comment.user.lastName}
              </td>
              <td className="py-4 px-4 max-w-[250px]">
                <div className="font-bold text-gray-800 truncate">
                  {comment.title}
                </div>
                <div className="text-gray-500 truncate text-xs">
                  {comment.caption}
                </div>
                {comment.parent_comment && (
                  <div className="mt-1 flex items-center gap-1 text-[10px] text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit">
                    <MessageSquare size={10} />
                    <span>پاسخ به: {comment.parent_comment.title}</span>
                  </div>
                )}
              </td>
              <td className="py-4 px-4 text-center">
                <div className="flex justify-center items-center gap-1 text-amber-500">
                  <Star size={14} fill="currentColor" />
                  <span className="font-bold text-gray-700">
                    {comment.rating}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4 text-gray-500 whitespace-nowrap">
                {FormatDate(comment.created_at, "fa")}
              </td>
              <td className="relative text-center">
                <button
                  onClick={() => toggleMenu(comment.id)}
                  className="p-1 rounded-md hover:bg-gray-200 text-gray-500"
                >
                  <MoreVertical className="w-5 h-5" />
                </button>

                {comment.id === openMenuId && (
                  <div
                    ref={menuRef}
                    className="absolute left-0 mt-2 w-32 bg-white shadow-lg border rounded-md z-10"
                  >
                    <button className="block w-full text-right px-4 py-2 hover:bg-gray-100 text-sm">
                      مشاهده
                    </button>
                    <button className="block w-full text-right px-4 py-2 hover:bg-gray-100 text-sm text-red-500">
                      حذف
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
