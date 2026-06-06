import {
  CheckCircle,
  Edit,
  Info,
  MoreVertical,
  Trash2,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import ReservationDetailsModal from "./ReserveDetailsModal";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import CancelModal from "@/components/common/CancelModal";
import ContinueBookingModal from "@/components/common/ContinueBookingModal";
import { useReservation } from "../services/hooks/useReservation";
import { TReservation } from "@/components/common/types";
import EditBookingModal from "@/modules/AdminDashboard/reserve-management/components/EditBookingModal";

const ReserveActionsMenu = ({
  id,
  isCanceled,
  isPending,
  role,
  data,
}: {
  id: number;
  isCanceled: boolean;
  isPending: boolean;
  role: "seller" | "admin";
  data: TReservation;
}) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCancelModal, setOpenCancelModal] = useState(false);
  const [openContinueModal, setOpenContinueModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const {
    deleteBookingMutation,
    cancelBookingMutation,
    continueBookingMutation,
  } = useReservation(id);

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
              min-w-[180px]
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
            {isCanceled && (
              <DropdownMenu.Item
                onSelect={() => setOpenContinueModal(true)}
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
                <CheckCircle className="w-4 h-4" />
                <span>ادامه و تایید رزرو</span>
              </DropdownMenu.Item>
            )}

            {isPending && (
              <DropdownMenu.Item
                onSelect={() => setOpenCancelModal(true)}
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
                <XCircle className="w-4 h-4" />
                <span>لغو رزرو</span>
              </DropdownMenu.Item>
            )}

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
            {role == "admin" && (
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
            )}

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

      {openCancelModal && (
        <CancelModal
          isOpen={openCancelModal}
          onClose={() => setOpenCancelModal(false)}
          onCancel={cancelBookingMutation.mutate}
        />
      )}

      {openContinueModal && (
        <ContinueBookingModal
          isOpen={openContinueModal}
          onClose={() => setOpenContinueModal(false)}
          onConfirm={continueBookingMutation.mutate}
        />
      )}
      {openEditModal && (
        <EditBookingModal
          onClose={() => setOpenEditModal(false)}
          reservation={data}
        />
      )}
    </>
  );
};

export default ReserveActionsMenu;
