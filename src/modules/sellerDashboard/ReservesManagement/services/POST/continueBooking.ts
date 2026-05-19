import httpClient from "@/core/interceptor/axios";

export const continueBooking = async (id: number) => {
  try {
    const res = await httpClient.post(`/bookings/${id}/continue`);
    return res;
  } catch (err) {
    throw err;
  }
};
