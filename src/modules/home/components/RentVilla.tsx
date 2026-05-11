import { apiFetch } from "@/core/Server-fetch/fetchApi";
import RentVillaCard from "./RentVillaCard";
import { useTranslations } from "next-intl";

const RentVilla = async () => {

  const t = useTranslations("home.rentVilla");

  const data = await apiFetch("/houses", {
    params: {
      limit: 5,
    },
    next: {
      revalidate: 60,
    },
  });


  return (
    <div className="  mt-30 px-4 sm:px-6 lg:px-10 w-full">
      <div className="flex flex-col gap-10">
        <h2 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
          {t("title")}
        </h2>
        <div className="flex flex-row flex-wrap gap-6 justify-between w-full">
          {
            data.houses?.slice(0,5).map((item: any) => (
              <RentVillaCard key={item.id} item={item}/>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default RentVilla;
