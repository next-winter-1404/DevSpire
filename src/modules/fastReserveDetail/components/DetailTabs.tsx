"use client";

import { useState } from "react";
import ReserveInfo from "./ReserveInfo";
import FacilitiesTab from "./FacilitiesTab";
import { facilitiesMock } from "../mocks";
import { IFacilitiesTabProps } from "../types";
import CommentsSection from "./CommentsSection";
import { useTranslations } from "next-intl";

type Tab = "about" | "facilities" | "reviews";

const DetailTabs = ({
  facilities,
  aboutContent,
  reviews,
}: IFacilitiesTabProps) => {
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

      {/* content */}

      <div className="mt-4 w-full">
        {activeTab === "about" && <ReserveInfo content={aboutContent} />}
        {activeTab === "facilities" && (
          <FacilitiesTab facilities={facilities} />
        )}
        {activeTab === "reviews" && <CommentsSection />}
      </div>
    </div>
  );
};

export default DetailTabs;
