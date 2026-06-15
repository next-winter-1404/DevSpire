import React from "react";
import { useForm } from "react-hook-form";
import { IEditUser, useManageUsers } from "../hooks";
import { X, AlertCircle } from "lucide-react";
import { useRouter } from "@/i18n/routing";

interface IProps {
  onClose: () => void;
  id: number;
}

const EditUserInformation = ({ id, onClose }: IProps) => {
  const { userDetail, isPending, editUserMutation } = useManageUsers(id);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditUser>({
    values: {
      firstName: userDetail?.user?.firstName || "",
      lastName: userDetail?.user?.lastName || "",
      phoneNumber: userDetail?.user?.phoneNumber || "",
      email: userDetail?.user?.email || "",
    },
  });

  const handlingSubmit = (data: IEditUser) => {
    editUserMutation.mutate(data, {
      onSuccess: () => {
        onClose();
        router.refresh();
      },
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        onClick={() => onClose()}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <form
          onSubmit={handleSubmit(handlingSubmit)}
          className="bg-white dark:!bg-[#1A1A1A]  w-full max-w-lg rounded-2xl shadow-xl p-5"
        >
          <div className="flex items-center justify-between mb-5 border-b pb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg text-gray-800 dark:text-gray-100
 font-bold">
                ویرایش اطلاعات کاربر
              </h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200
               text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="relative">
              <label className="block text-gray-800 dark:text-gray-100
 mb-1.5 text-sm font-medium text-gray-700">
                نام
              </label>
              <input
                className={`w-full dark:text-gray-200
 bg-gray-50 dark:bg-[#262626]
 border rounded-xl dark:border-[#333] py-3 px-4
                     text-gray-600 focus:outline-none focus:ring-2 transition-all ${errors.firstName
                    ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                    : "border-gray-200 focus:ring-blue-500"
                  }`}
                placeholder="نام را وارد کنید ..."
                {...register("firstName", { required: "نام الزامی است" })}
              />
              {errors.firstName && (
                <div
                  className="flex items-center gap-1 mt-1.5 text-red-500 
                text-xs font-medium"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.firstName.message}</span>
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-gray-800 dark:text-gray-100
 mb-1.5 text-sm font-medium">
                نام خانوادگی
              </label>
              <input
                placeholder="نام خانوادگی را وارد کنید"
                {...register("lastName", {
                  required: "نام خانوادگی الزامی است",
                })}
                className={`w-full dark:border-[#333]
dark:text-gray-200
dark:bg-[#262626] bg-gray-50 border rounded-xl py-3 px-4
                     text-gray-600 focus:outline-none focus:ring-2 transition-all ${errors.lastName
                    ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                    : "border-gray-200 focus:ring-blue-500"
                  }`}
              />
              {errors.lastName && (
                <div
                  className="flex items-center gap-1 mt-1.5
                 text-red-500 text-xs font-medium"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.lastName.message}</span>
                </div>
              )}
            </div>

            <div className="relative">
              <label className="text-gray-800  dark:text-gray-100
 block mb-1.5 text-sm font-medium">
                ایمیل
              </label>
              <input
                type="email"
                className={`w-full dark:border-[#333]
dark:bg-[#262626] dark:text-gray-200
 bg-gray-50 border rounded-xl py-3 px-4
                     text-gray-600 focus:outline-none focus:ring-2 transition-all ${errors.email
                    ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                    : "border-gray-200 focus:ring-blue-500"
                  }`}
                placeholder="ایمیلتان را وارد کنید"
                {...register("email", {
                  required: "ایمیل الزامی است",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "فرمت ایمیل نامعتبر است",
                  },
                })}
              />
              {errors.email && (
                <div
                  className="flex items-center gap-1 mt-1.5 text-red-500 text-xs 
                font-medium"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-gray-800 dark:text-gray-100
 mb-1.5 text-sm font-medium text-gray-700">
                شماره تلفن
              </label>
              <input
                placeholder="شماره تلفن را وارد کنید"
                {...register("phoneNumber", {
                  required: "شماره تلفن الزامی است",
                  pattern: {
                    value: /^09\d{9}$/,
                    message: "شماره تلفن باید ۱۱ رقم و با 09 شروع شود",
                  },
                })}
                className={`w-full dark:border-[#333]
dark:bg-[#262626] dark:text-gray-200
 bg-gray-50 border rounded-xl py-3 px-4
                     text-gray-600 focus:outline-none focus:ring-2 transition-all ${errors.phoneNumber
                    ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                    : "border-gray-200 focus:ring-blue-500"
                  }`}
              />
              {errors.phoneNumber && (
                <div
                  className="flex items-center gap-1 mt-1.5 text-red-500 
                text-xs font-medium"
                >
                  <AlertCircle className="w-3.5 h-3.5" />
                  <span>{errors.phoneNumber.message}</span>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-8 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="bg-white border border-gray-300 text-gray-700
               py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={editUserMutation.isPending}
              className="bg-[#0F2E53] text-white py-2.5 rounded-lg text-sm 
              font-medium hover:bg-[#0a1e36] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {editUserMutation.isPending ? "در حال ثبت..." : "ثبت تغییرات"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUserInformation;
