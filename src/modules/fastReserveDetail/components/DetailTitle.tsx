"use client"
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Image from "next/image";
import { Star } from "lucide-react";
import BookMark from "../../../../public/icons/BookMark";
import { useRouter } from "@/i18n/routing";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddToBookMarks } from "../services/POST/AddToBookMarks";
import { DeleteFromBookMarks } from "../services/DELETE/DeleteFromBookMarks";


type Tprops = {
  houseId: number;
  title: string;
  location: string;
  rating: string | null;
};


const DetailTitle = ({ houseId, title, location, rating }: Tprops) => {


  const [note, setNote] = useState<string>("")
  const [isBookMarked, setIsBookMarked] = useState<boolean>(false)

  const router = useRouter();
  const queryClient = useQueryClient();
  const toggleBookMarkMutation = useMutation({
    mutationFn: async () => {
      if (isBookMarked) {
        return DeleteFromBookMarks(houseId);
      } else {
        return AddToBookMarks({ houseId, note });
      }
    },    
    onSuccess: (res) => {
      setNote("");
      setIsBookMarked(!isBookMarked);
      const message = isBookMarked ? "با موفقیت حذف شد" : "با موفقیت ذخیره شد";
      toast.success(res?.data?.message || message);
      queryClient.invalidateQueries({ queryKey: ["ADDTOBOOKMARKS"] });
      router.refresh();
    },
    onError: (err) => {
      if(axios.isAxiosError(err)){
        toast.error(err?.response?.data?.message || "مشکلی پیش آمد");
      }
    },
  });


  return (
    <div className="w-full flex flex-col items-start gap-6">
      <h2 className="text-foreground text-[32px] font-bold">{title}</h2>
      {rating ? (
        <div className="flex items-center gap-1 rounded-full">
          {[5, 4, 3, 2, 1].map((star) => (
            <Star
              key={star}
              size={16}
              className={
                star <= parseInt(rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-1  rounded-full">
          {[5, 4, 3, 2, 1].map((star) => (
            <Star key={star} size={16} className={"text-gray-300"} />
          ))}
        </div>
      )}
      <div className="flex items-center gap-2 mt-1">
        <Image
          src="/icons/fastReservePage/location2.png"
          alt="location"
          width={17}
          height={17}
          className="hidden md:block"
        />
        <p className="text-[#777777] text-[16px]">{location}</p>
      </div>
      <button 
      onClick={() => {toggleBookMarkMutation.mutate()}}
      className="flex items-center gap-3 py-[13px] px-3 text-[#0D3B66] border border-[#0D3B66] rounded-[16px] cursor-pointer">
        <BookMark/>
        <span>{isBookMarked ? "ذخیره شده" : "ذخیره"}</span>
      </button>
    </div>
  );
};

export default DetailTitle;
