import BreadCrumbs, { IBreadCrumbItem } from "@/components/common/BreadCrumbs";
import { useTranslations } from "next-intl";
import Filters from "../components/Filters";
import MortgageRentList from "../components/MortgageRentList";
import MortgagePagination from "../components/MortgagePagination";
import { THouse, THousesResponse } from "@/components/common/types";

interface IProps {
  data: THouse[] | undefined;
  totalPages: number;
  location: string;
}
const MortgageRentView = ({ data, totalPages, location }: IProps) => {
  const t = useTranslations("header");
  const MockBreadCrumbs: IBreadCrumbItem[] = [
    { label: t("home"), href: "/" },
    { label: t("mortgageAndRent"), href: location ? "/mortgage-rent" : "" },
  ];
  if (location) {
    MockBreadCrumbs.push({
      label: `${t("mortgageAndRent")} ${location}`,
    });
  }

  return (
    <div className="flex flex-col px-12">
      <div className="flex justify-start mt-10">
        <BreadCrumbs items={MockBreadCrumbs} />
      </div>
      <Filters resultLength={data?.length} />
      <div className="mt-10 w-full">
        <MortgageRentList data={data} />
      </div>
      <div className="mt-10">
        <MortgagePagination totalPages={totalPages} />
      </div>
    </div>
  );
};

export default MortgageRentView;
