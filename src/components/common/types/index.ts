import { TravelerDetail } from "@/modules/booking/types";

export type IFastReserveParams = {
  page?: string;
  sort?: string;
  order?: string;
  limit?: string;
  search?: string;
  maxPrice?: string;
  minPrice?: string;
  maxArea?: string;
  minArea?: string;
  location?: string;
  propertyType?: string;
};
export type THouse = {
  id: number;
  title: string;
  address: string;
  photos: string[] | null;
  rate: string;
  discounted_price: string;
  price: string;
  tags: string[] | string;
  last_updated: string;
  capacity: number;
  location: string;
  categories: string[] | null;
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: string | null;
  num_comments: number;
  discount_id: number | null;
  transaction_type: "rental" | "mortgage" | "reservation" | "direct_purchase";
  sellerId: number;
  sellerName: string;
  caption: string;
  bookings: number;
  favoriteId: number | null;
  isFavorite: boolean;
};
export type THousesResponse = {
  houses: THouse[];
  totalCount: number;
};

export type IBlogsParams = {
  page?: string;
  sort?: string;
  order?: string;
  limit?: string;
  search?: string;
  propertyType?: string;
};
export type TBlog = {
  id: number;
  title: string;
  caption: string;
  estimated_reading_time: string;
  author_id: number;
  created_at: string;
  category_id: number;
  photos: string[] | null;
};
export type TBlogsResponse = {
  data: TBlog[];
  totalCount: number;
};

export type TTravelerDetails = {
  firstName: string;
  lastName: string;
  gender: "male" | "female";
  birthDate: string;
  nationalId: string;
};
export type TReserveHouse = {
  title: string;
  price: string;
};
export type TReservation = {
  id: number;
  user_id: number;
  houseId: number;
  reservedDates: string[];
  traveler_details: TTravelerDetails[];
  status: "pending" | "confirmed" | "canceled";
  sharedEmail: string;
  sharedMobile: string;
  created_at: string;
  updated_at: string;
  house: TReserveHouse;
};

export type TReservationsResponse = {
  data: TReservation[];
  totalCount: number;
};

export type TReservationStatus = "pending" | "confirmed" | "canceled";

export type TPaymentStatus = "pending" | "paid" | "failed";

export type TGender = "male" | "female";

export interface TBooking {
  id: number;
  user_id: number;
  houseId: number;

  reservedDates: string[];

  traveler_details: TTravelerDetails[];

  status: TReservationStatus;

  sharedEmail: string;
  sharedMobile: string;

  created_at: string;
  updated_at: string;
}

export interface TReservationDetailResponse {
  booking: TBooking;
  paymentStatus: TPaymentStatus;
}

export type IDataTableHeaderItem = {
  id: number;
  label: string;
  className: string;
};
export type IUserHouseParams = {
  page?: string;
  sort?: string;
  order?: string;
  limit?: string;
  search?: string;
  propertyType?: string;
};
export type TUserHouse = {
  id: number;
  title: string;
  address: string;
  photos: null;
  rate: number;
  discounted_price: number;
  price: number;
  tags: [];
  last_updated: string;
  capacity: number;
  location: string;
  categories: string;
  bathrooms: number;
  parking: number;
  rooms: number;
  yard_type: null;
  num_comments: number;
  discount_id: null;
  transaction_type: string;
  sellerId: number;
  sellerName: string;
  caption: string;
};
export type TUserHouseResponse = {
  houses: TUserHouse[];
  totalCount: number;
};

export interface IDashboardStats {
  houses: number;

  users: {
    userCount: number;
    sellers: number;
    buyers: number;
    admins: number;
  };

  bookings: {
    bookingCount: number;
    conformedBookings: number;
    canceledBookings: number;
    pendingBookings: number;
  };

  comments: number;

  averageRating: string;
}
