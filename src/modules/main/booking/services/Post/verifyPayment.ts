import httpClient from "@/core/interceptor/axios";
import { getCookie } from "cookies-next";

export const verifyPayment = async (paymentId: number | string) => {
  const token = getCookie("accessToken");
  try {
    const res = await httpClient.post(`payments/${paymentId}/verify`, {
      token,
    });
    return res;
  } catch (err) {
    throw err;
  }
};
