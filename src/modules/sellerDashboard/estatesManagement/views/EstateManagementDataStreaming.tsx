import { THousesResponse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import EstatesManagementView from "./EstatesManagementView";

const EstateManagementDataStreaming = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  const data = await apiFetch<THousesResponse>("/houses/seller/user", {
    cache: "no-store",
    params,
  });

  return (
    <>
      <EstatesManagementView data={data ?? { houses: [], totalCount: 0 }} />
    </>
  );
};

export default EstateManagementDataStreaming;
