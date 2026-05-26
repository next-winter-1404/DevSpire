import httpClient from "@/core/interceptor/axios";
export interface UserProfile {
    id?: number;
    role?: "buyer" | "seller" | "admin" | string;
    email?: string;
    fullName?: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    emailVerified?: boolean;
    membershipDate?: string;
    profilePicture?: string;
    createdAt?: string;
    updatedAt?: string;
}
export async function getUserInfo(id: string): Promise<UserProfile> {
    try {
        const res = await httpClient.get(`/users/${id}`);
        return res.data.user as UserProfile;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "خطا در دریافت اطلاعات کاربر");
    }
}
export async function updateUserProfile(id: string, data: any) {
    try {
        const res = await httpClient.put(`/users/${id}`, data);
        return res.data.user;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "خطا در بروزرسانی پروفایل");
    }
}
export async function changeUserPassword(currentPassword: string, newPassword: string) {
    try {
        const res = await httpClient.put("/users/change-password", {
            currentPassword,
            newPassword,
        });
        return res.data;
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "خطا در تغییر رمز عبور");
    }
}
export async function uploadUserAvatar(file: File): Promise<string> {
    try {
        const formData = new FormData();
        formData.append("picture", file);

        const res = await httpClient.put("/users/upload/picture", formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });
        return (
            res.data.profilePictureUrl ||
            res.data.profilePicture ||
            res.data.user?.profilePicture ||
            ""
        );
    } catch (error: any) {
        throw new Error(error?.response?.data?.message || "خطا در آپلود عکس پروفایل");
    }
}
