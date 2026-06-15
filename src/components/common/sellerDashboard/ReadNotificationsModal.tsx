import React from "react";
import Close from "../../../../public/icons/Close";
import { useLocale, useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { ReadAllNotifications } from "@/modules/dashboard/sellerDashboard/Notifications/services/PUT/ReadAllNotifications";

interface IProps {
  handleReadNotifsModal: (value: boolean) => void;
}

const ReadNotificationsModal = ({ handleReadNotifsModal }: IProps) => {
  const t = useTranslations("sellerDashboard.notifications");
  const locale = useLocale();

  const readAllNotifMutation = useMutation({
    mutationFn: async () => {
      const result = await ReadAllNotifications();
      return result;
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: () => {
      locale === "en"
        ? alert("Error. Try Again")
        : alert("مشکلی پیش آمد، دوباره تلاش کنید.");
    },
  });

  return (
    <>
      <div
        onClick={() => {
          handleReadNotifsModal(false);
        }}
        className="bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300 absolute inset-0 cursor-pointer"
      ></div>
      <div className="flex flex-col items-center gap-8 p-8 bg-[#FFFFFF] rounded-[24px] absolute top-[24%] left-[35%]">
        <div className="flex justify-end w-full">
          <div
            onClick={() => {
              handleReadNotifsModal(false);
            }}
            className="p-4 bg-[#F5F5F5] rounded-full"
          >
            <Close className="text-[#1E2022] w-4 h-4" />
          </div>
        </div>
        <div className="w-104 text-center">
          <p className="text-[#1E2022]">{t("markAsReadModalText")}</p>
        </div>
        <div className="flex w-full gap-6">
          <button
            onClick={() => {
              handleReadNotifsModal(false);
            }}
            className="w-full py-[13px] text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer"
          >
            {t("cancelBtn")}
          </button>
          <button
            onClick={() => {
              readAllNotifMutation.mutate();
            }}
            className="w-full py-[13px] text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer"
          >
            {t("agreeBtn")}
          </button>
        </div>
      </div>
    </>
  );
};

export default ReadNotificationsModal;
