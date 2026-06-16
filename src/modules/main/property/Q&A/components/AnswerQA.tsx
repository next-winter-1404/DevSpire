"use client";

import { X, Send, MessageSquareReply, MessageCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import httpClient from "@/core/interceptor/axios";
import { useTranslations } from "next-intl";

type CreateAnswerRequest = {
  questionId: number;
  answer: string;
};

type AnswerQuestionModalProps = {
  questionId: number;
  question?: string;
};

export default function AnswerQuestionModal({
  questionId,
  question,
}: AnswerQuestionModalProps) {
  const t = useTranslations("PropertyQA");

  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onClose = () => setIsOpen(false);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<CreateAnswerRequest>({
    mode: "onChange",
    defaultValues: {
      questionId,
      answer: "",
    },
  });

  const answerValue = watch("answer") || "";

  const { mutate: submitAnswer, isPending } = useMutation({
    mutationFn: async (data: CreateAnswerRequest) => {
      const res = await httpClient.post("/property-QA/answer", data);
      return res.data;
    },

    onSuccess: () => {
      toast.success(t("answerSuccess"));

      reset({
        questionId,
        answer: "",
      });
      queryClient.invalidateQueries({
        queryKey: ["GETQA"],
      });
      onClose();
    },

    onError: (err) => {
      const fallbackMessage = t("answerFallbackError");

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

  const onSubmit = (data: CreateAnswerRequest) => {
    submitAnswer({
      questionId,
      answer: data.answer.trim(),
    });
  };

  const handleClose = () => {
    if (isPending) return;

    reset({
      questionId,
      answer: "",
    });

    onClose();
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 text-foreground "
      >
        <MessageCircle className=" w-4 h-4" />
        <span className="text-sm">{t("submitAnswer")} </span>
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div
            onClick={handleClose}
            className="absolute inset-0 bg-slate-950/50 backdrop-blur-sm"
          />

          <div
            className="relative z-10 w-full max-w-xl overflow-hidden rounded-[2rem]
           bg-background shadow-2xl shadow-slate-950/20"
          >
            <div className="relative bg-[#0d3b66] px-6 py-6 text-white">
              <div className="absolute -start-16 -top-16 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
              <div className="absolute -bottom-20 end-10 h-44 w-44 rounded-full bg-[#ff7f11]/20 blur-3xl" />

              <div className="relative flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10">
                    <MessageSquareReply className="h-6 w-6 text-[#ff7f11]" />
                  </div>

                  <div>
                    <h3 className="text-xl font-black">
                      {t("answerModalTitle")}
                    </h3>
                    <p className="mt-1 text-sm text-white/60">
                      {t("answerModalDesc")}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className="rounded-xl p-2 text-white/70 transition hover:bg-white/10
                   hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 p-6">
              <input
                type="hidden"
                {...register("questionId", {
                  required: true,
                  valueAsNumber: true,
                })}
                value={questionId}
              />

              {question && (
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <p className="mb-2 text-xs font-bold text-slate-400">
                    متن پرسش
                  </p>
                  <p className="text-sm leading-7 text-[#0d3b66] font-semibold">
                    {question}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-[#0d3b66]">
                    {t("answerTextLabel")}
                  </label>

                  <span
                    className={`text-xs ${
                      answerValue.length > 500
                        ? "text-[#ff5555]"
                        : "text-slate-400"
                    }`}
                  >
                    {answerValue.length}/500
                  </span>
                </div>

                <textarea
                  {...register("answer", {
                    required: t("validation.answerRequired"),
                    minLength: {
                      value: 5,
                      message: t("validation.answerMin"),
                    },
                    maxLength: {
                      value: 500,
                      message: t("validation.answerMax"),
                    },
                    validate: {
                      notOnlySpace: (value) =>
                        value.trim().length > 0 || t("validation.answerEmpty"),
                      meaningful: (value) =>
                        value.trim().length >= 5 ||
                        t("validation.answerMeaningful"),
                    },
                  })}
                  placeholder={t("answerPlaceholder")}
                  className={`min-h-[160px] w-full resize-none rounded-3xl border
                     px-5 py-4 text-sm leading-7 text-slate-700 outline-none transition
                      placeholder:text-slate-400  ${
                        errors.answer
                          ? "border-[#ff5555] focus:ring-4 focus:ring-[#ff5555]/10"
                          : "border-slate-200 focus:border-[#ff7f11] focus:ring-4 focus:ring-[#ff7f11]/10"
                      }`}
                />

                {errors.answer && (
                  <p className="text-xs font-medium text-[#ff5555]">
                    {errors.answer.message}
                  </p>
                )}
              </div>

              <div className="rounded-2xl border border-[#0d3b66]/10 bg-[#0d3b66]/5 px-4 py-3">
                <p className="text-xs leading-6 text-slate-500">
                  {t("answerHint")}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="submit"
                  disabled={!isValid || isPending}
                  className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#ff7f11] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:bg-[#e86f00] disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                  {isPending ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      {t("submittingAnswer")}
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 rotate-180" />
                      {t("submitAnswer")}
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={handleClose}
                  disabled={isPending}
                  className="rounded-2xl border border-slate-200 px-5 py-3 text-sm font-bold text-slate-500 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {t("cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
