"use client";

import TopCards from "@/components/common/TopCards";
import { useTranslations } from "next-intl";
import Estates from "../../../../../public/icons/Estates";
import CheckList from "../../../../../public/icons/CheckList";
import HourGlass from "../../../../../public/icons/HourGlass";
import Money from "../../../../../public/icons/Cash";
import { ISellerFinance } from "../views/SellerTopCardsView";
import Chats from "../../../../../public/icons/Chats";
import House from "../../../../../public/icons/House";

const SellerTopCard = ({
  stats,
  commentsCount,
  houses,
}: {
  stats: ISellerFinance | null;
  commentsCount: number | undefined;
  houses: number | undefined;
}) => {
  const t = useTranslations("sellerDashboard.sdashboard");

  return (
    <>
      <TopCards

        items={[
          {
            icon: Money,
            title: t("totalPayments"),
            value: stats?.totalPayments ?? t("noData"),
            link: "/dashboard/seller/payments",
          },
          {
            icon: CheckList,
            title: t("totalBookings"),
            value: stats?.totalBookings ?? t("noData"),
            link: "/dashboard/seller/reserves-management",
          },
          {
            icon: Chats,
            title: t("totalComments"),
            value: commentsCount ?? t("noData"),
            link: "/dashboard/seller/comments-management",
          },
          {
            icon: House,
            title: t("totalHouses"),
            value: houses ?? t("noData"),
            link: "/dashboard/seller/estates-management",
          },
        ]}

      />
    </>
  );
};

export default SellerTopCard;
