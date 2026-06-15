"use client";
import { TBlog } from "@/components/common/types";
import { Link } from "@/i18n/routing";
import { FormatDate } from "@/utils/helper/FormatDate";
import { Calendar, Clock, Edit, Eye, Trash2 } from "lucide-react";
import { useState } from "react";
import { useBlogs } from "../hooks";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import BlogCreateEditModal from "./BlogForm";

const BlogsTable = ({ blog }: { blog: TBlog[] }) => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [blogId, setBlogId] = useState(0);
  const [initialData, setInitialData] = useState<TBlog | null>(null);

  const { deleteBlogMutation } = useBlogs(blogId);

  return (
    <div className="w-full">
      <table className="w-full text-right border-collapse">
        {/* هدر جدول - فقط در دسکتاپ نمایش داده می‌شود */}
        <thead className="hidden md:table-header-group bg-gray-50 dark:bg-[#333333] border-b border-gray-100 dark:border-[#444] text-gray-500 dark:text-gray-400 text-sm">
          <tr>
            <th className="px-6 py-4 font-medium">شناسه</th>
            <th className="px-6 py-4 font-medium">عنوان مقاله</th>
            <th className="px-6 py-4 font-medium whitespace-nowrap">
              زمان مطالعه
            </th>
            <th className="px-6 py-4 font-medium">تاریخ ایجاد</th>
            <th className="px-6 py-4 font-medium text-center">عملیات</th>
          </tr>
        </thead>

        {/* بدنه جدول */}
        <tbody className="block md:table-row-group divide-y-0 md:divide-y divide-gray-100 dark:divide-[#333333]">
          {blog.map((article) => (
            <tr
              key={article.id}
              className="block md:table-row bg-transparent dark:bg-transparent border border-gray-100 dark:border-[#333333] md:border-none rounded-2xl md:rounded-none p-4 mb-4 md:p-0 md:mb-0 hover:bg-gray-50 dark:hover:bg-[#333333]/50 transition-colors group relative"
>


              {/* شناسه */}
              <td className="flex justify-between items-center md:table-cell md:px-6 md:py-4 mb-3 md:mb-0 text-gray-500 font-mono text-sm border-b border-gray-50 md:border-none pb-2 md:pb-0">
                <span className="md:hidden text-xs text-gray-400 font-medium">
                  شناسه:
                </span>
                <span>#{article.id}</span>
              </td>

              <td className="block md:table-cell md:px-6 md:py-4 mb-3 md:mb-0">
                <div className="font-semibold text-gray-800 dark:text-[#F5F5F5] mb-1">{article.title}</div>

                <div className="text-gray-500 text-xs truncate max-w-[250px] md:max-w-xs">
                  {article.caption}
                  {article.category_id && (
                    <span className="inline-block ms-1 mt-2 px-2.5 py-1 bg-gray-100 text-gray-600 text-[10px] md:text-xs rounded-md">
                      دسته {article.category_id}
                    </span>
                  )}
                </div>
              </td>

              <td className="flex justify-between items-center md:table-cell md:px-6 md:py-4 mb-2 md:mb-0">
                <span className="md:hidden text-xs text-gray-400 font-medium">
                  زمان مطالعه:
                </span>
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  {article.estimated_reading_time}
                </div>
              </td>

              <td className="flex justify-between items-center md:table-cell md:px-6 md:py-4 mb-4 md:mb-0">
                <span className="md:hidden text-xs text-gray-400 font-medium">
                  تاریخ ایجاد:
                </span>
                <div className="flex items-center gap-1.5 text-gray-600 text-sm">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <span>{FormatDate(article.created_at, "fa")}</span>
                </div>
              </td>

              <td className="block md:table-cell md:px-6 md:py-4 border-t border-gray-100 md:border-none pt-3 md:pt-0">
                <div
                  className="
                    flex justify-center items-center gap-4 md:gap-2 
                    opacity-100 md:opacity-0 md:group-hover:opacity-100 
                    transition-opacity w-full
                  "
                >
                  <Link
                    href={`/blogs/${article.id}`}
                    className="p-2 bg-gray-50 dark:bg-[#333333] hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-400 hover:text-blue-600 bg-gray-50 hover:bg-blue-50 md:bg-transparent rounded-xl md:rounded-lg transition-colors flex-1 md:flex-none flex justify-center"
                    title="مشاهده"
                  >
                    <Eye className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => {
                      setInitialData(article);
                      setOpenEditModal(true);
                    }}
                    className="p-2 bg-gray-50 dark:bg-[#333333] hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-400 hover:text-green-600 bg-gray-50 hover:bg-green-50 md:bg-transparent rounded-xl md:rounded-lg transition-colors flex-1 md:flex-none flex justify-center"
                    title="ویرایش"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => {
                      setBlogId(article.id);
                      setOpenDeleteModal(true);
                    }}
                    className="p-2 bg-gray-50 dark:bg-[#333333] hover:bg-blue-50 dark:hover:bg-blue-900/30 text-gray-400 hover:text-red-600 bg-gray-50 hover:bg-red-50 md:bg-transparent rounded-xl md:rounded-lg transition-colors flex-1 md:flex-none flex justify-center"
                    title="حذف"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {openDeleteModal && (
        <ConfirmDeleteModal
          onClose={() => setOpenDeleteModal(false)}
          isOpen={openDeleteModal}
          onConfirm={deleteBlogMutation.mutate}
        />
      )}

      {initialData && openEditModal && (
        <BlogCreateEditModal
          onClose={() => setOpenEditModal(false)}
          isOpen={openEditModal}
          initialData={initialData}
        />
      )}
    </div>
  );
};

export default BlogsTable;
