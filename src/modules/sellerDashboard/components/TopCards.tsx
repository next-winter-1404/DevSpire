import ArrowLinkCircle from "../../../../public/icons/ArrowLinkCircle"
import CheckList from "../../../../public/icons/CheckList"
import Estates from "../../../../public/icons/Estates"
import Eye from "../../../../public/icons/Eye"
import HourGlass from "../../../../public/icons/HourGlass"


const TopCards = () => {
    return (
        <div className='flex flex-col p-6 bg-[#F5F5F5] border border-[#DDDDDD] rounded-[40px]'>
            <div className='flex gap-4'>
                <div className='flex flex-grow justify-between p-4 bg-[#FFFFFF] rounded-[24px]'>
                    <div className='flex gap-4'>
                        <div className='p-3 bg-[#E6EDF5] rounded-[8px]'>
                            <Estates/>
                        </div>
                        <div className='flex flex-col text-[#1E2022]'>
                            <span className='font-regular text-[16px]'>کل ملک ها</span>
                            <span className='font-bold text-[24px]'>30</span>
                        </div>
                    </div>
                    <ArrowLinkCircle/>
                </div>
                <div className='flex flex-grow justify-between p-4 bg-[#FFFFFF] rounded-[24px]'>
                    <div className='flex gap-4'>
                        <div className='p-3 bg-[#E6EDF5] rounded-[8px]'>
                            <CheckList/>
                        </div>
                        <div className='flex flex-col text-[#1E2022]'>
                            <span className='font-regular text-[16px]'>رزرو های فعال</span>
                            <span className='font-bold text-[24px]'>30</span>
                        </div>
                    </div>
                    <ArrowLinkCircle/>
                </div>
                <div className='flex flex-grow justify-between p-4 bg-[#FFFFFF] rounded-[24px]'>
                    <div className='flex gap-4'>
                        <div className='p-3 bg-[#E6EDF5] rounded-[8px]'>
                            <HourGlass/>
                        </div>
                        <div className='flex flex-col text-[#1E2022]'>
                            <span className='font-regular text-[16px]'>رزرو های در انتظار</span>
                            <span className='font-bold text-[24px]'>30</span>
                        </div>
                    </div>
                    <ArrowLinkCircle/>
                </div>
                <div className='flex flex-grow justify-between p-4 bg-[#FFFFFF] rounded-[24px]'>
                    <div className='flex gap-4'>
                        <div className='p-3 bg-[#E6EDF5] rounded-[8px]'>
                            <Eye/>
                        </div>
                        <div className='flex flex-col text-[#1E2022]'>
                            <span className='font-regular text-[16px]'>بازدید های امروز</span>
                            <span className='font-bold text-[24px]'>30</span>
                        </div>
                    </div>
                    <ArrowLinkCircle/>
                </div>
            </div>
        </div>  
    )
}

export default TopCards