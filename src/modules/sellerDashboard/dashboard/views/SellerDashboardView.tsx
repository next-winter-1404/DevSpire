'use client';
import CheckList from "../../../../../public/icons/CheckList";
import Estates from "../../../../../public/icons/Estates";
import Eye from "../../../../../public/icons/Eye";
import HourGlass from "../../../../../public/icons/HourGlass";
import CompleteProfile from "../../../../components/common/CompleteProfile";
import InCome from "../../../../components/common/InCome";
import TopCards from "../../../../components/common/TopCards";
import { useTranslations } from "next-intl";


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

  const t = useTranslations('sellerDashboard.dashboard')

  return (
    <div className='flex flex-col gap-4 p-6 bg-[#F5F5F5] border border-[#DDDDDD] rounded-[40px]   dark:bg-[#404040] dark:border-[#777777]'>
      <TopCards items={[
        {icon: Estates, title: t('allOfEstates'), value: '30'},
        {icon: CheckList, title: t('activeReserves'), value: '30'},
        {icon: HourGlass, title: t('pendingReservations'), value: '30'},
        {icon: Eye, title: t('todaysVisits'), value: '3000'}
      ]}/>
      <div className='flex gap-4'>
        <InCome title={t('incomeChart')} dateRange='از تاریخ 1 تا 31 مهر 1404' totalIncome='300,000,000' currentIncome='60,000,000'
        percentage={64}/>
        <CompleteProfile title={t('profCompletionChart')} description='پروفایل باید حداقل ۷۰٪ تکمیل شده باشد.'
        lastEditText='آخرین ویرایش 3 روز پیش' percentage={64} linkHref='/seller-dashboard/edit-profile'/>
      </div>
    </div>
  );
};

export default SellerDashboardView;
