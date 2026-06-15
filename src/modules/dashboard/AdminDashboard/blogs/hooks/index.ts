import httpClient from "@/core/interceptor/axios";
import { useRouter } from "@/i18n/routing";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export interface IBlogPayload {
  title: string;
  caption: string;
  estimated_reading_time: string;
  category_id?: number;
}

export const useBlogs = (id: number) => {
  const router = useRouter();
  const createBlogMutation = useMutation({
    mutationFn: async (data: IBlogPayload) => {
      try {
        const res = await httpClient.post("/blogs", data);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message || "با موفقیت ساخته شد");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err?.response?.data?.message || "مشکلی پیش امده مجددا امتحان کنید",
        );
      }
    },
  });
  const editBlogMutation = useMutation({
    mutationFn: async (data: IBlogPayload) => {
      try {
        const res = await httpClient.put(`/blogs/${id}`, data);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message || "با موفقیت ویرایش شد");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err?.response?.data?.message || "مشکلی پیش امده مجددا امتحان کنید",
        );
      }
    },
  });
  const deleteBlogMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await httpClient.delete(`/blogs/${id}`);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
      toast.success(data?.message || "با موفقیت حذف شد");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err?.response?.data?.message || "مشکلی پیش امده مجددا امتحان کنید",
        );
      }
    },
  });
  return { deleteBlogMutation, editBlogMutation, createBlogMutation };
};
