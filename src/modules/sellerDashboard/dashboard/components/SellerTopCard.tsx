"use client";

import TopCards from "@/components/common/TopCards";
import { useTranslations } from "next-intl";
import CheckList from "../../../../../public/icons/CheckList";
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
  const t = useTranslations("sellerDashboard.dashboard");

  return (
    <>
      <TopCards
        items={[
          {
            icon: Money,
            title: " تعداد پرداختی ها",
            value: stats?.totalPayments || "موردی یافت نشد",
            link: "/dashboard/seller/payments",
          },
          {
            icon: CheckList,
            title: " تعداد رزرو ها",
            value: stats?.totalBookings || "موردی یافت نشد",
            link: "/dashboard/seller/reserves-management",
          },
          {
            icon: Chats,
            title: "تعداد کامنت ها",
            value: commentsCount || "موردی یافت نشد",
            link: "/dashboard/seller/comments-management",
          },
          {
            icon: House,
            title: "تعداد خانه ها",
            value: houses || "موردی یافت نشد",
            link: "/dashboard/seller/estates-management",
          },
        ]}
      />
    </>
  );
};

export default SellerTopCard;
