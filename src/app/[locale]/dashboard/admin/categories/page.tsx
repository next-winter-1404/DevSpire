import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import CategoriesView from "@/modules/AdminDashboard/Categories/views/CategoriesView";
import { Suspense } from "react";


interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}


const page = async ({ searchParams }: IProps) => {
  const params = await searchParams;
  const payLoad = {
    page: params.page ?? "1",
    limit: params.limit ?? "5",
    sort: params.sort ?? "",
    order: params.order ?? "DESC",
    area_name: params.area_name ?? "",
    lat: params.lat ?? "",
    lng: params.lng ?? "",
  } as Record<string, string>;

  return (
    <DashboardContainer>
      <Suspense fallback={<DashboardTableSkeleton />}>
        <CategoriesView params={payLoad} />
      </Suspense>
    </DashboardContainer>
  );
};

export default page;
