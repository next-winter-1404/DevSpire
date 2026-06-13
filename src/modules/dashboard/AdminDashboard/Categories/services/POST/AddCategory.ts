import httpClient from "@/core/interceptor/axios";


export const AddCategory = async (data: { name: string }) => {
    try {
        const res = await httpClient.post("/categories", data);
        return res.data;
    } 
    catch(err) {
        throw err;
    }
};