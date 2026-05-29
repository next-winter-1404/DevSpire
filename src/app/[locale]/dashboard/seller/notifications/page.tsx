import { apiFetch } from '@/core/Server-fetch/fetchApi';
import { IDecodedToken } from '@/modules/fastReserveDetail/types';
import NotificationsView from '@/modules/sellerDashboard/Notifications/views/NotificationsView'
import { jwtDecode } from 'jwt-decode';
import { cookies } from 'next/headers';


interface IProps {
  searchParams: Promise<{ [key: string]: string | null }>;
}

const page = async ({ searchParams }: IProps) => {

    const cookiesStore = await cookies();
    const token = cookiesStore.get("accessToken")?.value as string;
    const decoded = jwtDecode(token) as IDecodedToken;
    
    const sparams = await searchParams;
    const params = {
        page: sparams.page ?? "",
        limit: sparams.limit ?? "",
        isRead: sparams.isRead ?? "",
        type: sparams.type ?? "",
        sort: sparams.sort ?? "",
        order: sparams.order ?? "",
    } as Record<string, string>;

    const data = await apiFetch(`/notifications/${decoded.id}`, {
        params,
        cache: "no-store",
    });



    return (
        <div>
            <NotificationsView notifications={data.data}/>
        </div>
    )

}

export default page