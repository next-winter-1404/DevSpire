import { IAllUsers } from "@/components/common/types";
import UsersManagementFilters from "../components/UsersManagementFilters";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import UsersList from "../components/UsesManagementList";

const UsersManagementView = async ({
  params,
}: {
  params: Record<string, string>;
}) => {
  const res = await apiFetch<IAllUsers | null>("/users", {
    cache: "no-store",
    params,
  });

  console.log(res);

  return (
    <div className="h-full">
      <div
        className=" w-full flex flex-col md:flex-row justify-between
       items-center mb-4 gap-4"
      >
        <h1 className="text-xl font-bold text-foreground">مدیریت کاربران</h1>
        <div className=" w-full md:w-[50%]">
          <UsersManagementFilters />
        </div>
      </div>
      <div
        className="h-[90%]  border-[#DDDDDD] 
      rounded-[24px] overflow-hidden  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626]"
      >
        {res && res?.totalCount > 0 ? (
          <UsersList data={res} />
        ) : (
          <div
            className="flex flex-col items-center justify-center h-[300px]
           text-center px-4"
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              هنوز کاربری ثبت نام نکرده است
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersManagementView;
