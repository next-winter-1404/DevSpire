import { Info, MoreVertical, Trash2 } from "lucide-react";
import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import CancelModal from "@/components/common/CancelModal";
import ContinueBookingModal from "@/components/common/ContinueBookingModal";
import { useReservation } from "@/modules/SellerDashboard/ReservesManagement/services/hooks/useReservation";
import { Link, useRouter } from "@/i18n/routing";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import httpClient from "@/core/interceptor/axios";
import { useTranslations } from "next-intl";


const FavoritesActionsModal = ({
  id,
  houseId,
}: {
  id: number;
  houseId: number;
}) => {
  const router = useRouter();
  const t = useTranslations("customerDashboard.favorites");

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const { mutate: deleteFav, isPending } = useMutation({
    mutationFn: async () => {
      const res = await httpClient.delete(`/favorites/${id}`);
      return res;
    },
    onSuccess: (res) => {
      toast.success(res?.data?.message || t("deleteSuccess"));
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err?.response?.data?.message || t("deleteError")
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
            <DropdownMenu.Item asChild>
              <Link
                href={`/fast-reserve/${houseId}`}
                className="
                  flex items-center gap-2
                  px-4 py-2
                  text-xs
                  outline-none
                  hover:bg-blue-50/50
                  hover:text-blue-600
                "
              >
                <Info className="w-4 h-4" />
                <span>{t("reserve")}
                </span>
              </Link>
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
              <span>{t("delete")}
              </span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {openDeleteModal && (
        <ConfirmDeleteModal
          onConfirm={deleteFav}
          isOpen={openDeleteModal}
          onClose={() => setOpenDeleteModal(false)}
          isPending={isPending}
        />
      )}
    </>
  );
};

export default FavoritesActionsModal;
