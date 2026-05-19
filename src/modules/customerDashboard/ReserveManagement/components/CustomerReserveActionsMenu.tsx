import { CheckCircle, Info, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import CancelModal from "@/components/common/CancelModal";
import ContinueBookingModal from "@/components/common/ContinueBookingModal";
import { useReservation } from "@/modules/sellerDashboard/ReservesManagement/services/hooks/useReservation";
import ReservationDetailsModal from "@/modules/sellerDashboard/ReservesManagement/components/ReserveDetailsModal";

const ReserveActionsMenu = ({ id }: { id: number }) => {
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const onCloseDetail = () => {
    setOpenDetailModal(false);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const { deleteBookingMutation } = useReservation(id);

  return (
    <div
      className="absolute left-6 top-10 w-36 border dark:border-[#333333] 
        bg-[#ffff] dark:bg-[#262626]
                 border-gray-100 rounded-xl shadow-lg z-10 py-2 flex flex-col
                  overflow-hidden"
    >
      <button
        onClick={() => setOpenDetailModal(true)}
        className="flex items-center gap-2 px-4 py-2 text-foreground
                   hover:text-blue-600 hover:bg-blue-50/50 text-xs 
                   text-right"
      >
        <Info className="w-4 h-4" /> جزئیات
      </button>
      <button
        onClick={() => setOpenDeleteModal(true)}
        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50
       text-red-600 text-xs text-right"
      >
        <Trash2 className="w-4 h-4" /> حذف
      </button>
      {openDetailModal && (
        <ReservationDetailsModal
          id={id}
          onClose={onCloseDetail}
          isOpen={openDetailModal}
        />
      )}
      {openDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={deleteBookingMutation.mutate}
          isOpen={openDeleteModal}
          onClose={onCloseDeleteModal}
          isPending={deleteBookingMutation.isPending}
        />
      )}
    </div>
  );
};

export default ReserveActionsMenu;
