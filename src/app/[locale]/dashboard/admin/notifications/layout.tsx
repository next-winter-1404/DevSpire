import DashboardContainer from "@/components/dashboard/DashboardContainer";
import NotificationsGifWrapper from "@/modules/AdminDashboard/notifications/components/NotificationsGifWrapper";
import React, { ReactNode } from "react";

const AdminNotificationsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <DashboardContainer>
      <div
        className="w-full h-full md:flex md:justify-between
       md:items-center bg-[#ffff] rounded-[24px] dark:bg-[#262626] "
      >
        <div className="h-full w-full md:w-[70%] p-5 ">{children}</div>
        <div className="w-full h-full hidden md:block md:w-[40%]">
          <NotificationsGifWrapper />
        </div>
      </div>
    </DashboardContainer>
  );
};

export default AdminNotificationsLayout;
