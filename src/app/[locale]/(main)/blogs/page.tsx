import { IBlogsParams, TBlogsResponse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import BlogsView from "@/modules/main/blogs/views/BlogsView";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

const page = async ({ searchParams }: Props) => {
  const params: IBlogsParams = await searchParams;
  const payLoad = {
    search: params.search ?? "",
    sort: params.sort ?? "",
    order: params.order ?? "DESC",
    limit: params.limit ?? "12",
    page: params.page ?? "1",
    propertyType: params.propertyType ?? "",
  };
  const data = await apiFetch<TBlogsResponse>("/blogs", {
    params: payLoad,
    next: { revalidate: 80 },
  });
  const categories = await apiFetch("/categories");

  return (
    <BlogsView
      data={
        data ?? {
          data: [],
          totalCount: 0,
        }
      }
      limit={parseInt(payLoad.limit)}
      totalCount={data?.totalCount ?? 0}
      categories={categories}
    />
  );
};

export default page;
