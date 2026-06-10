"use client";
import { Edit } from "lucide-react";
import { TravelersDetailMock } from "../mock";
import TravelersDataTable from "./TravelersDataTable";
import DiscountCode from "./DiscountCode";
import { TBookingRequest } from "../types";
import { useRouter } from "@/i18n/routing";
import { notFound, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { AddBooking } from "../services/Post/addBooking";
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslations } from "next-intl";

interface IProps {
  bookingData: TBookingRequest | null;
  changeTab: (tab: number) => void;
  totalPrice: number;
  getBookingId: (id: string | number) => void;
}
const BookingStepThree = ({
  bookingData,
  changeTab,
  totalPrice,
  getBookingId,
}: IProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("booking.review");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { mutate: postBooking, isPending } = useMutation({
    mutationKey: ["ADDBOOKING"],
    mutationFn: async (data: TBookingRequest) => await AddBooking(data),
    onSuccess: (res) => {
      if (res.status === 200 || res.status === 201) {
        toast.success(t("bookingSaved"));
        getBookingId(res.data.id);
        changeTab(4);
      } else {
        return;
      }
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 403) {
          toast.error(t("noPermission"));
        } else if (err.response?.status == 400) {
          toast.error(err.response?.data?.message || t("badRequest"));
        } else {
          toast.error(t("submitError"));
        }
      }
    },
  });
  if (!bookingData) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="w-full bg-[#FFFFFF] rounded-[24px] border border-[#DDDDDD] p-6 dark:bg-[#27272A] mb-8 ">
        <div className="w-full flex items-center justify-between mb-8">
          <h2 className="text-[24px] font-bold text-foreground ">
            {t("travelerInfo")}
          </h2>
          <button
            onClick={() => changeTab(2)}
            className="flex items-center gap-2 text-primary text-[16px] cursor-pointer "
          >
            <Edit size={20} />
            {t("editTravelers")}
          </button>
        </div>
        <TravelersDataTable
          totalPrice={totalPrice}
          traveler_details={bookingData.traveler_details}
        />
      </div>
      <div className="w-full bg-[#FFFFFF] rounded-[24px] border border-[#DDDDDD] p-6 dark:bg-[#27272A] mb-8 ">
        <div className="flex flex-col  md:flex-row md:items-center gap-2 mb-6 ">
          <h2 className="text-[24px] text-foreground font-bold ">
            {t("tripNotification")}
          </h2>
          <p className=" text-[16px] text-[#777777] font-medium ">{t("tripNotificationDesc")}
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:flex-start md:items-center gap-16 ">
          <div className="flex flex-col gap-2 items-start  ">
            <label className="text-[16px] text-foreground font-bold">
              {t("phoneNumber")}            </label>
            <p className="text-[#777777] text-[16px] ">
              {bookingData.sharedMobile}
            </p>
          </div>
          <div className="flex flex-col gap-2 items-start  ">
            <label className="text-[16px] text-foreground font-bold">
              {t("email")}            </label>
            <p className="text-[#777777] text-[16px] ">
              {bookingData.sharedEmail}
            </p>
          </div>
        </div>
      </div>
      <div className="mb-8">
        <DiscountCode />
      </div>
      <div className=" w-full flex flex-col gap-4 md:gap-6">
        <div className="flex gap-2 items-center">
          <h2 className="text-[24px] font-bold text-foreground ">{t("totalPrice")} :</h2>
          <h2 className="text-primary text-[24px] font-bold ">
            {totalPrice.toLocaleString()} {t("toman")}
          </h2>
        </div>
        <div className=" w-full flex  flex-col items-start gap-6  md:flex-row md:items-center md:justify-between ">
          <button
            onClick={() => changeTab(2)}
            className="p-2.5 cursor-pointer rounded-[16px] text-[#777777] border border-[#777777]  text-[20px] "
          >
            {t("previousStep")}
          </button>
          <button
            onClick={() => postBooking(bookingData)}
            className="text-[#ffff] text-[20px] bg-primary  p-2.5 cursor-pointer rounded-[16px] "
          >
            {isPending ? t("loadingBooking") : t("confirmAndContinue")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingStepThree;
