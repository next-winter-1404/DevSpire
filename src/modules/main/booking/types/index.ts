export interface IPassenger {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  birthDate: Date | string;
  nationalId: string;
}

export interface IFormProps {
  traveler_details: TravelerDetail[];
  sharedEmail?: string;
  sharedMobile?: string;
}

export type TravelerDetail = {
  firstName: string;
  lastName: string;
  gender: "male" | "female" | string;
  birthDate: string;
  nationalId: string;
};

export type TBookingRequest = {
  houseId: number;
  reservedDates: string[];
  traveler_details: TravelerDetail[];
  sharedEmail?: string;
  sharedMobile?: string;
};

export interface IPaymentRequest {
  amount: number;
  description: string;
  callbackUrl: string;
  bookingId: number;
}

export interface IHouseCMPayload {
  title: string;
  caption: string;
  rating: number;
  parent_comment_id?: number;
}
export interface IGetPayment {
  id: number;
  userId: number;
  bookingId: number;
  amount: string;
  description: string;
  status: string;
  paymentUrl: string;
  transactionId: string | number | null;
  created_at: string;
  updated_at: string;
}
