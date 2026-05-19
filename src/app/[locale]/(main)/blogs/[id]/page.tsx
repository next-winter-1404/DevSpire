import { TBlog } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import ArticleDetailView from "@/modules/blogDetail/views/BlogDetailView";
import { notFound } from "next/navigation";


const page = async ({params}:{params: Promise<{ id: string }>}) => {

    const { id } = await params;
    const param = parseInt(id);
    if (!param) {
        notFound();
    }
    const data = await apiFetch<TBlog | null>(`/blogs/${param}`, {
        next: { revalidate: 60 * 2 },
    });
    if (!data) notFound();

    return (
        <div>
            <ArticleDetailView blog={data}/>
        </div>
    )

}

export default page