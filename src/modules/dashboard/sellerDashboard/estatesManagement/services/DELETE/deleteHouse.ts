import httpClient from "@/core/interceptor/axios";

export const DeleteHouse = async (id: number, role: "seller" | "admin") => {
  try {
    const res = await httpClient.delete(
      `${role == "seller" ? "/houses" : "/admin/houses"}/${id}`,
    );
    return res;
  } catch (err) {
    throw err;
  }
};
