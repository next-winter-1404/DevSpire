import httpClient from "@/core/interceptor/axios";
import { useRouter } from "@/i18n/routing";
import { TUserRes } from "@/modules/dashboard/customerDashboard/dashboard/components/CustomerDashboardCharts";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

export interface IEditUser {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export const useManageUsers = (id: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data: userDetail, isPending } = useQuery({
    queryKey: ["GETUSERSDETAILS"],
    queryFn: async () => {
      try {
        const res = await httpClient(`/users/${id}`);
        return res.data as TUserRes;
      } catch (err) {
        throw err;
      }
    },
  });
  const deleteUserMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await httpClient.delete(`/admin/users/${id}`);
        return res;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (res) => {
      toast.success(res.data.message || "کاربر با موفقیت حذف شد");
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err?.response?.data?.message || "مشکلی در حذف پیش امده است",
        );
      }
    },
  });
  const editUserMutation = useMutation({
    mutationFn: async (payload: IEditUser) => {
      try {
        const res = await httpClient.put(`/admin/users/${id}`, payload);
        return res;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (res) => {
      toast.success(res.data.message || "ویرایش کاربر موفقیت آمیز بود");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || " مشکلی در ویرایش پیش آمده است",
        );
      }
    },
  });

  const changeRoleMutation = useMutation({
    mutationFn: async (data: { role: string }) => {
      try {
        const res = await httpClient.put(`/admin/users/${id}/role`, data);
        return res;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (res) => {
      toast.success(res.data.message || " تغییر نقش موفقیت آمیز بود");
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err.response?.data?.message || " مشکلی در تغییر نقش پیش آمده است",
        );
      }
    },
  });

  return {
    userDetail,
    isPending,
    deleteUserMutation,
    editUserMutation,
    changeRoleMutation,
  };
};
