import { apiFetch } from "@/core/Server-fetch/fetchApi";
import RentVillaCard from "./RentVillaCard";
import { useTranslations } from "next-intl";
import RentVillaSlider from "./RentVillaSlider";

const RentVilla = () => {
  const t = useTranslations("home.rentVilla");

  return (
    <div className="  mt-30 px-4 sm:px-6 lg:px-10 w-full">
      <div className="flex flex-col gap-10">
        <h2 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
          {t("title")}
        </h2>
        <RentVillaSlider />
      </div>
    </div>
  );
};

export default RentVilla;
