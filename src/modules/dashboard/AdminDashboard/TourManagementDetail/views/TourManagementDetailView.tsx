import { TTour } from "@/components/common/types";
import { apiFetch } from "@/core/Server-fetch/fetchApi";
import TourProperties from "../components/TourProperties";


interface IProps{
    params: Promise<{ id: string }>
}

const TourManagementDetailView = async ({params}: IProps) => {


    const { id } = await params;
    const param = parseInt(id);
    const data = await apiFetch<TTour | null>(`/tours/admin/${param}`, {
        cache: "no-store",
    });


    return (
        <div className="flex flex-col gap-8 h-full p-8">
            <h1 className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]"></h1>
            <TourProperties/>
        </div>
    )

}

export default TourManagementDetailView