import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import AdminContactUsView from "@/modules/dashboard/AdminDashboard/contact-us/views/AdminContactUsView";
import { Suspense } from "react";

interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}
const AdminContactUsPage = async ({ searchParams }: IProps) => {
  const sparams = await searchParams;
  const params = {
    // sort: sparams.sort ?? "",
    order: sparams.order ?? "",
    limit: sparams.limit ?? "",
    page: sparams.page ?? "",
  } as Record<string, string>;
  return (
    <Suspense fallback={<DashboardTableSkeleton />}>
      <DashboardContainer>
        <>
          <AdminContactUsView params={params} />
        </>
      </DashboardContainer>
    </Suspense>
  );
};

export default AdminContactUsPage;
