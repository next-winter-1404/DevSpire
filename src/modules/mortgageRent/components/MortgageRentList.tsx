import HouseCard from "@/components/common/HouseCard";
import React, { useEffect, useState } from "react";

const MortgageRentList = () => {

  

  return (
    <div className="flex flex-wrap gap-6 w-full mt-10">
      {/* {data.houses?.map((property: any) => (
        <div
          dir="rtl"
          key={property.id}
          className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"
        >
          <HouseCard
            className="w-full"
            property={property}
            transactionType="rental"
          />
        </div>
      ))} */}
    </div>
  );
};

export default MortgageRentList;
