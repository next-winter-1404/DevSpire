"use client"
import { useLocale, useTranslations } from "next-intl"
import Search from "../../../../public/icons/Search"
import Arrow from "../../../../public/icons/Arrow"
import { IOption } from "@/components/common/FastSearchForm"
import { useSearchParams } from "next/navigation"
import { usePathname, useRouter } from "@/i18n/routing"
import { ChangeEvent, useEffect, useState } from "react"
import { useDebounce } from "use-debounce"
import CustomSelect from "@/components/common/CustomSelectOption"



const Filters = ({totalCount, categories}:{totalCount: number, categories: []}) => {


    const locale = useLocale();
    const t = useTranslations("articles.filters");
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();


    const sortOptions: IOption[] = [
        {value: "created_at", label: locale == "en" ? "created at" : "تاریخ ثبت آگهی"},
        {value: "updated_at", label: locale == "en" ? "last updated" : "آخرین به‌روزرسانی"},
    ];
    const orderOptions: IOption[] = [
        { value: "DESC", label: locale == "en" ? "desc" : "نزولی" },
        { value: "ASC", label: locale == "en" ? "asc" : "صعودی" },
    ];
    // const categoryOptions: IOption[] = categories.map((item) => ({
    //     label: item.label,
    //     value: item.value
    // }));
    const authorOptions: IOption[] = [
        {value: "villa", label: locale == "en" ? "villa" : "ویلا"},
        {value: "apartment", label: locale == "en" ? "apartment" : "آپارتمان"},
        {value: "house", label: locale == "en" ? "house" : "خانه"},
        {value: "land", label: locale == "en" ? "land" : "زمین"},
        {value: "commercial", label: locale == "en" ? "commercial" : "اقتصادی"},
    ];
    const limitOptions: IOption[] = [
        {value: "12", label: "12"},
        {value: "18", label: "18"},
        {value: "24", label: "24"},
    ];
    

    const [query, setQuery] = useState(searchParams.get("query") ?? "");
    const [search] = useDebounce(query, 950);
    const [category, setCategory] = useState<string>(
        searchParams.get("category")?.toString() ?? "",
    );
    const [sort, setSort] = useState<string>(
        searchParams.get("sort") ?? sortOptions[0].value,
    );
    const [order, setOrder] = useState<string>(
        searchParams.get("order") ?? orderOptions[0].value,
    );
    const [limit, setLimit] = useState<string>(
        searchParams.get("limit") ?? limitOptions[0].value,
    );


    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());
        const setOrDelete = (key: string, value: string) => {
        if (value) params.set(key, value);
        else params.delete(key);
        };
        setOrDelete("search", search);
        setOrDelete("category", category);
        setOrDelete("sort", sort);
        setOrDelete("order", order);
        setOrDelete("limit", limit);
        params.set("page", "1");
        const currentQueryString = searchParams.toString();
        const newQueryString = params.toString();
        if (currentQueryString !== newQueryString) {router.push(`${pathname}?${newQueryString}`, { scroll: false })}
    }, [search, sort, order, limit, category]);

    const deleteFilter = (key: string) => {
        const params = new URLSearchParams(searchParams.toString());
        const isAvailble = params.get(key);
        if (isAvailble) {
        params.delete(key);
        }
        router.push(`${pathname}?${params}`);
    };


    const getQuery = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);
    const getSortOptions = (value: string) => setSort(value);
    const getOrderOptions = (value: string) => {
        setOrder(value);
    };
    const getCategoryOptions = (value: string) => {
        setCategory(value);
    };
    const getLimitOptions = (value: string) => {
        setLimit(value);
    };


    return (
        <div className="flex flex-col gap-8 mt-10">
            <div className="flex justify-between">
                <h2 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">{t("title")}</h2>
                <div className="flex gap-2">
                    <span>{totalCount}</span>
                    <span className="font-regular text-[20px] text-[#0D3B66]   dark:text-[#E4E4E4]">{t("result")}</span>
                </div>
            </div>
            <div className="flex flex-col gap-5 p-4 border border-[#DDDDDD] rounded-[24px]   dark:border-[#404040]">
                <div className="flex flex-col gap-5   lg:flex-row">
                    <div className="flex flex-col gap-4 w-full  
                    sm:w-[320px]   lg:w-[510px]">
                        <span className="font-bold text-[16px] text-[#1E2022]">{t("search")}</span>
                        <div className="relative">
                            <input onChange={(e: ChangeEvent<HTMLInputElement>) => getQuery(e)}
                            value={query}
                            placeholder={t("searchPlaceholder")} 
                            className="w-full h-[46px] indent-5 bg-[#F5F5F5] rounded-[40px]   dark:bg-[#404040]"/>
                            <Search className={`absolute ${locale == "en" ? "right-5" : "left-5"} top-[30%]`}/>
                        </div>
                    </div>
                    <div className="flex flex-col flex-wrap gap-5 w-full   sm:flex-row">
                        {/* <div className="flex flex-col flex-grow gap-4 min-w-[168px]">
                            <span className="font-bold text-[16px] text-[#1E2022]">دسته بندی</span>
                            <CustomSelect options={categoryOptions} defaultValue={categoryOptions[0].value} onValueChange={getLimitOptions}/>
                        </div>  */}
                        <div className="flex flex-col flex-grow gap-4 min-w-[168px]">
                            <span className="font-bold text-[16px] text-[#1E2022]">{t("sortBy")}</span>
                            <CustomSelect options={sortOptions} defaultValue={sortOptions[0].value} onValueChange={getSortOptions}/>
                        </div>                        
                        <div className="flex flex-col flex-grow gap-4 min-w-[168px]">
                            <span className="font-bold text-[16px] text-[#1E2022]">ترتیب مرتب سازی</span>
                            <CustomSelect options={orderOptions} defaultValue={orderOptions[0].value} onValueChange={getOrderOptions}/>
                        </div>                        
                    </div>
                </div>
                <div className="flex flex-col gap-5   lg:flex-row">
                    <div className="flex flex-col gap-4 w-[368px] min-w-[168px]">
                        <span className="font-bold text-[16px] text-[#1E2022]">نام نویسنده</span>
                        <CustomSelect options={authorOptions} defaultValue={authorOptions[0].value} onValueChange={getOrderOptions}/>
                    </div>                        
                    <div className="flex flex-col gap-4 w-[368px] min-w-[168px]">
                        <span className="font-bold text-[16px] text-[#1E2022]">تعداد نمایش</span>
                        <CustomSelect options={limitOptions} defaultValue={limitOptions[0].value} onValueChange={getLimitOptions}/>
                    </div>                    
                </div>
            </div>
        </div>
    )

}

export default Filters