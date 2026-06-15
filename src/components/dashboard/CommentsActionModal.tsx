"use client";

import { Link } from "@/i18n/routing";
import { Copy, Edit, ExternalLink, Trash, MoreVertical } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { useComments } from "@/modules/dashboard/sellerDashboard/CommentsManagement/hooks";
import EditCommentsModal from "@/modules/dashboard/sellerDashboard/CommentsManagement/components/EditCommentsModal";
import CommentsDetailModal from "@/modules/dashboard/sellerDashboard/CommentsManagement/components/CommentsDetailModal";

interface IProps {
  id: number;
  role: "admin" | "seller";
}

const CommentsActionModal = ({ id, role }: IProps) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDetailModal, setOpenDetailModal] = useState(false);

  const { deleteCommentMutation } = useComments(id);

  return (
    <>
      <DropdownMenu.Root dir="rtl">
        <DropdownMenu.Trigger asChild>
          <button className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-white/10">
            <MoreVertical className="w-5 h-5" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={5}
            align="start"
            className="
              z-50
                bg-white
             dark:!bg-[#1A1A1A] 
              min-w-[150px]
              overflow-hidden
              rounded-xl
              border
              border-gray-100
            
              dark:border-[#333333]
              p-1
              shadow-lg
            "
          >
            <DropdownMenu.Item
              onSelect={() => setOpenDetailModal(true)}
              className="
                flex items-center gap-2
                px-4 py-2
                text-xs
                cursor-pointer
                outline-none
                hover:bg-blue-50/50
                hover:text-blue-600
              "
            >
              <InfoCircledIcon className="w-4 h-4" />
              <span>جزئیات</span>
            </DropdownMenu.Item>
            {role == "admin" && (
              <>
                <DropdownMenu.Item
                  onSelect={() => setOpenEditModal(true)}
                  className="
                flex items-center gap-2
                px-4 py-2
                text-xs
                cursor-pointer
                outline-none
                hover:bg-blue-50/50
                hover:text-blue-600
              "
                >
                  <Edit className="w-4 h-4" />
                  <span>ویرایش</span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => {
                    console.log("delete", id);
                  }}
                  className="
                flex items-center gap-2
                px-4 py-2
                text-xs
                cursor-pointer
                outline-none
                text-red-600
                hover:bg-red-50
              "
                  onClick={() => setOpenDeleteModal(true)}
                >
                  <Trash className="w-4 h-4" />
                  <span>حذف</span>
                </DropdownMenu.Item>
              </>
            )}
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {openDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={() => deleteCommentMutation.mutate()}
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
        />
      )}
      {openEditModal && (
        <EditCommentsModal id={id} onClose={() => setOpenEditModal(false)} />
      )}
      {openDetailModal && (
        <CommentsDetailModal
          onClose={() => setOpenDetailModal(false)}
          id={id}
        />
      )}
    </>
  );
};

export default CommentsActionModal;
