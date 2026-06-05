import { CheckCircle, Info, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import CancelModal from "@/components/common/CancelModal";
import ContinueBookingModal from "@/components/common/ContinueBookingModal";
import { useReservation } from "@/modules/SellerDashboard/ReservesManagement/services/hooks/useReservation";
import ReservationDetailsModal from "@/modules/SellerDashboard/ReservesManagement/components/ReserveDetailsModal";
import { Link, useRouter } from "@/i18n/routing";
import { useMutation } from "@tanstack/react-query";
import httpClient from "@/core/interceptor/axios";
import toast from "react-hot-toast";
import axios from "axios";

const FavoritesActionsModal = ({
  id,
  houseId,
}: {
  id: number;
  houseId: number;
}) => {
  const router = useRouter();

  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const onCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  const { mutate: deleteFav, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const res = await httpClient.delete(`/favorites/${id}`);
        return res;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message || "علاقه مندی با موفقیت حذف شد");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err?.response?.data?.message || "مشکلی در حذف پیش امده است",
        );
      }
    },
  });

  return (
    <div
      className="absolute left-6 top-10 w-36 border dark:border-[#333333] 
        bg-[#ffff] dark:bg-[#262626]
                 border-gray-100 rounded-xl shadow-lg z-10 py-2 flex flex-col
                  overflow-hidden"
    >
      <Link
        href={`/fast-reserve/${houseId}`}
        className="flex items-center gap-2 px-4 py-2 text-foreground
                   hover:text-blue-600 hover:bg-blue-50/50 text-xs 
                   text-right"
      >
        <Info className="w-4 h-4" /> رزرو
      </Link>
      <button
        onClick={() => setOpenDeleteModal(true)}
        className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50
       text-red-600 text-xs text-right"
      >
        <Trash2 className="w-4 h-4" /> حذف
      </button>
      {openDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={deleteFav}
          isOpen={openDeleteModal}
          onClose={onCloseDeleteModal}
          isPending={isPending}
        />
      )}
    </div>
  );
};

export default FavoritesActionsModal;
