import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetHouseComments } from "../services/GET/GetHouseComments";
import { AddHouseComment } from "../services/POST/AddHouseComment";
import toast from "react-hot-toast";
import axios from "axios";
import { IHouseCMPayload } from "../../booking/types";

export const useComments = (houseId: number) => {
  const queryClient = useQueryClient();
  const { data: flatComments, isPending } = useQuery({
    queryKey: ["GETHOUSECOMMENTS"],
    queryFn: async () => await GetHouseComments(houseId),
  });

  const postCommentMutation = useMutation({
    mutationFn: async (data: IHouseCMPayload) =>
      await AddHouseComment(data, houseId),
    onSuccess: (data) => {
      toast.success("کامنت شما با موفقیت ثبت شد ");
      queryClient.invalidateQueries({
        queryKey: ["GETHOUSECOMMENTS"],
      });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status == 403) {
          toast.error("شما دسترسی مورد نیاز برای انجام این عملیات را ندارید");
        } else {
          toast.error(
            err.response?.data.message || "مشکلی در ثبت کامنت به وجود امده",
          );
        }
      }
    },
  });

  return { flatComments, isPending, postCommentMutation };
};
