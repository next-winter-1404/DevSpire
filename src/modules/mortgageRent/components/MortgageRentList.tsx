import HouseCard from "@/components/common/HouseCard";
import { MOCK_DATA } from "@/modules/fastReserve/mocks/data";
import React from "react";

const MortgageRentList = () => {
  return (
    <div className="flex flex-wrap gap-6 w-full mt-10">
      {MOCK_DATA.map((property) => (
        <div
          dir="rtl"
          key={property.id}
          className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"
        >
          <HouseCard
            className="w-full"
            transactionType="rental"
            property={property}
          />
        </div>
      ))}
    </div>
  );
};

export default MortgageRentList;
