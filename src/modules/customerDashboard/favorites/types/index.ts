export interface IFavoriteHouse {
  id: number;
  title: string;
  address: string;
  photos: string[] | null;
  rate: string;
  price: string;
}

export interface IFavorites {
  id: number;
  user_id: number;
  house_id: number;
  created_at: string;
  updated_at: string;
  house: IFavoriteHouse;
}

export interface IFavoritesResponse {
  data: IFavorites[];
  totalCount: number;
}
