export interface IPayment {
  id: number;
  userId: number;
  bookingId: number | null;
  amount: string;
  description: string;
  status: "pending" | "completed" | string;
  paymentUrl: string;
  transactionId: string | null;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface IPaymentResponse {
  payments: IPayment[];
  totalCount: number;
}
export interface ISellerPaymentsResponse {
  data: IPayment[];
  totalCount: number;
}
