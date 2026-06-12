import { CheckCircle, Info, MoreVertical, Trash } from "lucide-react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import PaymentDetailModal from "@/modules/customerDashboard/payments/components/PaymentDetailModal";
import toast from "react-hot-toast";
import { verifyPayment } from "@/modules/booking/services/Post/verifyPayment";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import ConfirmChangesModal from "@/components/common/ConfirmChangesModal";
import { IPayment } from "@/modules/customerDashboard/payments/types";
import { useRouter } from "@/i18n/routing";
import httpClient from "@/core/interceptor/axios";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import EditPaymentModal from "./EditPaymentModal";

const PaymentsActionsMenu = ({
  role,
  id,
  detail,
}: {
  role: "seller" | "admin";
  id: number;
  detail: IPayment;
}) => {
  const router = useRouter();

  const [openDetailModal, setOpenDetailModal] = useState<boolean>(false);
  const [openConfirm, setOpenConfirm] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const { mutate: verify, isPending } = useMutation({
    mutationFn: async () => await verifyPayment(id),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "پرداخت شما با موفقیت تایید شد");
      router.refresh();
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

  const { mutate: deletePayment } = useMutation({
    mutationFn: async () => {
      try {
        const res = await httpClient.delete(`/admin/payments/${id}`);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message || "پرداخت با موفقیت حذف شد");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "مشکلی در حذف پیش امده است");
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
              bg-[#ffff]
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
                  <InfoCircledIcon className="w-4 h-4" />
                  <span>ویرایش </span>
                </DropdownMenu.Item>
                <DropdownMenu.Item
                  onSelect={() => setOpenDeleteModal(true)}
                  className="
                flex items-center gap-2
                px-4 py-2
                text-xs
                cursor-pointer
                outline-none
                text-red-500
                hover:bg-red-50/50
              "
                >
                  <Trash className=" text-red-500 w-4 h-4" />
                  <span>حذف</span>
                </DropdownMenu.Item>
              </>
            )}
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
      {openDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={deletePayment}
          onClose={() => setOpenDeleteModal(false)}
          isOpen={openDeleteModal}
        />
      )}
      {openEditModal && (
        <EditPaymentModal
          payment={detail}
          onClose={() => setOpenEditModal(false)}
        />
      )}
    </>
  );
};

export default PaymentsActionsMenu;
