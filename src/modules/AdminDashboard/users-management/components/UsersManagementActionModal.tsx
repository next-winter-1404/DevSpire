import { Edit, Key, Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useRouter } from "@/i18n/routing";
import { useMutation } from "@tanstack/react-query";
import httpClient from "@/core/interceptor/axios";
import toast from "react-hot-toast";
import axios from "axios";

const UsersManagementActionsModal = ({ id }: { id: number }) => {
  const router = useRouter();

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  return (
    <div
      className="absolute left-6 top-10 w-36 border dark:border-[#333333] 
        bg-[#ffff] dark:bg-[#262626]
                 border-gray-100 rounded-xl shadow-lg z-10 py-2 flex flex-col
                  overflow-hidden"
    >
      <button
        className="flex items-center gap-2 px-4 py-2 text-foreground
                   hover:text-blue-600 hover:bg-blue-50/50 text-xs 
                   text-right"
      >
        <Edit className="w-4 h-4" /> ویرایش
      </button>
      <button
        className="flex items-center gap-2 px-4 py-2 text-foreground
                   hover:text-blue-600 hover:bg-blue-50/50 text-xs 
                   text-right"
      >
        <Key className="w-4 h-4" /> تغییر نقش
      </button>
      <button
        onClick={() => setOpenDeleteModal(true)}
        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50
       text-red-600 text-xs text-right"
      >
        <Trash2 className="w-4 h-4" /> حذف
      </button>
    </div>
  );
};

export default UsersManagementActionsModal;
