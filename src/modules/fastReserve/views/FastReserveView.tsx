import ReserveCardList from "../components/ReserveCardList";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import Container from "@/components/common/Container";
import FastReserveFilters from "../components/Filters";
import FastReservePagination from "../components/FastReservePagination";
import { useTranslations } from "next-intl";

const FastReserveView = () => {
  const t = useTranslations("fastReserve");
  const breadcrumbItemsMock = [
    { label: t("home"), href: "/" },
    { label: t("hotelReserve"), href: "/hotels" },
    { label: "رزرو هتل رشت" },
  ];
  return (
    <Container>
      <div className="mb-8">
        <BreadCrumbs items={breadcrumbItemsMock} />
      </div>
      <div className=" w-full lg:w-[60%] flex items-center justify-between mb-8">
        <h2 className="text-[#1E2022] dark:text-[#FAFAFA] lg:text-[24px] font-bold ">
          {t("filters")}
        </h2>
        <span className="lg:text-[20px] text-[#0D3B66] ">16 {t("result")}</span>
      </div>
      <FastReserveFilters />
      <div>
        <ReserveCardList />
      </div>
      <div className="mx-auto mt-10">
        <FastReservePagination />
      </div>
    </Container>
  );
};

export default FastReserveView;
