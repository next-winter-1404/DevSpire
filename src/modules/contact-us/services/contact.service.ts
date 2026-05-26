import httpClient from "@/core/interceptor/axios";
import { ContactUsPayload } from "../types/contact.types";
import { AxiosResponse } from "axios";

export const sendContactMessage = (
    data: ContactUsPayload
): Promise<AxiosResponse> => {
    return httpClient.post("/contact-us", data);
};