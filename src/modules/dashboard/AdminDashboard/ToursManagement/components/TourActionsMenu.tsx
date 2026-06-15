import Edit from "../../../../../../public/icons/Edit";
import Trash from "../../../../../../public/icons/Trash";
import { Link } from "@/i18n/routing";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import DeleteTourModal from "./DeleteTourModal";

interface IProps {
  handleActionsModal: (value: boolean) => void;
  id: number;
}

const TourActionsMenu = ({ handleActionsModal, id }: IProps) => {
  const t = useTranslations("adminDashboard.toursManagement");
  const locale = useLocale();
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);

  const handleDeleteModal = (value: boolean) => {
    setIsOpenDeleteModal(value);
  };

  return (
    <>
      <td>
        <div
          onClick={() => {
            handleActionsModal(false);
          }}
          className="absolute inset-0 z-30"
        ></div>
        <div
          className={`flex flex-col gap-1 p-2 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px] absolute top-[66%] z-90
        dark:bg-[#404040] dark:border-[#777777]
        ${locale === "en" ? "right-[4%]" : "left-[4%]"}`}
        >
          <Link
            href={`/dashboard/admin/locations-management/${id}`}
            className="flex items-center gap-2 w-full py-1 px-2 text-[#1E2022] 
          rounded-[8px] cursor-pointer   
          hover:text-[#0D3B66] hover:bg-[#E6EDF5]
          dark:text-[#E4E4E4] dark:hover:text-[#E4E4E4] dark:hover:bg-[#262626]"
          >
            <Edit />
            <span>{t("edit")}</span>
          </Link>
          <div
            onClick={() => {
              handleDeleteModal(true);
            }}
            className="flex items-center gap-2 w-full py-1 px-2 text-[#1E2022] rounded-[8px] cursor-pointer   
          hover:text-[#0D3B66] hover:bg-[#E6EDF5]
          dark:text-[#E4E4E4] dark:hover:text-[#E4E4E4] dark:hover:bg-[#262626]"
          >
            <Trash />
            <span>{t("delete")}</span>
          </div>
        </div>
      </td>
      {isOpenDeleteModal && (
        <DeleteTourModal id={id} handleDeleteModal={handleDeleteModal} />
      )}
    </>
  );
};

export default TourActionsMenu;
