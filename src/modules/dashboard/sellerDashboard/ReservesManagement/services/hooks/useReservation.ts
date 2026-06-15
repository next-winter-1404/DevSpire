import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetReserveDetails } from "../Get/GetReserveDetails";
import { DeleteBooking } from "../DELETE/DeleteBooking";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter } from "@/i18n/routing";
import { cancelBooking } from "../POST/cancelBooking";
import { continueBooking } from "../POST/continueBooking";

export const useReservation = (id: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const {
    data: reserveDetails,
    isPending,
    error,
  } = useQuery({
    queryKey: ["RESERVEDETAIL"],
    queryFn: () => GetReserveDetails(id),
  });

  const deleteBookingMutation = useMutation({
    mutationFn: () => DeleteBooking(id),
    onSuccess: (res) => {
      toast.success(res?.data?.message || "رزرو مورد نظر با موفقیت حذف شد");
      queryClient.invalidateQueries({
        queryKey: ["RESERVEDETAIL"],
      });
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err?.response?.data?.message || "مشکلی در حذف پیش امد");
      }
    },
  });

  const cancelBookingMutation = useMutation({
    mutationFn: () => cancelBooking(id),
    onSuccess: (res) => {
      toast.success(res.data?.message || "رزرو موردنظر با موفقیت لغو شد");
      queryClient.invalidateQueries({
        queryKey: ["RESERVEDETAIL"],
      });
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err?.response?.data?.message || "مشکلی در لغو رزرو پیش امد",
        );
      }
    },
  });

  const continueBookingMutation = useMutation({
    mutationFn: () => continueBooking(id),
    onSuccess: (res) => {
      toast.success(res.data?.message || "رزرو موردنظر با موفقیت لغو شد");
      queryClient.invalidateQueries({
        queryKey: ["RESERVEDETAIL"],
      });
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(
          err?.response?.data?.message || "مشکلی در لغو رزرو پیش امد",
        );
      }
    },
  });

  return {
    reserveDetails,
    isPending,
    error,
    deleteBookingMutation,
    cancelBookingMutation,
    continueBookingMutation,
  };
};
