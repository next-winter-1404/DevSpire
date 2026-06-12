import BreadCrumbs from "@/components/common/BreadCrumbs";
import { IBredCrumbsItems } from "../mocks";
import ImageBox from "../components/ImageBox";
import DetailTitle from "../components/DetailTitle";
import DetailTabs from "../components/DetailTabs";
import Container from "@/components/common/Container";
import { useTranslations } from "next-intl";
import BookingCard from "../components/BookingCard";
import { THouse } from "@/components/common/types";
import { Link } from "@/i18n/routing";
import SliderWrapper from "@/components/common/SliderWrapper";
import HouseCard from "@/components/common/HouseCard";
import PropertyQAView from "@/modules/property/Q&A/views/PropertyQAView";

interface IProps {
  house: THouse;
  sliderData: THouse[] | undefined;
}
const FastReserveDetailView = ({ house, sliderData }: IProps) => {
  const t = useTranslations("fastReserveDetail");
  const breadcrumbItemsMock2: IBredCrumbsItems[] = [
    { label: t("home"), href: "/" },
    { label: t("hotelReserve"), href: "/fast-reserve" },
    { label: `${t("hotelReserve")} ${house.title}` },
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
              houseId={house.id}
              rating={house.rate}
              location={house.address}
              title={house.title}
            />
          </div>
          <DetailTabs house={house} />
        </div>
        <div className="w-full md:w-[31%] ">
          <BookingCard
            price={parseInt(house.price)}
            discountedPrice={parseInt(house.discounted_price)}
          />
        </div>
      </div>
      {sliderData && (
        <div className="flex flex-col w-full gap-6 mt-3 ">
          <div className="flex items-center justify-between w-full mb-1 ">
            <h2 className="text-[24px] font-bold text-foreground ">
              {t("commertials")}
            </h2>
            <Link
              href={"/fast-reserve"}
              className="px-3 py-2 text-[20px] border border-[#0D3B66] text-[#0D3B66] dark:text-gray-300
         dark:border-gray-600 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
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
        <PropertyQAView id={house.id} />
      </div>
    </Container>
  );
};

export default FastReserveDetailView;
