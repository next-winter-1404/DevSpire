import { TBlog } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import ArticleDetailView from "@/modules/main/blogDetail/views/BlogDetailView";
import { customMetadataGenerator } from "@/utils/helper/Metadata";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const param = parseInt(id);

  const data = await apiFetch<TBlog | null>(`/blogs/${param}`, {
    next: { revalidate: 80 },
  });
  if (!data) {
    return customMetadataGenerator({ title: "not found" });
  }
  return customMetadataGenerator({
    title: data.title,
    description: data.caption,
  });
}

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const param = parseInt(id);

  const data = await apiFetch<TBlog | null>(`/blogs/${param}`, {
    next: { revalidate: 80 },
  });
  if (!data) notFound();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "blog",
    title: data.title,
    caption: data.caption,
  };

  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen">
        <ArticleDetailView blog={data} />
      </div>
    </article>
  );
};

export default page;
