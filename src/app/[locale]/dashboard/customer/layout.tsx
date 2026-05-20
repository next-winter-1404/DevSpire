import DashboardHeader from "@/components/dashboardLayout/dashboardHeader/DashboardHeader";
import DashboardSidebar from "@/components/dashboardLayout/dashboardSidebar/DashboardSidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-8 w-full p-5 h-screen ">
      <DashboardSidebar isSellerDashboard={false} />
      <div className="flex flex-col gap-5 w-full h-full">
        <header>
          <DashboardHeader hasNotification={true} isSellerDashboard={true}/>
        </header>
        <main
          className="h-full  p-5 bg-[#F5F5F5] border
     border-[#DDDDDD] rounded-[40px]   overflow-y-auto scroll-smooth
    dark:bg-[#404040] dark:border-[#777777]"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
