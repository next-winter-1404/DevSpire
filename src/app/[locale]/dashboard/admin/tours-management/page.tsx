import { DashboardTableSkeleton } from "@/components/common/DashboardTableSkeleton";
import DashboardContainer from "@/components/dashboard/DashboardContainer";
import ToursManagementView from "@/modules/AdminDashboard/ToursManagement/views/ToursManagementView";
import { Suspense } from "react";



interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}

const page = async ({searchParams}: IProps) => {

    const params = await searchParams;
    const payLoad = {
        title: params.title ?? "",
        tag: params.tag ?? "",
        page: params.page ?? "1",
        limit: params.limit ?? "5",
    } as Record<string, string>;

    return (
        <DashboardContainer>
            <Suspense fallback={<DashboardTableSkeleton/>}>
                <ToursManagementView params={payLoad}/>
            </Suspense>
        </DashboardContainer>
    )

}

export default page