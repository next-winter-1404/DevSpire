import httpClient from "@/core/interceptor/axios";


export const AddLocation = async (data: { areaName: string; lat: string; lng: string }) => {
    try {
        const res = await httpClient.post("/locations", data);
        return res.data;
    } 
    catch(err) {
        throw err;
    }
};