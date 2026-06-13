import { apiFetch } from "@/core/Server-fetch/fetchApi";
import AdminDashboard from "../components/AdminDashboardData";
import { IAdminDashboardData } from "../../types";
import AdminDashboardHeader from "../components/AdminDashboardHeader";
import AdminDashboardCharts from "../components/AdminDashboardCharts";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import AdminDashboardTable from "../components/AdminDashboardTable";
import { IDecodedToken } from "@/modules/main/fastReserveDetail/types";
import { TUserRes } from "@/modules/dashboard/customerDashboard/dashboard/components/CustomerDashboardCharts";

const AdminDashboardView = async () => {
  const res = await apiFetch<IAdminDashboardData | null>("/dashboard/summary");

  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value as string;
  const decoded = jwtDecode(token) as IDecodedToken;

  const user = await apiFetch<TUserRes | null>(`/users/${decoded.id}`, {
    cache: "no-store",
  });
  return (
    <>
      <AdminDashboardHeader data={res} />
      <div className="w-full mt-6 mb-6">
        <AdminDashboardCharts user={user} data={res} />
      </div>
      <AdminDashboardTable />
    </>
  );
};

export default AdminDashboardView;
