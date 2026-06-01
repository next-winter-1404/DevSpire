import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddLocation } from "../services/POST/AddLocation";
import Close from "../../../../../public/icons/Close";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import toast from "react-hot-toast";
import axios from "axios";

interface IProps{
    handleAddLocationModal: (value: boolean) => void;
}

const AddLocationsModal = ({handleAddLocationModal}: IProps) => {


    const [areaName, setAreaName] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");


    const router = useRouter();
    const queryClient = useQueryClient();
    const addLocationMutation = useMutation({
        mutationFn: () => AddLocation({ areaName, lat, lng }),
        onSuccess: (res) => {
            handleAddLocationModal(false);
            setAreaName("");
            setLat("");
            setLng("");
            toast.success(res?.data?.message || "مکان مورد نظر با موفقیت افزوده شد");
            queryClient.invalidateQueries({
                queryKey: ["ADDLOCATION"],
            });
        router.refresh();
        },
        onError: (err) => {
            if(axios.isAxiosError(err)){
                toast.error(err?.response?.data?.message || "مشکلی در افزودن پیش آمد");
            }
        },
    });

    
    return (
        <>
            <div 
            onClick={() => {handleAddLocationModal(false)}}
            className="bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300 absolute inset-0 z-30 cursor-pointer"></div>
            <div className="flex flex-col gap-8 w-120 p-8 bg-[#FFFFFF] rounded-[24px] absolute top-[12%] left-[35%] z-90">
                <div className="flex justify-between">
                    <span className="font-bold text-[24px] text-[#1E2022]">افزودن مکان</span>
                    <div onClick={() => {handleAddLocationModal(false)}} className="p-4 bg-[#F5F5F5] rounded-full cursor-pointer">
                        <Close/>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <label htmlFor="" className="font-bold text-[#1E2022]">نام مکان</label>
                    <input 
                    type="text" 
                    value={areaName}
                    onChange={(e) => setAreaName(e.target.value)}
                    placeholder="نام مکان را وارد کنید" 
                    className="h-12 indent-4 bg-[#F5F5F5] rounded-[40px]"/>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <label htmlFor="" className="font-bold text-[#1E2022]">عرض جغرافیایی</label>
                    <input 
                    type="text" 
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="عرض جغرافیایی را وارد کنید" 
                    className="h-12 indent-4 bg-[#F5F5F5] rounded-[40px]"/>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <label htmlFor="" className="font-bold text-[#1E2022]">طول جغرافیایی</label>
                    <input 
                    type="text" 
                    value={lng}
                    onChange={(e) => setLng(e.target.value)}
                    placeholder="طول جغرافیایی را وارد کنید" 
                    className="h-12 indent-4 bg-[#F5F5F5] rounded-[40px]"/>
                </div>
                <div className="flex gap-6">
                    <button 
                    onClick={() => {handleAddLocationModal(false)}}
                    className="w-full py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer">
                        انصراف
                    </button>
                    <button 
                    onClick={() => {addLocationMutation.mutate()}}
                    disabled={addLocationMutation.isPending}
                    className="w-full py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        تایید
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddLocationsModal;