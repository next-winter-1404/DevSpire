import httpClient from "@/core/interceptor/axios";

export const DeleteHouse = async (id: number) => {
  try {
    const res = await httpClient.delete(`/houses/${id}`);
    return res;
  } catch (err) {
    throw err;
  }
};
