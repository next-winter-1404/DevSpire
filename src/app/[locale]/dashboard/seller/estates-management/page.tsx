import { IUserHouseParams, TUserHouseResponse } from '@/components/common/types';
import { apiFetch } from '@/core/Server-fetch/fetchApi';
import EstatesManagementView from '@/modules/sellerDashboard/estatesManagement/views/EstatesManagementView'



type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const page = async ({searchParams}:Props) => {

    const params: IUserHouseParams = await searchParams;
    const payLoad = {
        search: params.search ?? "",
        sort: params.sort ?? "",
        order: params.order ?? "DESC",
        limit: params.limit ?? "9",
        page: params.page ?? "1",
        propertyType: params.propertyType ?? "",
    };
    const data = await apiFetch<TUserHouseResponse>("/blogs", {
        params: payLoad,
        cache: "no-cache",
    });

    return (
        <div>
            <EstatesManagementView/>
        </div>
    )

}

export default page