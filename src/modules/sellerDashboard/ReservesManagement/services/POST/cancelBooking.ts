import httpClient from "@/core/interceptor/axios";

export const cancelBooking = async (id: number) => {
  try {
    const res = httpClient.post(`/bookings/${id}/cancel`);
    return res;
  } catch (err) {
    throw err;
  }
};
