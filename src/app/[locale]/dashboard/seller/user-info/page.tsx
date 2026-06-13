import DashboardContainer from "@/components/dashboard/DashboardContainer";
import UserInfoView from "@/modules/dashboard/user-Info/view/UserInfoView";

export default function Page() {
  return (
    <DashboardContainer>
      <UserInfoView />
    </DashboardContainer>
  );
}
