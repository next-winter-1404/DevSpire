'use client'
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { TLocation } from "@/components/common/types"
import { EditLocation } from "../services/PUT/EditLocation";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";


interface IProps {
    location: TLocation | null;
    id: number;
}

interface FormData {
    areaName: string;
    lat: string;
    lng: string;
}

const LocationProperties = ({ location, id }: IProps) => {


    const t = useTranslations("adminDashboard.locationsManagement");
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    
    const { register, handleSubmit, reset } = useForm<FormData>({
        defaultValues: {
            areaName: location?.areaName || "",
            lat: location?.lat?.toString() || "",
            lng: location?.lng?.toString() || "",
        }
    })


    useEffect(() => {
        reset({
            areaName: location?.areaName || "",
            lat: location?.lat?.toString() || "",
            lng: location?.lng?.toString() || "",
        })
    }, [location, reset])


    const onSubmit = async (formData: FormData) => {
        setLoading(true)
        try{
            await EditLocation({
                id,
                data: {
                    areaName: formData.areaName,
                    latitude: formData.lat,
                    longitude: formData.lng,
                }
            })
            router.refresh();
        } 
        catch(err){
        } 
        finally{
            setLoading(false)
        }
    }


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-between h-full">
            <div className="flex flex-col gap-8 flex-1">
                <div className="flex flex-col gap-4">
                    <label className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">{t("locationName")}</label>
                    <input 
                    type="text" 
                    {...register("areaName")} 
                    placeholder={t("locationNamePlc")}
                    className="h-12 indent-4 bg-[#FFFFFF] rounded-[16px]   dark:bg-[#262626]"/>
                </div>
                <div className="flex flex-col gap-4   sm:flex-row">
                    <div className="flex flex-col gap-4 flex-1">
                        <label className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">{t("latitude")}</label>
                        <input 
                        type="text" 
                        {...register("lat")} 
                        placeholder={t("latitudePlc")}
                        className="h-12 indent-4 bg-[#FFFFFF] rounded-[16px]   dark:bg-[#262626]"/>
                    </div>
                    <div className="flex flex-col gap-4 flex-1">
                        <label className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">{t("longitude")}</label>
                        <input 
                        type="text" 
                        {...register("lng")} 
                        placeholder={t("longitudePlc")}
                        className="h-12 indent-4 bg-[#FFFFFF] rounded-[16px]   dark:bg-[#262626]"/>
                    </div>
                </div>
            </div>
            <div className="flex justify-start w-full">
                <button 
                type="submit" 
                disabled={loading}
                className="py-[13px] px-8 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer   disabled:opacity-60">
                    {t("confirm")}
                </button>
            </div>
        </form>
    )
}

export default LocationProperties