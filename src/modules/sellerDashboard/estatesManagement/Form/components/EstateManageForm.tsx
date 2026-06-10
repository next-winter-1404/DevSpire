"use client";

import { notFound } from "next/navigation";
import { useState } from "react";

import { THouse } from "@/components/common/types";
import { IGeneraData } from "../types";
import EstateStep1 from "./EstateStep1";
import EstateStep2 from "./EstateStep2";
import EstateStep3 from "./EstateStep3";
import EstateStep4 from "./EstateStep4";
import EstateStep5 from "./EstateStep5";
import { useTranslations } from "next-intl";

const EstateManageForm = ({
  house,
  role,
}: {
  house: THouse | null;
  role: "admin" | "seller";
}) => {
  const t = useTranslations("sellerDashboard.estateForm");

  const [currentTab, setCurrentTab] = useState<number>(1);
  if (currentTab == 0) {
    notFound();
  }

  const [generalData, setGeneralData] = useState<IGeneraData>({
    id: house?.id,
    step1: {
      title: house?.title ?? "",
      capacity: house?.capacity ? Number(house.capacity) : 0,
      transaction_type: house?.transaction_type ?? "",
      price: house?.price ? Number(house.price) : 0,
      discounted_price: house?.discounted_price
        ? Number(house?.discounted_price)
        : null,
      category: house?.categories?.[0] ?? "",
      caption: house?.caption ?? "",
      rate: house?.rate ? Number(house.rate) : 0,
    },
    step2: {
      location: house?.location ?? "",
      address: house?.address ?? "",
    },
    step3: {
      bathrooms: house?.bathrooms ?? 0,
      rooms: house?.rooms ?? 0,
      parking: house?.parking ?? 0,
      tags: house?.tags ?? [],
    },
    step4: {
      photos: house?.photos ?? [],
    },
  });
  const changeGeneralData = (data: IGeneraData) => {
    setGeneralData(data);
  };

  const onNextTab = () =>
    setCurrentTab((prev) =>
      generalData.id && prev < 5
        ? prev + 1
        : !generalData.id && prev < 4
          ? prev + 1
          : 1,
    );
  const onPrevious = () => setCurrentTab((prev) => (prev > 1 ? prev - 1 : 1));

  const editModeRenderTab = () => {
    switch (currentTab) {
      case 1:
        return (
          <EstateStep1
            generalData={generalData}
            onChangeData={changeGeneralData}
            handleNext={onNextTab}
            handlePrev={onPrevious}
          />
        );

      case 2:
        return (
          <EstateStep2
            generalData={generalData}
            onChangeData={changeGeneralData}
            handleNext={onNextTab}
            handlePrev={onPrevious}
          />
        );
      case 3:
        return (
          <EstateStep3
            generalData={generalData}
            onChangeData={changeGeneralData}
            handleNext={onNextTab}
            handlePrev={onPrevious}
          />
        );
      case 4:
        return (
          <EstateStep4
            generalData={generalData}
            handleNext={onNextTab}
            handlePrev={onPrevious}
          />
        );
      case 5:
        return (
          <EstateStep5
            role={role}
            onPrev={onPrevious}
            generalData={generalData}
          />
        );
      default:
        return (
          <EstateStep1
            generalData={generalData}
            onChangeData={changeGeneralData}
            handleNext={onNextTab}
            handlePrev={onPrevious}
          />
        );
    }
  };
  const createModeRenderTab = () => {
    switch (currentTab) {
      case 1:
        return (
          <EstateStep1
            generalData={generalData}
            onChangeData={changeGeneralData}
            handleNext={onNextTab}
            handlePrev={onPrevious}
          />
        );

      case 2:
        return (
          <EstateStep2
            generalData={generalData}
            onChangeData={changeGeneralData}
            handleNext={onNextTab}
            handlePrev={onPrevious}
          />
        );
      case 3:
        return (
          <EstateStep3
            generalData={generalData}
            onChangeData={changeGeneralData}
            handleNext={onNextTab}
            handlePrev={onPrevious}
          />
        );
      case 4:
        return (
          <EstateStep5
            role={role}
            onPrev={onPrevious}
            generalData={generalData}
          />
        );
      default:
        return (
          <EstateStep1
            generalData={generalData}
            onChangeData={changeGeneralData}
            handleNext={onNextTab}
            handlePrev={onPrevious}
          />
        );
    }
  }; const EditModeTabsData = [
    { id: 1, label: t("basicInfo") },
    { id: 2, label: t("location") },
    { id: 3, label: t("amenities") },
    { id: 4, label: t("photos") },
    { id: 5, label: t("finalConfirm") },
  ];

  const CreateModeTabsData = [
    { id: 1, label: t("basicInfo") },
    { id: 2, label: t("location") },
    { id: 3, label: t("amenities") },
    { id: 4, label: t("finalConfirm") },
  ];


  const activeTabsData = generalData.id ? EditModeTabsData : CreateModeTabsData;
  return (
    <div className="overflow-x-hidden ">
      <div className="flex gap-8 overflow-x-auto font-regular text-[16px] text-[#777777] mb-10 ">
        {activeTabsData.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setCurrentTab(tab.id)}
            className={`py-2.5 px-3 border rounded-[16px] cursor-pointer transition-all ${currentTab === tab.id
                ? "border-2 border-[#0D3B66] text-[#0D3B66] font-bold"
                : "border-[#777777]"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {generalData.id ? editModeRenderTab() : createModeRenderTab()}
    </div>
  );
};

export default EstateManageForm;
