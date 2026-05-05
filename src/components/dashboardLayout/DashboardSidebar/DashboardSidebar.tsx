import Chats from '../../../../public/icons/Chats'
import CheckList from '../../../../public/icons/CheckList'
import Dashboard from '../../../../public/icons/Dashboard'
import EditUser from '../../../../public/icons/EditUser'
import Estates from '../../../../public/icons/Estates'
import FinantialManagement from '../../../../public/icons/FinantialManagement'
import Logo from '../../../../public/icons/Logo'
import LogOut from '../../../../public/icons/LogOut'
import Notification from '../../../../public/icons/Notification'


const DashboardSidebar = () => {

    return (
        <div className='flex flex-col gap-8 p-8 bg-[#F5F5F5] border border-[#DDDDDD] rounded-[40px]'>
            <div className='flex items-center gap-4'>
                <Logo color='text-[#0D3B66]' className='w-8 h-8'/>
                <h2 className='font-bold text-[32px] text-[#1E2022]'>لوگو</h2>
            </div>
            <div className='flex flex-col gap-4'>
                <h3 className='font-regular text-[16px] text-[#0D3B66]'>منو</h3>
                <div className='flex flex-col gap-6'>
                    <div className='flex items-center gap-4'>
                        <Dashboard/>
                        <span className='font-regular text-[20px] text-[#777777]'>داشبورد</span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <EditUser/>
                        <span className='font-regular text-[20px] text-[#777777]'>مشخصات کاربری</span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Notification/>
                        <span className='font-regular text-[20px] text-[#777777]'>اعلان ها</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-4'>
                <h3 className='font-regular text-[16px] text-[#0D3B66]'>مدیریت</h3>
                <div className='flex flex-col gap-6'>
                    <div className='flex items-center gap-4'>
                        <Estates/>
                        <span className='font-regular text-[20px] text-[#777777]'>مدیریت املاک</span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <CheckList/>
                        <span className='font-regular text-[20px] text-[#777777]'>مدیریت رزرو ها</span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <FinantialManagement/>
                        <span className='font-regular text-[20px] text-[#777777]'>مدیریت مالی</span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <Chats/>
                        <span className='font-regular text-[20px] text-[#777777]'>مدیریت نظرات</span>
                    </div>
                    <div className='flex items-center gap-4'>
                        <LogOut/>
                        <span className='font-regular text-[20px] text-[#777777]'>خروج از حساب</span>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default DashboardSidebar