import httpClient from "@/core/interceptor/axios";

export const DeleteBooking = async (id: number) => {
  try {
    const res = await httpClient.delete(`/bookings/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};
