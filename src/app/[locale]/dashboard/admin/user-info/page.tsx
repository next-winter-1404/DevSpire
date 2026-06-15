import DashboardContainer from "@/components/dashboard/DashboardContainer";
import UserInfoView from "@/modules/dashboard/user-Info/view/UserInfoView";

const AdminProfile = () => {
  return (
    <DashboardContainer>
      <UserInfoView />
    </DashboardContainer>
  );
};

export default AdminProfile;
