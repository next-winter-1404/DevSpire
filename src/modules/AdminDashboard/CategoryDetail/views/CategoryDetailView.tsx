import { TCategory } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import CategoryProperties from "../components/CategoryProperties";


interface IProps{
    params: Promise<{ id: string }>
}

const CategoryDetailView = async ({params}: IProps) => {


    const { id } = await params;
    const param = parseInt(id);
    const data = await apiFetch<TCategory | null>(`/categories/${param}`, {
        cache: "no-store",
    });

    
    return (
        <div className="flex flex-col gap-8 h-full p-8">
            <h1 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">{data?.name}</h1>
            <CategoryProperties category={data} id={data?.id?? 0}/>
        </div>
    )

}

export default CategoryDetailView

