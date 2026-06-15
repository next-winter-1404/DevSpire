import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { TSocialMediaRes } from "../types";
import SocialMediaList from "../components/SocialMediaList";
import SocialMediaFilters from "../components/socialMediaFilters";

const SocialMediaView = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  const data = await apiFetch<TSocialMediaRes | null>("/social-media-links", {
    params,
    cache: "no-store",
  });
  console.log(data);

  return (
    <div className="h-full">
      <div
        className=" w-full flex flex-col md:flex-row justify-between
       items-center mb-4 gap-4"
      >
        <div>
          <h2 className="text-base sm:text-lg font-bold text-foreground">
            مدیریت شبکه‌های اجتماعی
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
            {typeof data?.totalCount === "number"
              ? `${data?.totalCount.toLocaleString()} لینک ثبت شده`
              : `${data?.data?.length.toLocaleString()} لینک`}
          </p>
        </div>
        <div className=" w-full md:w-[50%]">
          <SocialMediaFilters />
        </div>
      </div>
      <div
        className="h-[90%]  border-[#DDDDDD] 
      rounded-[24px] overflow-hidden  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626]"
      >
        {data && data?.totalCount > 0 ? (
          <SocialMediaList data={data} />
        ) : (
          <div
            className="flex flex-col items-center justify-center
           h-[300px] text-center px-4"
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              داده ای یافت نشد
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaView;
