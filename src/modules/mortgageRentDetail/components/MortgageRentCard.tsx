"use client";

import Image from "next/image";
import Money from "../../../../public/icons/Cash";
import MobileCall from "../../../../public/icons/MobileCall";
import EstateOwner from "../../../../public/images/mortgageRentDetail/estate-owner.jpg";
import Chat from "../../../../public/icons/Chat";
import DateIcon from "../../../../public/icons/Date";
import Clock from "../../../../public/icons/Clock";
import { useQuery } from "@tanstack/react-query";
import { getSellerDetail } from "../services/GET/GetSellerDetail";
import { useLocale } from "next-intl";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useState } from "react";
import ChatModal from "@/modules/chats/components/ChatModal";

interface IProps {
  sellerId: number;
  lastUpdated: string;
  amount: string;
}

const MortgageRentCard = ({ sellerId, lastUpdated, amount }: IProps) => {
  const locale = useLocale();
  const { data, isPending, error } = useQuery({
    queryKey: ["GETSELLERDETAIL", sellerId],
    queryFn: () => getSellerDetail(sellerId),
  });

  const seller = data?.user;

  const date = new Date(lastUpdated);

  const formattedDate = date.toLocaleDateString(
    locale == "fa" ? "fa-IR" : "en",
  );
  const formattedTime = date.toLocaleTimeString(
    locale == "fa" ? "fa-IR" : "en",
    {
      hour: "2-digit",
      minute: "2-digit",
    },
  );

  const [openChatModal, setOpenChatModal] = useState<boolean>(false);

  if (isPending) {
    return (
      <div className="flex flex-col items-center gap-6 p-6 border border-[#DDDDDD] rounded-[24px]">
        <Skeleton circle width={120} height={120} />

        <Skeleton width={140} height={20} />

        <div className="flex justify-between w-full">
          <Skeleton width={100} height={18} />
          <Skeleton width={120} height={22} />
        </div>

        <Skeleton width="100%" height={48} borderRadius={40} />
        <Skeleton width="100%" height={48} borderRadius={40} />

        <div className="flex justify-between w-full">
          <Skeleton width={100} height={16} />
          <Skeleton width={80} height={16} />
        </div>
      </div>
    );
  }

  if (error || !seller) {
    return (
      <div className="p-6 border border-red-200 rounded-[24px] text-center text-sm text-red-500">
        خطا در دریافت اطلاعات فروشنده
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6 p-6 border border-[#DDDDDD] rounded-[24px] bg-white">
        <div className="flex flex-col items-center gap-3">
          <Image
            src={EstateOwner}
            alt={seller.fullName}
            width={120}
            height={120}
            className="w-28 h-28 rounded-full object-cover bg-blue-800/20"
          />

          <span className="text-[18px] font-medium text-[#1E2022]">
            {seller.firstName} {seller.lastName}
          </span>
        </div>

        <div className="flex justify-between items-center w-full">
          <div className="flex items-center gap-2 text-[15px] text-[#0D3B66]">
            <Money />
            <span>قیمت از :</span>
          </div>

          <div className="flex gap-2 font-bold text-[18px] text-[#1E2022]">
            <span>{Number(amount).toLocaleString()}</span>
            <span>تومان</span>
          </div>
        </div>

        <button className="flex justify-center items-center gap-3 w-full py-3 text-white bg-[#0D3B66] rounded-[40px] hover:opacity-90 transition">
          <MobileCall />
          <span>تماس با **** {seller.phoneNumber?.slice(0, 4)}</span>
        </button>

        <button
          onClick={() => setOpenChatModal(true)}
          className="flex justify-center items-center gap-3 w-full py-3 text-[#FF7F11] border border-[#FF7F11] rounded-[40px] hover:bg-[#FF7F11] hover:text-white transition"
        >
          <Chat />
          <span>گفت و گو با فروشنده</span>
        </button>

        <div className="flex justify-between w-full text-[13px] text-[#777777]">
          <div className="flex items-center gap-2">
            <DateIcon />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center gap-2">
            <Clock />
            <span>{formattedTime}</span>
          </div>
        </div>
      </div>
      <ChatModal
        onClose={() => setOpenChatModal(false)}
        isOpen={openChatModal}
        seller={seller}
      />
    </>
  );
};

export default MortgageRentCard;
