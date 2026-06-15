"use client";

import httpClient from "@/core/interceptor/axios";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { IAllUsers } from "./types";
import { TUser } from "@/modules/main/mortgageRentDetail/types";

interface IProps {
  onClose: () => void;
  handleSelectUser: (id: number) => void;
}
const ChooseUserModal = ({ onClose, handleSelectUser }: IProps) => {
  const [page, setPage] = useState(1);

  const { data: usersData, isPending } = useQuery({
    queryKey: ["ALLUSERS", page],
    queryFn: async () => {
      const res = await httpClient("/users", {
        params: { page, limit: 10 },
      });
      return res.data as IAllUsers;
    },
  });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center 
    justify-center bg-black/50 p-4"
    >
      <div
        className="  p-6 w-full max-w-md flex 
      flex-col gap-4  bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px]  
        overflow-y-auto scroll-smooth   dark:border-[#777777] dark:bg-[#262626]  "
      >
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-bold">انتخاب کاربر</h3>
          <button onClick={() => onClose()} className="text-red-500 font-bold">
            ✕
          </button>
        </div>

        <div className="flex flex-col gap-2 min-h-[200px] max-h-[300px] overflow-y-auto">
          {isPending ? (
            <p className="text-center text-sm mt-4">در حال بارگذاری...</p>
          ) : usersData && usersData?.data?.length > 0 ? (
            usersData.data.map((user: TUser) => (
              <div
                key={user.id}
                onClick={() => {
                  handleSelectUser(user.id);
                  onClose();
                }}
                className="p-2 border rounded-md cursor-pointer hover:bg-gray-100
                 dark:hover:bg-zinc-700 flex justify-between items-center"
              >
                <span>
                  {user.firstName} {user.lastName}
                </span>
                <span className="text-xs text-gray-500">ID: {user.id}</span>
              </div>
            ))
          ) : (
            <p className="text-center text-sm mt-4">کاربری یافت نشد.</p>
          )}
        </div>
        <div className="flex justify-between items-center pt-2 mt-auto">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="px-3 py-1 bg-gray-200 dark:bg-zinc-700
             rounded-md disabled:opacity-50"
          >
            قبلی
          </button>
          <span className="text-sm">صفحه {page}</span>
          <button
            disabled={Math.ceil(usersData?.totalCount ?? 0 / 10) <= page}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-gray-200 dark:bg-zinc-700 
            rounded-md disabled:opacity-50"
          >
            بعدی
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChooseUserModal;
