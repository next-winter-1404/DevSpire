import React from 'react'
import Close from '../../../../../public/icons/Close'


interface IProps{
    setIsOpenDeleteModal: (value:boolean) => void
}

const DeleteModal = ({setIsOpenDeleteModal}:IProps) => {

    return (
        <>
            <div onClick={() => {setIsOpenDeleteModal(false)}} className="w-full h-full bg-black/40 backdrop-blur-sm fixed inset-0 z-20
            animate-fadeIn">
            </div>

            <div className="flex flex-col items-end gap-8 p-8 bg-[#FFFFFF] rounded-[24px] fixed right-160 z-30">
                <div onClick={() => {setIsOpenDeleteModal(false)}} className="p-4 bg-[#F5F5F5] rounded-full cursor-pointer">
                    <Close className="w-4 h-4"/>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <span className="font-bold text-[24px] text-[#1E2022]">آیا از حذف مطمئن هستید؟</span>
                    <p className="font-regular text-[16px] text-[#777777]">امکان برگشت پس از حذف وجود ندارد !</p>
                </div>
            </div>
        </>
    )

}

export default DeleteModal