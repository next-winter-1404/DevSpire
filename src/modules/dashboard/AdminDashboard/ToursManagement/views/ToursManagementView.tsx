import { apiFetch } from "@/core/Server-fetch/fetchApi";
import ToursManagementTop from "../components/ToursManagementTop";
import ToursList from "../components/ToursList";
import { TToursResponse } from "@/components/common/types";


interface IProps {
  params: Record<string, string>;
}

const ToursManagementView = async ({params}: IProps) => {

    const data = await apiFetch<TToursResponse | null>("/locations", {params: params, cache: "no-store"},);


    return (
        <div className="flex flex-col gap-4">
            <ToursManagementTop/>
            {
                data && data.totalCount > 0
                ? 
                <ToursList data={data}/>
                : 
                <div className="flex justify-center w-full">
                    <span>توری وجود ندارد</span>
                </div>
            }
        </div>
    )

}

export default ToursManagementView