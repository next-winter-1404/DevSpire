'use client'
import { Link } from '@/i18n/routing'
import { usePathname } from '@/i18n/routing'
import { useTranslations } from 'next-intl'
import Dashboard from '../../../../public/icons/Dashboard'
import EditUser from '../../../../public/icons/EditUser'
import Notification from '../../../../public/icons/Notification'
import Estates from '../../../../public/icons/Estates'
import CheckList from '../../../../public/icons/CheckList'
import FinantialManagement from '../../../../public/icons/FinantialManagement'
import Chats from '../../../../public/icons/Chats'
import LogOut from '../../../../public/icons/LogOut'
import Heart from '../../../../public/icons/Heart'
import Logo from '../../../../public/icons/Logo'


interface IDashboardSidebar {
    isSellerDashboard: boolean
}

const sellerBasePath = '/dashboard/seller'
const customerBasePath = '/dashboard/customer'

const DashboardSidebar = ({ isSellerDashboard }: IDashboardSidebar) => {
    const pathname = usePathname()
    const t = useTranslations('dashboard.sidebar')

    const isActiveText = (path: string) => pathname === path 
        ? 'font-bold text-[#1E2022] dark:text-[#E4E4E4]' 
        : 'text-[#777777] dark:text-[#A3A3A3]'
    
    const isActiveIcon = (path: string) => pathname === path 
        ? 'text-[#0D3B66] dark:text-[#E4E4E4]' 
        : 'dark:text-[#A3A3A3]'

    const sellerMenuItems = [
        { href: `${sellerBasePath}`, label: t('dashboard'), Icon: Dashboard },
        { href: `${sellerBasePath}/user-profile`, label: t('userProfile'), Icon: EditUser },
        { href: `${sellerBasePath}/notifications`, label: t('notifications'), Icon: Notification },
        { href: `${sellerBasePath}/estates-management`, label: t('estatesManagement'), Icon: Estates },
        { href: `${sellerBasePath}/reserves-management`, label: t('reservesManagement'), Icon: CheckList },
        { href: `${sellerBasePath}/finantial-management`, label: t('finantialManagement'), Icon: FinantialManagement },
        { href: `${sellerBasePath}/comments-management`, label: t('commentsManagement'), Icon: Chats },
        { href: `${sellerBasePath}/logout`, label: t('logOut'), Icon: LogOut },
    ]

    const customerMenuItems = [
        { href: `${customerBasePath}`, label: t('dashboard'), Icon: Dashboard },
        { href: `${customerBasePath}/user-profile`, label: t('userProfile'), Icon: EditUser },
        { href: `${customerBasePath}/notifications`, label: t('notifications'), Icon: Notification },
        { href: `${customerBasePath}/reserves-management`, label: t('reservesManagement'), Icon: CheckList },
        { href: `${customerBasePath}/finantial-management`, label: t('finantialManagement'), Icon: FinantialManagement }, 
        { href: `${customerBasePath}/favorites`, label: t('favorites'), Icon: Heart }, 
        { href: `${customerBasePath}/logout`, label: t('logOut'), Icon: LogOut },
    ]

    const menuItems = isSellerDashboard ? sellerMenuItems : customerMenuItems

    return (
        <div className='flex flex-col gap-8 w-[268px] max-h-screen p-8 bg-[#F5F5F5] border border-[#DDDDDD] rounded-[40px]
        dark:bg-[#404040] dark:border-[#777777]'>
            <div className='flex items-center gap-4'>
                <Logo color='text-[#0D3B66]' className='w-8 h-8'/>
                <h2 className='font-bold text-[32px] text-[#1E2022] dark:text-[#F5F5F5]'>{t('logo')}</h2>
            </div>      
            
            <div className='flex flex-col gap-4'>
                <h3 className='font-regular text-[16px] text-[#0D3B66] dark:text-[#E6EDF5]'>{t('menu')}</h3>
                <div className='flex flex-col gap-6 font-regular text-[16px]'>
                    {menuItems.slice(0, 3).map(({ href, label, Icon }) => (
                        <div key={href} className='flex items-center gap-4 text-[#777777]'>
                            <Icon className={isActiveIcon(href)}/>
                            <Link href={href} className={isActiveText(href)}>{label}</Link>
                        </div>
                    ))}
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h3 className='font-regular text-[16px] text-[#0D3B66] dark:text-[#E6EDF5]'>{t('management')}</h3>
                <div className='flex flex-col gap-6 font-regular text-[16px]'>
                    {menuItems.slice(3).map(({ href, label, Icon }) => (
                        <div key={href} className='flex items-center gap-4 text-[#777777]'>
                            <Icon className={isActiveIcon(href)}/>
                            <Link href={href} className={isActiveText(href)}>{label}</Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DashboardSidebar
