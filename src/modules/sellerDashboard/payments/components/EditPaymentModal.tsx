"use client";
import { IPayment } from "@/modules/customerDashboard/payments/types";
import { Loader2, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { IUpdatePaymentReq } from "../types";
import { useMutation } from "@tanstack/react-query";
import httpClient from "@/core/interceptor/axios";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import axios from "axios";
import { useTranslations } from "next-intl";

interface IProps {
  payment: IPayment;
  onClose: () => void;
}

const EditPaymentModal = ({ onClose, payment }: IProps) => {
  const router = useRouter();
const t = useTranslations("customerDashboard.payments");

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<IUpdatePaymentReq>({
    values: {
      description: payment?.description ?? "",
      amount: payment?.amount ?? "0",
    },
  });

  const { mutate: updatePayment, isPending } = useMutation({
    mutationFn: async (data: IUpdatePaymentReq) => {
      try {
        const res = await httpClient.put(`/admin/payments/${payment.id}`, data);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
toast.success(data?.message || t("editSuccess"));
      onClose();
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
toast.error(err.response?.data?.message || t("error"));
      }
    },
  });

  const onSubmit = async (data: IUpdatePaymentReq) => {
    console.log(data);
    updatePayment(data);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center
     bg-black/50 p-4 backdrop-blur-sm"
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl 
       bg-background shadow-xl animate-in fade-in zoom-in duration-200"
      >
        <div className=" relative flex items-center justify-between border-b border-border p-5">
          <h3 className="text-lg font-bold text-foreground">
{t("editPayment")}
          </h3>

          <button
            onClick={onClose}
            className="absolute left-4 top-4 p-2 rounded-full bg-gray-100
            cursor-pointer dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="w-full p-5">
          <div className="flex w-full flex-col gap-4">
            <div className="relative flex w-full flex-col gap-3 pb-6">
              <label className="text-[15px] font-bold text-foreground">
{t("amount")}
              </label>

              <input
                type="number"
placeholder={t("amountPlaceholder")}
                {...register("amount", {
                required: t("amountRequired"),
min: {
  value: 1,
  message: t("amountMin"),
},
validate: (value) => {
  return !isNaN(Number(value)) || t("amountMustBeNumber");
},

                })}
                className={`w-full rounded-2xl  bg-background px-4 py-3 text-sm outline-none 
                    transition-all focus:ring-2 focus:ring-ring  border border-[#777777] ${
                      errors.amount ? "  border-destructive" : " "
                    }`}
              />

              {errors.amount?.message && (
                <span className="absolute bottom-0 text-[12px] font-medium text-destructive">
                  {errors.amount.message}
                </span>
              )}
            </div>

            <div className="relative flex w-full flex-col gap-3 pb-6">
              <label className="text-[15px] font-bold text-foreground">
placeholder={t("descriptionPlaceholder")}
              </label>
              <textarea
                rows={4}
placeholder={t("descriptionPlaceholder")}
                {...register("description", {
                 required: t("descriptionRequired"),
minLength: {
  value: 5,
  message: t("descriptionMin"),
},
maxLength: {
  value: 300,
  message: t("descriptionMax"),
},

                })}
                className={`w-full resize-none rounded-2xl border
  bg-background px-4 py-3 text-sm leading-7 
  outline-none transition-all focus:ring-2 focus:ring-ring ${
    errors.description ? "border-destructive" : "border-border"
  }`}
              />

              {errors.description?.message && (
                <span className="absolute bottom-0 text-[12px] font-medium text-destructive">
                  {errors.description.message}
                </span>
              )}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="cursor-pointer rounded-xl border border-border
                 px-4 py-2 text-sm text-muted-foreground transition-all hover:bg-muted"
              >
{t("cancel")}
              </button>

              <button
                type="submit"
                disabled={isSubmitting && isPending}
                className="inline-flex items-center justify-center rounded-xl text-white
                 bg-primary px-4 py-2 text-sm text-primary-foreground transition-all
                  hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSubmitting && isPending ? (
                  <>
                    <Loader2 className="ml-2 h-4 w-4 animate-spin" />
{t("saveChanges")}
                  </>
                ) : (
                  "ذخیره تغییرات"
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPaymentModal;
