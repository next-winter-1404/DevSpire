import { useTranslations } from "next-intl";
import NotifDataTableRow from "./NotifDataTableRow";
import { TNotification } from "../types";

interface IProps {
  notifications: TNotification[];
}

const NotificationsDataTable = ({ notifications }: IProps) => {
const t = useTranslations("notifications");

  const unread = notifications.filter((n) => !n.isRead);
  const read = notifications.filter((n) => n.isRead);

  return (
    <div className="flex flex-col gap-6 ">
      <div className="hidden w-full   md:flex">
        <div className="flex flex-grow-3 justify-start   md:flex-grow-[1.1]">
          <span className="font-bold text-[20px] text-[#1E2022]   dark:text-[#E4E4E4]">
            {t("notification")}
          </span>
        </div>
        <div className="flex flex-grow-1 justify-start   md:flex-grow-1">
          <span className="font-bold text-[20px] text-[#1E2022]   dark:text-[#E4E4E4]">
            {t("date")}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-6">
        {unread.length > 0 && (
          <div className="flex flex-col gap-6   sm:gap-4">
            <span className="text-[20px] text-[#777777]   dark:text-[#A3A3A3]">
              {t("notRead")}
            </span>
            {unread.map((item) => (
              <NotifDataTableRow item={item} key={item.id} />
            ))}
          </div>
        )}
        {read.length > 0 && (
          <div className="flex flex-col gap-6   sm:gap-4">
            <span className="text-[20px] text-[#777777]   dark:text-[#A3A3A3]">
              {t("read")}
            </span>
            {read.map((item) => (
              <NotifDataTableRow item={item} key={item.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsDataTable;
