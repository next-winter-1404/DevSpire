import httpClient from "@/core/interceptor/axios";
import { IHouseCMPayload } from "@/modules/booking/types";

export const AddHouseComment = async (
  data: IHouseCMPayload,
  houseId: number,
) => {
  try {
    const res = await httpClient.post(`/houses/${houseId}/comments`, data);
    return res;
  } catch (err) {
    throw err;
  }
};
