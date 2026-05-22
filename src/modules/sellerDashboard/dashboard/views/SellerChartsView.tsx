import { apiFetch } from "@/core/Server-fetch/fetchApi";
import SellerDashboardCharts from "../components/SellerDashboardCharts";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import { TUserRes } from "@/modules/customerDashboard/dashboard/components/CustomerDashboardCharts";
import { IDecodedToken } from "@/modules/fastReserveDetail/types";

export interface ISellerPayments {
  totalEarnings: number;
  pendingPayments: number;
  lastPaymentDate: string;
}
const SellerChartsView = async () => {
  const payments = await apiFetch<ISellerPayments | null>(
    "/seller-finance/dashboard",
    {
      next: { revalidate: 12 },
    },
  );

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value as string;
  const decoded = jwtDecode(token) as IDecodedToken;

  const user = await apiFetch<TUserRes | null>(`/users/${decoded.id}`, {
    next: { revalidate: 60 },
  });
  console.log(payments);

  return (
    <>
      <SellerDashboardCharts user={user} payments={payments} />
    </>
  );
};

export default SellerChartsView;
