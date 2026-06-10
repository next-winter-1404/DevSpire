import { Edit, Key, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useManageUsers } from "../hooks";
import EditUserRole from "./EditUserRole";
import EditUserInformation from "./EditUserInformation";
import { useTranslations } from "next-intl";

const UsersManagementActionsModal = ({ id }: { id: number }) => {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openChangeRole, setOpenChangeRole] = useState(false);
  const [openEditUser, setOpenEditUser] = useState(false);
const t = useTranslations("adminDashboard.users");

  const { deleteUserMutation } = useManageUsers(id);

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
              min-w-[150px]
              overflow-hidden
              rounded-xl
              border
              border-gray-100
              dark:border-[#333333]
              bg-white
              dark:bg-[#262626]
              p-1
              shadow-lg
            "
          >
            <DropdownMenu.Item
              onSelect={() => setOpenEditUser(true)}
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
<span>{t("edit")}</span>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onSelect={() => setOpenChangeRole(true)}
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
              <Key className="w-4 h-4" />
<span>{t("changeRole")}</span>
            </DropdownMenu.Item>

            <DropdownMenu.Item
              onSelect={() => setOpenDeleteModal(true)}
              className="
                flex items-center gap-2
                px-4 py-2
                text-xs
                cursor-pointer
                outline-none
                text-red-600
                hover:bg-red-50
              "
            >
              <Trash2 className="w-4 h-4" />
<span>{t("delete")}</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {openDeleteModal && (
        <ConfirmDeleteModal
          onClose={() => setOpenDeleteModal(false)}
          isOpen={openDeleteModal}
          onConfirm={deleteUserMutation.mutate}
          isPending={deleteUserMutation.isPending}
        />
      )}

      {openChangeRole && (
        <EditUserRole onClose={() => setOpenChangeRole(false)} id={id} />
      )}

      {openEditUser && (
        <EditUserInformation id={id} onClose={() => setOpenEditUser(false)} />
      )}
    </>
  );
};

export default UsersManagementActionsModal;
