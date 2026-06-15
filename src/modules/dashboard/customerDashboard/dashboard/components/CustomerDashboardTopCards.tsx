import TopCards from "@/components/common/TopCards";
import DotList from "../../../../../../public/icons/DotList";
import CheckList from "../../../../../../public/icons/CheckList";
import NotPaid from "../../../../../../public/icons/NotPaid";
import Heart from "../../../../../../public/icons/Heart";
import { useTranslations } from "next-intl";

interface IProps {
  payments: number | undefined;
  favorites: number | undefined;
  activeReserves: number | undefined;
  allReserves: number | undefined;
}

const CustomerDashboardTopCards = ({
  payments,
  favorites,
  activeReserves,
  allReserves,
}: IProps) => {
  const t = useTranslations("customerDashboard.dashboard");

  return (
    <>
      <TopCards
        items={[
          {
            icon: DotList,
            title: t("allOfReserves"),
            value: allReserves || "موردی یافت نشد",
            link: "dashboard/customer/reserves-management",
          },
          {
            icon: CheckList,
            title: t("activeReserves"),
            value: activeReserves || "موردی یافت نشد",
            link: "dashboard/customer/reserves-management",
          },
          {
            icon: NotPaid,
            title: "تایید نشده",
            value: payments || "موردی یافت نشد",
            link: "dashboard/customer/payments",
          },
          {
            icon: Heart,
            title: t("favorites"),
            value: favorites || "موردی یافت نشد",
            link: "dashboard/customer/favorites",
          },
        ]}
      />
    </>
  );
};

export default CustomerDashboardTopCards;
