"use client";
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
  categories: [];
}

const BlogsView = ({ data, limit, totalCount, categories }: Iprops) => {
  const t = useTranslations("header");

  return (
    <div className="flex flex-col px-12 w-full dark:bg-[#1E1E21]">
      <div className="mt-10 ">
        <BreadCrumbs
          items={[
            { label: t("home"), href: "/" },
            { label: t("blogs"), href: "/blogs" },
          ]}
        />
      </div>
      <Filters totalCount={totalCount} categories={categories} />
      <div
        className=" w-full grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch
       gap-5 md:gap-8  mt-10"
      >
        {data.data?.map((item) => (
          <BlogCard item={item} key={item.id} />
        ))}
      </div>
      <div className="mt-10">
        <BlogsPagination totalPages={Math.ceil(data?.totalCount / limit)} />
      </div>
    </div>
  );
};

export default BlogsView;
