import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import UsersManagementView from "@/modules/AdminDashboard/UsersManagement/view/UsersManagementView";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}
const UsersManagementPage = async ({ searchParams }: IProps) => {
  const sparams = await searchParams;

  const params = {
    limit: sparams.limit ?? "10",
    order: sparams.order ?? "DESC",
    role: sparams.role ?? "",
    membership_date: sparams.membership_date ?? "",
    page: sparams.page ?? "1",
    sort: sparams.sort ?? "",
  };
  return (
    <DashboardContainer>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <UsersManagementView params={params} />
      </Suspense>
    </DashboardContainer>
  );
};

export default UsersManagementPage;
