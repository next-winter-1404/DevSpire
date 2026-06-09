import { useTranslations } from "next-intl";
import { TCategory } from "../../../../components/common/types"
import CategoriesDataTableRow from "./CategoriesDataTableRow";


interface IProps{
    data: TCategory[];
}

const CategoriesDataTable = ({data}: IProps) => {

    const t = useTranslations("adminDashboard.categories");


    return (
        <table className="flex flex-col gap-4">
            <thead className="hidden font-bold text-[#1E2022]   md:flex">
                <tr className="w-full px-6">
                    <td className="w-[98%] text-[#1E2022]   dark:text-[#E4E4E4]">
                        <span>{t("categoryName")}</span>
                    </td>
                    <td className="text-[#1E2022]   dark:text-[#E4E4E4]">
                        <span>{t("actions")}</span>
                    </td>
                </tr>
            </thead>
            <tbody className="flex flex-col">
                {
                    data?.map((item) => (
                        <CategoriesDataTableRow item={item} key={item.id}/>
                    ))
                }
            </tbody>
        </table>
    )

}

export default CategoriesDataTable

