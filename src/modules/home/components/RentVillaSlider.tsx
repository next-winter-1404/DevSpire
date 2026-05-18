import { apiFetch } from "@/core/Server-fetch/fetchApi";
import RentVillaCard from "./RentVillaCard";
import { THouse, THousesResponse } from "@/components/common/types";

const RentVillaSlider = async () => {
  const data = await apiFetch<THousesResponse>("/houses", {
    params: {
      limit: 8,
      transactionType: "rental",
    },
    next: {
      revalidate: 60,
    },
  });
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 w-full">
      {data?.houses?.map((item: THouse) => (
        <RentVillaCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default RentVillaSlider;
