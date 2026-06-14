import { IBlogsParams, TBlogsResponse } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import BlogsView from "@/modules/main/blogs/views/BlogsView";
import { customMetadataGenerator } from "@/utils/helper/Metadata";

type Props = {
  searchParams: Promise<{ [key: string]: string | undefined }>;
};

export async function generateMetadata() {
  return customMetadataGenerator({
    title: "مقالات",
    description: "صفجه ی مقالات راجب املاک ",
    keywords: ["blogs", "مقالات", "ملک"],
  });
}

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

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: data?.data.map((blog, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: blog.title,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/blogs/${blog.id}`,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
    </>
  );
};

export default page;
