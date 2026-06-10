import React from "react";
import { useForm } from "react-hook-form";
import { IEditUser, useManageUsers } from "../hooks";
import { X, AlertCircle } from "lucide-react";
import { useRouter } from "@/i18n/routing";
import { useTranslations } from "next-intl";

interface IProps {
  onClose: () => void;
  id: number;
}

const EditUserInformation = ({ id, onClose }: IProps) => {
  const { userDetail, isPending, editUserMutation } = useManageUsers(id);
  const router = useRouter();
const t = useTranslations("adminDashboard.users");

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
          className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-5"
        >
          <div className="flex items-center justify-between mb-5 border-b pb-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-bold text-gray-800">
{t("editUserInformation")}
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
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
                {t("firstName")}

              </label>
              <input
                className={`w-full bg-gray-50 border rounded-xl py-3 px-4
                     text-gray-600 focus:outline-none focus:ring-2 transition-all ${
                       errors.firstName
                         ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                         : "border-gray-200 focus:ring-blue-500"
                     }`}
placeholder={t("firstNamePlaceholder")}
                {...register("firstName",{ required: t("firstNameRequired") }
)}
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
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
{t("lastName")}
              </label>
              <input
placeholder={t("lastNamePlaceholder")}
                {...register("lastName", {
                  required: t("lastNameRequired")
,
                })}
                className={`w-full bg-gray-50 border rounded-xl py-3 px-4
                     text-gray-600 focus:outline-none focus:ring-2 transition-all ${
                       errors.lastName
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
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
{t("email")}
              </label>
              <input
                type="email"
                className={`w-full bg-gray-50 border rounded-xl py-3 px-4
                     text-gray-600 focus:outline-none focus:ring-2 transition-all ${
                       errors.email
                         ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                         : "border-gray-200 focus:ring-blue-500"
                     }`}
placeholder={t("emailPlaceholder")}
                {...register("email", {
                 required: t("emailRequired"),
pattern: {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  message: t("emailInvalid")
}
,
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
              <label className="block mb-1.5 text-sm font-medium text-gray-700">
{t("phoneNumber")}
              </label>
              <input
placeholder={t("phonePlaceholder")}
                {...register("phoneNumber", {
                required: t("phoneRequired"),
pattern: {
  value: /^09\d{9}$/,
  message: t("phoneInvalid")
}
,
                })}
                className={`w-full bg-gray-50 border rounded-xl py-3 px-4
                     text-gray-600 focus:outline-none focus:ring-2 transition-all ${
                       errors.phoneNumber
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
{t("cancel")}
            </button>
            <button
              type="submit"
              disabled={editUserMutation.isPending}
              className="bg-[#0F2E53] text-white py-2.5 rounded-lg text-sm 
              font-medium hover:bg-[#0a1e36] transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
{editUserMutation.isPending ? t("submitting") : t("submitChanges")}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditUserInformation;
