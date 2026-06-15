import httpClient from "@/core/interceptor/axios";



export const ReadNotification = async (id: number) => {
    try{
        const res = await httpClient.put(`/notifications/${id}/read`);
        return res.data;
    } 
    catch(err){
        throw err;
    }
};
