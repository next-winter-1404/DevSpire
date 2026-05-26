import { cookies } from "next/headers";
import { getUserIdFromToken } from "@/utils/helper/token";
import UserInfoTabs from "../components/UserInfoTabs";

interface UserInfoViewProps {
  userId?: string; 
}
export default async function UserInfoView({ userId: propUserId }: UserInfoViewProps) {
  let userId = propUserId;

  if (!userId) {
      const cookieStore = await cookies();
      const token = cookieStore.get("accessToken")?.value;
      userId = token ? getUserIdFromToken(token) || "" : "";
  }

  return <UserInfoTabs userId={userId ?? ""} />;
}
