
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { getUserInfo, updateUserProfile } from "@/modules/userinfo/services/userService";
import { useTranslations } from "next-intl";

type FormValues = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
};

type UserInfoFormProps = {
    userId: string;
};
export default function UserInfoForm({ userId }: UserInfoFormProps) {
    const [loading, setLoading] = useState(false);
    const t = useTranslations("User");
    const { register, handleSubmit, reset } = useForm<FormValues>();
    useEffect(() => {
        if (!userId) return;

        const fetchUserData = async () => {
            try {
                const data = await getUserInfo(userId);
                reset({
                    firstName: data.firstName || "",
                    lastName: data.lastName || "",
                    phone: data.phoneNumber || "",
                    email: data.email || "",
                });
            } catch (error) {
                toast.error(t("fetchError"));
                console.error(error);
            }
        };

        fetchUserData();
    }, [userId, reset]);

    const onSubmit = async (data: FormValues) => {
        if (!userId) {
            toast.error(t("fetchError"));
            return;
        }
        try {
            setLoading(true);

            await updateUserProfile(userId, {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phone,
                email: data.email,
            });

            toast.success(t("updateSuccess"));
        } catch (err: any) {
            toast.error(err?.message || t("updateError"));
        } finally {
            setLoading(false);
        }
    };
    const inputClasses = "w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none transition-colors dark:bg-[#2A2D2F] dark:text-white dark:placeholder:text-white/40 dark:border-[#DDDDDD]/20 focus:dark:border-[#DDDDDD]/40";


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-10 w-full">
            <div className="flex flex-col gap-2 w-full">
                <label>{t("firstName")}</label>
                <input
                    {...register("firstName")}
                    className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none dark:bg-[#2A2D2F] dark:text-white dark:placeholder:text-white/40 dark:border-[#DDDDDD]/20"
                    placeholder={t("firstNamePlaceholder")}
                />
            </div>

            <div className="flex flex-col gap-2 w-full">
                <label>{t("lastName")}</label>
                <input
                    {...register("lastName")}
                    className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none dark:bg-[#2A2D2F] dark:text-white dark:placeholder:text-white/40 dark:border-[#DDDDDD]/20"
                    placeholder={t("lastNamePlaceholder")}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label>{t("phone")}</label>
                <input
                    {...register("phone")}
                    className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none dark:bg-[#2A2D2F] dark:text-white dark:placeholder:text-white/40 dark:border-[#DDDDDD]/20"
                    placeholder={t("phonePlaceholder")}
                />
            </div>
            <div className="flex flex-col gap-2 w-full">
                <label>{t("email")}</label>
                <input
                    type="email"
                    {...register("email")}
                    className="w-full h-[48px] rounded-[16px] border border-[#DDDDDD] bg-[#FFFFFF] px-[16px] py-[8px] focus:outline-none dark:bg-[#2A2D2F] dark:text-white dark:placeholder:text-white/40 dark:border-[#DDDDDD]/20"
                    placeholder="example@gmail.com"
                />
            </div>
            <div className="col-span-2 flex justify-end mt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="w-[160px] cursor-pointer h-[48px] rounded-[16px] bg-[#0D3B66] text-white disabled:opacity-60">
                    {loading ? t("saving") : t("saveChanges")}
                </button>
            </div>
        </form>
    );
}