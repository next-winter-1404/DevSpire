"use client";
import { Home, Users, MessageSquare, Star, Calendar } from "lucide-react";
import { useTranslations } from "next-intl";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
} from "recharts";

interface DashboardData {
  houses: number;
  users: {
    userCount: number;
    sellers: number;
    buyers: number;
    admins: number;
  };
  bookings: {
    bookingCount: number;
    conformedBookings: number;
    canceledBookings: number;
    pendingBookings: number;
  };
  comments: number;
  averageRating: string;
}

const AdminDashboard = ({ data }: { data: DashboardData }) => {
  const t = useTranslations("adminDashboard.dashboard");

  // ۱. تغییر نام color به fill در دیتا
  const bookingChartData = [
    {
      name: t("bookingPending")
      ,
      value: data.bookings.pendingBookings,
      fill: "#fbbf24",
    },
    {
      name: t("bookingConfirmed"),
      value: data.bookings.conformedBookings,
      fill: "#34d399",
    },
    { name: t("bookingCanceled"), value: data.bookings.canceledBookings, fill: "#fb7185" },
  ];

  const userChartData = [
    { name: t("buyers"), value: data.users.buyers, fill: "#3b82f6" },
    { name: t("sellers"), value: data.users.sellers, fill: "#818cf8" },
    { name: t("admins"), value: data.users.admins, fill: "#1e293b" },

  ];

  return (
    <div>
      <div className="max-w-7xl mx-auto space-y-6">
        {/* هدر */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
{t("systemOverview")}            </h1>
            <p className="text-slate-500 mt-1">
{t("systemOverviewDescription")}            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {/* کارت خانه‌ها */}
          <div className="lg:col-span-4 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-6 shadow-lg text-white relative overflow-hidden">
            <div className="absolute -left-6 -top-6 opacity-10">
              <Home className="w-40 h-40" />
            </div>
            <h3 className="text-emerald-50 font-medium mb-1">
{t("totalEstates")}
            </h3>
            <div className="flex items-end gap-3 mt-4">
              <span className="text-5xl font-black">{data.houses}</span>
              <span className="text-emerald-100 mb-1">{t("estateUnit")}
</span>
            </div>
          </div>

          {/* کارت تعاملات */}
          <div className="lg:col-span-8 grid grid-cols-2 gap-6">
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-all">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">
{t("userComments")}
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {data.comments}
                </p>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-violet-50 flex items-center justify-center text-violet-500">
                <MessageSquare className="w-6 h-6" />
              </div>
            </div>
            <div className="bg-slate-900 rounded-3xl p-6 shadow-md border border-slate-800 flex items-center justify-between relative overflow-hidden">
              <div className="absolute left-0 bottom-0 w-24 h-24 bg-yellow-500/10 rounded-full blur-2xl"></div>
              <div className="z-10">
                <p className="text-slate-400 text-sm font-medium mb-1">
{t("averageRating")}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-3xl font-bold text-white">
                    {data.averageRating}
                  </p>
                  <span className="text-slate-500">/ 5</span>
                </div>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center justify-center z-10">
                <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
              </div>
            </div>
          </div>

          {/* 1. نمودار و وضعیت رزروها */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
{t("bookingAnalysis")}
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
                  {/* ۲. کامپوننت Cell حذف شده و تگ Bar به صورت خود-بسته (self-closing) استفاده می‌شود */}
                  <Bar dataKey="value" radius={[6, 6, 0, 0]} maxBarSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* 2. نمودار دایره‌ای کاربران */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-slate-700 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
{t("usersComposition")}
              </h3>
            </div>

            <div className="flex-1 h-48 w-full relative" dir="ltr">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  {/* کامپوننت Cell حذف شد */}
                  <Pie
                    data={userChartData}
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  />
                  <RechartsTooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      direction: "rtl",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-bold text-slate-800">
                  {data.users.userCount}
                </span>
                <span className="text-xs text-slate-500">{t("users")}
</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-50">
              {userChartData.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center gap-1"
                >
                  <div className="flex items-center gap-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    ></div>
                    <span className="text-xs text-slate-500">{item.name}</span>
                  </div>
                  <span className="font-semibold text-slate-700">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
