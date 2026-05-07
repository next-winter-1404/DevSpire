'use client';

import CompleteProfile from "../components/CompleteProfile";
import InCome from "../components/InCome";
import TopCards from "../components/TopCards";


const columns = [
  { key: 'residenceName', label: 'نام اقامتگاه', align: 'right' },
  { key: 'reserveDate', label: 'تاریخ رزرو', align: 'center' },
  { key: 'price', label: 'قیمت', align: 'center' },
  { key: 'status', label: 'وضعیت', align: 'center' },
];

const data = [
  { residenceName: 'هتل سراوان رانین رشت', reserveDate: '12 مرداد 1404 - 12:33', price: '2,000,000 تومان', status: 'تایید شده' },
  { residenceName: 'هتل سراوان رانین رشت', reserveDate: '12 مرداد 1404 - 12:33', price: '2,000,000 تومان', status: 'تایید شده' },
  { residenceName: 'هتل سراوان رانین رشت', reserveDate: '12 مرداد 1404 - 12:33', price: '2,000,000 تومان', status: 'تایید شده' },
  { residenceName: 'هتل سراوان رانین رشت', reserveDate: '12 مرداد 1404 - 12:33', price: '2,000,000 تومان', status: 'تایید شده' },
  { residenceName: 'هتل سراوان رانین رشت', reserveDate: '12 مرداد 1404 - 12:33', price: '2,000,000 تومان', status: 'تایید شده' },
];


const SellerDashboardView = () => {
  return (
    <div className='flex flex-col gap-4 p-6 bg-[#F5F5F5] border border-[#DDDDDD] rounded-[40px]'>
      <TopCards />
      <div className='flex gap-4'>
        <InCome />
        <CompleteProfile />
      </div>
    </div>
  );
};

export default SellerDashboardView;
