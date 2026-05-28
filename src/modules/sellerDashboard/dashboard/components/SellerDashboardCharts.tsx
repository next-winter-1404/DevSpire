import CompleteProfile from "@/components/common/CompleteProfile";
import InCome from "@/components/common/InCome";
import { useTranslations } from "next-intl";
import { ISellerPayments } from "../views/SellerChartsView";
import { FormatDate } from "@/utils/helper/FormatDate";
import { TUserRes } from "@/modules/customerDashboard/dashboard/components/CustomerDashboardCharts";
import { ISellerFinance } from "../views/SellerTopCardsView";

interface IProps {
  payments: ISellerFinance | null;
  user: TUserRes | null;
}
const SellerDashboardCharts = ({ payments, user }: IProps) => {
  const t = useTranslations("sellerDashboard.dashboard");

  return (
    <div className="flex gap-4">
      <InCome
        title="نمودار درامد این ماه"
        totalIncome={String(payments?.totalAmount.toLocaleString()) || ""}
        currentIncome={String(payments?.totalCurrentMonthAmount) || ""}
        percentage={
          ((payments?.totalCurrentMonthAmount || 0) /
            (payments?.totalAmount || 0)) *
          100
        }
      />

      <CompleteProfile
        lastEditText={` آخرین ویرایش  ${FormatDate(user?.user.updated_at || "", "fa")}`}
        percentage={user?.additionalPercentage}
        linkHref="/dashboard/seller/edit-profile"
      />
    </div>
  );
};

export default SellerDashboardCharts;
