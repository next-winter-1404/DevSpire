"use client";
import TabsSections from "@/components/common/TabsSections";
import { useSearchParams } from "next/navigation";
import SendNotification from "../components/SendNotification";

const AdminNotificationsView = () => {
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") ?? "1";

  const renderTab = () => {
    switch (currentTab) {
      case "1":
        return "first Tab";

      case "2":
        return <p>اعلان های شما</p>;
      case "3":
        return <SendNotification />;
      default:
        return "صفحه مورد نظر یافت نشد";
    }
  };

  return (
    <div className="w-full h-full flex flex-col gap-6">
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
