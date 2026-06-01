import httpClient from "@/core/interceptor/axios";


interface IProps{
    id: number;
    data:{
        areaName: string;
        latitude: string;
        longitude: string;
    }
}

export const AddLocation = async ({id, data}: IProps) => {
    try {
        const res = await httpClient.put(`/locations/${id}`, data);
        return res.data;
    } 
    catch(err) {
        throw err;
    }
};