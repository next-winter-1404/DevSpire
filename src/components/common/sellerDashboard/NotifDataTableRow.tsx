"use client";
import { FormatDate } from "@/utils/helper/FormatDate";
import CircleTick from "../../../../public/icons/CircleTick";
import { TNotification } from "../types";
import { ReadNotification } from "@/modules/SellerDashboard/Notifications/services/PUT/ReadNotification";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslations } from "next-intl";


interface IProps {
  item: TNotification;
}

const NotifDataTableRow = ({ item }: IProps) => {
  const router = useRouter();
const t = useTranslations("notifications");

  const locale = useLocale();

  const readNotifMutation = useMutation({
    mutationFn: () => ReadNotification(item.id),
    onSuccess: (data) => {
      toast.success(data.message || "اعلان موردنظر با موفقیت علامت گزاری شد");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || "مشکلی در عملیات پیش امده است",
        );
      }
    },
  });

  return (
    <div className="flex flex-col gap-2   sm:flex-row">
      <div className="w-148">
        <p className="text-[#1E2022]   dark:text-[#E4E4E4]">{item.message}</p>
      </div>
      <div className="w-64">
        <span className="text-[#1E2022]   dark:text-[#E4E4E4]">
          {item.createdAt === item.updatedAt
            ? FormatDate(item.createdAt, "fa")
            : FormatDate(item.updatedAt, "fa")}
        </span>
      </div>
      {!item.isRead && (
        <button
          onClick={() => {
            readNotifMutation.mutate();
          }}
          className="flex items-center gap-2 text-[#008C78] cursor-pointer   dark:text-[#E6EDF5]"
        >
          <CircleTick />
<span>{t("markAsReadSingle")}</span>
        </button>
      )}
    </div>
  );
};

export default NotifDataTableRow;
