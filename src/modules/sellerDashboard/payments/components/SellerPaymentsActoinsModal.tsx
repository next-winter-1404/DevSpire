import { CheckCircle, Info, Trash2, XCircle } from "lucide-react";
import { useState } from "react";
import PaymentDetailModal from "@/modules/CustomerDashboard/Payments/components/PaymentDetailModal";
import toast from "react-hot-toast";
import { verifyPayment } from "@/modules/booking/services/Post/verifyPayment";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import ConfirmChangesModal from "@/components/common/ConfirmChangesModal";
import { IPayment } from "@/modules/CustomerDashboard/Payments/types";

const PaymentsActionsMenu = ({
  id,
  detail,
}: {
  id: number;
  detail?: IPayment;
}) => {
  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const onCloseDetail = () => {
    setOpenDetailModal(false);
  };

  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const onCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const { mutate: verify, isPending } = useMutation({
    mutationFn: async () => await verifyPayment(id),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "پرداخت شما با موفقیت تایید شد ");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
            "مشکلی در پرداخت تایید پرداخت شما پیش امده !",
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
      <button
        onClick={() => setOpenConfirm(true)}
        className="flex items-center gap-2 px-4 py-2 text-foreground
                   hover:text-blue-600 hover:bg-blue-50/50 text-xs 
                   text-right"
      >
        <CheckCircle className="w-4 h-4" /> تایید پرداخت
      </button>
      <button
        onClick={() => setOpenDetailModal(true)}
        className="flex items-center gap-2 px-4 py-2 text-foreground
                   hover:text-blue-600 hover:bg-blue-50/50 text-xs 
                   text-right"
      >
        <Info className="w-4 h-4" /> جزئیات
      </button>

      {openDetailModal && (
        <PaymentDetailModal
          detail={detail}
          id={id}
          isOpen={openDetailModal}
          onClose={onCloseDetail}
        />
      )}
      {openConfirm && (
        <ConfirmChangesModal
          title="ایا بابت تایید این پرداخت مطمعنید؟"
          onClose={onCloseConfirm}
          onConfirm={verify}
          isOpen={openConfirm}
        />
      )}
    </div>
  );
};

export default PaymentsActionsMenu;
