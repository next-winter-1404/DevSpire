import NotificationsList from "@/components/common/dashboards/NotificationsList";
import NotificationsTop from "@/components/common/dashboards/NotificationsTop";
import { TNotificationsResponse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { IDecodedToken } from "@/modules/fastReserveDetail/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

interface IProps {
  params: Record<string, string>;
}

const NotificationsView = async ({ params }: IProps) => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("accessToken")?.value as string;
  const decoded = jwtDecode(token) as IDecodedToken;

  const data = await apiFetch<TNotificationsResponse | null>(
    `/notifications/${decoded.id}`,
    {
      params: params,
      cache: "no-store",
    },
  );
  return (
    <div className="flex flex-col gap-4 h-full ">
      <NotificationsTop />
      <NotificationsList data={data} />
    </div>
  );
};

export default NotificationsView;
