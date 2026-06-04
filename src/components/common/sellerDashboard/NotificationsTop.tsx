"use client";
import { useLocale, useTranslations } from "next-intl";
import CustomSelect from "../CustomSelectOption";
import Filter from "../../../../public/icons/Filter";
import { ChangeEvent, useEffect, useState } from "react";
import NotificationsFilterModal from "./NotificationsFilterModal";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useDebounce } from "use-debounce";
import ReadNotificationsModal from "./ReadNotificationsModal";

const NotificationsTop = () => {
  const t = useTranslations("sellerDashboard.notifications");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchField, setSearchField] = useState<string>("title");
  const [debouncedSearch] = useDebounce(searchQuery, 950);
  const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(false);
  const [isOpenReadModal, setIsOpenReadModal] = useState<boolean>(false);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (debouncedSearch) {
      if (searchField === "title") {
        params.set("title", debouncedSearch);
        params.delete("message");
      } else {
        params.set("message", debouncedSearch);
        params.delete("title");
      }
      params.set("page", "1");
    } else {
      params.delete("title");
      params.delete("message");
    }

    const currentQueryString = searchParams.toString();
    const newQueryString = params.toString();

    if (currentQueryString !== newQueryString) {
      router.push(`?${newQueryString}`, { scroll: false });
    }
  }, [debouncedSearch, searchField, searchParams, router]);

  const handleNotifFilterModal = (value: boolean) => {
    setIsOpenFilterModal(value);
  };
  const handleReadNotifsModal = (value: boolean) => {
    setIsOpenReadModal(value);
  };

  const searchOptions = [
    { id: 1, label: locale === "en" ? "Title" : "عنوان", value: "title" },
    { id: 2, label: locale === "en" ? "Message" : "پیام", value: "message" },
  ];

  return (
    <>
      <div
        className="flex flex-col justify-between gap-6 w-full 
        lg:flex-row lg:gap-0"
      >
        <div className="flex flex-col items-center gap-4   lg:flex-row">
          <h1 className="font-bold whitespace-nowrap text-[24px] text-[#1E2022] dark:text-[#F5F5F5]">
            {t("title")}
          </h1>
          <div className="flex flex-col gap-2 w-full   sm:flex-row">
            <input
              type="text"
              value={searchQuery}
              placeholder={
                locale === "en"
                  ? "Enter search text..."
                  : "عبارت مورد نظر را وارد کنید"
              }
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchQuery(e.target.value)
              }
              className="w-full h-12 indent-4 bg-[#FFFFFF] rounded-[40px] outline-none 
                        sm:w-80
                        dark:bg-[#525252]"
            />
            <div className="w-full   sm:w-40">
              <CustomSelect
                defaultValue={searchField}
                options={searchOptions}
                onValueChange={setSearchField}
                className="bg-[#FFFFFF] dark:bg-[#525252]"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between gap-4   sm:flex-row">
          <button
            onClick={() => handleNotifFilterModal(true)}
            className="flex justify-center items-center gap-3 py-[13px] px-3 text-[#1E2022] bg-[#FFFFFF] border border-[#DDDDDD] 
                    rounded-[16px] cursor-pointer 
                    dark:text-[#FFFFFF] dark:bg-[#404040]"
          >
            <Filter />
            <span>{t("filters")}</span>
          </button>
          <button
            onClick={() => handleReadNotifsModal(true)}
            className="py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer"
          >
            {t("markAsRead")}
          </button>
        </div>
      </div>
      {isOpenFilterModal && (
        <NotificationsFilterModal
          handleNotifFilterModal={handleNotifFilterModal}
        />
      )}
      {isOpenReadModal && (
        <ReadNotificationsModal handleReadNotifsModal={handleReadNotifsModal} />
      )}
    </>
  );
};

export default NotificationsTop;
