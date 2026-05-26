"use client";

import TopCards from "@/components/common/TopCards";
import { useTranslations } from "next-intl";
import Estates from "../../../../../public/icons/Estates";
import CheckList from "../../../../../public/icons/CheckList";
import HourGlass from "../../../../../public/icons/HourGlass";
import { IDashboardStats } from "@/components/common/types";
import Money from "../../../../../public/icons/Cash";

const SellerTopCard = ({ stats }: { stats: IDashboardStats | null }) => {
  const t = useTranslations("sellerDashboard.dashboard");

  return (
    <>
      <TopCards
        items={[
          {
            icon: Estates,
            title: t("allOfEstates"),
            value: stats?.houses || "موردی یافت نشد",
          },
          {
            icon: CheckList,
            title: t("activeReserves"),
            value: stats?.bookings?.conformedBookings || "موردی یافت نشد",
          },
          {
            icon: HourGlass,
            title: t("pendingReservations"),
            value: stats?.bookings?.pendingBookings || "موردی یافت نشد",
          },
          {
            icon: Money,
            title: "مشتری ها",
            value: stats?.users?.buyers || "موردی یافت نشد",
          },
        ]}
      />
    </>
  );
};

export default SellerTopCard;
