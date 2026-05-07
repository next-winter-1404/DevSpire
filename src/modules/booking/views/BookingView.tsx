"use client";

import BreadCrumbs from "@/components/common/BreadCrumbs";
import Container from "@/components/common/Container";
import { IBredCrumbsItems } from "@/modules/fastReserveDetail/mocks";
import { useTranslations } from "next-intl";
import BookingContainer from "../components/BookingContainer";
import BookingStepper from "../components/BookingStepper";
import { useState } from "react";
import { useRouter } from "@/i18n/routing";
import BookingStepTwo from "../components/BookingStepTwo";
import BookingStepThree from "../components/BookingStepThree";

interface IProps {
  location: string;
}
const BookingView = ({ location }: IProps) => {
  const t = useTranslations("fastReserveDetail");
  const router = useRouter();
  const breadcrumbItemsMock2: IBredCrumbsItems[] = [
    { label: t("home"), href: "/" },
    { label: t("hotelReserve"), href: "/fast-reserve" },
    { label: `${t("hotelReserve")} ${location || "gg"}` },
  ];
  const [currentStep, setCurrentStep] = useState<number>(2);

  const renderStepsContent = () => {
    switch (currentStep) {
      case 1:
        return router.push("/fast-reserve");
      case 2:
        return;
      case 3:
        return;
      case 4:
        return;
      case 5:
        return;
      default:
        return;
    }
  };

  return (
    <Container className="flex flex-col w-full ">
      <div className="md:mb-10 mb-8 ">
        <BreadCrumbs items={breadcrumbItemsMock2} />
      </div>
      <div className=" mb-14 md:mb-22 w-full">
        <BookingStepper currentStep={currentStep} />
      </div>
      <BookingContainer>
        {/* <div>{renderStepsContent() ?? "gg"}</div> */}
        <div className="w-full h-full">
          <BookingStepThree />
        </div>
      </BookingContainer>
    </Container>
  );
};

export default BookingView;
