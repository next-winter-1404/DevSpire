import httpClient from "@/core/interceptor/axios";


export const DeleteCategory = async (id: number) => {
    try {
        const res = await httpClient.delete(`/categories/${id}`);
        return res.data;
    } 
    catch(err) {
        throw err;
    }
};