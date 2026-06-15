"use client";

import { useState } from "react";
import Dots from "../../../../../../public/icons/Dots";
import { TCategory } from "../../../../../components/common/types";
import CategoryActionsMenu from "./CategoryActionsMenu";

interface IProps {
  item: TCategory;
}

const CategoriesDataTableRow = ({ item }: IProps) => {
  const [isOpenActionsModal, setIsOpenActionsModal] = useState(false);

  const handleActionsModal = (value: boolean) => {
    setIsOpenActionsModal(value);
  };

  return (
    <tr
      className="
      block md:table-row
      border border-[#DDDDDD] md:border-y
      rounded-xl md:rounded-none
      p-4 md:p-0
      mb-3 md:mb-0
      dark:border-[#777777]
      bg-[#ffff] dark:bg-transparent
      "
    >
      <td
        className="
        block md:table-cell
        px-0 md:px-6
        py-2 md:py-4
        text-[#1E2022] dark:text-[#E4E4E4]
        "
      >
        <div className="flex justify-between items-center md:block">
          <span className="text-xs text-[#777] md:hidden">نام دسته‌بندی</span>

          <span className="font-medium">{item.name}</span>
        </div>
      </td>

      <td
        className="
        block md:table-cell
        px-0 md:px-6
        py-2 md:py-4
        text-end md:text-center
        relative
        "
      >
        <button
          type="button"
          onClick={() => handleActionsModal(true)}
          className="inline-flex items-center justify-center p-2 rounded-lg
          hover:bg-[#F5F5F5] dark:hover:bg-[#404040]"
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
