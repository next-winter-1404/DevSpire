import React from 'react'
import Close from '../../../../../public/icons/Close'


interface IProps{
    setIsOpenDeleteModal: (value: boolean) => void
    deleteHouseMutation: () => void
}

const DeleteModal = ({setIsOpenDeleteModal, deleteHouseMutation}:IProps) => {

    return (
        <>
            <div onClick={() => {setIsOpenDeleteModal(false)}} className="w-full h-full bg-black/40 backdrop-blur-sm fixed inset-0 z-20
            animate-fadeIn">
            </div>

            <div className="flex flex-col items-center gap-8 w-[400px] p-8 bg-[#FFFFFF] rounded-[24px] fixed right-160 z-30">
                <div className="flex justify-end w-full">
                    <div onClick={() => {setIsOpenDeleteModal(false)}} className="p-4 bg-[#F5F5F5] rounded-full cursor-pointer">
                        <Close className="w-4 h-4"/>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <span className="font-bold text-[24px] text-[#1E2022]">آیا از حذف مطمئن هستید؟</span>
                    <p className="font-regular text-[16px] text-[#777777]">امکان برگشت پس از حذف وجود ندارد !</p>
                </div>
                <div className="flex gap-6 w-full font-regular text-[16px]">
                    <button className="w-full py-[13px] text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer">
                        انصراف
                    </button>
                    <button 
                    onClick={() => {deleteHouseMutation; setIsOpenDeleteModal(false)}} 
                    className="w-full py-[13px] text-[#FFFFFF] bg-[#FF5555] rounded-[16px] cursor-pointer">
                        حذف
                    </button>
                </div>
            </div>
        </>
    )

}

export default DeleteModal