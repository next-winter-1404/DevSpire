"use client";
import TopCards from "@/components/common/TopCards";
import { IAdminDashboardData } from "../../types";
import { Heart, Home, Star } from "lucide-react";
import Chats from "../../../../../public/icons/Chats";
import Estates from "../../../../../public/icons/Estates";
import CountUp from "react-countup";
import Group from "../../../../../public/icons/Group";

const AdminDashboardHeader = ({
  data,
}: {
  data: IAdminDashboardData | null;
}) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center w-full gap-4">
      <div className=" md:flex-3">
        <TopCards
          items={[
            {
              icon: Group,
              title: "کل کاربران",
              value: data?.users?.userCount || "موردی یافت نشد",
              link: "dashboard/admin/users-management"
            },
            {
              icon: Estates,
              title: "کل املاک",
              value: data?.houses || "موردی یافت نشد",
              link: "dashboard/admin/estates-management"
            },
            {
              icon: Chats,
              title: "نظرات کاربران",
              value: data?.comments || "موردی یافت نشد",
              link: "dashboard/admin/comments-management"
            },
          ]}
        />
      </div>
      <div className="flex-1">
        <div
          className="bg-slate-900 rounded-3xl  p-4 shadow-md border
         border-slate-800 flex items-center  gap-8 relative overflow-hidden"
        >
          <div
            className="w-14 h-14 rounded-2xl bg-yellow-500/20 flex items-center
           justify-center z-10"
          >
            <Star className="w-6 h-6 fill-yellow-500 text-yellow-500" />
          </div>
          <div className="z-10">
            <p className="text-slate-400 text-sm font-medium mb-1">
              میانگین امتیازات
            </p>
            <div className="flex items-center gap-2">
              <p className="text-3xl font-bold text-white">
                <CountUp end={Number(data?.averageRating) ?? 0} duration={12} />
              </p>
              <span className="text-slate-500 text-3xl">/ 5</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHeader;
