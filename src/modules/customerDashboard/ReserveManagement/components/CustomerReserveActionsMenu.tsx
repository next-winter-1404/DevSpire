import { Info, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import ReservationDetailsModal from "@/modules/sellerDashboard/ReservesManagement/components/ReserveDetailsModal";
import { useReservation } from "@/modules/sellerDashboard/ReservesManagement/services/hooks/useReservation";

const ReserveActionsMenu = ({ id }: { id: number }) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { deleteBookingMutation } = useReservation(id);

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
              <Info className="w-4 h-4" />
              <span>جزئیات</span>
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
              <span>حذف</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {openDetailModal && (
        <ReservationDetailsModal
          id={id}
          isOpen={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
        />
      )}

      {openDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={deleteBookingMutation.mutate}
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          isPending={deleteBookingMutation.isPending}
        />
      )}
    </>
  );
};

export default ReserveActionsMenu;
