"use client"
import BreadCrumbs from "@/components/common/BreadCrumbs";
import ArticlesPagination from "../components/ArticlesPagination";
import { TArticlesResponse } from "@/components/common/types";
import { useTranslations } from "next-intl";
import ArticleCard from "../components/ArticleCard";
import Filters from "../components/Filters";

interface Iprops {
    data: TArticlesResponse;
    limit: number;
    totalCount: number;
    categories: []
}

const ArticlesView = ({ data, limit, totalCount, categories }: Iprops) => {

    const t = useTranslations("header")
    
    return (
        <div className="flex flex-col px-12">
            <div className="mt-10">
                <BreadCrumbs
                    items={[
                    {label: t("home"), href: "/"},
                    {label: t("articles"), href: "/articles"}
                    ]} 
                />
            </div>             
            <Filters totalCount={totalCount} categories={categories}/>
            <div className="flex flex-wrap gap-10 mt-10">
                {
                    data.data?.map((item) => (
                        <ArticleCard item={item} key={item.id}/>
                    ))
                }
            </div>
            <div className="mt-10">
                <ArticlesPagination totalPages={Math.ceil(data?.totalCount / limit)}/>
            </div>
        </div>
    )

}

export default ArticlesView