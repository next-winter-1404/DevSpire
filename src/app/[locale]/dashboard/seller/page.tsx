import DashboardContainer from "@/components/dashboard/DashboardContainer";
import SellerDashboardView from "@/modules/dashboard/sellerDashboard/dashboard/views/SellerDashboardView";

const page = () => {
  return (
    <DashboardContainer>
      <SellerDashboardView />
    </DashboardContainer>
  );
};

export default page;
