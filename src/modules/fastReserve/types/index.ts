export interface IReserveCard {
  id: string;
  title: string;
  location: string;
  price: number;
  oldPrice?: number;
  discount?: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  parking: number;
  imageUrl: string;
}

export interface IFastReserveParams {
  page?: string;
  sort?: string;
  option?: string;
  limit?: string;
  query?: string;
  maxPrice?: string;
  minPrice?: string;
  lat?: string;
  lng?: string;
}
