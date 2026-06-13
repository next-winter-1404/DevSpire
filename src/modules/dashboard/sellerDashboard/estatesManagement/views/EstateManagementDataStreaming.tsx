import { THousesResponse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import EstatesManagementView from "./EstatesManagementView";

const EstateManagementDataStreaming = async ({
  params,
  role,
}: {
  params: Record<string, string>;
  role: "admin" | "seller";
}) => {
  let data = null;
  if (role == "seller") {
    data = await apiFetch<THousesResponse>("/houses/seller/user", {
      cache: "no-store",
      params,
    });
  } else {
    data = await apiFetch<THousesResponse>("/houses", {
      cache: "no-store",
      params,
    });
  }

  return (
    <>
      <EstatesManagementView role={role} data={data} />
    </>
  );
};

export default EstateManagementDataStreaming;
