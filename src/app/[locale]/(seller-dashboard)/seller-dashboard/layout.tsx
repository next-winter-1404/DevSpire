import DashboardHeader from "@/components/dashboardLayout/dashboardHeader/DashboardHeader";
import DashboardSidebar from "@/components/dashboardLayout/dashboardSidebar/DashboardSidebar";




export default function MainLayout({children}: {children: React.ReactNode}) {

  return (
    <div className='flex gap-8 w-full p-8'>
      <DashboardSidebar isSellerDashboard={true}/>
      <div className='flex flex-col gap-8 w-full'>
        <header>
          <DashboardHeader hasNotification={false}/>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )

}
