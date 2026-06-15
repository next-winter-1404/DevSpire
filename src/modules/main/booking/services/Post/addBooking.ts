import httpClient from "@/core/interceptor/axios";
import { TBookingRequest } from "../../types";

export const AddBooking = async (data: TBookingRequest) => {
  try {
    const res = await httpClient.post("/bookings", data);
    return res;
  } catch (err) {
    throw err;
  }
};
