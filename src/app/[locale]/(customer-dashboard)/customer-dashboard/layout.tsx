import CusDashboardHeader from "@/components/cusDashboardLayout/CusDashboardHeader/CusDashboardHeader";
import CusDashboardSidebar from "@/components/cusDashboardLayout/CusDashboardSidebar/CusDashboardSidebar";




export default function MainLayout({children}: {children: React.ReactNode}) {

  return (
    <div className='flex gap-8 p-8'>
      <CusDashboardSidebar/>  
      <div className='flex flex-col gap-8 w-full'>
        <header>
          <CusDashboardHeader/>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )

}
