import { Edit, Key, Trash2 } from "lucide-react";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useRouter } from "@/i18n/routing";
import { useManageUsers } from "../hooks";
import EditUserRole from "./EditUserRole";
import EditUserInformation from "./EditUserInformation";

const UsersManagementActionsModal = ({ id }: { id: number }) => {
  const router = useRouter();

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const [openChangeRole, setOpenChangeRole] = useState<boolean>(false);
  const onCloseChangeRole = () => {
    setOpenChangeRole(false);
  };

  const [openEditUser, setOpenEditUser] = useState<boolean>(false);
  const onCloseEditUser = () => {
    setOpenEditUser(false);
  };

  const { deleteUserMutation } = useManageUsers(id);

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
        onClick={() => setOpenEditUser(true)}
      >
        <Edit className="w-4 h-4" /> ویرایش
      </button>
      <button
        onClick={() => setOpenChangeRole(true)}
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
      {openDeleteModal && (
        <ConfirmDeleteModal
          onClose={onCloseDeleteModal}
          isOpen={openDeleteModal}
          onConfirm={deleteUserMutation.mutate}
          isPending={deleteUserMutation.isPending}
        />
      )}
      {openChangeRole && <EditUserRole onClose={onCloseChangeRole} id={id} />}
      {openEditUser && (
        <EditUserInformation id={id} onClose={onCloseEditUser} />
      )}
    </div>
  );
};

export default UsersManagementActionsModal;
