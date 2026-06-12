"use client";

import { Eye, Trash } from "lucide-react";
import { IContactUS } from "../views/AdminContactUsView";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import httpClient from "@/core/interceptor/axios";
import { useRouter } from "@/i18n/routing";
import toast from "react-hot-toast";
import axios from "axios";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { ContactUsDetailModal } from "./ContactUsDetailModal";

type Props = {
  data: IContactUS[];
};

const ContactUsTable = ({ data }: Props) => {
  const [openDetail, setOpenDetail] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const router = useRouter();

  const { mutate: deleteMess, isPending } = useMutation({
    mutationFn: async (id: number) => {
      try {
        const res = await httpClient.delete(`/contact-us/${id}`);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message || "با موفقیت حذف شد");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "مشکلی پیش آمده است");
      }
    },
  });

  return (
    <div className="w-full md:border md:border-gray-200 md:dark:border-[#333] rounded-xl overflow-hidden">
      <table className="w-full text-sm text-start">
        <thead className="hidden md:table-header-group bg-gray-50 dark:bg-[#1f1f23]">
          <tr>
            <th className="px-4 py-3 text-start w-[80px]">ID</th>
            <th className="px-4 py-3 text-start w-[200px]">عنوان</th>
            <th className="px-4 py-3 text-start">پیام</th>
            <th className="px-4 py-3 text-center w-[100px]">عملیات</th>
          </tr>
        </thead>

        <tbody className="flex flex-col gap-4 md:table-row-group">
          {data.map((item) => (
            <tr
              key={item.id}
              className="flex flex-col p-4 bg-[#ffff] dark:bg-[#1f1f23] border border-gray-200 dark:border-[#333] rounded-xl shadow-sm
                md:table-row md:p-0 md:bg-transparent md:dark:bg-transparent md:border-0 md:border-t md:rounded-none md:shadow-none
                md:hover:bg-gray-50 md:dark:hover:bg-[#2a2a2e] transition"
            >
              <td className="px-0 py-2 md:px-4 md:py-3 flex justify-between items-center md:table-cell border-b border-gray-100 dark:border-[#333] md:border-none">
                <span className="font-bold text-gray-500 md:hidden">ID:</span>
                <span>{item.id}</span>
              </td>

              <td className="px-0 py-2 md:px-4 md:py-3 flex justify-between items-center md:table-cell font-medium border-b border-gray-100 dark:border-[#333] md:border-none">
                <span className="font-bold text-gray-500 md:hidden">
                  عنوان:
                </span>
                <span className="truncate max-w-[180px] md:max-w-none">
                  {item.title ?? "-"}
                </span>
              </td>

              <td className="px-0 py-2 md:px-4 md:py-3 flex flex-col gap-2 md:table-cell text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-[#333] md:border-none">
                <span className="font-bold text-gray-500 md:hidden">پیام:</span>
                <div className="truncate md:max-w-[300px] lg:max-w-[500px]">
                  {item.message ?? "-"}
                </div>
              </td>

              <td className="px-0 py-2 md:px-4 md:py-3 flex justify-between items-center md:table-cell">
                <span className="font-bold text-gray-500 md:hidden">
                  عملیات:
                </span>
                <div className="flex md:justify-center items-center gap-2">
                  <button
                    onClick={() => setOpenDetail(true)}
                    className="p-2 -mr-2 md:mr-0 rounded-md hover:bg-blue-50
                  dark:hover:bg-blue-800/20 transition"
                  >
                    <Eye size={18} className="text-foreground" />
                  </button>
                  <button
                    onClick={() => setOpenDeleteModal(true)}
                    className="p-2 -mr-2 md:mr-0 rounded-md hover:bg-red-50
                   dark:hover:bg-red-900/20 transition"
                  >
                    <Trash size={18} className="text-red-600" />
                  </button>
                </div>
                {openDetail && (
                  <ContactUsDetailModal
                    message={item?.message}
                    title={item?.title}
                    onClose={() => setOpenDetail(false)}
                    open={openDetail}
                  />
                )}
                {openDeleteModal && (
                  <ConfirmDeleteModal
                    onConfirm={() => deleteMess(item.id)}
                    onClose={() => setOpenDeleteModal(false)}
                    isOpen={openDeleteModal}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactUsTable;
