import { useLocale } from "next-intl";
import Close from "../../../../../public/icons/Close"
import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import CustomSelect from "@/components/common/CustomSelectOption";



interface IProps{
    handleLocFilterModal: (value: boolean) => void;
}

const LocationsFilterModal = ({handleLocFilterModal}: IProps) => {


    const locale = useLocale();
    const searchParams = useSearchParams();
    const router = useRouter();


    const [latitude, setLatitude] = useState<string>(searchParams.get("lat")?.toString() ?? "")
    const [longitude, setLongitude] = useState<string>(searchParams.get("lng")?.toString() ?? "")
    const [order, setOrder] = useState<string>(searchParams.get("order")?.toString() ?? "DESC")


    const orderByOptions = [
        {id:1, value: "DESC", label: locale === "en" ? "Descending" : "نزولی"},
        {id:2, value: "ASC", label: locale === "en" ? "Ascending" : "صعودی"},
    ]


    const applyFilters = () => {
        const params = new URLSearchParams(searchParams);
        
        if(latitude && latitude !== "clear"){
            params.set("lat", latitude);
        } 
        else{
            params.delete("lat");
        }
        if(longitude && longitude !== "clear"){
            params.set("lng", longitude);
        } 
        else{
            params.delete("lng");
        }
        params.set("order", order);
        router.push(`?${params.toString()}`);
        handleLocFilterModal(false);
    }


    return (
        <>
            <div 
            onClick={() => {handleLocFilterModal(false)}}
            className="bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300 absolute inset-0 z-30"></div>
            <div className="flex flex-col gap-8 w-[480px] p-8 bg-[#FFFFFF] rounded-[24px] absolute top-[12%] left-[35%] z-90">
                <div className="flex justify-between w-full">
                    <span className="font-bold text-[24px] text-[#1E2022]">فیلترها</span>
                    <div onClick={() => {handleLocFilterModal(false)}} className="p-4 bg-[#F5F5F5] rounded-full cursor-pointer">
                        <Close/>
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="" className="font-bold text-[#1E2022]">عرض جغرافیایی</label>
                    <input 
                    type="text" 
                    value={latitude} 
                    onChange={(e) => setLatitude(e.target.value)} 
                    placeholder="عرض جغرافیایی را وارد کنید" 
                    className="h-12 indent-4 bg-[#F5F5F5] rounded-[40px]"/>
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="" className="font-bold text-[#1E2022]">طول جغرافیایی</label>
                    <input 
                    type="text" 
                    value={longitude} 
                    onChange={(e) => setLongitude(e.target.value)} 
                    placeholder="طول جغرافیایی را وارد کنید" 
                    className="h-12 indent-4 bg-[#F5F5F5] rounded-[40px]"/>
                </div>
                <div className="flex flex-col gap-4">
                    <label htmlFor="" className="font-bold text-[#1E2022]">ترتیب مرتب سازی</label>
                    <CustomSelect defaultValue={order} options={orderByOptions} onValueChange={setOrder}/>
                </div>
                <div className="flex gap-6">
                    <button 
                    onClick={() => {handleLocFilterModal(false)}}
                    className="w-full py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer">
                        انصراف
                    </button>
                    <button 
                    onClick={applyFilters}
                    className="w-full py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer">
                        اعمال فیلترها
                    </button>
                </div>
            </div>
        </>
    )

}

export default LocationsFilterModal