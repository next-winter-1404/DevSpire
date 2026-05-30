import DashboardContainer from "@/components/dashboard/DashboardContainer";
import AdminNotificationsView from "@/modules/AdminDashboard/notifications/view/AdminNotificationsView";

const AdminNotificationsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) => {
  const params = await searchParams;
  const payLoad = {
    page: params.page ?? "",
    limit: params.limit ?? "6",
    isRead: params.isRead ?? "",
    type: params.type ?? "",
    sort: params.sort ?? "",
    order: params.order ?? "",
    message: params.message ?? "",
    title: params.title ?? "",
  } as Record<string, string>;
  const tab = params.tab ?? "1";

  return (
    <div className="h-full overflow-y-auto scroll-smooth">
      <DashboardContainer>
        <AdminNotificationsView tab={tab} params={payLoad} />
      </DashboardContainer>
    </div>
  );
};

export default AdminNotificationsPage;
