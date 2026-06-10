import { Trash2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useManageUsers } from "../hooks";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";
import { useTranslations } from "next-intl";

interface IProps {
  onClose: () => void;
  id: number;
}

const EditUserRole = ({ onClose, id }: IProps) => {
  const { changeRoleMutation, isPending, userDetail } = useManageUsers(id);
  const router = useRouter();
const t = useTranslations("adminDashboard.users");

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
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-5">
            <div className="flex items-center justify-between mb-5 border-b pb-4">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-bold text-gray-800">
{t("changeUserRole")}
                </h2>
              </div>
              <button
                onClick={onClose}
                type="button"
                className="p-1.5 bg-gray-100 rounded-full hover:bg-gray-200 text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
{t("selectRole")}
              </label>
              {isPending ? (
                <Skeleton width={"100%"} height={50} />
              ) : (
                <select
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 
              px-4 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register("role")}
                >
                <option value="admin">{t("admin")}</option>
<option value="seller">{t("seller")}</option>
<option value="buyer">{t("buyer")}</option>

                </select>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t">
              <button
                onClick={onClose}
                type="button"
                className="bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
{t("cancel")}
              </button>
              <button
                className="bg-[#0F2E53] text-white py-2.5 rounded-lg text-sm
               font-medium hover:bg-[#0a1e36] transition-colors"
                type="submit"
                disabled={changeRoleMutation.isPending}
              >
{changeRoleMutation.isPending ? t("submitting") : t("changeRole")}
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default EditUserRole;
