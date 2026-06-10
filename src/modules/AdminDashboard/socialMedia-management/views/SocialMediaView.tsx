import ReserveFilters from "../../../../components/dashboard/Filters";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { TSocialMediaRes } from "../types";
import SocialMediaList from "../components/SocialMediaList";
import SocialMediaFilters from "../components/socialMediaFilters";
import { getTranslations } from "next-intl/server";

const SocialMediaView = async ({
  params,
}: {
  params: Record<string, string>;
}) => {const t = await getTranslations("adminDashboard.socialMedia");

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
{t("socialMediaManagement")}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
           {typeof data?.totalCount === "number"
    ? t("linksCount", { count: data.totalCount })
    : t("linksCount", { count: data?.data?.length ?? 0 })}
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
{t("noDataFound")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SocialMediaView;
