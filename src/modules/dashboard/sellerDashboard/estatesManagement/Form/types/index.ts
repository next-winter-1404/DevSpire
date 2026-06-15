export interface IStep1Data {
  title: string;
  capacity: number;
  transaction_type: string;
  price: number;
  discounted_price: number | null;
  category?: string;
  rate: number;
  caption?: string;
}
export interface IStep2Data {
  location: string;
  address: string;
}
export interface IStep3Data {
  rooms: number;
  parking: number;
  bathrooms: number;
  tags: string[] | string;
}

export interface IStep4Data {
  photos: string[];
}

export interface IGeneraData {
  id?: number;
  step1: IStep1Data;
  step2: IStep2Data;
  step3: IStep3Data;
  step4: IStep4Data;
}
export interface IHousePayload {
  title: string;
  capacity: number;
  transaction_type: string;
  price: number;
  discounted_price?: number;
  category?: string;
  rate: number;
  caption?: string;
  location: string;
  address: string;
  rooms: number;
  parking: number;
  bathrooms: number;
  tags: string[] | string;
}
