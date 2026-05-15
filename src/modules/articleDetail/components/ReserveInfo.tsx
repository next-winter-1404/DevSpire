"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { TArticle } from "@/components/common/types";

const ReserveInfo = ({ article }: { article: TArticle }) => {

  const t = useTranslations("articleDetail");

  const [more, setMore] = useState<boolean>(false);

  return (
    <div className=" w-full flex flex-col gap-3 items-start overflow-hidden">
      <div
        className={` transition-all duration-500 ease-in-out w-full overflow-hidden  
        ${more ? "max-h-[1000px]" : "max-h-[130px]"}`}>
        <p className="text-[16px] w-full text-muted-foreground leading-loose text-start  ">
          {article.caption}
        </p>
      </div>
      <button
        onClick={() => setMore((prev) => !prev)}
        className="rounded-[24px] text-[#777777] text-[16px] text-center mx-auto px-3 py-2 border text-muted-foreground 
        hover:text-foreground border-[#777777] mt-2 hover:border-foreground transition-colors cursor-pointer">
        {more ? t("seeLess") : t("seeMore")}
      </button>
    </div>
  );
};

export default ReserveInfo;
