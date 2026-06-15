import httpClient from "@/core/interceptor/axios";



export const ReadAllNotifications = async () => {
    try{
        const res = await httpClient.put("/notifications/mark-all-as-read");
        return res.data;
    } 
    catch(err){
        throw err;
    }
};
