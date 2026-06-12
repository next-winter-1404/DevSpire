import httpClient from "@/core/interceptor/axios";


export const DeleteSocialBookMark = async (id: number) => {
    try {
        const res = await httpClient.delete(`/social-bookmarks/${id}`);
        return res.data;
    } 
    catch(err) {
        throw err;
    }
};