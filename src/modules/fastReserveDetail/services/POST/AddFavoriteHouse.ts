import httpClient from "@/core/interceptor/axios";
import { TAddFavoriteHouse } from "../../types";

export const PostFavoriteHouse = async (payload: TAddFavoriteHouse) => {
  try {
    const res = await httpClient.post(`/favorites`, payload);
    return res;
  } catch (err) {
    throw err;
  }
};
