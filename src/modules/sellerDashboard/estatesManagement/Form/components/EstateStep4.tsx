"use client";

import React, { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { IGeneraData } from "../types";
import { CirclePlus } from "lucide-react";
import CurveArrow from "../../../../../../public/icons/CurveArrow";
import { useMutation } from "@tanstack/react-query";
import httpClient from "@/core/interceptor/axios";
import toast from "react-hot-toast";
import { useRouter } from "@/i18n/routing";
import axios from "axios";
import { useTranslations } from "next-intl";

interface IProps {
  generalData: IGeneraData;
  handlePrev: () => void;
  handleNext: () => void;
}

type FormValues = {
  photo: FileList;
};

const EstateStep4 = ({ generalData, handlePrev, handleNext }: IProps) => {
  const t = useTranslations("sellerDashboard.estateForm.step4");

  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { register, handleSubmit, watch } = useForm<FormValues>();

  const selectedFiles = watch("photo");

  const { mutate: upload, isPending } = useMutation({
    mutationFn: async (formdata: FormData) => {
      try {
        const res = await httpClient.post(
          `/houses/upload/photos/${generalData.id}`,
          formdata,
        );
        return res.data;
      } catch (err) {
        throw err;
      }
    },
    onSuccess: (data) => {
toast.success(data.message || t("uploadSuccess"));
      router.refresh();
    },
    onError: (err) => {
      if (axios.isAxiosError(err)) {
       toast.error(err.response?.data?.message || t("uploadError"));

      }
    },
  });

  useEffect(() => {
    if (selectedFiles && selectedFiles.length > 0) {
      const file = selectedFiles[0];
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    } else {
      setPreviewUrl(null);
    }
  }, [selectedFiles]);

  const onSubmit = async (data: FormValues) => {
    const file = data.photo?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("photo", file);
    upload(formData);
  };

  const photoField = register("photo");

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-36">
      <div className="flex gap-8 flex-wrap">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="flex flex-col justify-center items-center gap-5 
          w-50 h-50 border-2 border-dashed border-[#1E2022]
           rounded-[24px] cursor-pointer hover:bg-[#FFFFFF]"
        >
          <CirclePlus />
          <span className="font-regular text-[20px] text-[#1E2022]">
{t("addPhoto")}          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={(e) => {
              fileInputRef.current = e;
              photoField.ref(e);
            }}
            name={photoField.name}
            onBlur={photoField.onBlur}
            onChange={photoField.onChange}
          />
        </div>

        {previewUrl && (
          <div className="relative w-50 h-50 rounded-[24px] overflow-hidden border border-gray-200">
            <Image
              src={previewUrl}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* {generalData?.step4?.photos?.map((item, index) => (
          <div
            key={index}
            className="relative w-50 h-50 rounded-[24px] overflow-hidden border border-gray-200"
          >
            <Image
              src={item}
              alt={`photo-${index}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div> */}
        {[
          "/images/fastReservePage/house1.png",
          "/images/fastReservePage/house2.png",
          "/images/fastReservePage/bigHouse.png",
        ].map((item, index) => (
          <div
            key={index}
            className={`relative w-50 h-50 rounded-[24px] 
            overflow-hidden  ${
              index == 0
                ? "border-8 border-green-800 "
                : "border border-gray-200"
            }`}
          >
            <Image
              src={item}
              alt={`photo-${index}`}
              fill
              className="object-cover"
            />
            {index == 0 && (
              <p
                className="bg-green-800 absolute bottom-0 left-0 w-full 
              right-0 py-1 text-center text-white"
              >
{t("mainImage")}              </p>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={handlePrev}
          className="flex items-center gap-2 py-[13px] px-3 text-[#777777] border border-[#777777] rounded-[16px] cursor-pointer"
        >
          <CurveArrow className="rotate-270" />
          <span className="font-regular text-[16px]">{t("prevStep")}</span>
        </button>

        <div className="flex items-center gap-4">
          {previewUrl && (
            <button
              type="submit"
              className=" py-[13px] px-3
           text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer"
            >
              <span className="font-regular text-[16px]">
{isPending ? t("uploading") : t("uploadPhoto")}
              </span>
            </button>
          )}

          <button
            type="button"
            onClick={handleNext}
            className="flex items-center gap-2 py-[13px] px-3
           text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer"
          >
            <span className="font-regular text-[16px]">{t("nextStep")}</span>
            <CurveArrow className="rotate-90" />
          </button>
        </div>
      </div>
    </form>
  );
};

export default EstateStep4;
