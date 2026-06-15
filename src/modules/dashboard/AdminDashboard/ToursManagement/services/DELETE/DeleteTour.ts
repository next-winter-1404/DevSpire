import httpClient from "@/core/interceptor/axios";


export const DeleteTour = async (id: number) => {
    try {
        const res = await httpClient.delete(`/tours/admin/${id}`);
        return res.data;
    } 
    catch(err) {
        throw err;
    }
};