import SliderWrapper from "@/components/common/SliderWrapper";
import { GetHouses } from "@/modules/services/api/get/GetHouses";
import HouseCard from "@/components/common/HouseCard";
import { apiFetch } from "@/core/Server-fetch/fetchApi";

const BestChoiceSlider = async () => {
  const data = await apiFetch("/houses", {
    params: {
      limit: 5,
    },
    body: {},
    next: {
      revalidate: 60,
    },
  });

  console.log(data);

  return (
    <SliderWrapper>
      {data.houses?.slice(0, 5).map((property: any) => (
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
