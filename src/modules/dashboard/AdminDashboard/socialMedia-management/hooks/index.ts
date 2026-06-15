import httpClient from "@/core/interceptor/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { TCreateSocialLink, TSocialLink, TSocialMediaRes } from "../types";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import axios from "axios";

export const useSocial = (id: number) => {
  const router = useRouter();

  const { data: SocialLinkDetail, isPending } = useQuery({
    queryKey: ["SOCIALLINK"],
    queryFn: async () => {
      try {
        const res = await httpClient(`/social-media-links/${id}`);
        return res.data as TSocialLink;
      } catch (err) {
        throw err;
      }
    },
  });

  const createSocialLinkMutation = useMutation({
    mutationFn: async (data: TCreateSocialLink) => {
      try {
        const res = await httpClient.post(`/social-media-links`, data);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (res) => {
      toast.success(res.message || "با موفقیت اضاقه شد");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message || "مشکلی پیش آمده");
      }
    },
  });

  const EditSocialLinkMutation = useMutation({
    mutationFn: async (data: TCreateSocialLink) => {
      try {
        const res = await httpClient.put(`/social-media-links/${id}`, data);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (res) => {
      toast.success(res.message || "با موفقیت ویزایش شد");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message || "مشکلی پیش آمده");
      }
    },
  });

  const deleteSocialLinkMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await httpClient.delete(`/social-media-links/${id}`);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (res) => {
      toast.success(res.message || "با موفقیت  حذف شد");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message || "مشکلی پیش آمده");
      }
    },
  });

  return {
    SocialLinkDetail,
    isPending,
    createSocialLinkMutation,
    EditSocialLinkMutation,
    deleteSocialLinkMutation,
  };
};
