import ReserveFilters from "@/components/dashboard/Filters";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import ContactUsList from "../components/ContactUsList";

export interface IContactUS {
  id: number;
  title: string | null;
  message: string | null;
}
export interface IContactUsRes {
  data: IContactUS[];
  totalCount: number;
}
const AdminContactUsView = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  const data = await apiFetch<IContactUsRes | null>("/contact-us", {
    cache: "no-store",
    params,
  });
  console.log(data);
  return (
    <div className="h-full">
      <div
        className=" w-full flex flex-col md:flex-row justify-between
       items-center mb-4 gap-4"
      >
        <h1 className="text-xl font-bold text-foreground whitespace-nowrap">
          لیست پیام های وبسایت
        </h1>
        <ReserveFilters />
      </div>
      <div
        className="h-[90%]  border-[#DDDDDD] 
      rounded-[24px] overflow-hidden  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626]"
      >
        {data && data?.totalCount > 0 ? (
          <div className="w-full h-full">
            <ContactUsList data={data} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-[300px] text-center px-4">
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              هنوز پیامی ثبت نشده است
            </p>

            <p className="text-gray-400 dark:text-gray-500 text-xs mt-2">
              وقتی کاربران پیامی ثبت کنند در اینجا نمایش داده می‌شود
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminContactUsView;
