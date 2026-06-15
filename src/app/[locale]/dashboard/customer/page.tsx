import DashboardContainer from "@/components/dashboard/DashboardContainer";
import CustomerDashboardView from "@/modules/dashboard/customerDashboard/dashboard/view/CustomerDashboardView";

const page = () => {
  return (
    <DashboardContainer>
      <CustomerDashboardView />
    </DashboardContainer>
  );
};

export default page;
