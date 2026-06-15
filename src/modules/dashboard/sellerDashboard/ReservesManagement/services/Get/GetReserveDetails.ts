import { TReservationDetailResponse } from "@/components/common/types";
import httpClient from "@/core/interceptor/axios";

export const GetReserveDetails = async (id: number) => {
  try {
    const res = await httpClient(`/bookings/${id}`);
    return res.data as TReservationDetailResponse;
  } catch (err) {
    throw err;
  }
};
