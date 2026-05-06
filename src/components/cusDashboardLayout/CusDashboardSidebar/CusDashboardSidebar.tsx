'use client'
import { Link } from '@/i18n/routing'
import { usePathname } from '@/i18n/routing'
import Chats from '../../../../public/icons/Chats'
import CheckList from '../../../../public/icons/CheckList'
import Dashboard from '../../../../public/icons/Dashboard'
import EditUser from '../../../../public/icons/EditUser'
import FinantialManagement from '../../../../public/icons/FinantialManagement'
import Logo from '../../../../public/icons/Logo'
import LogOut from '../../../../public/icons/LogOut'
import Notification from '../../../../public/icons/Notification'
import Heart from '../../../../public/icons/Heart'


const CusDashboardSidebar = () => {


    const pathname = usePathname()

    const isActiveText = (path: string) => pathname === path ? 'font-bold text-[#1E2022]' : 'text-[#777777]'
    const isActiveIcon = (path: string) => pathname === path ? 'text-[#0D3B66]' : 'text-[#777777]'


    return (
        <div className='flex flex-col gap-8 w-[268px] p-8 bg-[#F5F5F5] border border-[#DDDDDD] rounded-[40px]'>
            <div className='flex items-center gap-4'>
                <Logo color='text-[#0D3B66]' className='w-8 h-8'/>
                <h2 className='font-bold text-[32px] text-[#1E2022]'>لوگو</h2>
            </div>
            <div className='flex flex-col gap-4'>
                <h3 className='font-regular text-[16px] text-[#0D3B66]'>منو</h3>
                <div className='flex flex-col gap-6 font-regular text-[16px]'>
                    <div className='flex items-center gap-4 text-[#777777]'>
                        <Dashboard color={isActiveIcon('/dashboard')}/>
                        <Link href={'/dashboard'} className={isActiveText('/dashboard')}>داشبورد</Link>
                    </div>
                    <div className='flex items-center gap-4 text-[#777777]'>
                        <EditUser color={isActiveIcon('/userProfile')}/>
                        <Link href={'/userProfile'} className={isActiveText('/userProfile')}>مشخصات کاربری</Link>
                    </div>
                    <div className='flex items-center gap-4 text-[#777777]'>
                        <Notification color={isActiveIcon('/notifications')}/>
                        <Link href={'/notifications'} className={isActiveText('/notifications')}>اعلان ها</Link>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h3 className='font-regular text-[16px] text-[#0D3B66]'>مدیریت</h3>
                <div className='flex flex-col gap-6 font-regular text-[16px]'>
                    <div className='flex items-center gap-4 text-[#777777]'>
                        <CheckList color={isActiveIcon('/reservesManagement')}/>
                        <Link href={'/reservesManagement'} className={isActiveText('/reservesManagement')}>مدیریت رزرو ها</Link>
                    </div>
                    <div className='flex items-center gap-4 text-[#777777]'>
                        <FinantialManagement color={isActiveIcon('/paymentManagement')}/>
                        <Link href={'/paymentManagement'} className={isActiveText('/paymentManagement')}>مدیریت پرداخت ها</Link>
                    </div>
                    <div className='flex items-center gap-4 text-[#777777]'>
                        <Heart color={isActiveIcon('/favorites')}/>
                        <Link href={'/favorites'} className={isActiveText('/favorites')}>علاقه مندی ها</Link>
                    </div>
                    <div className='flex items-center gap-4 text-[#777777]'>
                        <LogOut color={isActiveIcon('/logOu')}/>
                        <Link href={'/logOut'} className={isActiveText('/logOut')}>خروج از حساب</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CusDashboardSidebar
