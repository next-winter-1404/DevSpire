import SpecialOffersSlider from "./SpecialOffersSlider";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

const SpecialOffers = () => {
  const t = useTranslations("home.specialOffers");

  return (
    <div className="flex justify-center mt-30 px-4 sm:px-6 lg:px-10 w-full">
      <div className="flex flex-col gap-8 w-full">
        <div className="flex justify-between w-full ">
          <div className="flex gap-2 md:font-bold text-[20px] md:text-[24px]">
            <h2 className="text-[#FF5555]">{t("redTitle")}</h2>
            <h2 className="text-foreground">{t("darkTitle")}</h2>
          </div>
          <Link
            href={"/mortgage-rent"}
            className="py-2 px-4 font-regular text-[14px] md:text-[20px] text-[#0D3B66] border border-[#0D3B66] rounded-[40px] transition-all 
          duration-300 ease-in-out cursor-pointer
          hover:bg-blue-100
          dark:text-[#E4E4E4] dark:border-[#E4E4E4]"
          >
            {t("seeAllButton")}
          </Link>
        </div>
        <SpecialOffersSlider />
      </div>
    </div>
  );
};

export default SpecialOffers;
