import { useTranslations } from "next-intl";



const CategoriesTop = () => {


    const t = useTranslations("home.categories");


    return (
        <div>
            <h2 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">
                {t("title")}
            </h2>
        </div>
    )

}

export default CategoriesTop