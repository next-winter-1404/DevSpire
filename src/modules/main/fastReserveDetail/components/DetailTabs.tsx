"use client";

import { useState } from "react";
import ReserveInfo from "./ReserveInfo";
import FacilitiesTab from "./FacilitiesTab";
import CommentsSection from "./CommentsSection";
import { useTranslations } from "next-intl";
import { THouse } from "@/components/common/types";

type Tab = "about" | "facilities" | "reviews";

const DetailTabs = ({ house }: { house: THouse }) => {
  const t = useTranslations("fastReserveDetail");

  const [activeTab, setActiveTab] = useState<Tab>("about");

  return (
    <div className="w-full flex flex-col items-start gap-6">
      <div className="flex gap-4  md:text-[20px]">
        <button
          onClick={() => setActiveTab("about")}
          className={`px-3 py-2 transition-colors rounded-[40px] ${
            activeTab === "about"
              ? "bg-primary text-[#ffff]"
              : " bg-[#F5F5F5] text-[#777777] hover:text-gray-700"
          }`}
        >
          {t("aboutHouse")}
        </button>
        <button
          onClick={() => setActiveTab("facilities")}
          className={`px-3 py-2  transition-colors rounded-[40px] ${
            activeTab === "facilities"
              ? "bg-primary text-[#ffff]"
              : " bg-[#F5F5F5] text-[#777777] hover:text-gray-700"
          }`}
        >
          {t("options")}
        </button>
        <button
          onClick={() => setActiveTab("reviews")}
          className={`px-3 py-2 transition-colors rounded-[40px]  ${
            activeTab === "reviews"
              ? "bg-primary text-[#ffff]"
              : " bg-[#F5F5F5] text-[#777777] hover:text-gray-700"
          }`}
        >
          {t("comments")}
        </button>
      </div>

      <div className="mt-4 w-full">
        {activeTab === "about" && <ReserveInfo house={house} />}
        {activeTab === "facilities" && <FacilitiesTab tags={house.tags} />}
        {activeTab === "reviews" && <CommentsSection houseId={house.id} />}
      </div>
    </div>
  );
};

export default DetailTabs;
