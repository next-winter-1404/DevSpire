"use client"
import { ChangeEvent, useEffect, useState } from "react"
import Filter from "../../../../../public/icons/Filter"
import FilterToursModal from "./FilterToursModal";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useDebounce } from "use-debounce";
import CustomSelect from "@/components/common/CustomSelectOption";



const ToursManagementTop = () => {

    const t = useTranslations("sellerDashboard.notifications");
    const locale = useLocale();
    const searchParams = useSearchParams();
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchField, setSearchField] = useState<string>("title");
    const [debouncedSearch] = useDebounce(searchQuery, 950);


    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (debouncedSearch) {
        if (searchField === "title") {
            params.set("title", debouncedSearch);
            params.delete("tag");
        } else {
            params.set("tag", debouncedSearch);
            params.delete("title");
        }
        params.set("page", "1");
        } else {
        params.delete("title");
        params.delete("tag");
        }

        const currentQueryString = searchParams.toString();
        const newQueryString = params.toString();

        if (currentQueryString !== newQueryString) {
        router.push(`?${newQueryString}`, { scroll: false });
        }
    }, [debouncedSearch, searchField, searchParams, router]);


    const searchOptions = [
        { id: 1, label: locale === "en" ? "Title" : "عنوان", value: "title" },
        { id: 2, label: locale === "en" ? "Tag" : "تگ", value: "tag" },
    ];


    const [isOpenFilterModal, setIsOpenFilterModal] = useState<boolean>(false);
    const handleTourFilterModal = (value: boolean) => {
        setIsOpenFilterModal(value);
    }


    return (
        <>
            <div className="flex flex-col items-center gap-4 w-full   sm:flex-row sm:justify-between">
                <div className="flex flex-col items-center gap-4   lg:flex-row">
                    <h1 className="font-bold whitespace-nowrap text-[24px] text-[#1E2022] dark:text-[#F5F5F5]">{t("title")}</h1>
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
                        className="w-full h-12 indent-4 bg-[#FFFFFF] rounded-[40px] outline-none    sm:w-80   dark:bg-[#525252]"/>
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
                <button 
                onClick={() => {handleTourFilterModal(true)}}
                className="flex justify-center items-center gap-3 w-full py-[13px] text-[#1E2022] bg-[#FFFFFF] border border-[#DDDDDD] 
                rounded-[16px] cursor-pointer
                sm:w-auto sm:px-3
                dark:text-[#E4E4E4] dark:bg-[#404040] dark:border-[#E4E4E4]">
                    <Filter/>
                    <span>{t("filters")}</span>
                </button>
            </div>
            {isOpenFilterModal && <FilterToursModal handleTourFilterModal={handleTourFilterModal}/>}
        </>
    )

}

export default ToursManagementTop