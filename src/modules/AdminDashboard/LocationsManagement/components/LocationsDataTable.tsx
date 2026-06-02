import { useTranslations } from "next-intl";
import { TLocation } from "../../../../components/common/types"
import LocationsTableRow from "./LocationsTableRow";



interface IProps{
    data: TLocation[];
}

const LocationsDataTable = ({data}: IProps) => {

    const t = useTranslations("adminDashboard.locationsManagement");


    return (
        <table className="flex flex-col gap-4">
            <thead className="flex font-bold text-[#1E2022]">
                <tr>
                    <td className="w-104 text-[#1E2022]   dark:text-[#E4E4E4]">
                        <span>{t("locationName")}</span>
                    </td>
                    <td className="w-64 text-[#1E2022]   dark:text-[#E4E4E4]">
                        <span>{t("latitude")}</span>
                    </td>
                    <td className="w-104 text-[#1E2022]   dark:text-[#E4E4E4]">
                        <span>{t("longitude")}</span>
                    </td>
                    <td className="text-[#1E2022]   dark:text-[#E4E4E4]">
                        <span>{t("actions")}</span>
                    </td>
                </tr>
            </thead>
            <tbody className="flex flex-col">
                {
                    data?.map((item) => (
                        <LocationsTableRow item={item} key={item.id}/>
                    ))
                }
            </tbody>
        </table>
    )

}

export default LocationsDataTable

