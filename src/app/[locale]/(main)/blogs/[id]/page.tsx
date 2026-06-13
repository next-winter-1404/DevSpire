import { TBlog } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import ArticleDetailView from "@/modules/main/blogDetail/views/BlogDetailView";
import { notFound } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const param = parseInt(id);
  if (!param) {
    notFound();
  }
  const data = await apiFetch<TBlog | null>(`/blogs/${param}`, {
    next: { revalidate: 80 },
  });
  if (!data) notFound();

  return (
    <div className="min-h-screen">
      <ArticleDetailView blog={data} />
    </div>
  );
};

export default page;
