import { TBlogsResponse } from "@/components/common/types";
import ReserveFilters from "@/components/dashboard/Filters";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import BlogsList from "../components/BlogsList";
import { Plus } from "lucide-react";
import AddBlog from "../components/AddBlog";

const BlogsView = async ({ params }: { params: Record<string, string> }) => {
  const data = await apiFetch<TBlogsResponse | null>("/blogs", {
    params: params,
    cache: "no-cache",
  });
  return (
    <div className="h-full">
      <div
        className=" w-full flex flex-col md:flex-row justify-between
       items-center mb-4 gap-4"
      >
        <h1 className="text-xl font-bold text-foreground">
          مقالات وبسایت {`(${data?.totalCount ?? 0})`}
        </h1>
        <div className=" flex items-center gap-4 ">
          <ReserveFilters />
          <AddBlog />
        </div>
      </div>
      <div className="h-[90%] border border-[#DDDDDD] dark:border-[#333333] rounded-[24px] overflow-hidden bg-white dark:!bg-[#262626]">

        {data && data?.totalCount > 0 ? (
          <BlogsList data={data} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center px-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              هنوز مقاله ای ثبت نشده است
            </p>

            <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
              میتوانید مقاله ای اضافه کنید !
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsView;
