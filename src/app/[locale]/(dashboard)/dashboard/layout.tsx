import DashboardHeader from '@/components/dashboardLayout/DashboardHeader/DashboardHeader';
import DashboardSidebar from '@/components/dashboardLayout/DashboardSidebar/DashboardSidebar';



export default function MainLayout({children}: {children: React.ReactNode}) {

  return (
    <div className='flex gap-8 w-full p-8'>
      <DashboardSidebar/>
      <div className='flex flex-col gap-8 w-full'>
        <header>
          <DashboardHeader/>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )

}
