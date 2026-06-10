"use client";

import { useEffect, useRef, useState } from "react";
import { IAbout } from "../types";
import { useTranslations } from "next-intl";
import { THouse } from "@/components/common/types";

const ReserveInfo = ({ house }: { house: THouse }) => {
  const t = useTranslations("fastReserveDetail");

  const [more, setMore] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(false);

  const textRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (textRef.current) {
      setShowButton(textRef.current.scrollHeight > 100);
    }
  }, [house.caption]);

  return (
    <div className=" w-full flex flex-col gap-3 items-start overflow-hidden">
      <h2 className="text-foreground text-[24px] font-bold ">
  {t("whyChoose", { title: house.title })}
      </h2>
      <div
        ref={textRef}
        className={` transition-all duration-500 ease-in-out w-full overflow-hidden  ${
          more ? "max-h-[1000px]" : "max-h-[100px]"
        } `}
      >
        <p className="text-[16px] w-full text-muted-foreground leading-loose text-start  ">
          {house.caption}
        </p>
      </div>
      {showButton && (
        <button
          onClick={() => setMore((prev) => !prev)}
          className="rounded-[24px] text-[#777777] text-[16px] text-center mx-auto px-3 py-2 border
        text-muted-foreground hover:text-foreground border-[#777777] mt-2 hover:border-foreground transition-colors"
        >
          {more ? t("seeLess") : t("seeMore")}
        </button>
      )}
    </div>
  );
};

export default ReserveInfo;
