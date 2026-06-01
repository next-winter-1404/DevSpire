import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import LocationsManagementView from "@/modules/AdminDashboard/LocationsManagement/views/LocationsManagementView";
import { Suspense } from "react";


interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}


const page = async ({searchParams}: IProps) => {

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
            <Suspense fallback={<DashboardTableSkeleton/>}>
                <LocationsManagementView params={payLoad}/>
            </Suspense>
        </DashboardContainer>
    )

}

export default page