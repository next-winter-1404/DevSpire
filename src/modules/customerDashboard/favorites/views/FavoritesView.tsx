import ReserveFilters from "@/components/dashboard/Filters";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import { IDecodedToken } from "@/modules/fastReserveDetail/types";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { IFavoritesResponse } from "../types";
import FavoritesList from "../components/FavoritesList";

interface IProps {
  params: Record<string, string>;
}
const FavoritesView = async ({ params }: IProps) => {
  const cookieStore = await cookies();
  const token = cookieStore.get("accessToken")?.value as string;
  const decoded = jwtDecode<IDecodedToken>(token);

  const data = await apiFetch<IFavoritesResponse | null>(
    `/favorites/user/${decoded.id}`,
    {
      params,
    },
  );
  console.log(data);

  return (
    <div className="h-full">
      <div
        className=" w-full flex flex-col md:flex-row justify-between
       items-center mb-4 gap-4 md:gap-0"
      >
        <h1 className="text-xl font-bold text-foreground whitespace-nowrap ">
          لیست علاقه مندی ها
        </h1>
        <div className=" w-full md:w-[50%]">
          <ReserveFilters />
        </div>
      </div>
      <div
        className="h-[90%]  border-[#DDDDDD] 
      rounded-[24px] overflow-hidden  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626]"
      >
        {data && data?.totalCount > 0 ? (
          <FavoritesList data={data} />
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center px-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              هنوز رزروی ثبت نشده است
            </p>

            <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
              وقتی کاربران اقامتگاه شما را رزرو کنند در اینجا نمایش داده می‌شود
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesView;
