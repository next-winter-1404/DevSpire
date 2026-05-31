import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import AdminReserveManagementViews from "@/modules/AdminDashboard/reserve-management/views/AdminReserveManagementViews";
import { Suspense } from "react";

const AdminReservesManagementPage = () => {
  return (
    <Suspense fallback={<DashboardTableSkeleton />}>
      <DashboardContainer>
        <>
          <AdminReserveManagementViews />
        </>
      </DashboardContainer>
    </Suspense>
  );
};

export default AdminReservesManagementPage;
