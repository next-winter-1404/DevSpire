import { apiFetch } from "@/core/Server-fetch/fetchApi"
import CircleTick from "../../../../../public/icons/CircleTick"
import Edit from "../../../../../public/icons/Edit"
import Trash from "../../../../../public/icons/Trash"
import { useState } from "react"
import DeleteModal from "./DeleteModal"


interface IProps{
  setIsOpenActionsModal: (value: boolean) => void
}

const ActionsModal = ({setIsOpenActionsModal}:IProps) => {

  // const data = await apiFetch("/houses", {
  //   cache: "no-cache",
  // });
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)
  const handleModals = () => {
    setIsOpenDeleteModal(true)  
    setIsOpenActionsModal(false); 
  } 

  
  return (
    <>
      <div onClick={() => {setIsOpenActionsModal(false)}} className="w-full h-full fixed inset-0 z-20"></div>

      <div className="flex flex-col gap-1 w-[119px] p-2 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px] 
      shadow-[4px_4px_4px_0px_rgba(0,0,0,0.15)] absolute top-12 left-13 z-30">
        <div
        onClick={() => {setIsOpenActionsModal(false)}}
        className="flex items-center gap-2 py-1 pr-2 text-[#1E2022] rounded-[8px] cursor-pointer   hover:text-[#0D3B66] hover:bg-[#E6EDF5]">
          <CircleTick/>
          <span className="font-regular text-[14px]">فعال کردن</span>
        </div>
        <div 
        onClick={() => {setIsOpenActionsModal(false)}}
        className="flex items-center gap-2 py-1 pr-2 text-[#1E2022] rounded-[8px] cursor-pointer   hover:text-[#0D3B66] hover:bg-[#E6EDF5]">
          <Edit/>
          <span className="font-regular text-[14px]">ویرایش</span>
        </div>
        <div 
        onClick={handleModals}
        className="flex items-center gap-2 py-1 pr-2 text-[#1E2022] rounded-[8px] cursor-pointer   hover:text-[#0D3B66] hover:bg-[#E6EDF5]">
          <Trash/>
          <span className="font-regular text-[14px]">حذف</span>
        </div>
      </div>

      {
        isOpenDeleteModal && <DeleteModal setIsOpenDeleteModal={setIsOpenDeleteModal}/>
      }
    </>
  )
}

export default ActionsModal