"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import ChooseUserModal from "@/components/common/ChooseUserModal";
import { AlertCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import httpClient from "@/core/interceptor/axios";
import { useRouter } from "@/i18n/routing";
import toast from "react-hot-toast";
import axios from "axios";
import NotificationsGifWrapper from "./NotificationsGifWrapper";

export interface ISendNotifPayload {
  room: string;
  notification: {
    userId: number;
    title: string;
    message: string;
    type: string;
  };
}

const SendNotification = () => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ISendNotifPayload>({
    defaultValues: {
      room: "",
      notification: {
        userId: 0,
        title: "",
        message: "",
        type: "info",
      },
    },
  });

  const selectedUserId = watch("notification.userId");

  const handleSelectUser = (id: number) => {
    setValue("notification.userId", id, { shouldValidate: true });
    setIsModalOpen(false);
  };

  const { mutate: sending, isPending } = useMutation({
    mutationFn: async (data: ISendNotifPayload) => {
      try {
        const res = await httpClient.post("/notifications", data);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message || "اعلان با موفقیت ارسال شد");
      router.refresh();
      reset({
        room: "",
        notification: {
          userId: selectedUserId,
          title: "",
          message: "",
          type: "info",
        },
      });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err?.response?.data?.message || "مشکلی در ارسال اعلان پیش امده است",
        );
      }
    },
  });
  const onSubmit = (data: ISendNotifPayload) => {
    sending(data);
  };

  return (
    <div className="h-full flex items-start justify-between gap-4">
      <div
        className="w-[60%] w-full h-full flex flex-col gap-6 p-6 bg-[#FFFFFF] border
     border-[#DDDDDD] rounded-[24px]    overflow-y-auto scroll-smooth
        dark:border-[#777777] dark:bg-[#262626]  "
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 max-w-lg"
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">کاربر گیرنده </label>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 border rounded-md bg-secondary text-sm"
              >
                {selectedUserId > 0
                  ? `کاربر با ID ${selectedUserId} انتخاب شد`
                  : "انتخاب کاربر"}
              </button>
            </div>
            {errors.notification?.userId && (
              <div
                className="flex items-center gap-1 mt-1.5 text-red-500 
                text-xs font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>انتخاب کاربر الزامی است</span>
              </div>
            )}
            <input
              type="hidden"
              {...register("notification.userId", { required: true, min: 1 })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Room</label>
            <input
              {...register("room", { required: "وارد کردن Room الزامی است" })}
              className={`w-full  border rounded-xl py-3 px-4
                     text-gray-600 focus:outline-none focus:ring-2 transition-all ${
                       errors?.room
                         ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                         : "border-gray-200 focus:ring-blue-500"
                     }`}
              placeholder="شناسه اتاق چت را وارد کنید..."
            />
            {errors.room && (
              <div
                className="flex items-center gap-1 mt-1.5 text-red-500 
                text-xs font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.room?.message}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">عنوان اعلان </label>
            <input
              {...register("notification.title", {
                required: "عنوان الزامی است",
              })}
              className={`w-full  border rounded-xl py-3 px-4
                     text-gray-600 focus:outline-none focus:ring-2 transition-all ${
                       errors?.notification?.title
                         ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                         : "border-gray-200 focus:ring-blue-500"
                     }`}
              placeholder="عنوان پیام"
            />
            {errors.notification?.title && (
              <div
                className="flex items-center gap-1 mt-1.5 text-red-500 
                text-xs font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.notification?.title?.message}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">متن پیام </label>
            <textarea
              {...register("notification.message", {
                required: "متن پیام الزامی است",
              })}
              className={`w-full  border rounded-xl py-3 px-4
                     text-gray-600 focus:outline-none focus:ring-2 transition-all ${
                       errors?.notification?.message
                         ? "border-red-400 focus:ring-red-400 bg-red-50/30"
                         : "border-gray-200 focus:ring-blue-500"
                     }`}
              placeholder="متن اعلان را اینجا بنویسید..."
            />
            {errors.notification?.message && (
              <div
                className="flex items-center gap-1 mt-1.5 text-red-500 
                text-xs font-medium"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors.notification?.message?.message}</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">نوع اعلان</label>
            <select
              {...register("notification.type")}
              className="w-full border rounded-xl py-3 px-4
                     text-gray-600 focus:outline-none focus:ring-2 transition-all"
            >
              <option value="info">Info</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
              <option value="success">Success</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="mt-4 px-4 py-2 text-white bg-primary cursor-pointer
           rounded-[24px] w-fit hover:opacity-90"
          >
            {isPending ? "درحال ارسال" : " ارسال اعلان"}{" "}
          </button>
        </form>

        {isModalOpen && (
          <ChooseUserModal
            onClose={() => setIsModalOpen(false)}
            handleSelectUser={handleSelectUser}
          />
        )}
      </div>
      <div className="w-[35%] w-full h-full">
        <NotificationsGifWrapper />
      </div>
    </div>
  );
};

export default SendNotification;
