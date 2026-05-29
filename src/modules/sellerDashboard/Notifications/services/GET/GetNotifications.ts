import httpClient from "@/core/interceptor/axios";



export const GetNotifications = async (id: number) => {

    try {
        const res = await httpClient(`/notifications/${id}`);
        return res.data;
    } catch (err) {
        throw err;
    }

};
