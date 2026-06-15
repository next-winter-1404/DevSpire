import { apiFetch } from "@/core/Server-fetch/fetchApi";
import SellerDashboardCharts from "../components/SellerDashboardCharts";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import { ISellerFinance } from "./SellerTopCardsView";
import { IDecodedToken } from "@/modules/main/fastReserveDetail/types";
import { TUserRes } from "@/modules/dashboard/customerDashboard/dashboard/components/CustomerDashboardCharts";

export interface ISellerPayments {
  totalEarnings: number;
  pendingPayments: number;
  lastPaymentDate: string;
}
const SellerChartsView = async () => {
  const payments = await apiFetch<ISellerFinance | null>(
    "/seller/finance/dashboard",
  );

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value as string;
  const decoded = jwtDecode(token) as IDecodedToken;

  const user = await apiFetch<TUserRes | null>(`/users/${decoded.id}`, {
    cache: "no-store",
  });
  console.log(payments);

  return (
    <>
      <SellerDashboardCharts user={user} payments={payments} />
    </>
  );
};

export default SellerChartsView;
