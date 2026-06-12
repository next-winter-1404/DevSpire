import httpClient from "@/core/interceptor/axios";



export const AddToBookMarks = async (data: { houseId: number, note: string }) => {
    try {
        const res = await httpClient.post("/social-bookmarks/bookmark", data);
        return res.data;
    } 
    catch(err) {
        throw err;
    }
};