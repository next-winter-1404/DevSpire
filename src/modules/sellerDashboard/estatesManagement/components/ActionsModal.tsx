import CircleTick from "../../../../../public/icons/CircleTick"
import Edit from "../../../../../public/icons/Edit"
import Trash from "../../../../../public/icons/Trash"
import { useState } from "react"
import DeleteModal from "./DeleteModal"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { DeleteHouse } from "../services/DELETE/deleteHouse"
import toast from "react-hot-toast"
import { Link, useRouter } from "@/i18n/routing"
import axios from "axios"
import { TUserHouse } from "@/components/common/types"


interface IProps{
  setIsOpenActionsModal: (value: boolean) => void
  item: TUserHouse
}

const ActionsModal = ({setIsOpenActionsModal, item}:IProps) => {


  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false)


  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteHouseMutation = useMutation({
    mutationFn: () => DeleteHouse(item.id),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "ملک مورد نظر با موفقیت حذف شد");
      queryClient.invalidateQueries({
        queryKey: ["DELETEHOUSE"],
      });
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message || "مشکلی در حذف پیش آمد");
      }
    },
  });
  
  return (
    <>
      <div onClick={() => {setIsOpenActionsModal(false)}} className="w-full h-full fixed inset-0 z-20"></div>

      <div className="flex flex-col gap-1 w-[119px] p-2 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px] 
      shadow-[4px_4px_4px_0px_rgba(0,0,0,0.15)] absolute top-12 left-13 z-30">
        <button
        onClick={() => {setIsOpenActionsModal(false)}}
        className="flex items-center gap-2 py-1 pr-2 text-[#1E2022] rounded-[8px] cursor-pointer   hover:text-[#0D3B66] hover:bg-[#E6EDF5]">
          <CircleTick/>
          <span className="font-regular text-[14px]">فعال کردن</span>
        </button>
        <Link 
        href={`/estates-management/${item.id}`}
        onClick={() => {setIsOpenActionsModal(false)}}
        className="flex items-center gap-2 py-1 pr-2 text-[#1E2022] rounded-[8px] cursor-pointer   hover:text-[#0D3B66] hover:bg-[#E6EDF5]">
          <Edit/>
          <span className="font-regular text-[14px]">ویرایش</span>
        </Link>
        <div 
        onClick={() => {setIsOpenDeleteModal(true)}}
        className="flex items-center gap-2 py-1 pr-2 text-[#1E2022] rounded-[8px] cursor-pointer   hover:text-[#0D3B66] hover:bg-[#E6EDF5]">
          <Trash/>
          <span className="font-regular text-[14px]">حذف</span>
        </div>
      </div>

      {
        isOpenDeleteModal && <DeleteModal setIsOpenDeleteModal={setIsOpenDeleteModal} deleteHouseMutation={() => {deleteHouseMutation.mutate()}}/>
      }
    </>
  )
}

export default ActionsModal