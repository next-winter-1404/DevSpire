import TabsSections from "@/components/common/TabsSections";
import SendNotification from "../components/SendNotification";
import NotificationsView from "@/modules/SellerDashboard/Notifications/views/NotificationsView";
import AllNotificationsView from "./AllNotificationsView";
import { Suspense } from "react";
import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";

interface IProps {
  params: Record<string, string>;
  tab: string;
}

const AdminNotificationsView = ({ params, tab }: IProps) => {
  const renderTab = () => {
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
        return "صفحه مورد نظر یافت نشد";
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <div>
        <TabsSections
          options={[
            { id: 1, label: "همه ی اعلان های سایت" },
            { id: 2, label: "اعلان های شما" },
            { id: 3, label: "ارسال اعلان" },
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
