import SliderWrapper from "@/components/common/SliderWrapper";
import HouseCard from "@/components/common/HouseCard";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { THouse, THousesResponse } from "@/components/common/types";

const BestChoiceSlider = async () => {
  const data = await apiFetch<THousesResponse>("/houses", {
    params: {
      limit: "12",
      order: "DESC",
      sort: "price",
      transactionType: "reservation",
    },
    cache: "no-store",
  });

  return (
    <SliderWrapper>
      {data?.houses.map((property: THouse) => (
        <div
          key={property.id}
          dir="rtl"
          className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"
        >
          <HouseCard
            className="w-full"
            property={property}
            transactionType="reservation"
          />
        </div>
      ))}
    </SliderWrapper>
  );
};

export default BestChoiceSlider;
