"use client";

import {
  IDecodedToken,
  TAddFavoriteHouse,
} from "@/modules/fastReserveDetail/types";
import { useMutation } from "@tanstack/react-query";
import { Heart } from "lucide-react";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { PostFavoriteHouse } from "@/modules/fastReserveDetail/services/POST/AddFavoriteHouse";
import toast from "react-hot-toast";
import axios from "axios";
import { getCookie } from "cookies-next";
import { useRouter } from "@/i18n/routing";

interface IProps {
  isFavorite: boolean;
  houseId: number;
}
const AddHouseFavorites = ({ isFavorite, houseId }: IProps) => {
  const router = useRouter();

  const [isAdded, setIsAdded] = useState<boolean>(isFavorite);
  const token = getCookie("accessToken");

  let user_id = null;

  if (typeof token === "string") {
    const decodedToken: IDecodedToken = jwtDecode(token);
    user_id = decodedToken.id;
  }

  const payload: TAddFavoriteHouse = {
    house_id: houseId,
    user_id,
  };
  const { mutate: addFavorite } = useMutation({
    mutationFn: (data: TAddFavoriteHouse) => PostFavoriteHouse(data),
    onSuccess: (res) => {
      console.log(res.data);
      toast.success(
        res.data.message || "ملک مورد نظر به علاقه مندیتون اضافه شد",
      );
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
        if (err.response?.status != 401 && err.response?.status != 403) {
          toast.error(
            err.response?.data?.message || "مشکلی پیش امد دوباره امتحان کنید",
          );
        }
      }
    },
  });

  return (
    <button
      onClick={() => addFavorite(payload)}
      className={` cursor-pointer ${isFavorite ? "bg-[#FF5555]/40" : "bg-white/15"} backdrop-blur-md  w-13 h-13
     flex justify-center items-center rounded-full hover:bg-[#FF5555]/40 transition-colors duration-200 `}
    >
      <Heart size={26} className="text-white" />
    </button>
  );
};

export default AddHouseFavorites;
