import httpClient from '@/core/interceptor/axios';


interface EditHousePayload {
  title: string;
  capacity: number;
  transaction_type: string;
  price: string;
  categpry: string;
  caption: string;
  location: string;
  rooms: number;
  bathrooms: number;
  parking: number;
  yard_type: string;
  tags: string[];
  photos: string[];
}

export const editHouse = async (id: number, postData: EditHousePayload) => {
  try {
    const res = await httpClient.put(`/api/houses/${id}`, postData);
    return res.data;
  } catch (err: any) {
    console.error(`Error editing house ${id}:`, err);
    throw err;
  }
};
