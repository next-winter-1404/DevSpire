'use client'
import PieChart from "@/components/common/PieChart";
import { Link } from "@/i18n/routing";


const CompleteProfile = () => {


  return (
    <div className='flex flex-col flex-grow p-6 bg-[#FFFFFF] rounded-[24px]'>
      <div className='flex items-center justify-between mb-6'>
        <div className='flex flex-col gap-2'>
          <h2 className='font-bold text-[20px] text-[#1E2022]'>نمودار تکمیل پروفایل</h2>
          <p className='font-regular text-[16px] text-[#777777]'>پروفایل باید حداقل 70% تکمیل شده باشد.</p>
        </div>
        <Link href={'/user-profile'} className='py-[10px] px-4 border border-[#DDDDDD] rounded-[40px]'>تکمیل پروفایل</Link>
      </div>
      <div className='flex justify-between items-end'>
        <span className='font-regular text-[14px] text-[#777777]'>آخرین ویرایش 3 روز پیش</span>
        <PieChart percentage={60} size={130}/>
      </div>
    </div>
  );
};

export default CompleteProfile;
