"use client"
import BreadCrumbs from "@/components/common/BreadCrumbs";
import { TBlogsResponse } from "@/components/common/types";
import { useTranslations } from "next-intl";
import Filters from "../components/Filters";
import BlogCard from "../components/BlogCard";
import BlogsPagination from "../components/BlogsPagination";

interface Iprops {
    data: TBlogsResponse;
    limit: number;
    totalCount: number;
    categories: []
}

const BlogsView = ({ data, limit, totalCount, categories }: Iprops) => {

    const t = useTranslations("header")
    
    return (
        <div className="flex flex-col px-12">
            <div className="mt-10">
                <BreadCrumbs
                    items={[
                    {label: t("home"), href: "/"},
                    {label: t("blogs"), href: "/blogs"}
                    ]} 
                />
            </div>             
            <Filters totalCount={totalCount} categories={categories}/>
            <div className="flex flex-wrap gap-[46px] mt-10">
                {
                    data.data?.map((item) => (
                        <BlogCard item={item} key={item.id}/>
                    ))
                }
            </div>
            <div className="mt-10">
                <BlogsPagination totalPages={Math.ceil(data?.totalCount / limit)}/>
            </div>
        </div>
    )

}

export default BlogsView