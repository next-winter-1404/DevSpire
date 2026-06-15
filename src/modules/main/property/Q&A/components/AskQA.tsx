"use client";

import { X, Send, MessageCircleQuestion } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import httpClient from "@/core/interceptor/axios";
import { useRouter } from "@/i18n/routing";

type CreatePropertyQARequest = {
  houseId: number;
  question: string;
};

type AskQuestionModalProps = {
  houseId: number;
};

export default function AskQuestionModal({ houseId }: AskQuestionModalProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<CreatePropertyQARequest>({
    mode: "onChange",
    defaultValues: {
      houseId,
      question: "",
    },
  });

  const questionValue = watch("question") || "";

  const { mutate: createQuestion, isPending } = useMutation({
    mutationFn: async (data: CreatePropertyQARequest) => {
      const res = await httpClient.post("/property-QA/question", data);
      return res.data;
    },

    onSuccess: () => {
      toast.success("سؤال شما با موفقیت ثبت شد");

      reset({
        houseId,
        question: "",
      });
      router.refresh();
      onClose();
    },

    onError: (err) => {
      const fallbackMessage = "مشکلی در ثبت سؤال پیش آمد";

      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const message = err.response?.data?.message || fallbackMessage;

        if (status !== 401 && status !== 403) {
          toast.error(message);
        }

        return;
      }

      toast.error(fallbackMessage);
    },
  });

  const onSubmit = (data: CreatePropertyQARequest) => {
    createQuestion({
      houseId,
      question: data.question.trim(),
    });
  };

  const handleClose = () => {
    if (isPending) return;

    reset({
      houseId,
      question: "",
    });

    onClose();
  };

  return (
    <>
      <button
        className="bg-[#ff7f11] hover:bg-[#e66e00] text-white px-5 py-2 rounded-xl
           text-sm font-medium transition-all shadow-md"
        onClick={() => setIsOpen(true)}
      >
        پرسیدن سوال جدید
      </button>
      {isOpen && (
        <div
          dir="rtl"
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
        >
          <div
            onClick={handleClose}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
          />

          <div
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-[2rem]
           bg-background shadow-2xl shadow-slate-950/20"
          >
            <div className="relative bg-[#0d3b66] px-6 py-6 text-white">
              <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-20 right-10 h-44 w-44 rounded-full bg-[#ff7f11]/20 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <MessageCircleQuestion className="h-6 w-6 text-[#ff7f11]" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black">پرسیدن سؤال</h3>
                    <p className="mt-1 text-sm text-white/60">
                      سؤال خود را درباره این ملک از میزبان بپرسید
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className="rounded-xl p-2 text-white/70 transition hover:bg-white/10 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
              <input
                type="hidden"
                {...register("houseId", {
                  required: true,
                  valueAsNumber: true,
                })}
                value={houseId}
              />
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-[#0d3b66]">
                    متن سؤال
                  </label>

                  <span
                    className={`text-xs ${
                      questionValue.length > 250
                        ? "text-[#ff5555]"
                        : "text-slate-400"
                    }`}
                  >
                    {questionValue.length}/250
                  </span>
                </div>

                <textarea
                  {...register("question", {
                    required: "متن سؤال الزامی است",
                    minLength: {
                      value: 5,
                      message: "سؤال باید حداقل ۵ کاراکتر باشد",
                    },
                    maxLength: {
                      value: 250,
                      message: "سؤال نمی‌تواند بیشتر از ۲۵۰ کاراکتر باشد",
                    },
                    validate: {
                      notOnlySpace: (value) =>
                        value.trim().length > 0 || "سؤال نمی‌تواند خالی باشد",
                      meaningful: (value) =>
                        value.trim().length >= 5 ||
                        "لطفاً سؤال واضح‌تری وارد کنید",
                    },
                  })}
                  placeholder="مثلاً: آیا این ملک پارکینگ اختصاصی دارد؟"
                  className={`min-h-[140px] w-full resize-none rounded-3xl border
                     px-5 py-4 text-sm leading-7 text-slate-700 outline-none transition
                      placeholder:text-slate-400 ${
                        errors.question
                          ? "border-[#ff5555] focus:ring-4 focus:ring-[#ff5555]/10"
                          : "border-slate-200 focus:border-[#ff7f11] focus:ring-4 focus:ring-[#ff7f11]/10"
                      }`}
                />

                {errors.question && (
                  <p className="text-xs font-medium text-[#ff5555]">
                    {errors.question.message}
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-[#0d3b66]/10 bg-[#0d3b66]/5 px-4 py-3">
                <p className="text-xs leading-6 text-slate-500">
                  سؤال شما بعد از ثبت برای میزبان ارسال می‌شود و پاسخ آن در همین
                  بخش نمایش داده خواهد شد.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!isValid || isPending}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl 
                  bg-[#ff7f11] px-5 py-3 text-sm font-bold text-white
                   shadow-lg shadow-orange-500/20 transition hover:bg-[#e86f00] 
                   disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                  {isPending ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2
                       border-white/40 border-t-white"
                      />
                      در حال ثبت سؤال...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 rotate-180" />
                      ثبت سؤال
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
