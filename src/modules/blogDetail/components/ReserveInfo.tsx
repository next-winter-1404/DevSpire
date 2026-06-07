"use client";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { TBlog } from "@/components/common/types";

const ReserveInfo = ({ blog }: { blog: TBlog }) => {
  const t = useTranslations("blogDetail");

  const [more, setMore] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      setShowButton(textRef.current.scrollHeight > 100);
    }
  }, [blog.caption]);

  return (
    <div className=" w-full flex flex-col gap-3 items-start overflow-hidden">
      <div
        ref={textRef}
        className={` transition-all duration-500 ease-in-out w-full overflow-hidden  
        ${more ? "max-h-[1000px]" : "max-h-[130px]"}`}
      >
        <p className="text-[16px] w-full text-muted-foreground leading-loose text-start  ">
          {blog.caption}
        </p>
      </div>
      {showButton && (
        <button
          onClick={() => setMore((prev) => !prev)}
          className="rounded-[24px] text-[#777777] text-[16px] text-center mx-auto px-3 py-2 
        border text-muted-foreground 
        hover:text-foreground border-[#777777] mt-2 hover:border-foreground transition-colors cursor-pointer"
        >
          {more ? t("seeLess") : t("seeMore")}
        </button>
      )}
    </div>
  );
};

export default ReserveInfo;
