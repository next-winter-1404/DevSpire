import ReserveCardList from "../components/ReserveCardList";
import BreadCrumbs, { IBreadCrumbItem } from "@/components/common/BreadCrumbs";
import Container from "@/components/common/Container";
import FastReserveFilters from "../components/Filters";
import FastReservePagination from "../components/FastReservePagination";
import { useTranslations } from "next-intl";
import { THousesResponse } from "@/components/common/types";

interface Iprops {
  location?: string;
  limit: number;
  data: THousesResponse;
}
const FastReserveView = ({ data, location, limit }: Iprops) => {
  const t = useTranslations("fastReserve");
  const breadcrumbItemsMock: IBreadCrumbItem[] = [
    { label: t("home"), href: "/" },
    {
      label: t("hotelReserve"),
      href: location ? "/fast-reserve" : "",
    },
  ];
  if (location) {
    breadcrumbItemsMock.push({ label: `${t("hotelReserve")} ${location}` });
  }
  return (
    <Container>
      <div className="mb-8">
        <BreadCrumbs items={breadcrumbItemsMock} />
      </div>
      <div className=" w-full lg:w-[60%] flex items-center justify-between mb-8">
        <h2 className="text-[#1E2022] dark:text-[#FAFAFA] lg:text-[24px] font-bold ">
          {t("filters")}
        </h2>
        <span className="lg:text-[20px] text-[#0D3B66] ">
          {data?.houses?.length || 0} {t("result")}
        </span>
      </div>
      <FastReserveFilters />
      <div className="w-full">
        <ReserveCardList houses={data?.houses} />
      </div>
      <div className="mx-auto mt-10">
        <FastReservePagination
          totalPages={Math.ceil(data?.totalCount / limit)}
        />
      </div>
    </Container>
  );
};

export default FastReserveView;
