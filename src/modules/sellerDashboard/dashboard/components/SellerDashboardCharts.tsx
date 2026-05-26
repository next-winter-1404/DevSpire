import CompleteProfile from "@/components/common/CompleteProfile";
import InCome from "@/components/common/InCome";
import { useTranslations } from "next-intl";
import { ISellerPayments } from "../views/SellerChartsView";
import { FormatDate } from "@/utils/helper/FormatDate";
import { TUserRes } from "@/modules/customerDashboard/dashboard/components/CustomerDashboardCharts";

interface IProps {
  payments: ISellerPayments | null;
  user: TUserRes | null;
}
const SellerDashboardCharts = ({ payments, user }: IProps) => {
  const t = useTranslations("sellerDashboard.dashboard");

  return (
    <div className="flex gap-4">
      <InCome
        title={t("incomeChart")}
        dateRange={`اخرین پرداخت : ${payments && FormatDate(payments.lastPaymentDate, "fa")}`}
        totalIncome={String(payments?.totalEarnings) || ""}
        currentIncome={String(payments?.pendingPayments) || ""}
        percentage={64}
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
