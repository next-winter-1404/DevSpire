import DashboardContainer from "@/components/dashboard/DashboardContainer";
import CustomerDashboardView from "@/modules/CustomerDashboard/Dashboard/view/CustomerDashboardView";

const page = () => {
  return (
    <DashboardContainer>
      <CustomerDashboardView />
    </DashboardContainer>
  );
};

export default page;
