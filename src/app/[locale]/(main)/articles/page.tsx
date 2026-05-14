import { IArticlesParams, TArticlesResponse } from '@/components/common/types';
import { apiFetch } from '@/core/Server-fetch/fetchApi';
import ArticlesView from '@/modules/articles/views/ArticlesView'

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const page = async ({ searchParams }: Props) => {

    const params: IArticlesParams = await searchParams;
    const payLoad = {
        search: params.search ?? "",
        sort: params.sort ?? "",
        order: params.order ?? "DESC",
        limit: params.limit ?? "12",
        page: params.page ?? "1",
        propertyType: params.propertyType ?? "",
    };
    const data = await apiFetch<TArticlesResponse>("/blogs", {
        params: payLoad,
        cache: "no-cache",
        next:{
            revalidate: 60*2
        } 
    });

    return (
        <ArticlesView         
            data={
            data ?? {
                data: [],
                totalCount: 0,
            }
            }
            limit={parseInt(payLoad.limit)}
            totalCount={data?.totalCount ?? 0}
        />
    )

}

export default page