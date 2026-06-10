import TabsSections from "@/components/common/TabsSections";
import SendNotification from "../components/SendNotification";
import NotificationsView from "@/modules/SellerDashboard/Notifications/views/NotificationsView";
import AllNotificationsView from "./AllNotificationsView";
import { Suspense } from "react";
import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import { getTranslations } from "next-intl/server";

interface IProps {
  params: Record<string, string>;
  tab: string;
}

const AdminNotificationsView = async ({ params, tab }: IProps) => {
  const t = await getTranslations("adminDashboard.notifications"); const renderTab = () => {
    switch (tab) {
      case "1":
        return (
          <Suspense fallback={<DashboardTableSkeleton />}>
            <AllNotificationsView
              params={{
                page: params.page,
                limit: params.limit ?? "6",
              }}
            />
          </Suspense>
        );

      case "2":
        return (
          <Suspense fallback={<DashboardTableSkeleton />}>
            <NotificationsView params={params} />
          </Suspense>
        );
      case "3":
        return <SendNotification />;
      default:
        return t("pageNotFound");
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div>
        <TabsSections
          options={[
            { id: 1, label: t("allSiteNotifications") },
            { id: 2, label: t("yourNotifications") },
            { id: 3, label: t("sendNotification") },
          ]}
        />
      </div>
      <div className="w-full h-full overflow-y-auto scroll-smooth">
        {renderTab()}
      </div>
    </div>
  );
};

export default AdminNotificationsView;
