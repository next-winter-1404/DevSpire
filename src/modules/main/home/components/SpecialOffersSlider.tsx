import SliderWrapper from "@/components/common/SliderWrapper";
import HouseCard from "@/components/common/HouseCard";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { THouse, THousesResponse } from "@/components/common/types";


const SpecialOffersSlider = async () => {


  const data = await apiFetch<THousesResponse>("/houses", {
    params: {
      limit: "12",
      order: "DESC",
      sort: "price",
    },
    cache: "no-store",
  });
  

  return (
    <div>
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
              transactionType="rental"
            />
          </div>
        ))}
      </SliderWrapper>
    </div>
  );
};

export default SpecialOffersSlider;
