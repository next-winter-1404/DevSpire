"use client";

import { useState } from "react";
import Dots from "../../../../../public/icons/Dots";
import { TCategory } from "../../../../components/common/types";
import CategoryActionsMenu from "./CategoryActionsMenu";

interface IProps {
  item: TCategory;
}

const CategoriesDataTableRow = ({ item }: IProps) => {
  const [isOpenActionsModal, setIsOpenActionsModal] = useState<boolean>(false);

  const handleActionsModal = (value: boolean) => {
    setIsOpenActionsModal(value);
  };

  return (
    <tr className="border-y border-[#DDDDDD] dark:border-[#777777]">
      <td className="px-6 py-4 text-[#1E2022] dark:text-[#E4E4E4]">
        <div className="flex flex-col gap-1 md:flex-row md:items-center">
          <span className="md:hidden text-xs text-[#777]">نام دسته‌بندی</span>

          <span>{item.name}</span>
        </div>
      </td>

      <td className="px-6 py-4 text-center relative">
        <button
          type="button"
          onClick={() => handleActionsModal(true)}
          className="inline-flex items-center justify-center p-1 text-[#1E2022] rounded-[8px] cursor-pointer
          hover:bg-[#F5F5F5] dark:text-[#E4E4E4] dark:hover:bg-[#404040]"
        >
          <Dots />
        </button>

        {isOpenActionsModal && (
          <CategoryActionsMenu
            handleActionsModal={handleActionsModal}
            id={item.id}
          />
        )}
      </td>
    </tr>
  );
};

export default CategoriesDataTableRow;
