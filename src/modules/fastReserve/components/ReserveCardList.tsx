import HouseCard from "@/components/common/HouseCard";
import { MOCK_DATA } from "../mocks/data";

const ReserveCardList = () => {
  return (
    <div className="w-full">
      <div className="w-full flex lg:flex-row lg:flex-wrap flex-col sm:gap-5 justify-between">
        {MOCK_DATA.map((property) => (
          <HouseCard
            key={property.id}
            property={property}
            transactionType="reservation"
            className="w-full lg:w-[32%]"
          />
        ))}
      </div>
    </div>
  );
};

export default ReserveCardList;
