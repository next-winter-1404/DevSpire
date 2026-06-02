import { CheckCircle, Info, MoreVertical } from "lucide-react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import PaymentDetailModal from "@/modules/customerDashboard/payments/components/PaymentDetailModal";
import toast from "react-hot-toast";
import { verifyPayment } from "@/modules/booking/services/Post/verifyPayment";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import ConfirmChangesModal from "@/components/common/ConfirmChangesModal";
import { IPayment } from "@/modules/customerDashboard/payments/types";

const PaymentsActionsMenu = ({
  id,
  detail,
}: {
  id: number;
  detail?: IPayment;
}) => {
  const [openDetailModal, setOpenDetailModal] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);

  const { mutate: verify, isPending } = useMutation({
    mutationFn: async () => await verifyPayment(id),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "پرداخت شما با موفقیت تایید شد");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message ||
            "مشکلی در تایید پرداخت شما پیش آمده است",
        );
      }
    },
  });

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
              min-w-[160px]
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
              onSelect={() => setOpenConfirm(true)}
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
              <span>تایید پرداخت</span>
            </DropdownMenu.Item>

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
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {openDetailModal && (
        <PaymentDetailModal
          detail={detail}
          id={id}
          isOpen={openDetailModal}
          onClose={() => setOpenDetailModal(false)}
        />
      )}

      {openConfirm && (
        <ConfirmChangesModal
          title="آیا بابت تایید این پرداخت مطمئن هستید؟"
          isOpen={openConfirm}
          onClose={() => setOpenConfirm(false)}
          onConfirm={verify}
        />
      )}
    </>
  );
};

export default PaymentsActionsMenu;
