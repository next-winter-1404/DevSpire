import { useTranslations } from "next-intl";
import NotifDataTableRow from "./NotifDataTableRow";
import { TNotification } from "../types";


interface IProps{
    notifications: TNotification[];
}

const NotificationsDataTable = ({notifications}: IProps) => {

    const t = useTranslations("sellerDashboard.notifications")

    const unread = notifications.filter(n => !n.isRead);
    const read = notifications.filter(n => n.isRead);


    return (
        <div className="flex flex-col gap-6 p-6 bg-[#FFFFFF] border border-[#DDDDDD] rounded-[24px]   
        dark:border-[#777777] dark:bg-[#262626]">
            <div className="flex">
                <div className="flex">
                    <div className="flex justify-start w-148">
                        <span className="font-bold text-[20px] text-[#1E2022]   dark:text-[#E4E4E4]">{t("notification")}</span>
                    </div>
                    <div className="flex justify-start w-64">
                        <span className="font-bold text-[20px] text-[#1E2022]   dark:text-[#E4E4E4]">{t("date")}</span>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6">
                {
                    unread.length > 0 &&
                    <div className="flex flex-col gap-4">
                        <span className="text-[20px] text-[#777777]   dark:text-[#A3A3A3]">{t("notRead")}</span>
                        {
                            unread.map((item) => (
                                <NotifDataTableRow item={item} key={item.id}/>
                            ))
                        }
                    </div>
                }
                {
                    read.length > 0 &&
                    <div className="flex flex-col gap-4">
                        <span className="text-[20px] text-[#777777]   dark:text-[#A3A3A3]">{t("read")}</span>
                        {
                            read.map((item) => (
                                <NotifDataTableRow item={item} key={item.id}/>
                            ))
                        }
                    </div>
                }
            </div>
        </div>
    )

}

export default NotificationsDataTable