import { useMutation, useQueryClient } from "@tanstack/react-query";
import Edit from "../../../../../public/icons/Edit"
import Trash from "../../../../../public/icons/Trash"
import { DeleteLocation } from "../services/DELETE/DeleteLocation";
import { useRouter } from "@/i18n/routing";
import toast from "react-hot-toast";
import axios from "axios";
import { useState } from "react";
import DeleteLocationModal from "./DeleteLocationModal";



interface IProps{
  handleActionsModal: (value:boolean) => void;
  id: number
}

const LocationActionsMenu = ({handleActionsModal, id}: IProps) => {

  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false)


  const handleDeleteModal = (value: boolean) => {
    setIsOpenDeleteModal(value);
  }


  return (
    <>
      <td>
        <div onClick={() => {handleActionsModal(false)}} className="absolute inset-0 z-30"></div>
        <div className="flex flex-col gap-1 p-2 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px] absolute top-[%30] left-[16%] z-90">
          <div className="flex items-center gap-2 w-full py-1 px-2 text-[#1E2022] rounded-[8px] cursor-pointer   
          hover:text-[#0D3B66] hover:bg-[#E6EDF5]">
            <Edit/>
            <span>ویرایش</span>
          </div>
          <div 
          onClick={() => {handleDeleteModal(true)}}
          className="flex items-center gap-2 w-full py-1 px-2 text-[#1E2022] rounded-[8px] cursor-pointer   
          hover:text-[#0D3B66] hover:bg-[#E6EDF5]">
            <Trash/>
            <span>حذف</span>
          </div>
        </div>
      </td>
      {isOpenDeleteModal && <DeleteLocationModal id={id} handleDeleteModal={handleDeleteModal}/>}
    </>
  )

}

export default LocationActionsMenu