import BreadCrumbs from "@/components/common/BreadCrumbs";
import {
  AboutMock,
  breadcrumbItemsMock2,
  facilitiesMock,
  IBredCrumbsItems,
  reviewsMock,
} from "../mocks";
import ImageBox from "../components/ImageBox";
import BookingCard from "../components/BookingCard";
import ReserveInfo from "../components/ReserveInfo";
import DetailTitle from "../components/DetailTitle";
import DetailTabs from "../components/DetailTabs";
import SliderWrapper from "@/components/common/SliderWrapper";
import { MOCK_DATA } from "@/modules/fastReserve/mocks/data";
import FastReserveCard from "@/modules/fastReserve/components/FastReserveCard";
import Container from "@/components/common/Container";
import { useTranslations } from "next-intl";

const FastReserveDetailView = () => {
  const t = useTranslations("fastReserveDetail");

  const breadcrumbItemsMock2: IBredCrumbsItems[] = [
    { label: t("home"), href: "/" },
    { label: t("hotelReserve"), href: "/hotels" },
    { label: `${t("hotelReserve")} رشت`, href: "/fast-reserve" },
    { label: `${t("hotelReserve")} رشت سراوان رایان` },
  ];
  return (
    <Container className="w-full flex flex-col">
      <div className="w-full mb-8 md:mb-6">
        <BreadCrumbs items={breadcrumbItemsMock2} />
      </div>
      <div className="w-full mb-10 md:mb-8">
        <ImageBox />
      </div>
      <div className="flex flex-col gap-6 md:gap-0  md:flex-row  md:justify-between w-full mb-8">
        <div className="w-full md:w-[67%] ">
          <div className=" mb-10 md:mb-8">
            <DetailTitle
              location="گیلان ، رشت ، میدان آزادی ، جنب چهار راه عظ....گیلان ، رشت ، میدان آزادی ، جنب چهار راه"
              title="هتل همایون فر کیش ایران"
            />
          </div>
          <DetailTabs
            facilities={facilitiesMock}
            aboutContent={AboutMock}
            reviews={reviewsMock}
          />
        </div>
        <div className="w-full md:w-[31%] ">
          <BookingCard />
        </div>
      </div>
      <div className="flex flex-col w-full gap-6">
        <div className="flex items-center justify-between w-full ">
          <h2 className="text-[24px] font-bold text-foreground ">
            {t("commertials")}
          </h2>
          <button
            className="px-3 py-2 text-[20px] border border-[#0D3B66] text-[#0D3B66] dark:text-gray-300
         dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {t("seeAll")}
          </button>
        </div>
        <div className="w-full">
          <SliderWrapper>
            {MOCK_DATA.map((property) => (
              <div
                className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"
                dir="rtl"
                key={property.id}
              >
                <FastReserveCard className="w-full" property={property} />
              </div>
            ))}
          </SliderWrapper>
        </div>
      </div>
    </Container>
  );
};

export default FastReserveDetailView;
