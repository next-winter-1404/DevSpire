import { Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useManageUsers } from "../hooks";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

interface IProps {
  onClose: () => void;
  id: number;
}

const EditUserRole = ({ onClose, id }: IProps) => {
  const { changeRoleMutation, isPending, userDetail } = useManageUsers(id);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ role: string }>({
    values: { role: userDetail?.user?.role || "admin" },
  });

  const handlingSubmit = (data: { role: string }) => {
    console.log(data);
    changeRoleMutation.mutate(data, {
      onSuccess: () => {
        onClose();
        router.refresh();
      },
    });
  };
  console.log(userDetail);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm "
        onClick={() => onClose()}
      />
      <form onSubmit={handleSubmit(handlingSubmit)}>
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <div className="bg-white dark:!bg-[#1A1A1A] w-full max-w-lg rounded-2xl shadow-xl p-5 pointer-events-auto border dark:border-[#333333]">
            <div className="flex items-center justify-between dark:border-[#333333] mb-5 border-b pb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg dark:text-white font-bold text-gray-800">
                  تغییر نقش کاربر
                </h2>
              </div>
              <button
                onClick={onClose}
                type="button"
                className="p-1.5 bg-gray-100 dark:bg-[#333333] rounded-full hover:bg-gray-200 dark:hover:bg-[#444444] text-gray-600 dark:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium dark:text-gray-300 text-gray-700 mb-2">
                نقش مورد نظر
              </label>
              {isPending ? (
                <Skeleton width={"100%"} height={50} />
              ) : (
                <select
                  className="w-full bg-gray-50 dark:bg-[#262626] border border-gray-100 dark:border-[#333333] rounded-xl py-3 
                px-4 text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("role")}
                >
                  <option value="admin">ادمین</option>
                  <option value="seller">فروشنده</option>
                  <option value="buyer">خریدار</option>
                </select>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t dark:border-[#333333]">
              <button
                onClick={onClose}
                type="button"
                className=" dark:bg-[#262626] border border-gray-300 dark:border-[#444] text-gray-700 dark:text-gray-300 py-2.5 rounded-lg text-sm"
              >
                انصراف
              </button>
              <button
                className="bg-[#0F2E53] dark:bg-blue-600 text-white py-2.5 rounded-lg text-sm
             font-medium hover:bg-[#0a1e36] dark:hover:bg-blue-700 transition-colors"
                type="submit"
                disabled={changeRoleMutation.isPending}
              >
                {changeRoleMutation.isPending ? "درحال ثبت" : "تغییر نقش"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditUserRole;
