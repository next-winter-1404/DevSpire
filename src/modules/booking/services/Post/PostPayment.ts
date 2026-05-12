import httpClient from "@/core/interceptor/axios";
import { IPaymentRequest } from "../../types";

export const PostPayment = async (payload: IPaymentRequest) => {
  try {
    const res = await httpClient.post("/payments", payload);
    return res;
  } catch (err) {
    throw err;
  }
};
