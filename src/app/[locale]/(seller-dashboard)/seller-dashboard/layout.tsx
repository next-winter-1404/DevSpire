import SellerDashboardHeader from '@/components/sellerDashboardLayout/sellerDashboardHeader/SellerDashboardHeader';
import SellerDashboardSidebar from '@/components/sellerDashboardLayout/sellerDashboardSidebar/SellerDashboardSidebar';



export default function MainLayout({children}: {children: React.ReactNode}) {

  return (
    <div className='flex gap-8 w-full p-8'>
      <SellerDashboardSidebar/>
      <div className='flex flex-col gap-8 w-full'>
        <header>
          <SellerDashboardHeader/>
        </header>
        <main>{children}</main>
      </div>
    </div>
  )

}
