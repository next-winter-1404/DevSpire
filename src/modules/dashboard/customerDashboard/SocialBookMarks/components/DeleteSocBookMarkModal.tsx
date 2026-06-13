import { useRouter } from "@/i18n/routing";
import Close from "../../../../../../public/icons/Close";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslations } from "next-intl";
import { DeleteSocialBookMark } from "../services/DELETE/DeleteSocialBookMark";

interface IProps {
  id: number;
  handleDeleteCatModal: (value: boolean) => void;
}

const DeleteSocialBookMarkModal = ({ id, handleDeleteCatModal }: IProps) => {
  const t = useTranslations("customerDashboard.socialBookMarks");
  const router = useRouter();
  const queryClient = useQueryClient();
  const deleteCategoryMutation = useMutation({
    mutationFn: () => DeleteSocialBookMark(id),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "نشانک مورد نظر با موفقیت حذف شد");
      queryClient.invalidateQueries({
        queryKey: ["DELETELOCATION"],
      });
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message || "مشکلی در حذف پیش آمد");
      }
    },
  });

  return (
    <div className="fixed inset-0 z-90">
      <div
        onClick={() => {
          handleDeleteCatModal(false);
        }}
        className="bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300 absolute inset-0"
      ></div>
      <div className="flex flex-col items-center gap-8 w-104 p-8 bg-[#FFFFFF] rounded-[24px] absolute top-[32%] left-[36%]">
        <div className="flex justify-end w-full">
          <div className="p-4 bg-[#F5F5F5] rounded-full">
            <Close />
          </div>
        </div>
        <p className="text-[#1E2022]">{t("sureAboutDeleteSocBookMark")}</p>
        <div className="flex gap-6 w-full">
          <button
            onClick={() => {
              handleDeleteCatModal(false);
            }}
            className="w-full py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer"
          >
            {t("cancel")}
          </button>
          <button
            onClick={() => {
              deleteCategoryMutation.mutate();
            }}
            disabled={deleteCategoryMutation.isPending}
            className="w-full py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer"
          >
            {t("delete")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteSocialBookMarkModal;
