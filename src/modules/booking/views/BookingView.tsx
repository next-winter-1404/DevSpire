"use client";

import BreadCrumbs from "@/components/common/BreadCrumbs";
import Container from "@/components/common/Container";
import { IBredCrumbsItems } from "@/modules/fastReserveDetail/mocks";
import { useTranslations } from "next-intl";
import BookingContainer from "../components/BookingContainer";
import BookingStepper from "../components/BookingStepper";
import { Suspense, useEffect, useState } from "react";
import { useRouter } from "@/i18n/routing";
import BookingStepTwo from "../components/BookingStepTwo";
import BookingStepThree from "../components/BookingStepThree";
import BookingStepFour from "../components/BookingStepFour";
import BookingStepFive from "../components/BookingStepFive";
import { THouse } from "@/components/common/types";
import { TBookingRequest } from "../types";
import { notFound, useSearchParams } from "next/navigation";

interface IProps {
  house: THouse | null;
  houseId: number;
}
const BookingView = ({ house, houseId }: IProps) => {
  const t = useTranslations("fastReserveDetail");
  const router = useRouter();
  const breadcrumbItemsMock2: IBredCrumbsItems[] = [
    { label: t("home"), href: "/" },
    { label: t("hotelReserve"), href: "/fast-reserve" },
    {
      label: `${t("hotelReserve")} ${house?.title ?? t("houseNotFound")}`
      ,
    },
  ];
  const searchParams = useSearchParams();

  const stepFromUrl = Number(searchParams.get("step")) || 2;

  const [currentStep, setCurrentStep] = useState<number>(stepFromUrl);
  const [bookingData, setBookingData] = useState<TBookingRequest | null>(null);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [bookingId, setBookingId] = useState<number | string>("");

  const changeTab = (tab: number) => {
    setCurrentStep(tab);
  };
  const getBookingData = (data: TBookingRequest) => {
    setBookingData(data);
  };
  const getTotalPrice = (price: number) => {
    setTotalPrice(price);
  };
  const getBookingId = (id: number | string) => {
    setBookingId(id);
  };

  useEffect(() => {
    if (currentStep === 1) {
      router.push("/fast-reserve");
    }
  }, [currentStep]);
  const renderStepsContent = () => {
    switch (currentStep) {
      case 2:
        return (
          <BookingStepTwo
            getBookingData={getBookingData}
            changeTab={changeTab}
            house={house}
            houseId={houseId}
            getTotalPrice={getTotalPrice}
          />
        );
      case 3:
        return (
          <BookingStepThree
            totalPrice={totalPrice}
            changeTab={changeTab}
            bookingData={bookingData}
            getBookingId={getBookingId}
          />
        );
      case 4:
        return (
          <BookingStepFour
            amount={totalPrice}
            bookingId={bookingId}
            houseId={houseId}
          />
        );
      case 5:
        return <BookingStepFive />;
      default:
        return (
          <BookingStepTwo
            getTotalPrice={getTotalPrice}
            houseId={houseId}
            changeTab={changeTab}
            getBookingData={getBookingData}
            house={house}
          />
        );
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
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-[80vh]">
              {t("loading")}
            </div>
          }
        >
          <div className="w-full h-full">{renderStepsContent()}</div>
        </Suspense>
      </BookingContainer>
    </Container>
  );
};

export default BookingView;
