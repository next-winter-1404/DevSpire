import Image from 'next/image'
import Person from '../../../../public/images/home/person1.png'
import Close from '../../../../public/icons/Close'


interface IProps{
    handleChooseProfModal: (value: boolean) => void
}

const ChooseProfileModal = ({handleChooseProfModal}:IProps) => {

    return (
        <>
            <div className="bg-slate-900/40 backdrop-blur-sm animate-infade-in duration-300 absolute inset-0 cursor-pointer"></div>
            <div className="flex flex-col items-center gap-8 w-[480px] p-8 bg-[#FFFFFF] rounded-[24px] absolute top-[24%] left-[35%]">
                <div className="flex justify-between w-full">
                    <span className="font-bold text-[24px] text-[#1E2022]">انتخاب پروفایل</span>
                    <div onClick={() => {handleChooseProfModal(false)}} className="p-4 bg-[#F5F5F5] rounded-full cursor-pointer">
                        <Close className="w-4 h-4"/>
                    </div>
                </div>
                <Image src={Person} alt={"person"} className="w-40 h-40 rounded-full"/>
                <div className="flex gap-6 w-full font-regular text-[16px]">
                    <button 
                    onClick={() => {handleChooseProfModal(false)}}
                    className="w-full py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer">انصراف</button>
                    <button className="w-full py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer">انتخاب عکس</button>
                </div>
            </div>
        </>
    )

}

export default ChooseProfileModal