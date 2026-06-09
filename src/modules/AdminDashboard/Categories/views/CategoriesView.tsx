import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { TCategoriesResponse } from "@/components/common/types";
import CategoriesList from "../components/CategoriesList";
import CategoriesTop from "../components/CatgoriesTop";



interface IProps {
  params: Record<string, string>;
}

const CategoriesView = async ({params}: IProps) => {

    const data = await apiFetch<TCategoriesResponse | null>("/categories", {params: params, cache: "no-store"},);


    return (
        <div className="flex flex-col gap-4">
            <CategoriesTop/>
            {
                data && data.totalCount > 0 
                ? 
                <CategoriesList data={data}/>
                : 
                <div className="flex justify-center w-full">
                    <span>مکانی وجود ندارد</span>
                </div>
            }
        </div>
    )

}

export default CategoriesView

