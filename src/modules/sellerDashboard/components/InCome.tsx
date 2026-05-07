'use client'
import PieChart from "@/components/common/PieChart";


const InCome = () => {


  return (
    <div className='flex flex-col flex-grow p-6 bg-[#FFFFFF] rounded-[24px]'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-bold text-[20px] text-[#1E2022]'>نمودار درآمد</h2>
          <p className='font-regular text-[16px] text-[#777777]'>از تاریخ 1 تا 30 مهر</p>
        </div>
        <select className='py-[10px] px-4 border border-[#DDDDDD] rounded-[40px] bg-white text-[#777777]'>
          <option value=''>ماه جاری</option>
        </select>
      </div>
      <div className='flex justify-between items-end'>
        <div className='flex gap-4'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <div className='w-4 h-4 bg-[#E6EDF5] rounded-full'></div>
              <span>درآمد کل</span>
            </div>
            <div className='font-regular text-[14px] text-[#1E2022]'>
              <span>300,000,000</span>
              <span>تومان</span>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <div className='w-4 h-4 bg-[#0D3B66] rounded-full'></div>
              <span>درآمد این ماه</span>
            </div>
            <div className='font-regular text-[14px] text-[#1E2022]'>
              <span>60,000,000</span>
              <span>تومان</span>
            </div>
          </div>
        </div>
        <PieChart percentage={60} size={130}/>
      </div>
    </div>
  );
};

export default InCome;
