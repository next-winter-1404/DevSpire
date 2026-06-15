import httpClient from "@/core/interceptor/axios";


export const DeleteLocation = async (id: number) => {
    try {
        const res = await httpClient.delete(`/locations/${id}`);
        return res.data;
    } 
    catch(err) {
        throw err;
    }
};