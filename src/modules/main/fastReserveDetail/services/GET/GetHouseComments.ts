import httpClient from "@/core/interceptor/axios";
import { ICommentsResponse } from "../../types";

export const GetHouseComments = async (id: number) => {
  try {
    const res = await httpClient(`/houses/${id}/comments`);
    return res.data as ICommentsResponse;
  } catch (err) {
    throw err;
  }
};
