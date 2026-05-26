import { THousesResponse } from "@/components/common/types";
import EstatesManagementView from "./EstatesManagementView";
import { apiFetch } from "@/core/Server-fetch/fetchApi";

const EstateManagementDataStreaming = async () => {
  const data = await apiFetch<THousesResponse>("/houses/seller/user", {
    cache: "no-store",
  });
  return (
    <>
      <EstatesManagementView data={data ?? { houses: [], totalCount: 0 }} />
    </>
  );
};

export default EstateManagementDataStreaming;
