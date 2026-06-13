import httpClient from "@/core/interceptor/axios";
import { useRouter } from "@/i18n/routing";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";
import { IComment } from "../../payments/types";
import { IHouseCMPayload } from "@/modules/main/booking/types";

export const useComments = (id: number) => {
  const router = useRouter();

  const { data: commentDetail, isPending } = useQuery({
    queryKey: ["COMMENTDETAIL"],
    queryFn: async () => {
      try {
        const res = await httpClient(`/comments/${id}`);
        return res.data as IComment;
      } catch (err) {
        throw err;
      }
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await httpClient.delete(`/admin/comments/${id}`);
        return res;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (res) => {
      toast.success(res.data?.message || "حذف موفقیت آمیز بود");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message || "مشکلی پیش امده است");
      }
    },
  });

  const editCommentMutation = useMutation({
    mutationFn: async (data: IHouseCMPayload) => {
      try {
        const res = await httpClient.put(`/admin/comments/${id}`, data);
        return res;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (res) => {
      toast.success(res.data?.message || "ویرایش موفقیت آمیز بود");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message || "مشکلی پیش امده است");
      }
    },
  });

  return {
    commentDetail,
    isPending,
    deleteCommentMutation,
    editCommentMutation,
  };
};
