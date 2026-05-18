import CircleTick from "../../../../../public/icons/CircleTick"
import Edit from "../../../../../public/icons/Edit"
import Trash from "../../../../../public/icons/Trash"


const ActionsModal = () => {
  return (
    <div className="flex flex-col p-2 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[16px] shadow-[0px_4px_12px_0px_rgba(0,0,0,0.15)]">
      <div className="text-[#1E2022] rounded-[8px]   hover:bg-[#E6EDF5]">
        <CircleTick/>
        <span className="font-regular text-[14px]">فعال کردن</span>
      </div>
      <div className="text-[#1E2022] rounded-[8px]   hover:bg-[#E6EDF5]">
        <Edit/>
        <span className="font-regular text-[14px]">ویرایش</span>
      </div>
      <div className="text-[#1E2022] rounded-[8px]   hover:bg-[#E6EDF5]">
        <Trash/>
        <span className="font-regular text-[14px]">حذف</span>
      </div>
    </div>
  )
}

export default ActionsModal