import Image from 'next/image'
import Person from '../../../../public/images/home/person1.png'
import Close from '../../../../public/icons/Close'


interface IProps{
    handleChooseProfModal: (value: boolean) => void
}

const ChooseProfileModal = ({handleChooseProfModal}:IProps) => {

    return (
        <div className="p-8 bg-[#FFFFFF] rounded-[24px]">
            <div className="flex justify-between">
                <span className="font-bold text-[24px] text-[#1E2022]">انتخاب پروفایل</span>
                <div onClick={() => {handleChooseProfModal(false)}} className="p-4 bg-[#F5F5F5] rounded-full">
                    <Close className="w-4 h-4"/>
                </div>
            </div>
            <Image src={Person} alt={"person"}/>
            <div className="flex gap-6 w-full font-regular text-[16px]">
                <button className="flex-grow text-[#777777] border border-[#777777] rounded-[16px]">انصراف</button>
                <button className="flex-grow text-[#FFFFFF] bg-[#0D3B66] rounded-[16px]">انتخاب عکس</button>
            </div>
        </div>
    )

}

export default ChooseProfileModal