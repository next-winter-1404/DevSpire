import BreadCrumbs from "@/components/common/BreadCrumbs";
import {
  AboutMock,
  facilitiesMock,
  IBredCrumbsItems,
  reviewsMock,
} from "../../fastReserveDetail/mocks";
import BookingCard from "../components/MortgageRentCard";
import SliderWrapper from "@/components/common/SliderWrapper";
import { MOCK_DATA } from "@/modules/fastReserve/mocks/data";
import Container from "@/components/common/Container";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import HouseCard from "@/components/common/HouseCard";
import { THouse } from "@/components/common/types";
import ImageBox from "@/modules/fastReserveDetail/components/ImageBox";
import DetailTitle from "@/modules/fastReserveDetail/components/DetailTitle";
import DetailTabs from "@/modules/fastReserveDetail/components/DetailTabs";
import PropertyQAView from "@/modules/property/Q&A/views/PropertyQAView";

interface IProps {
  data: THouse;
  sliderData: THouse[] | undefined;
}
const MortgageRentDetailViewx = ({ data, sliderData }: IProps) => {
  const t = useTranslations("fastReserveDetail");

  const breadcrumbItemsMock2: IBredCrumbsItems[] = [
    { label: t("home"), href: "/" },
    { label: t("hotelReserve"), href: "/hotels" },
    { label: `${t("hotelReserve")} ${data.location}` },
  ];

  return (
    <Container className="w-full flex flex-col">
      <div className="w-full mb-8 md:mb-6">
        <BreadCrumbs items={breadcrumbItemsMock2} />
      </div>
      <div className="w-full mb-10 md:mb-8">
        <ImageBox
          photos={[
            "/images/fastReservePage/house1.png",
            "/images/fastReservePage/house2.png",
            "/images/fastReservePage/bigHouse.png",
            "/images/fastReservePage/house1.png",
            "/images/fastReservePage/house2.png",
            "/images/fastReservePage/bigHouse.png",
          ]}
        />
      </div>
      <div className="flex flex-col gap-6 md:gap-0  md:flex-row  md:justify-between w-full mb-8">
        <div className="w-full md:w-[67%] ">
          <div className=" mb-10 md:mb-8">
            <DetailTitle
              houseId={data.id}
              rating={data.rate}
              location={data.address}
              title={data.title}
            />
          </div>
          <DetailTabs house={data} />
        </div>
        <div className="w-full md:w-[31%] ">
          <BookingCard
            amount={data.discounted_price ? data.discounted_price : data.price}
            lastUpdated={data.last_updated}
            sellerId={data.sellerId}
          />
        </div>
      </div>
      {sliderData && (
        <div className="flex flex-col w-full gap-6">
          <div className="flex items-center justify-between w-full mt-3">
            <h2 className="text-[24px] font-bold text-foreground ">
              {t("commertials")}
            </h2>
            <Link
              href={`/mortgage-rent?transactionType=${data.transaction_type}`}
              className="px-3 py-2 text-[20px] border border-[#0D3B66] text-[#0D3B66] rounded-full transition-colors
          hover:bg-blue-100
          dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-800"
            >
              {t("seeAll")}
            </Link>
          </div>
          <div className="w-full">
            <SliderWrapper>
              {sliderData.map((property) => (
                <div
                  className="shrink-0 w-[calc(100%-20px)] md:w-[calc(33.333%-16px)]"
                  dir="rtl"
                  key={property.id}
                >
                  <HouseCard
                    className="w-full"
                    property={property}
                    transactionType="mortgage"
                  />
                </div>
              ))}
            </SliderWrapper>
          </div>
        </div>
      )}
      <div className="mt-10">
        <PropertyQAView id={data.id} />
      </div>
    </Container>
  );
};

export default MortgageRentDetailViewx;
