import httpClient from "@/core/interceptor/axios";


export const AddSocialBookMark = async (data: { name: string }) => {
    try {
        const res = await httpClient.post("/social-bookmarks/bookmark", data);
        return res.data;
    } 
    catch(err) {
        throw err;
    }
};