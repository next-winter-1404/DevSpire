"use client"
import { FormatDate } from "@/utils/helper/FormatDate";
import CircleTick from "../../../../public/icons/CircleTick"
import { TNotification } from "../types"
import { ReadNotification } from "@/modules/sellerDashboard/Notifications/services/PUT/ReadNotification";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";



interface IProps{
    item: TNotification;
}


const NotifDataTableRow = ({item}: IProps) => {

    const locale = useLocale()

    const readNotifMutation = useMutation({
        mutationFn: () => ReadNotification(item.id),
        onSuccess: () => {
            window.location.reload();
        },
        onError: (error) => {
            locale === "en" ? alert("Error. Try Again") : alert("مشکلی پیش آمد، دوباره تلاش کنید.");
        }
    })


    return (
        <div className="flex">
            <div className="w-148">
                <p className="text-[#1E2022]   dark:text-[#E4E4E4]">{item.message}</p>
            </div>
            <div className="w-64">
                <span className="text-[#1E2022]   dark:text-[#E4E4E4]">
                    {item.createdAt === item.updatedAt ? FormatDate(item.createdAt, "fa") : FormatDate(item.updatedAt, "fa")}
                </span>
            </div>
            {!item.isRead && (
                <button 
                onClick={() => {readNotifMutation.mutate()}}
                className="flex items-center gap-2 text-[#008C78] cursor-pointer   dark:text-[#E6EDF5]">
                    <CircleTick/>
                    <span>علامت گذاری به عنوان خوانده شده</span>
                </button>
            )}
        </div>
    )

}

export default NotifDataTableRow