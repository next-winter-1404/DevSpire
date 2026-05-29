import { DashboardTableSkeleton } from '@/components/common/DashboardTableSkeleton';
import { apiFetch } from '@/core/Server-fetch/fetchApi';
import { IDecodedToken } from '@/modules/fastReserveDetail/types';
import NotificationsView from '@/modules/sellerDashboard/Notifications/views/NotificationsView'
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';
import { Suspense } from 'react';


interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}

const page = async ({ searchParams }: IProps) => {

    const cookiesStore = await cookies();
    const token = cookiesStore.get("accessToken")?.value as string;
    const decoded = jwtDecode(token) as IDecodedToken;
    
    const params = await searchParams;
    const payLoad = {
        page: params.page ?? "",
        limit: params.limit ?? "6",
        isRead: params.isRead ?? "",
        type: params.type ?? "",
        sort: params.sort ?? "",
        order: params.order ?? "",
    } as Record<string, string>;

    const data = await apiFetch(`/notifications/${decoded.id}`, {
        params: payLoad,
        cache: "no-store",
    });


    return (
        <div> 
            <Suspense fallback={<DashboardTableSkeleton/>}>
                <NotificationsView data={data}/>
            </Suspense>
        </div>
    )

}

export default page