import { apiFetch } from "@/core/Server-fetch/fetchApi";
import UserManagementTable from "../../UsersManagement/components/UserManagementTable";
import { IAllUsers } from "@/components/common/types";

const AdminDashboardTable = async () => {
  const res = await apiFetch<IAllUsers | null>("/users", {
    cache: "no-store",
    params: {
      page: "1",
      limit: "5",
      sort: "created_at",
      order: "DESC",
    },
  });
  return (
    <div
      className="h-[90%]  border-[#DDDDDD] 
      rounded-[24px] overflow-y-auto  dark:border-[#333333]
         bg-[#ffff] dark:bg-[#262626]"
    >
      <h2 className="text-[24px] font-bold text-foreground p-4">
        جدیدترین کاربران
      </h2>
      {res && res?.totalCount > 0 ? (
        <UserManagementTable data={res.data} />
      ) : (
        <div className="flex flex-col items-center justify-center h-[300px] text-center px-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            هنوز کاربری ثبت نام نکرده است
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardTable;
