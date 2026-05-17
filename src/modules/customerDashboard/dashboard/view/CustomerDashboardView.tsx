import React from 'react'
import CompleteProfile from '@/components/common/CompleteProfile'
import InCome from '@/components/common/InCome'
import TopCards from '@/components/common/TopCards'
import DotList from '../../../../../public/icons/DotList'
import CheckList from '../../../../../public/icons/CheckList'
import NotPaid from '../../../../../public/icons/NotPaid'
import Heart from '../../../../../public/icons/Heart'
import { useTranslations } from 'next-intl'


const CustomerDashboardView = () => {

  const t = useTranslations('customerDashboard.dashboard')

  return(
    <div className='flex flex-col gap-4 p-6 bg-[#F5F5F5] border border-[#DDDDDD] rounded-[40px]   dark:bg-[#404040] dark:border-[#777777]'>
      <TopCards items={[
        {icon: DotList, title: t('allOfReserves'), value: '30'},
        {icon: CheckList, title: t('activeReserves'), value: '30'},
        {icon: NotPaid, title: t('notPaid'), value: '30'},
        {icon: Heart, title: t('favorites'), value: '3000'}
      ]}/>
      <div className='flex gap-4'>
        <InCome title={t('incomeChart')} dateRange='از تاریخ 1 تا 31 مهر 1404' totalIncome='300,000,000' currentIncome='60,000,000'
        percentage={64}/>
        <CompleteProfile title={t('profCompletionChart')} description='پروفایل باید حداقل ۷۰٪ تکمیل شده باشد.'
        lastEditText='آخرین ویرایش 3 روز پیش' percentage={64} linkHref='/seller-dashboard/edit-profile'/>
      </div>
    </div>
  )

}

export default CustomerDashboardView