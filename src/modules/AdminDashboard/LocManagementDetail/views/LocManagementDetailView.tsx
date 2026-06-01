import { TLocation } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import LocationProperties from "../components/LocationProperties";



const LocManagementDetailView = async () => {

    const data = await apiFetch<TLocation | null>("/locations", {cache: "no-store"},);


    return (
        <div className="flex flex-col gap-8">
            <h1 className="font-bold text-[24px] text-[#1E2022]">{}</h1>
            <LocationProperties/>
        </div>
    )

}

export default LocManagementDetailView