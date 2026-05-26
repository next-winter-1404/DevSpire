import DashboardHeader from "@/components/dashboardLayout/dashboardHeader/DashboardHeader";
import DashboardSidebar from "@/components/dashboardLayout/dashboardSidebar/DashboardSidebar";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { redirect } from "@/i18n/routing";
import { TUserRes } from "@/modules/customerDashboard/dashboard/components/CustomerDashboardCharts";
import { IDecodedToken } from "@/modules/fastReserveDetail/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("accessToken")?.value as string;
  const decoded = jwtDecode(token) as IDecodedToken;
  const user = await apiFetch<TUserRes | null>(`/users/${decoded.id}`, {
    cache: "no-store",
  });
  if (user && user?.user?.role !== "admin") {
    redirect({
      href: "/",
      locale: "fa",
    });
  }

  return (
    <div className="flex gap-8 w-full p-5 h-screen ">
      <DashboardSidebar role={"admin"} />
      <div className="flex flex-col gap-5 w-full h-full">
        <header>
          <DashboardHeader userInfo={user} hasNotification={false} />
        </header>
        <main
          className="h-full  p-5 bg-[#F5F5F5] border
     border-[#DDDDDD] rounded-[40px]   overflow-y-auto scroll-smooth
    dark:bg-[#404040] dark:border-[#777777]"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
