import DashboardContainer from "@/components/dashboard/DashboardContainer";
import AdminDashboardSkeleton from "@/modules/AdminDashboard/Dashboard/components/AdminDashboardSkeleton";
import AdminDashboardView from "@/modules/AdminDashboard/Dashboard/view/AdminDashboardView";
import { Suspense } from "react";

const AdminDashboard = () => {
  return (
    <DashboardContainer>
      <Suspense fallback={<AdminDashboardSkeleton />}>
        <AdminDashboardView />
      </Suspense>
    </DashboardContainer>
  );
};

export default AdminDashboard;
