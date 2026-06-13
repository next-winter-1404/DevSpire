import httpClient from "@/core/interceptor/axios";


interface IProps{
    id: number;
    data:{
        areaName: string;
        latitude: string;
        longitude: string;
    }
}

export const EdidTour = async ({id, data}: IProps) => {
    try {
        const res = await httpClient.put(`/tours/admin/${id}`, data);
        return res.data;
    } 
    catch(err) {
        throw err;
    }
};