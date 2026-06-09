"use client";
import { useState } from "react";
import Dots from "../../../../../public/icons/Dots";
import { TLocation } from "../../../../components/common/types";
import LocationActionsMenu from "./LocationActionsMenu";

interface IProps {
  item: TLocation;
}

const LocationsDataTableRow = ({ item }: IProps) => {
  const [isOpenActionsModal, setIsOpenActionsModal] = useState<boolean>(false);
  const handleActionsModal = (value: boolean) => {
    setIsOpenActionsModal(value);
  };

  return (
    <tr
      className="flex justify-between w-full py-4 px-6 border-y border-[#DDDDDD] relative   
    dark:border-[#777777]
    md:flex md:items-center"
    >
      <td className="flex flex-col w-full gap-2   md:flex-row">
        <div className="text-[#1E2022]   md:w-[40%]   dark:text-[#E4E4E4]">
          <span>{item.areaName ? item.areaName : "بدون نام"}</span>
        </div>
        <div className="text-[#1E2022]   md:w-[30%]   dark:text-[#E4E4E4]">
          <span>{item.lat}</span>
        </div>
        <div className="text-[#1E2022]   md:w-[30%]   dark:text-[#E4E4E4]">
          <span>{item.lng}</span>
        </div>
      </td>
      <td
        onClick={() => {
          handleActionsModal(true);
        }}
        className="p-1 text-[#1E2022] rounded-[8px] cursor-pointer   
      hover:bg-[#F5F5F5]
      dark:text-[#E4E4E4] dark:hover:bg-[#404040]">
        <Dots/>
      </td>
      {isOpenActionsModal && (
        <LocationActionsMenu
          handleActionsModal={handleActionsModal}
          id={item.id}
        />
      )}
    </tr>
  );
};

export default LocationsDataTableRow;
