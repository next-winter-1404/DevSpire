import { TNotificationsResponse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { IDecodedToken } from "@/modules/fastReserveDetail/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import React from "react";
import AllNotificationsList from "../components/AllNotificationsList";

const AllNotificationsView = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  const cookiesStore = await cookies();
  const token = cookiesStore.get("accessToken")?.value as string;
  const decoded = jwtDecode(token) as IDecodedToken;

  const data = await apiFetch<TNotificationsResponse | null>(`/notifications`, {
    params: params,
    cache: "no-store",
  });
  console.log(data);

  return (
    <>
      <AllNotificationsList data={data} />
    </>
  );
};

export default AllNotificationsView;
