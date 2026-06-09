import { useMutation, useQueryClient } from "@tanstack/react-query";
import Close from "../../../../../public/icons/Close";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import toast from "react-hot-toast";
import axios from "axios";
import { useTranslations } from "next-intl";
import { AddCategory } from "../services/POST/AddCategory";

interface IProps{
    handleAddCatModal: (value: boolean) => void;
}

const AddCategoryModal = ({handleAddCatModal}: IProps) => {


    const t = useTranslations("adminDashboard.categories");
    const [name, setName] = useState("");


    const router = useRouter();
    const queryClient = useQueryClient();
    const addLocationMutation = useMutation({
        mutationFn: () => AddCategory({ name }),
        onSuccess: (res) => {
            handleAddCatModal(false);
            setName("");
            toast.success(res?.data?.message || "مکان مورد نظر با موفقیت افزوده شد");
            queryClient.invalidateQueries({
                queryKey: ["ADDCATEGORY"],
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
            onClick={() => {handleAddCatModal(false)}}
            className="bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300 absolute inset-0 z-30 cursor-pointer"></div>
            <div className="flex flex-col gap-8 w-120 p-8 bg-[#FFFFFF] rounded-[24px] absolute top-[12%] left-[35%] z-90
            dark:bg-[#404040]">
                <div className="flex justify-between">
                    <span className="font-bold text-[24px] text-[#1E2022]   dark:text-[#F5F5F5]">{t("addCategoryBtn")}</span>
                    <div 
                    onClick={() => {handleAddCatModal(false)}} 
                    className="p-4 bg-[#F5F5F5] rounded-full cursor-pointer   dark:bg-[#525252]">
                        <Close/>
                    </div>
                </div>
                <div className="flex flex-col gap-4 w-full">
                    <label htmlFor="" className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">{t("categoryName")}</label>
                    <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("categoryNamePlc")}
                    className="h-12 indent-4 bg-[#F5F5F5] rounded-[40px]   dark:bg-[#262626]"/>
                </div>
                <div className="flex gap-6">
                    <button 
                    onClick={() => {handleAddCatModal(false)}}
                    className="w-full py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer
                    dark:text-[#E4E4E4] dark:border-[#E4E4E4]">
                        {t("cancel")}
                    </button>
                    <button 
                    onClick={() => {addLocationMutation.mutate()}}
                    disabled={addLocationMutation.isPending}
                    className="w-full py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                        {t("confirm")}
                    </button>
                </div>
            </div>
        </>
    )
}

export default AddCategoryModal;