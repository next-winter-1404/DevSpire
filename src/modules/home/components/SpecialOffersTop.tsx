"use client"
import { Link } from "@/i18n/routing"
import { useTranslations } from "next-intl";


const SpecialOffersTop = () => {

    const t = useTranslations("home.specialOffers");

    return (
        <div className="flex justify-between w-full ">
          <div className="flex gap-2 font-bold text-[24px]">
            <h2 className="text-[#FF5555]">{t("redTitle")}</h2>
            <h2 className="text-foreground">{t("darkTitle")}</h2>
          </div>
          <Link
            href={"/mortgage-rent"}
            className="py-2 px-4 font-regular text-[20px] text-[#0D3B66] border border-[#0D3B66] rounded-[40px] transition-all 
          duration-300 ease-in-out cursor-pointer
          hover:bg-blue-100
          dark:text-[#E4E4E4] dark:border-[#E4E4E4]">
            {t("seeAllButton")}
          </Link>
        </div>
    )

}

export default SpecialOffersTop