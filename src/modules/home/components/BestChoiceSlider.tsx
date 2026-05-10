import SliderWrapper from "@/components/common/SliderWrapper";
import HouseCard from "@/components/common/HouseCard";
import { apiFetch } from "@/core/Server-fetch/fetchApi";

const BestChoiceSlider = async () => {

  const data = await apiFetch("/houses", {
    params: {
      limit: 5,
    },
    next: {
      revalidate: 60,
    },
  });

  return (
    <SliderWrapper>
      {data.map((property: any) => (
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
