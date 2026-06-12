import { useLocale, useTranslations } from "next-intl";
import Close from "../../../../../public/icons/Close";
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { ChangeEvent, useState } from "react";


interface IProps {
  handleLocFilterModal: (value: boolean) => void;
}


const FilterSocBookMarksModal = ({ handleLocFilterModal }: IProps) => {


  const t = useTranslations("customerDashboard.socialBookMarks");
  const locale = useLocale();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [sortBy, setSortBy] = useState<string>(
    searchParams.get("sortBy")?.toString() ?? "",
  );
  const [order, setOrder] = useState<string>(
    searchParams.get("order")?.toString() ?? "DESC",
  );


  const sortByOptions = [
    { id: 1, value: "", label: locale === "en" ? "Choose your value" : "مقدار مورد نظر را انتخاب کنید" },
    { id: 2, value: "created_at", label: locale === "en" ? "Created At" : "ساخته شده" },
    { id: 3, value: "updated_at", label: locale === "en" ? "Updated At" : "ویرایش شده" },
    { id: 4, value: "name", label: locale === "en" ? "Name" : "نام" },
    { id: 5, value: "clear", label: locale === "en" ? "Delete this filter" : "حذف این فیلتر" },
  ];
  const orderOptions = [
    { id: 1, value: "DESC", label: locale === "en" ? "Descending" : "نزولی" },
    { id: 2, value: "ASC", label: locale === "en" ? "Ascending" : "صعودی" },
  ];


  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);

    if (sortBy && sortBy !== "clear") {
      params.set("sortBy", sortBy);
      params.set("order", order);
    } else {
      params.delete("sortBy");
      params.delete("order"); 
    }
    
    router.push(`?${params.toString()}`);
    handleLocFilterModal(false);
  };


  return (
    <>
      <div
      onClick={() => {handleLocFilterModal(false);}}
      className="bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300 absolute inset-0 z-30"></div>
      <div
      className="flex flex-col gap-8 w-[480px] p-8 bg-[#FFFFFF] rounded-[24px] absolute top-[12%] left-[35%] z-90
      dark:bg-[#404040]">
        <div className="flex justify-between w-full">
          <span className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">{t("filters")}</span>
          <div onClick={() => {handleLocFilterModal(false);}}
          className="p-4 bg-[#F5F5F5] rounded-full cursor-pointer   dark:bg-[#525252]">
            <Close/>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">{t("sortBy")}</label>
          <select
          value={sortBy}
          onChange={(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {setSortBy(e.target.value);}}
          className="h-12 indent-4 bg-[#F5F5F5] rounded-[40px]   dark:bg-[#262626]">
            {sortByOptions.map((item, i) => (
              <option key={item.id} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="" className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">{t("order")}</label>
          <select
          value={order}
          onChange={(e: ChangeEvent<HTMLSelectElement, HTMLSelectElement>) => {setOrder(e.target.value);}}
          className="h-12 indent-4 bg-[#F5F5F5] rounded-[40px]   dark:bg-[#262626]">
            {orderOptions.map((item, i) => (
              <option key={item.id} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>
        <div className="flex gap-6">
          <button
          onClick={() => {handleLocFilterModal(false);}}
          className="w-full py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer 
          dark:text-[#E4E4E4] dark:border-[#E4E4E4]">
            {t("cancel")}
          </button>
          <button
          onClick={applyFilters}
          className="w-full py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer">
            {t("applyFilters")}
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSocBookMarksModal;
