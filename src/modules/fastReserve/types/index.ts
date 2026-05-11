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
