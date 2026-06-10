import { apiFetch } from "@/core/Server-fetch/fetchApi";
import LocationsList from "../components/LocationsList";
import { TLocationsResponse } from "@/components/common/types";
import LocationsManagementTop from "../components/LocationsManagementTop";
import { getTranslations } from "next-intl/server";



interface IProps {
  params: Record<string, string>;
}

const LocationsManagementView = async ({params}: IProps) => {
const t = await getTranslations("adminDashboard.locationsManagement");

    const data = await apiFetch<TLocationsResponse | null>("/locations", {params: params, cache: "no-store"},);


    return (
        <div className="flex flex-col gap-4">
            <LocationsManagementTop/>
            {
                data && data.totalCount > 0 
                ? 
                <LocationsList data={data}/>
                : 
                <div className="flex justify-center w-full">
                        <span>{t("noLocations")}</span>
                </div>
            }
        </div>
    )

}

export default LocationsManagementView

