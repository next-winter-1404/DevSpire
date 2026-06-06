"use client";
import CompleteProfile from "@/components/common/CompleteProfile";
import { IAdminDashboardData } from "../../types";
import { IUser } from "@/modules/SellerDashboard/Payments/types";
import { TUserRes } from "@/modules/CustomerDashboard/Dashboard/components/CustomerDashboardCharts";
import { FormatDate } from "@/utils/helper/FormatDate";
import { Calendar, Users } from "lucide-react";
import EnergyChart from "@/components/common/PieChart";
import { ResponsiveContainer } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
} from "recharts";

interface IProps {
  data: IAdminDashboardData | null;
  user: TUserRes | null;
}
const AdminDashboardCharts = ({ data, user }: IProps) => {
  const bookingChartData = [
    {
      name: "در انتظار",
      value: data?.bookings.pendingBookings,
      fill: "#fbbf24",
    },
    {
      name: "تایید شده",
      value: data?.bookings.conformedBookings,
      fill: "#34d399",
    },
    {
      name: "لغو شده",
      value: data?.bookings.canceledBookings,
      fill: "#fb7185",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 items-stretch gap-6 ">
        <div className=" bg-[#FFFFFF] rounded-[24px] dark:bg-[#262626] py-4 px-6 ">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-orange-500" />
              تحلیل وضعیت رزروها
            </h3>
          </div>

          <div className="h-64 w-full" dir="ltr">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bookingChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f1f5f9"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 12 }}
                />
                <RechartsTooltip
                  cursor={{ fill: "#f8fafc" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <CompleteProfile
          lastEditText={` آخرین ویرایش  ${FormatDate(user?.user.updated_at || "", "fa")}`}
          percentage={user?.additionalPercentage}
          linkHref="/dashboard/admin/edit-profile"
        />
      </div>
    </>
  );
};

export default AdminDashboardCharts;
