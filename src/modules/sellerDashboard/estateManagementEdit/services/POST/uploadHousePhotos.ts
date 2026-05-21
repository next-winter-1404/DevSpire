import httpClient from "@/core/interceptor/axios";


export const uploadHousePhotos = async (id: number, formData: FormData) => {
  try {
    const res = await httpClient.post(`/api/houses/upload/photos/${id}`, formData);
    return res;
  } catch (err) {
    throw err;
  }
};
