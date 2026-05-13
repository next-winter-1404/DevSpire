export interface IFastReserveParams {
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
}

export interface IArticlesParams{
  page?: string;
  sort?: string;
  order?: string;
  limit?: string;
  search?: string;
  propertyType?: string;
}

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

export type TArticle = {
  id: number,
  title: string,
  caption: string,
  estimated_reading_time: string,
  author_id: number,
  created_at: string,
  category_id: number
}

export type TArticlesResponse = {
  data: TArticle[];
  totalCount: number;
}