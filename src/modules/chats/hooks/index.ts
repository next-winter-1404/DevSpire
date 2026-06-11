import httpClient from "@/core/interceptor/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TMessage } from "../components/ChatModal";
import toast from "react-hot-toast";
import axios from "axios";

export interface ISendMessagePayload {
  room: string;
  message: string;
  getterId: number;
  createdAt: string;
  updatedAt: string;
}
export const useChat = () => {
  const queryClient = useQueryClient();
  const { data: messages, isPending } = useQuery({
    queryKey: ["GETALLCHATS"],
    queryFn: async () => {
      try {
        const res = await httpClient("/chats");
        return res.data as TMessage[];
      } catch (err) {
        throw err;
      }
    },
  });
  const sendMessageMutation = useMutation({
    mutationFn: async (data: ISendMessagePayload) => {
      try {
        const res = await httpClient.post("/chats/send", data);
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["GETALLCHATS"],
      });
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "مشکلی پیش آمده است");
      }
    },
  });
  return { messages, isPending, sendMessageMutation };
};
