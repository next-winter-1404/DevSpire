import { CheckCircle, Info, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import ReservationDetailsModal from "./ReserveDetailsModal";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { useReservation } from "../services/hooks/useReservation";
import CancelModal from "@/components/common/CancelModal";
import ContinueBookingModal from "@/components/common/ContinueBookingModal";

const ReserveActionsMenu = ({
  id,
  isCanceled,
}: {
  id: number;
  isCanceled: boolean;
}) => {
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const onCloseDetail = () => {
    setOpenDetailModal(false);
  };

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const onCloseCancelModal = () => {
    setOpenCancelModal(false);
  };

  const [openContinueModal, setOpenContinueModal] = useState<boolean>(false);
  const onCloseContinueModal = () => {
    setOpenContinueModal(false);
  };

  const {
    deleteBookingMutation,
    cancelBookingMutation,
    continueBookingMutation,
  } = useReservation(id);

  return (
    <div
      className="absolute left-6 top-10 w-36 border dark:border-[#333333] 
        bg-[#ffff] dark:bg-[#262626]
                 border-gray-100 rounded-xl shadow-lg z-10 py-2 flex flex-col
                  overflow-hidden"
    >
      {isCanceled && (
        <button
          onClick={() => setOpenContinueModal(true)}
          className="flex items-center gap-2 px-4 py-2
                   hover:text-blue-600 hover:bg-blue-50/50  text-foreground
                    text-xs text-right"
        >
          <CheckCircle className="w-4 h-4" /> ادامه و تایید رزرو
        </button>
      )}
      <button
        onClick={() => setOpenCancelModal(true)}
        className="flex items-center gap-2 px-4 py-2 text-foreground
                   hover:text-blue-600 hover:bg-blue-50/50 text-xs 
                   text-right"
      >
        <XCircle className="w-4 h-4" /> لغو رزرو
      </button>
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
      {openCancelModal && (
        <CancelModal
          isOpen={openCancelModal}
          onClose={onCloseCancelModal}
          onCancel={cancelBookingMutation.mutate}
        />
      )}
      {openContinueModal && (
        <ContinueBookingModal
          onConfirm={continueBookingMutation.mutate}
          onClose={onCloseContinueModal}
          isOpen={openContinueModal}
        />
      )}
    </div>
  );
};

export default ReserveActionsMenu;
