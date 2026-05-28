import DashboardContainer from "@/components/dashboard/DashboardContainer";
import UserInfoView from "@/modules/user-Info/view/UserInfoView";

export default function Page() {
  return (
    <DashboardContainer>
      <UserInfoView />
    </DashboardContainer>
  );
}
