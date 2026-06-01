import { useRouter } from "@/i18n/routing";
import Close from "../../../../../public/icons/Close"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteLocation } from "../services/DELETE/DeleteLocation";
import toast from "react-hot-toast";
import axios from "axios";


interface IProps{
    id: number
    handleDeleteModal: (value: boolean) => void;
}

const DeleteLocationModal = ({id, handleDeleteModal}: IProps) => {

    const router = useRouter();
    const queryClient = useQueryClient();
    const deleteLocationMutation = useMutation({
        mutationFn: () => DeleteLocation(id),
            onSuccess: (res) => {
            toast.success(res?.data?.message || "مکان مورد نظر با موفقیت حذف شد");
            queryClient.invalidateQueries({
                queryKey: ["DELETELOCATION"],
            });
            router.refresh();
        },
        onError: (err) => {
            if (axios.isAxiosError(err)) {
                toast.error(err?.response?.data?.message || "مشکلی در حذف پیش آمد");
            }
        },
    });


    return (
        <>
            <div 
            onClick={() => {handleDeleteModal(false)}}
            className="bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300 absolute inset-0 z-30 cursor-pointer"></div>
            <div className="flex flex-col absolute top-[%16] left-[%35]">
                <div className="flex justify-end w-full">
                    <div className="p-4 bg-[#F5F5F5] rounded-full">
                        <Close/>
                    </div>
                </div>
                <p className="text-[#1E2022]">آیا از حذف این مکان اطمینان دارید؟</p>
                <div className="flex gap-6">
                    <button className="w-full py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer">
                        انصراف
                    </button>
                    <button className="w-full py-[13px] px-3 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer">
                        حذف
                    </button>
                </div>
            </div>
        </>
    )

}

export default DeleteLocationModal