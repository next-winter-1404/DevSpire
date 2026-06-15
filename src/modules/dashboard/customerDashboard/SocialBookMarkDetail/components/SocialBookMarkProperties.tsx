"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { TSocialBookMark } from "@/components/common/types";
import { EditCategory } from "../services/PUT/EditCategory";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/routing";

interface IProps {
  category: TSocialBookMark | null;
  id: number;
}

interface FormData {
  name: string;
}

const SocialBookMarkProperties = ({ category, id }: IProps) => {
  const t = useTranslations("adminDashboard.categories");
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, reset } = useForm<FormData>({
    defaultValues: {
      name: category?.title || "",
    },
  });

  useEffect(() => {
    reset({
      name: category?.title || "",
    });
  }, [category, reset]);

  const onSubmit = async (formData: FormData) => {
    setLoading(true);
    try {
      await EditCategory({
        id,
        data: {
          name: formData.name,
        },
      });
      router.refresh();
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between h-full"
    >
      <div className="flex flex-col gap-8 flex-1">
        <div className="flex flex-col gap-4">
          <label className="font-bold text-[#1E2022]   dark:text-[#E4E4E4]">
            {t("categoryName")}
          </label>
          <input
            type="text"
            {...register("name")}
            placeholder={t("categoryNamePlc")}
            className="h-12 indent-4 bg-[#FFFFFF] rounded-[16px]   dark:bg-[#262626]"
          />
        </div>
      </div>
      <div className="flex justify-start w-full mt-4">
        <button
          type="submit"
          disabled={loading}
          className="py-[13px] px-8 text-[#FFFFFF] bg-[#0D3B66] rounded-[16px] cursor-pointer   disabled:opacity-60"
        >
          {t("confirm")}
        </button>
      </div>
    </form>
  );
};

export default SocialBookMarkProperties;
