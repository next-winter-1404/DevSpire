import httpClient from "@/core/interceptor/axios";


interface IProps{
    id: number;
    data:{
        name: string;
    }
}

export const EditCategory = async ({id, data}: IProps) => {
    try {
        const res = await httpClient.put(`/categories/${id}`, data);
        return res.data;
    } 
    catch(err) {
        throw err;
    }
};