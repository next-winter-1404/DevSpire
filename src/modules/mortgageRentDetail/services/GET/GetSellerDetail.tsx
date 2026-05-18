import httpClient from "@/core/interceptor/axios";
import { TUserResponse } from "../../types";

export const getSellerDetail = async (id: number) => {
  try {
    const res = await httpClient(`/users/${id}`);
    return res.data as TUserResponse;
  } catch (err) {
    throw err;
  }
};
